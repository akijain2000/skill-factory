# Observation: Behavioral evals need checkpoint and resume

Date: 2026-07-21
Context: Repeated skill-versus-baseline evaluation for two private operational skills

## Finding

The evaluator keeps every run record in memory and writes its report only after
the complete suite. A single adapter timeout on the final negative-routing case
therefore discarded 53 completed runs and produced no aggregate report. The
adapter failed correctly and within its declared bound; the orchestration layer
lost otherwise valid, expensive evidence.

The same run also showed that aggregate reports should omit raw model output and
that host adapters should pass a minimal environment allowlist rather than all
ambient variables.

## Recommendation

Checkpoint each completed run to an append-only, privacy-safe progress artifact
identified by suite, case, arm, and trial. Add `--resume` support that validates
the evaluator, suite, complete skill-directory, adapter, model, and host CLI
fingerprints before reusing records. Write the final report
atomically from checkpointed records, preserve bounded adapter timeouts, and
keep raw outputs out of the committed report unless separately redacted. Use a
disposable auth-only host home, a minimal environment allowlist, and delete both
workspace and auth prefixes after success or interruption.

## Implemented

`scripts/evaluate-skill.ts` now appends and fsyncs a normalized record after
each completed run, resumes only when evaluator/suite/skill/adapter SHA-256
fingerprints match, requires stable runtime metadata across every arm, and
writes the aggregate report atomically. Unit tests interrupt an eval, prove the
checkpoint excludes a raw-output sentinel, resume the remaining arm, and reject
a changed suite fingerprint.

## Evidence status

Interrupted, contaminated, and superseded checkpoints remain useful diagnostic
evidence, but only a complete fingerprint-compatible report can be accepted as
the behavioral result.

## Sources

This first-party observation records the implementation state at its date. Current public mechanics are in [evaluation](../../scripts/evaluate-skill.ts) and [source locking](../../scripts/lock-sources.ts); later edits do not retroactively validate the historical run.
