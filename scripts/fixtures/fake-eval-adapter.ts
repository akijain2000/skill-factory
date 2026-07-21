#!/usr/bin/env bun

import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const mode = process.env.SKILL_EVAL_MODE;
const prompt = process.env.SKILL_EVAL_PROMPT ?? "";
const workspace = process.env.SKILL_EVAL_WORKSPACE ?? process.cwd();

if (mode !== "with_skill" && mode !== "baseline") {
  console.error("SKILL_EVAL_MODE must be with_skill or baseline");
  process.exit(2);
}

// Every invocation must receive a new workspace. Seeing this marker would expose leakage.
const marker = join(workspace, ".adapter-seen");
if (existsSync(marker)) {
  console.error("workspace was reused across eval runs");
  process.exit(3);
}
writeFileSync(marker, "seen\n");

const withSkill = mode === "with_skill";
let triggered = false;
let output = "Completed without Skill Factory guidance.";
const checks: Record<string, boolean> = {};

if (/documentation changes for release/i.test(prompt)) {
  triggered = withSkill;
  if (withSkill) {
    output = "Release prepared; links checked and evidence recorded.";
    writeFileSync(join(workspace, "release-report.txt"), "PASS\n");
    checks.release_ready = true;
  } else {
    output = "Documentation drafted.";
    checks.release_ready = false;
  }
} else if (/behavioral eval evidence/i.test(prompt)) {
  triggered = withSkill;
  output = withSkill
    ? "Require isolated trials with the skill and baseline without the skill."
    : "The Markdown structure looks valid.";
} else if (/plot revenue|translate this sentence/i.test(prompt)) {
  triggered = false;
  output = "Handled unrelated request without loading Skill Factory.";
}

console.log(JSON.stringify({
  triggered,
  output,
  trace: withSkill && triggered ? ["read SKILL.md", "applied eval gate"] : [],
  checks,
  metrics: { tokens: withSkill ? 120 : 80, latency_ms: 5 },
  metadata: { harness: "fake-v1", model: "deterministic" },
}));
