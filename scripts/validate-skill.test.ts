import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const validator = resolve(import.meta.dir, "validate-skill.ts");
const testDirs = new Set<string>();

afterEach(() => {
  for (const dir of testDirs) rmSync(dir, { recursive: true, force: true });
  testDirs.clear();
});

async function validate(skillDir: string) {
  const proc = Bun.spawn(["bun", "run", validator, skillDir], {
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

function makeSkill(body: string, withEvals = false): string {
  const base = mkdtempSync(join(tmpdir(), "skill-validator-test-"));
  testDirs.add(base);
  const skillDir = join(base, "example-skill");
  mkdirSync(skillDir);
  writeFileSync(join(skillDir, "SKILL.md"), `---
name: example-skill
description: Review release evidence. Use when preparing documentation for release.
---

# Example Skill

${body}

## Example

\`\`\`
release report
\`\`\`
`);
  if (withEvals) mkdirSync(join(skillDir, "evals"));
  return skillDir;
}

describe("validate-skill", () => {
  test("reports possible no-op directives without treating static lint as behavioral proof", async () => {
    const result = await validate(makeSkill("Follow best practices and write high-quality code."));

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("Possible no-op directives found");
    expect(result.stdout).toContain("No eval definition indicator found");
  });

  test("does not treat an empty eval directory as a definition", async () => {
    const result = await validate(makeSkill("Run the release checker and report its exit code.", true));

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("No eval definition indicator found");
  });
});

test("distinguishes parent from empty headings", async () => {
  const dir = makeSkill("## Parent\n\n### Child\nContent\n\n## Empty\n\n## Next\nContent");
  const result = await validate(dir);
  expect(result.stdout.match(/Empty section/g)).toHaveLength(1);
});

test("validates full folded YAML and rejects invalid YAML/name mismatch", async () => {
  const dir = makeSkill("Run the checker.");
  const file = join(dir, "SKILL.md");
  const original = readFileSync(file, "utf8");
  writeFileSync(file, original.replace("description: Review release evidence. Use when preparing documentation for release.", "description: >-\n  Review release evidence.\n  Use when preparing documentation for release."));
  expect((await validate(dir)).stdout).not.toContain("missing a WHEN");
  writeFileSync(file, original.replace("description: Review", "description: Invalid: Review"));
  expect((await validate(dir)).exitCode).toBe(1);
  writeFileSync(file, original.replace("name: example-skill", "name: other-skill"));
  expect((await validate(dir)).exitCode).toBe(1);
});
