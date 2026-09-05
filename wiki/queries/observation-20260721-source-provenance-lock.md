# Observation: Source manifests need revision and artifact locks

Date: 2026-07-21
Context: Auditing the Skill Factory source corpus before extending private operational skills

## Finding

`raw/repos/SOURCES.md` named 145 repositories and the discovery log reported
8,859 visible `SKILL.md` files, but the source clone directories are intentionally
ignored and were absent in the current checkout. The manifest recorded neither
remote revisions nor the exact paths and content hashes used for authoring
decisions. The list was useful discovery context, but it was not reproducible
evidence of what had been inspected.

## Decision

Keep source clones as disposable working data, but commit three durable layers:

1. `SOURCES.md` for human-readable discovery rationale.
2. `SAMPLED_ARTIFACTS.json` for exact files that changed an authoring decision.
3. `SOURCES.lock.json` for every remote HEAD plus every sampled artifact's
   path and SHA-256 at that revision.

`scripts/lock-sources.ts` resolves the complete manifest without silently
omitting failures. It writes the lock atomically, records unresolved sources or
artifacts explicitly, and exits non-zero when the evidence boundary is incomplete.

## Proof boundary

A resolved repository HEAD proves only which remote revision was named. A
resolved sampled artifact additionally proves the exact file content inspected.
Neither proves that a skill triggers correctly or improves outcomes; those
claims still require executed, repeated skill-versus-baseline evaluation.

## Resolution at the end of this observation

After the manifest refresh, the generated lock resolves 147 of 147 repository
sources and 6 of 6 sampled artifacts. The earlier 145-repository count above is
the historical audit finding, not the current corpus size.

## Sources

This first-party observation records the implementation state at its date. Current public mechanics are in [evaluation](../../scripts/evaluate-skill.ts) and [source locking](../../scripts/lock-sources.ts); later edits do not retroactively validate the historical run.
