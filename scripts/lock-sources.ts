#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

export interface SourceRow {
  id: string;
  url: string;
  stars: string;
  added: string;
  relevance: string;
}

export interface SourceResolution {
  headSha: string | null;
  status: "resolved" | "unresolved";
  error?: string;
}

export interface ArtifactRequest {
  sourceId: string;
  path: string;
  purpose: string;
}

export interface ArtifactResolution extends ArtifactRequest {
  contentSha256: string | null;
  status: "resolved" | "unresolved";
  error?: string;
}

export interface SourceLock {
  schemaVersion: 1;
  generatedAt: string;
  manifestSha256: string;
  evidenceBoundary: string;
  sources: Array<SourceRow & SourceResolution & {
    remote: string;
    sampledArtifacts: ArtifactResolution[];
  }>;
}

type Resolver = (remote: string) => Promise<SourceResolution>;
type ArtifactResolver = (remote: string, headSha: string, request: ArtifactRequest) => Promise<ArtifactResolution>;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeRemote(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");
  if (/^github\.com\/[^/]+\/[^/]+$/i.test(trimmed)) return `https://${trimmed}.git`;
  if (/^https:\/\/github\.com\/[^/]+\/[^/]+(?:\.git)?$/i.test(trimmed)) {
    return trimmed.endsWith(".git") ? trimmed : `${trimmed}.git`;
  }
  throw new Error(`unsupported source URL: ${url}`);
}

export function parseManifest(markdown: string): SourceRow[] {
  const rows: SourceRow[] = [];
  const ids = new Set<string>();
  let inSourceTable = false;
  for (const line of markdown.split("\n")) {
    if (!line.startsWith("|")) { inSourceTable = false; continue; }
    const cells = line.slice(1, -1).split("|").map((cell) => cell.trim());
    if (cells.join("|").toLowerCase() === "repo|url|stars|added|relevance") { inSourceTable = true; continue; }
    if (!inSourceTable) continue;
    if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue;
    assert(line.endsWith("|") && cells.length === 5, `invalid source table row: ${line}`);
    const [id, url, stars, added, relevance] = cells;
    assert(id.length > 0, "source row is missing an id");
    assert(!ids.has(id), `duplicate source id: ${id}`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(added), `source ${id} has invalid added date: ${added}`);
    assert(!Number.isNaN(Date.parse(added)) && new Date(added).toISOString().slice(0, 10) === added, `source ${id} has invalid calendar date: ${added}`);
    normalizeRemote(url);
    ids.add(id);
    rows.push({ id, url, stars, added, relevance });
  }
  assert(rows.length > 0, "source manifest has no repository rows");
  return rows;
}

