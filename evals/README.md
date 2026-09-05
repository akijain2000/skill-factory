# Behavioral skill evals

> Runtime gate (2026-09-05): adapters must return non-empty model and harness identity. The evaluator rejects diagnostic-only metadata and malformed/inconsistent resumed records. It creates a fresh workspace; the adapter must independently establish host isolation. The deterministic example tests harness mechanics only.

`validate-skill.ts` checks the shape of a skill. `evaluate-skill.ts` measures whether the skill changes agent behavior usefully.

## Runner contract

An eval suite names an adapter command. The harness runs that command once per case, condition, and trial in a new temporary workspace. It passes:

| Environment variable | Meaning |
|---|---|
| `SKILL_EVAL_MODE` | `with_skill` or `baseline` |
| `SKILL_EVAL_PROMPT` | User prompt for this case |
| `SKILL_EVAL_SKILL_PATH` | Absolute skill path, empty for baseline |
| `SKILL_EVAL_WORKSPACE` | Fresh workspace for this run |
| `SKILL_EVAL_CASE_ID` | Stable case identifier |
| `SKILL_EVAL_TRIAL` | One-based trial number |

The adapter must write one JSON object to stdout:

```json
{
  "triggered": true,
  "output": "agent final output",
  "trace": ["read SKILL.md", "ran tests"],
  "checks": { "domain_validator": true },
  "metrics": { "tokens": 1234, "latency_ms": 850 },
  "metadata": { "model": "gpt-example", "harness": "host-cli 1.2.3" }
}
```

The adapter owns host-specific skill installation and trace parsing. In baseline mode it must run the same agent, model, prompt, fixture, and limits without installing the skill. Put stable, non-secret model and harness identity in `metadata`; the evaluator fails if it changes within a suite.

Disposable workspaces, output files, and copied authentication homes are runtime
cache, not evidence. Remove them in `finally`, make unit tests clean every temp
root they create, and audit the adapter's exact temp-name prefix after an
interrupted run because a killed process cannot execute its cleanup handler.

## Isolation contract

Both arms must receive the same model, host/CLI, prompt, fixtures, timeout, tool
policy, and limits. The only intended difference is whether the target skill is
installed.

A real host adapter should:

- create an empty Git/project workspace per trial
- install zero target skills for baseline and exactly one for `with_skill`
- use a private auth-only disposable host home when authentication is required
- pass a minimal non-secret environment allowlist
- disable unrelated plugins, apps, memories, web, tools, and workspace context
- pin the model and return stable model plus host/CLI identity in `metadata`
- fail if the host reports omitted discovery metadata, context-budget pressure,
  or any unrelated skill contamination

Do not assume a host's “ignore config” flag disables every global/project skill.
Probe the resulting trace/context. Contaminated records are diagnostic only.

## Suite format

See [`example.json`](example.json). Important fields:

- `rootDir`: base for `skillPath` and `{root}` command expansion
- `runner.command`: argv array; no shell is used. Available placeholders are `{root}`, `{workspace}`, and `{skill}`
- `trials`: use three to six for real suites
- `thresholds`: minimum routing accuracy, skill outcome pass rate, overall pass rate, and skill-minus-baseline delta
- `cases[].shouldTrigger`: expected routing with the skill installed
- `cases[].files`: optional privacy-safe workspace fixtures
- `cases[].checks`: `contains`, `not_contains`, `regex`, `file_exists`, `file_contains`, or adapter-provided checks

Only cases with checks contribute to outcome pass rates. Every case contributes to routing accuracy and skill overall pass rate.

## Run

```bash
bun run scripts/evaluate-skill.ts evals/example.json
bun run scripts/evaluate-skill.ts evals/example.json --report /tmp/skill-eval-report.json
# after an adapter timeout or interrupted process:
bun run scripts/evaluate-skill.ts evals/example.json --report /tmp/skill-eval-report.json --resume
```

A report run also creates `/tmp/skill-eval-report.json.runs.jsonl`. Each completed
trial is appended and synced before the next trial. The checkpoint stores only
the normalized checks and numeric metrics, not raw output or traces. Resume
reuses completed records only when the evaluator, suite, complete skill
directory, and adapter command/content fingerprints still match; otherwise it
fails closed. Use `--checkpoint <path>` to select a different progress file.

The first checkpoint line records schema version, suite, expected run count,
and fingerprints. Every later line is one normalized `(case, arm, trial)`
record. Never merge checkpoints manually or resume after editing any
fingerprinted input.

A threshold miss exits non-zero. The final report is written atomically only
after all expected records exist. The example uses a deterministic fake adapter
so contributors can exercise the harness without credentials or model spend.

## Accepted versus diagnostic evidence

- **Accepted report:** every expected record exists under one compatible
  fingerprint/runtime identity and the aggregate is written atomically.
- **Behavioral FAIL:** accepted report completed but one or more declared gates
  missed. Keep it; it is actionable evidence.
- **Diagnostic checkpoint:** interrupted, contaminated, or superseded partial
  run. Keep only when it explains a failure, label it excluded from scoring,
  and never combine it with an accepted aggregate.
- **Blocked:** the real model/host adapter, auth, or privacy-safe fixtures are
  unavailable. A fake adapter proves harness mechanics only.

Do not weaken thresholds after reading a report. A changed skill, suite,
adapter, evaluator, or runtime requires a new evidence identity.

## Activation telemetry

For model-triggered skills, record why activation was detected. A stripped
machine marker is useful, but an exact trace read of the target `SKILL.md` may
be an independent channel. Store channels separately as numeric telemetry and
strip instrumentation before outcome grading. Do not infer activation from
semantic similarity alone.

## Build a real suite

1. Begin with 10–20 prompts: positive routing, negative routing, functional, and edge cases.
2. Redact real traces before committing them. Never commit customer data, credentials, or private prompts.
3. Prefer deterministic checks. Put domain-specific compilation or test logic in the adapter and return named booleans in `checks`.
4. Run the same suite with the same model and harness on both arms.
5. Add failures as regression cases.
6. Run each supported model-harness pair separately; do not average incompatible environments into one score.
7. Keep the suite after retiring a capability skill so model regressions remain visible.
8. Treat the checkpoint as resumable execution state, not a publishable model trajectory. Delete or archive it according to the same retention policy as the aggregate report.
9. Add sibling-owned negative controls; random unrelated prompts do not adequately test routing boundaries.
10. Reject report comparison when model/CLI metadata or evaluator, suite, skill, and adapter fingerprints differ.

## CI policy

Run structural validation and harness unit tests on every change. Run live model evals when a skill, its references, its adapter, or a supported model/harness changes. Store aggregate reports and sanitized failure evidence; do not publish raw protected trajectories. See [Skill Evidence Lifecycle](../wiki/concepts/evidence-lifecycle.md) and the [anonymized private-shelf router case study](../wiki/queries/private-router-eval-case-study-2026-07-21.md).

## Checkpoint trust boundary

Checkpoints are trusted local execution state. Input fingerprints and record consistency reject drift and malformed/contradictory edits; they do not authenticate a coherently rewritten score. Do not accept user-supplied or manually edited checkpoints as executed evidence. Re-execute from trusted fixtures when custody is uncertain. Optional `evidence_status` metadata must be exactly `accepted`; all other values are rejected.
