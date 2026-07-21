import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
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
    expect(result.stdout).toContain("No behavioral eval evidence found");
  });

  test("recognizes an eval directory as static evidence only", async () => {
    const result = await validate(makeSkill("Run the release checker and report its exit code.", true));

    expect(result.exitCode).toBe(0);
    expect(result.stdout).not.toContain("No behavioral eval evidence found");
  });
});
