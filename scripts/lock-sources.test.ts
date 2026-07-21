import { describe, expect, test } from "bun:test";
import { buildLock, normalizeRemote, parseManifest } from "./lock-sources";

const manifest = `# Sources

| Repo | URL | Stars | Added | Relevance |
|------|-----|-------|-------|-----------|
| alpha | github.com/example/alpha | ~10 | 2026-07-21 | Direct skill examples |
| beta | github.com/example/beta | ~20 | 2026-07-21 | Eval harness |
`;

describe("lock-sources", () => {
  test("parses manifest rows and normalizes GitHub remotes", () => {
    expect(parseManifest(manifest)).toHaveLength(2);
    expect(normalizeRemote("github.com/example/alpha")).toBe("https://github.com/example/alpha.git");
    expect(normalizeRemote("https://github.com/example/alpha.git")).toBe("https://github.com/example/alpha.git");
  });

  test("records every source and preserves unresolved evidence", async () => {
    const lock = await buildLock(manifest, async (remote) => remote.includes("alpha")
      ? { headSha: "a".repeat(40), status: "resolved" }
      : { headSha: null, status: "unresolved", error: "not-found-or-unreachable" },
    "2026-07-21T00:00:00.000Z", 2, [{
      sourceId: "alpha",
      path: "skills/example/SKILL.md",
      purpose: "Test skill",
    }], async (_remote, _headSha, request) => ({
      ...request,
      contentSha256: "b".repeat(64),
      status: "resolved",
    }));

    expect(lock.sources).toHaveLength(2);
    expect(lock.sources[0].headSha).toBe("a".repeat(40));
    expect(lock.sources[1]).toMatchObject({ status: "unresolved", headSha: null });
    expect(lock.sources[0].sampledArtifacts[0]).toMatchObject({
      path: "skills/example/SKILL.md",
      contentSha256: "b".repeat(64),
      status: "resolved",
    });
    expect(lock.sources[1].sampledArtifacts).toEqual([]);
    expect(lock.manifestSha256).toHaveLength(64);
  });

  test("rejects duplicate source ids", () => {
    expect(() => parseManifest(`${manifest}| alpha | github.com/example/other | ~1 | 2026-07-21 | Duplicate |\n`))
      .toThrow("duplicate source id: alpha");
  });
});
