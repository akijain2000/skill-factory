#!/usr/bin/env bun

import { existsSync } from "node:fs";

const gatePath = process.argv[2];
const caseId = process.env.SKILL_EVAL_CASE_ID ?? "";
const mode = process.env.SKILL_EVAL_MODE;

if (!gatePath || (mode !== "baseline" && mode !== "with_skill")) {
  console.error("expected gate path and SKILL_EVAL_MODE");
  process.exit(2);
}

if (caseId === "resume_case" && !existsSync(gatePath)) {
  console.error("intentional resume gate");
  process.exit(3);
}

console.log(JSON.stringify({
  triggered: mode === "with_skill",
  output: "TOP-SECRET-RAW-OUTPUT Handled checkpoint case",
  metrics: { latency_ms: 1 },
  metadata: { harness: "checkpoint-fixture-v1", model: "deterministic" },
}));