async function mapConcurrent<T, U>(
  values: T[],
  concurrency: number,
  mapper: (value: T) => Promise<U>,
): Promise<U[]> {
  const results = new Array<U>(values.length);
  let nextIndex = 0;
  async function worker(): Promise<void> {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await mapper(values[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker));
  return results;
}

export async function buildLock(
  markdown: string,
  resolver: Resolver,
  generatedAt = new Date().toISOString(),
  concurrency = 6,
  artifactRequests: ArtifactRequest[] = [],
  artifactResolver?: ArtifactResolver,
): Promise<SourceLock> {
  assert(Number.isInteger(concurrency) && concurrency >= 1 && concurrency <= 20, "concurrency must be an integer from 1 to 20");
  const rows = parseManifest(markdown);
  const sources = await mapConcurrent(rows, concurrency, async (row) => {
    const remote = normalizeRemote(row.url);
    const resolution = await resolver(remote);
    const requests = artifactRequests.filter((request) => request.sourceId === row.id);
    const sampledArtifacts = await mapConcurrent(requests, Math.min(concurrency, 4), async (request) => {
      if (resolution.status !== "resolved" || !resolution.headSha) {
        return { ...request, contentSha256: null, status: "unresolved" as const, error: "source-head-unresolved" };
      }
      if (!artifactResolver) {
        return { ...request, contentSha256: null, status: "unresolved" as const, error: "artifact-resolver-not-configured" };
      }
      return artifactResolver(remote, resolution.headSha, request);
    });
    return { ...row, remote, ...resolution, sampledArtifacts };
  });
  return {
    schemaVersion: 1,
    generatedAt,
    manifestSha256: sha256(markdown),
    evidenceBoundary: "A resolved HEAD proves the remote revision. A resolved sampled artifact additionally proves the exact path and content hash inspected at that revision; it does not prove behavioral claims.",
    sources,
  };
}

export async function resolveArtifact(
  remote: string,
  headSha: string,
  request: ArtifactRequest,
): Promise<ArtifactResolution> {
  if (!request.path || request.path.startsWith("/") || request.path.split("/").includes("..")) {
    return { ...request, contentSha256: null, status: "unresolved", error: "invalid-artifact-path" };
  }
  const match = remote.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)\.git$/i);
  if (!match) return { ...request, contentSha256: null, status: "unresolved", error: "unsupported-remote" };
  const encodedPath = request.path.split("/").map(encodeURIComponent).join("/");
  const url = `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${headSha}/${encodedPath}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return { ...request, contentSha256: null, status: "unresolved", error: `http-${response.status}` };
    const content = new Uint8Array(await response.arrayBuffer());
    return {
      ...request,
      contentSha256: createHash("sha256").update(content).digest("hex"),
      status: "resolved",
    };
  } catch (error) {
    return {
      ...request,
      contentSha256: null,
      status: "unresolved",
      error: error instanceof DOMException && error.name === "AbortError" ? "timeout" : "fetch-failed",
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function resolveGitHead(remote: string): Promise<SourceResolution> {
  const proc = Bun.spawn(["git", "ls-remote", remote, "HEAD"], {
    env: {
      PATH: process.env.PATH ?? "/usr/bin:/bin",
      HOME: process.env.HOME ?? "/tmp",
      GIT_TERMINAL_PROMPT: "0",
    },
    stdout: "pipe",
    stderr: "pipe",
  });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, 30_000);
  const [exitCode, stdout] = await Promise.all([
    proc.exited,
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);
  clearTimeout(timer);
  if (timedOut) return { headSha: null, status: "unresolved", error: "timeout" };
  const headSha = stdout.trim().split(/\s+/)[0] ?? "";
  if (exitCode !== 0 || !/^[0-9a-f]{40}$/i.test(headSha)) {
    return { headSha: null, status: "unresolved", error: "not-found-or-unreachable" };
  }
  return { headSha: headSha.toLowerCase(), status: "resolved" };
}

function writeJsonAtomic(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = resolve(dirname(path), `.${basename(path)}.tmp-${process.pid}`);
  try {
    writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
    renameSync(temporary, path);
  } finally {
    rmSync(temporary, { force: true });
  }
}

function parseCli(argv: string[]): { manifestPath: string; outputPath: string; artifactsPath: string; concurrency: number } {
  let manifestPath = resolve(import.meta.dir, "../raw/repos/SOURCES.md");
  let outputPath = resolve(import.meta.dir, "../raw/repos/SOURCES.lock.json");
  let artifactsPath = resolve(import.meta.dir, "../raw/repos/SAMPLED_ARTIFACTS.json");
  let concurrency = 6;
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "--manifest") {
      assert(argv[index + 1], "Expected --manifest <path>");
      manifestPath = resolve(argv[++index]);
    } else if (arg === "--output") {
      assert(argv[index + 1], "Expected --output <path>");
      outputPath = resolve(argv[++index]);
    } else if (arg === "--concurrency") {
      assert(argv[index + 1], "Expected --concurrency <1-20>");
      concurrency = Number(argv[++index]);
    } else if (arg === "--artifacts") {
      assert(argv[index + 1], "Expected --artifacts <path>");
      artifactsPath = resolve(argv[++index]);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return { manifestPath, outputPath, artifactsPath, concurrency };
}

if (import.meta.main) {
  try {
    const cli = parseCli(process.argv.slice(2));
    const markdown = readFileSync(cli.manifestPath, "utf8");
    const artifactDocument = JSON.parse(readFileSync(cli.artifactsPath, "utf8")) as { schemaVersion?: number; artifacts?: ArtifactRequest[] };
    assert(artifactDocument.schemaVersion === 1 && Array.isArray(artifactDocument.artifacts), `invalid artifact manifest: ${cli.artifactsPath}`);
    const knownIds = new Set(parseManifest(markdown).map((row) => row.id));
    for (const artifact of artifactDocument.artifacts) {
      assert(knownIds.has(artifact.sourceId), `artifact references unknown source: ${artifact.sourceId}`);
      assert(typeof artifact.path === "string" && typeof artifact.purpose === "string", "artifact path and purpose are required");
    }
    const lock = await buildLock(
      markdown,
      resolveGitHead,
      new Date().toISOString(),
      cli.concurrency,
      artifactDocument.artifacts,
      resolveArtifact,
    );
    writeJsonAtomic(cli.outputPath, lock);
    const unresolved = lock.sources.filter((source) => source.status === "unresolved");
    const artifacts = lock.sources.flatMap((source) => source.sampledArtifacts);
    const unresolvedArtifacts = artifacts.filter((artifact) => artifact.status === "unresolved");
    console.log(`Locked ${lock.sources.length - unresolved.length}/${lock.sources.length} repository HEADs and ${artifacts.length - unresolvedArtifacts.length}/${artifacts.length} sampled artifacts in ${cli.outputPath}`);
    for (const source of unresolved) console.log(`UNRESOLVED ${source.id}: ${source.error}`);
    for (const artifact of unresolvedArtifacts) console.log(`UNRESOLVED ${artifact.sourceId}:${artifact.path}: ${artifact.error}`);
    process.exit(unresolved.length === 0 && unresolvedArtifacts.length === 0 ? 0 : 1);
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(2);
  }
}
