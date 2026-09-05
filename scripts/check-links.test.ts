import { test, expect } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("missing and empty roots cannot certify link validity", async () => {
  const root = mkdtempSync(join(tmpdir(), "skill-links-test-"));
  try {
    for (const path of [root, join(root, "missing")]) {
      const proc = Bun.spawn(["bun", join(import.meta.dir, "check-links.ts"), path], { stdout: "pipe", stderr: "pipe" });
      const [exit, stdout] = await Promise.all([proc.exited, new Response(proc.stdout).text(), new Response(proc.stderr).text()]);
      expect(exit).not.toBe(0);
      expect(stdout).not.toContain("All checked");
    }
  } finally { rmSync(root, { recursive: true, force: true }); }
});
