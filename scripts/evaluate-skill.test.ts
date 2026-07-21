import { afterEach, describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repoRoot = resolve(import.meta.dir, "..");
const evaluator = join(repoRoot, "scripts/evaluate-skill.ts");
const exampleSuite = join(repoRoot, "evals/example.json");
const checkpointAdapter = join(repoRoot, "scripts/fixtures/checkpoint-eval-adapter.ts");
const testDirs = new Set<string>();

function makeTestDir(prefix: string): string {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  testDirs.add(dir);
  return dir;
}

afterEach(() => {
  for (const dir of testDirs) rmSync(dir, { recursive: true, force: true });
  testDirs.clear();
});

async function run(args: string[]) {
  const proc = Bun.spawn(["bun", "run", evaluator, ...args], {
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    proc.exited,
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);
  return { exitCode, stdout, stderr };
}

function writeCheckpointSuite(dir: string, gatePath: string): string {
  const suite = JSON.parse(readFileSync(exampleSuite, "utf8"));
  suite.rootDir = repoRoot;
  suite.skillPath = ".";
  suite.trials = 1;
  suite.runner.command = ["bun", "run", checkpointAdapter, gatePath];
  suite.thresholds = {
    minTriggerAccuracy: 1,
    minSkillOutcomePassRate: 1,
    minSkillOverallPassRate: 1,
    minOutcomeDelta: 0,
  };
  suite.cases = ["first_case", "resume_case"].map((id) => ({
    id,
    prompt: `Handle ${id}`,
    shouldTrigger: true,
    checks: [{
      id: "handled",
      type: "contains",
      target: "output",
      value: "Handled checkpoint case",
    }],
  }));
  const suitePath = join(dir, "checkpoint-suite.json");
  writeFileSync(suitePath, `${JSON.stringify(suite, null, 2)}\n`);
  return suitePath;
}

describe("evaluate-skill", () => {
  test("runs isolated baseline and skill trials and writes a report", async () => {
    const dir = makeTestDir("skill-eval-test-");
    const reportPath = join(dir, "report.json");
    const result = await run([exampleSuite, "--report", reportPath]);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("PASS: skill-factory-eval-example");

    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    expect(report.metrics.triggerAccuracy).toBe(1);
    expect(report.metrics.skillOutcomePassRate).toBe(1);
    expect(report.metrics.baselineOutcomePassRate).toBe(0);
    expect(report.metrics.outcomeDelta).toBe(1);
    expect(report.runs).toHaveLength(24);
    expect(report.provenance.suiteSha256).toHaveLength(64);
    expect(report.provenance.evaluatorSha256).toHaveLength(64);
    expect(report.provenance.skillSha256).toHaveLength(64);
    expect(report.provenance.adapterSha256).toHaveLength(64);
    expect(report.execution).toEqual({ reusedRuns: 0, executedRuns: 24 });
    expect(report.runtimeMetadata).toEqual({ harness: "fake-v1", model: "deterministic" });
    expect(readFileSync(`${reportPath}.runs.jsonl`, "utf8").trim().split("\n")).toHaveLength(25);
  });

  test("fails closed when the skill does not beat the baseline", async () => {
    const dir = makeTestDir("skill-eval-test-");
    const suite = JSON.parse(readFileSync(exampleSuite, "utf8"));
    suite.rootDir = repoRoot;
    suite.cases = [{
      id: "baseline_equal",
      prompt: "Translate this sentence into Norwegian: The keys are on the table.",
      shouldTrigger: false,
      checks: [{
        id: "completed",
        type: "contains",
        target: "output",
        value: "Handled unrelated request",
      }],
    }];
    const suitePath = join(dir, "failing.json");
    writeFileSync(suitePath, JSON.stringify(suite));

    const result = await run([suitePath]);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("FAIL: skill-factory-eval-example");
    expect(result.stdout).toContain("outcome delta 0.0% < 50.0%");
  });

  test("rejects fixture paths that escape the isolated workspace", async () => {
    const dir = makeTestDir("skill-eval-test-");
    const suite = JSON.parse(readFileSync(exampleSuite, "utf8"));
    suite.rootDir = repoRoot;
    suite.cases[0].files = { "../escape.txt": "unsafe" };
    const suitePath = join(dir, "traversal.json");
    writeFileSync(suitePath, JSON.stringify(suite));

    const result = await run([suitePath]);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain("workspace path escapes root");
  });

  test("checkpoints completed runs, excludes raw output, and resumes without replay", async () => {
    const dir = makeTestDir("skill-eval-checkpoint-test-");
    const gatePath = join(dir, "resume-ready");
    const suitePath = writeCheckpointSuite(dir, gatePath);
    const reportPath = join(dir, "report.json");
    const checkpointPath = `${reportPath}.runs.jsonl`;

    const interrupted = await run([suitePath, "--report", reportPath]);
    expect(interrupted.exitCode).toBe(2);
    expect(interrupted.stderr).toContain("intentional resume gate");
    expect(existsSync(reportPath)).toBe(false);

    const checkpointBefore = readFileSync(checkpointPath, "utf8");
    expect(checkpointBefore.trim().split("\n")).toHaveLength(3);
    expect(checkpointBefore).not.toContain("TOP-SECRET-RAW-OUTPUT");

    writeFileSync(gatePath, "ready\n");
    const resumed = await run([suitePath, "--report", reportPath, "--resume"]);
    expect(resumed.exitCode).toBe(0);
    expect(resumed.stdout).toContain("PASS: skill-factory-eval-example");

    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    expect(report.runs).toHaveLength(4);
    expect(report.execution).toEqual({ reusedRuns: 2, executedRuns: 2 });
    expect(readFileSync(checkpointPath, "utf8").trim().split("\n")).toHaveLength(5);
  });

  test("rejects resume when the suite fingerprint changes", async () => {
    const dir = makeTestDir("skill-eval-checkpoint-test-");
    const gatePath = join(dir, "resume-ready");
    const suitePath = writeCheckpointSuite(dir, gatePath);
    const reportPath = join(dir, "report.json");

    const interrupted = await run([suitePath, "--report", reportPath]);
    expect(interrupted.exitCode).toBe(2);

    const suite = JSON.parse(readFileSync(suitePath, "utf8"));
    suite.cases[0].prompt = "Changed after checkpoint";
    writeFileSync(suitePath, `${JSON.stringify(suite, null, 2)}\n`);
    writeFileSync(gatePath, "ready\n");

    const resumed = await run([suitePath, "--report", reportPath, "--resume"]);
    expect(resumed.exitCode).toBe(2);
    expect(resumed.stderr).toContain("checkpoint suiteSha256 mismatch");
  });
});
