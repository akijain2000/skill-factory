#!/usr/bin/env bun

import {
  closeSync,
  existsSync,
  fsyncSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  renameSync,
  rmSync,
  writeFileSync,
  writeSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

type Mode = "baseline" | "with_skill";
type Target = "output" | "trace";

interface ContainsCheck {
  id: string;
  type: "contains" | "not_contains";
  target: Target;
  value: string;
}

interface RegexCheck {
  id: string;
  type: "regex";
  target: Target;
  pattern: string;
  flags?: string;
}

interface FileExistsCheck {
  id: string;
  type: "file_exists";
  path: string;
}

interface FileContainsCheck {
  id: string;
  type: "file_contains";
  path: string;
  value: string;
}

interface AdapterCheck {
  id: string;
  type: "adapter";
  name: string;
}

export type EvalCheck =
  | ContainsCheck
  | RegexCheck
  | FileExistsCheck
  | FileContainsCheck
  | AdapterCheck;

export interface EvalCase {
  id: string;
  prompt: string;
  shouldTrigger: boolean;
  files?: Record<string, string>;
  checks: EvalCheck[];
}

interface Thresholds {
  minTriggerAccuracy: number;
  minSkillOutcomePassRate: number;
  minSkillOverallPassRate: number;
  minOutcomeDelta: number;
}

export interface EvalSuite {
  name: string;
  rootDir?: string;
  skillPath: string;
  trials: number;
  runner: {
    command: string[];
    timeoutMs?: number;
  };
  thresholds: Thresholds;
  cases: EvalCase[];
}

interface AdapterResult {
  triggered: boolean;
  output: string;
  trace?: string[];
  checks?: Record<string, boolean>;
  metrics?: Record<string, number>;
  metadata?: Record<string, string>;
}

interface CheckResult {
  id: string;
  passed: boolean;
  detail: string;
}

export interface RunRecord {
  caseId: string;
  mode: Mode;
  trial: number;
  triggered: boolean;
  triggerPassed: boolean;
  checksPassed: boolean;
  passed: boolean;
  checks: CheckResult[];
  metrics: Record<string, number>;
  metadata: Record<string, string>;
}

export interface EvalReport {
  suite: string;
  status: "PASS" | "FAIL";
  metrics: {
    triggerAccuracy: number;
    skillOutcomePassRate: number;
    baselineOutcomePassRate: number;
    outcomeDelta: number;
    skillOverallPassRate: number;
  };
  thresholds: Thresholds;
  failures: string[];
  runs: RunRecord[];
  provenance: EvalProvenance;
  execution: {
    reusedRuns: number;
    executedRuns: number;
  };
  runtimeMetadata: Record<string, string>;
}

interface EvalProvenance {
  schemaVersion: 2;
  evaluatorSha256: string;
  suiteSha256: string;
  skillSha256: string;
  adapterSha256: string;
}

interface CheckpointMeta {
  type: "meta";
  schemaVersion: 2;
  suite: string;
  expectedRuns: number;
  provenance: EvalProvenance;
}

interface CheckpointRun {
  type: "run";
  key: string;
  run: RunRecord;
}

interface EvaluationOptions {
  checkpointPath?: string;
  resume?: boolean;
}

interface SuiteContext {
  suite: EvalSuite;
  suitePath: string;
  rootDir: string;
  skillPath: string;
}

interface CliOptions {
  suitePath: string;
  reportPath?: string;
  checkpointPath?: string;
  resume: boolean;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertRate(value: unknown, name: string): asserts value is number {
  assert(typeof value === "number" && value >= 0 && value <= 1, `${name} must be between 0 and 1`);
}

function assertDelta(value: unknown, name: string): asserts value is number {
  assert(typeof value === "number" && value >= -1 && value <= 1, `${name} must be between -1 and 1`);
}

function sha256(parts: Array<string | Uint8Array>): string {
  const hash = createHash("sha256");
  for (const part of parts) hash.update(part);
  return hash.digest("hex");
}

function hashDirectory(root: string): string {
  const parts: Array<string | Uint8Array> = [];

  function visit(current: string): void {
    for (const name of readdirSync(current).sort()) {
      if (name === ".DS_Store" || name === ".git" || name === "node_modules") continue;
      const absolute = join(current, name);
      const rel = relative(root, absolute);
      const stat = lstatSync(absolute);
      if (stat.isDirectory()) {
        visit(absolute);
      } else if (stat.isSymbolicLink()) {
        parts.push(`link\0${rel}\0${readlinkSync(absolute)}\0`);
      } else if (stat.isFile()) {
        parts.push(`file\0${rel}\0`, readFileSync(absolute), "\0");
      }
    }
  }

  visit(root);
  return sha256(parts);
}

function isWithin(root: string, candidate: string): boolean {
  const rel = relative(root, candidate);
  return rel === "" || (rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel));
}

function buildProvenance(context: SuiteContext): EvalProvenance {
  const adapterParts: Array<string | Uint8Array> = [
    `${JSON.stringify(context.suite.runner.command)}\0`,
  ];
  for (const token of context.suite.runner.command) {
    const expanded = token
      .replaceAll("{root}", context.rootDir)
      .replaceAll("{skill}", context.skillPath);
    const absolute = resolve(expanded);
    if (
      !expanded.includes("{workspace}")
      && isWithin(context.rootDir, absolute)
      && existsSync(absolute)
      && lstatSync(absolute).isFile()
    ) {
      adapterParts.push(`file\0${absolute}\0`, readFileSync(absolute), "\0");
    }
  }
  return {
    schemaVersion: 2,
    evaluatorSha256: sha256([readFileSync(fileURLToPath(import.meta.url))]),
    suiteSha256: sha256([readFileSync(context.suitePath)]),
    skillSha256: hashDirectory(context.skillPath),
    adapterSha256: sha256(adapterParts),
  };
}

function runKey(caseId: string, mode: Mode, trial: number): string {
  return JSON.stringify([caseId, mode, trial]);
}

function expectedRunKeys(context: SuiteContext): string[] {
  const keys: string[] = [];
  for (const testCase of context.suite.cases) {
    for (const mode of ["baseline", "with_skill"] as const) {
      for (let trial = 1; trial <= context.suite.trials; trial++) {
        keys.push(runKey(testCase.id, mode, trial));
      }
    }
  }
  return keys;
}

function appendCheckpoint(path: string, entry: CheckpointMeta | CheckpointRun): void {
  mkdirSync(dirname(path), { recursive: true });
  const descriptor = openSync(path, "a");
  try {
    writeSync(descriptor, `${JSON.stringify(entry)}\n`);
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

function loadCheckpoint(
  path: string,
  meta: CheckpointMeta,
  expectedKeys: Set<string>,
): Map<string, RunRecord> {
  assert(existsSync(path), `checkpoint not found: ${path}`);
  const lines = readFileSync(path, "utf8").split("\n").filter(Boolean);
  assert(lines.length > 0, `checkpoint is empty: ${path}`);

  let storedMeta: CheckpointMeta;
  try {
    storedMeta = JSON.parse(lines[0]) as CheckpointMeta;
  } catch {
    throw new Error(`checkpoint metadata is invalid JSON: ${path}`);
  }
  assert(storedMeta.type === "meta" && storedMeta.schemaVersion === 2, `checkpoint metadata is unsupported: ${path}`);
  assert(storedMeta.suite === meta.suite, `checkpoint suite mismatch: expected ${meta.suite}, found ${storedMeta.suite}`);
  assert(storedMeta.expectedRuns === meta.expectedRuns, `checkpoint run-count mismatch: expected ${meta.expectedRuns}, found ${storedMeta.expectedRuns}`);
  for (const field of ["evaluatorSha256", "suiteSha256", "skillSha256", "adapterSha256"] as const) {
    assert(
      storedMeta.provenance?.[field] === meta.provenance[field],
      `checkpoint ${field} mismatch; start a new checkpoint for changed inputs`,
    );
  }

  const runs = new Map<string, RunRecord>();
  for (const [index, line] of lines.slice(1).entries()) {
    let entry: CheckpointRun;
    try {
      entry = JSON.parse(line) as CheckpointRun;
    } catch {
      throw new Error(`checkpoint line ${index + 2} is invalid JSON: ${path}`);
    }
    assert(entry.type === "run" && typeof entry.key === "string" && entry.run, `checkpoint line ${index + 2} is invalid`);
    assert(expectedKeys.has(entry.key), `checkpoint contains unexpected run key: ${entry.key}`);
    assert(!runs.has(entry.key), `checkpoint contains duplicate run key: ${entry.key}`);
    assert(entry.key === runKey(entry.run.caseId, entry.run.mode, entry.run.trial), `checkpoint run key does not match its record: ${entry.key}`);
    runs.set(entry.key, entry.run);
  }
  return runs;
}

function writeJsonAtomic(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = join(dirname(path), `.${basename(path)}.tmp-${process.pid}`);
  try {
    writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
    renameSync(temporary, path);
  } finally {
    rmSync(temporary, { force: true });
  }
}

function safeWorkspacePath(workspace: string, candidate: string): string {
  assert(candidate.length > 0 && !isAbsolute(candidate), `workspace path must be relative: ${candidate}`);
  const target = resolve(workspace, candidate);
  const rel = relative(workspace, target);
  assert(rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel), `workspace path escapes root: ${candidate}`);
  return target;
}

function validateCheck(check: EvalCheck, caseId: string): void {
  assert(check && typeof check === "object", `case ${caseId} has an invalid check`);
  assert(typeof check.id === "string" && check.id.length > 0, `case ${caseId} has a check without id`);
  if (check.type === "contains" || check.type === "not_contains") {
    assert(check.target === "output" || check.target === "trace", `check ${check.id} has invalid target`);
    assert(typeof check.value === "string" && check.value.length > 0, `check ${check.id} needs value`);
  } else if (check.type === "regex") {
    assert(check.target === "output" || check.target === "trace", `check ${check.id} has invalid target`);
    assert(typeof check.pattern === "string" && check.pattern.length > 0, `check ${check.id} needs pattern`);
    new RegExp(check.pattern, check.flags);
  } else if (check.type === "file_exists") {
    assert(typeof check.path === "string" && check.path.length > 0, `check ${check.id} needs path`);
  } else if (check.type === "file_contains") {
    assert(typeof check.path === "string" && check.path.length > 0, `check ${check.id} needs path`);
    assert(typeof check.value === "string" && check.value.length > 0, `check ${check.id} needs value`);
  } else if (check.type === "adapter") {
    assert(typeof check.name === "string" && check.name.length > 0, `check ${check.id} needs adapter check name`);
  } else {
    throw new Error(`case ${caseId} has unsupported check type: ${(check as { type?: string }).type}`);
  }
}

export function loadSuite(suitePath: string): SuiteContext {
  const absoluteSuitePath = resolve(suitePath);
  assert(existsSync(absoluteSuitePath), `suite not found: ${suitePath}`);
  const suite = JSON.parse(readFileSync(absoluteSuitePath, "utf8")) as EvalSuite;

  assert(typeof suite.name === "string" && suite.name.length > 0, "suite.name is required");
  assert(typeof suite.skillPath === "string" && suite.skillPath.length > 0, "suite.skillPath is required");
  assert(Number.isInteger(suite.trials) && suite.trials >= 1 && suite.trials <= 20, "suite.trials must be an integer from 1 to 20");
  assert(Array.isArray(suite.runner?.command) && suite.runner.command.length > 0, "runner.command must be a non-empty argv array");
  assert(suite.runner.command.every((part) => typeof part === "string" && part.length > 0), "runner.command entries must be non-empty strings");
  if (suite.runner.timeoutMs !== undefined) {
    assert(Number.isInteger(suite.runner.timeoutMs) && suite.runner.timeoutMs > 0, "runner.timeoutMs must be a positive integer");
  }
  assertRate(suite.thresholds?.minTriggerAccuracy, "minTriggerAccuracy");
  assertRate(suite.thresholds?.minSkillOutcomePassRate, "minSkillOutcomePassRate");
  assertRate(suite.thresholds?.minSkillOverallPassRate, "minSkillOverallPassRate");
  assertDelta(suite.thresholds?.minOutcomeDelta, "minOutcomeDelta");
  assert(Array.isArray(suite.cases) && suite.cases.length > 0, "suite.cases must be non-empty");

  const ids = new Set<string>();
  for (const testCase of suite.cases) {
    assert(typeof testCase.id === "string" && testCase.id.length > 0, "every case needs an id");
    assert(!ids.has(testCase.id), `duplicate case id: ${testCase.id}`);
    ids.add(testCase.id);
    assert(typeof testCase.prompt === "string" && testCase.prompt.length > 0, `case ${testCase.id} needs a prompt`);
    assert(typeof testCase.shouldTrigger === "boolean", `case ${testCase.id} needs shouldTrigger`);
    assert(Array.isArray(testCase.checks), `case ${testCase.id} needs a checks array`);
    testCase.checks.forEach((check) => validateCheck(check, testCase.id));
    for (const [path, content] of Object.entries(testCase.files ?? {})) {
      assert(typeof content === "string", `fixture ${path} in ${testCase.id} must be text`);
      safeWorkspacePath(join(tmpdir(), "skill-eval-validation"), path);
    }
  }

  const suiteDir = dirname(absoluteSuitePath);
  const rootDir = resolve(suiteDir, suite.rootDir ?? ".");
  const skillPath = resolve(rootDir, suite.skillPath);
  assert(existsSync(skillPath), `skillPath not found: ${skillPath}`);
  assert(existsSync(join(skillPath, "SKILL.md")), `skillPath does not contain SKILL.md: ${skillPath}`);

  return { suite, suitePath: absoluteSuitePath, rootDir, skillPath };
}

function targetText(result: AdapterResult, target: Target): string {
  return target === "output" ? result.output : (result.trace ?? []).join("\n");
}

export function evaluateCheck(check: EvalCheck, result: AdapterResult, workspace: string): CheckResult {
  if (check.type === "contains") {
    const passed = targetText(result, check.target).includes(check.value);
    return { id: check.id, passed, detail: `${check.target} contains ${JSON.stringify(check.value)}` };
  }
  if (check.type === "not_contains") {
    const passed = !targetText(result, check.target).includes(check.value);
    return { id: check.id, passed, detail: `${check.target} excludes ${JSON.stringify(check.value)}` };
  }
  if (check.type === "regex") {
    const passed = new RegExp(check.pattern, check.flags).test(targetText(result, check.target));
    return { id: check.id, passed, detail: `${check.target} matches /${check.pattern}/${check.flags ?? ""}` };
  }
  if (check.type === "file_exists") {
    const path = safeWorkspacePath(workspace, check.path);
    return { id: check.id, passed: existsSync(path), detail: `file exists: ${check.path}` };
  }
  if (check.type === "file_contains") {
    const path = safeWorkspacePath(workspace, check.path);
    const passed = existsSync(path) && readFileSync(path, "utf8").includes(check.value);
    return { id: check.id, passed, detail: `${check.path} contains ${JSON.stringify(check.value)}` };
  }
  const passed = result.checks?.[check.name] === true;
  return { id: check.id, passed, detail: `adapter check ${check.name} is true` };
}

function expandCommand(command: string[], context: SuiteContext, workspace: string, mode: Mode): string[] {
  return command.map((part) => part
    .replaceAll("{root}", context.rootDir)
    .replaceAll("{workspace}", workspace)
    .replaceAll("{skill}", mode === "with_skill" ? context.skillPath : ""));
}

async function runAdapter(
  context: SuiteContext,
  testCase: EvalCase,
  mode: Mode,
  trial: number,
  workspace: string,
): Promise<AdapterResult> {
  const command = expandCommand(context.suite.runner.command, context, workspace, mode);
  const proc = Bun.spawn(command, {
    cwd: workspace,
    env: {
      ...process.env,
      SKILL_EVAL_MODE: mode,
      SKILL_EVAL_PROMPT: testCase.prompt,
      SKILL_EVAL_SKILL_PATH: mode === "with_skill" ? context.skillPath : "",
      SKILL_EVAL_WORKSPACE: workspace,
      SKILL_EVAL_CASE_ID: testCase.id,
      SKILL_EVAL_TRIAL: String(trial),
    },
    stdout: "pipe",
    stderr: "pipe",
  });

  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, context.suite.runner.timeoutMs ?? 300_000);

  const [exitCode, stdout, stderr] = await Promise.all([
    proc.exited,
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);
  clearTimeout(timer);

  assert(!timedOut, `adapter timed out for ${testCase.id} ${mode} trial ${trial}`);
  assert(exitCode === 0, `adapter failed for ${testCase.id} ${mode} trial ${trial}: ${stderr.trim() || `exit ${exitCode}`}`);

  let parsed: AdapterResult;
  try {
    parsed = JSON.parse(stdout.trim()) as AdapterResult;
  } catch {
    throw new Error(`adapter returned invalid JSON for ${testCase.id} ${mode} trial ${trial}`);
  }
  assert(typeof parsed.triggered === "boolean", `adapter result for ${testCase.id} needs triggered boolean`);
  assert(typeof parsed.output === "string", `adapter result for ${testCase.id} needs output string`);
  if (parsed.trace !== undefined) assert(Array.isArray(parsed.trace) && parsed.trace.every((line) => typeof line === "string"), `adapter trace for ${testCase.id} must be strings`);
  if (parsed.metrics !== undefined) {
    assert(
      Object.values(parsed.metrics).every((value) => typeof value === "number" && Number.isFinite(value)),
      `adapter metrics for ${testCase.id} must be finite numbers`,
    );
  }
  if (parsed.metadata !== undefined) {
    assert(
      Object.entries(parsed.metadata).every(([key, value]) => /^[a-z][a-z0-9_]{0,63}$/.test(key)
        && typeof value === "string" && value.length > 0 && value.length <= 256),
      `adapter metadata for ${testCase.id} must use safe keys and 1-256 character string values`,
    );
  }
  return parsed;
}

function rate(passed: number, total: number): number {
  return total === 0 ? 1 : passed / total;
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export async function evaluateSuite(
  context: SuiteContext,
  options: EvaluationOptions = {},
): Promise<EvalReport> {
  const provenance = buildProvenance(context);
  const orderedKeys = expectedRunKeys(context);
  const expectedKeys = new Set(orderedKeys);
  const checkpointMeta: CheckpointMeta = {
    type: "meta",
    schemaVersion: 2,
    suite: context.suite.name,
    expectedRuns: orderedKeys.length,
    provenance,
  };
  let runsByKey = new Map<string, RunRecord>();
  let reusedRuns = 0;

  if (options.resume) {
    assert(options.checkpointPath, "--resume requires a checkpoint path");
    runsByKey = loadCheckpoint(options.checkpointPath, checkpointMeta, expectedKeys);
    reusedRuns = runsByKey.size;
  } else if (options.checkpointPath) {
    assert(!existsSync(options.checkpointPath), `checkpoint already exists; use --resume or choose a new path: ${options.checkpointPath}`);
    appendCheckpoint(options.checkpointPath, checkpointMeta);
  }

  for (const testCase of context.suite.cases) {
    for (const mode of ["baseline", "with_skill"] as const) {
      for (let trial = 1; trial <= context.suite.trials; trial++) {
        const key = runKey(testCase.id, mode, trial);
        if (runsByKey.has(key)) continue;
        const workspace = mkdtempSync(join(tmpdir(), "skill-eval-"));
        try {
          for (const [fixturePath, content] of Object.entries(testCase.files ?? {})) {
            const target = safeWorkspacePath(workspace, fixturePath);
            mkdirSync(dirname(target), { recursive: true });
            writeFileSync(target, content);
          }
          const result = await runAdapter(context, testCase, mode, trial, workspace);
          const checks = testCase.checks.map((check) => evaluateCheck(check, result, workspace));
          const checksPassed = checks.every((check) => check.passed);
          const triggerPassed = mode === "baseline" || result.triggered === testCase.shouldTrigger;
          const run: RunRecord = {
            caseId: testCase.id,
            mode,
            trial,
            triggered: result.triggered,
            triggerPassed,
            checksPassed,
            passed: checksPassed && triggerPassed,
            checks,
            metrics: result.metrics ?? {},
            metadata: result.metadata ?? {},
          };
          runsByKey.set(key, run);
          if (options.checkpointPath) appendCheckpoint(options.checkpointPath, { type: "run", key, run });
        } finally {
          rmSync(workspace, { recursive: true, force: true });
        }
      }
    }
  }

  const runs = orderedKeys.map((key) => {
    const run = runsByKey.get(key);
    assert(run, `missing completed run: ${key}`);
    return run;
  });
  const runtimeMetadata = runs[0]?.metadata ?? {};
  const metadataFingerprint = JSON.stringify(Object.entries(runtimeMetadata).sort());
  for (const run of runs) {
    assert(
      JSON.stringify(Object.entries(run.metadata).sort()) === metadataFingerprint,
      `adapter runtime metadata changed during the suite at ${run.caseId} ${run.mode} trial ${run.trial}`,
    );
  }

  const skillRuns = runs.filter((run) => run.mode === "with_skill");
  const functionalIds = new Set(context.suite.cases.filter((testCase) => testCase.checks.length > 0).map((testCase) => testCase.id));
  const skillFunctional = skillRuns.filter((run) => functionalIds.has(run.caseId));
  const baselineFunctional = runs.filter((run) => run.mode === "baseline" && functionalIds.has(run.caseId));
  const triggerAccuracy = rate(skillRuns.filter((run) => run.triggerPassed).length, skillRuns.length);
  const skillOutcomePassRate = rate(skillFunctional.filter((run) => run.checksPassed).length, skillFunctional.length);
  const baselineOutcomePassRate = rate(baselineFunctional.filter((run) => run.checksPassed).length, baselineFunctional.length);
  const outcomeDelta = skillOutcomePassRate - baselineOutcomePassRate;
  const skillOverallPassRate = rate(skillRuns.filter((run) => run.passed).length, skillRuns.length);

  const metrics = { triggerAccuracy, skillOutcomePassRate, baselineOutcomePassRate, outcomeDelta, skillOverallPassRate };
  const thresholds = context.suite.thresholds;
  const failures: string[] = [];
  if (triggerAccuracy < thresholds.minTriggerAccuracy) failures.push(`trigger accuracy ${formatPercent(triggerAccuracy)} < ${formatPercent(thresholds.minTriggerAccuracy)}`);
  if (skillOutcomePassRate < thresholds.minSkillOutcomePassRate) failures.push(`skill outcome pass rate ${formatPercent(skillOutcomePassRate)} < ${formatPercent(thresholds.minSkillOutcomePassRate)}`);
  if (skillOverallPassRate < thresholds.minSkillOverallPassRate) failures.push(`skill overall pass rate ${formatPercent(skillOverallPassRate)} < ${formatPercent(thresholds.minSkillOverallPassRate)}`);
  if (outcomeDelta < thresholds.minOutcomeDelta) failures.push(`outcome delta ${formatPercent(outcomeDelta)} < ${formatPercent(thresholds.minOutcomeDelta)}`);

  return {
    suite: context.suite.name,
    status: failures.length === 0 ? "PASS" : "FAIL",
    metrics,
    thresholds,
    failures,
    runs,
    provenance,
    execution: {
      reusedRuns,
      executedRuns: runs.length - reusedRuns,
    },
    runtimeMetadata,
  };
}

function printReport(report: EvalReport): void {
  console.log(`${report.status}: ${report.suite}`);
  console.log(`  trigger accuracy:       ${formatPercent(report.metrics.triggerAccuracy)}`);
  console.log(`  skill outcome pass:     ${formatPercent(report.metrics.skillOutcomePassRate)}`);
  console.log(`  baseline outcome pass:  ${formatPercent(report.metrics.baselineOutcomePassRate)}`);
  console.log(`  outcome delta:          ${formatPercent(report.metrics.outcomeDelta)}`);
  console.log(`  skill overall pass:     ${formatPercent(report.metrics.skillOverallPassRate)}`);

  const failedRuns = report.runs.filter((run) => !run.passed && run.mode === "with_skill");
  for (const run of failedRuns) {
    const failedChecks = run.checks.filter((check) => !check.passed).map((check) => check.id).join(", ");
    console.log(`  FAIL ${run.caseId} trial ${run.trial}: ${!run.triggerPassed ? "routing" : failedChecks}`);
  }
  for (const failure of report.failures) console.log(`  GATE: ${failure}`);
}

function parseCli(argv: string[]): CliOptions {
  const suitePath = argv[0];
  assert(suitePath, "Usage: bun run scripts/evaluate-skill.ts <suite.json> [--report <report.json>] [--checkpoint <runs.jsonl>] [--resume]");
  let reportPath: string | undefined;
  let checkpointPath: string | undefined;
  let resume = false;
  for (let index = 1; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "--report") {
      assert(argv[index + 1], "Expected --report <report.json>");
      reportPath = resolve(argv[++index]);
    } else if (arg === "--checkpoint") {
      assert(argv[index + 1], "Expected --checkpoint <runs.jsonl>");
      checkpointPath = resolve(argv[++index]);
    } else if (arg === "--resume") {
      resume = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (reportPath && !checkpointPath) checkpointPath = `${reportPath}.runs.jsonl`;
  assert(!resume || checkpointPath, "--resume requires --checkpoint or --report");
  return { suitePath, reportPath, checkpointPath, resume };
}

if (import.meta.main) {
  try {
    const cli = parseCli(process.argv.slice(2));
    const report = await evaluateSuite(loadSuite(cli.suitePath), {
      checkpointPath: cli.checkpointPath,
      resume: cli.resume,
    });
    printReport(report);
    if (cli.reportPath) {
      writeJsonAtomic(cli.reportPath, report);
      console.log(`  report: ${cli.reportPath}`);
    }
    process.exit(report.status === "PASS" ? 0 : 1);
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(2);
  }
}
