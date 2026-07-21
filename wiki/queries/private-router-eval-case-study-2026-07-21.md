# Case Study: Compact routers still need routing evals

Date: 2026-07-21
Context: Applying the updated Skill Factory contract to two anonymized private operational skills

## Evidence boundary

This case study records anonymized source-local skill and harness evidence from
a private repository snapshot. The repository, product, branch, commit, report
paths, workflow names, prompts, raw model messages, traces, credentials, and
environment values are intentionally withheld. It is not production, provider,
database, or user-flow proof.

## Shelf audit

The structural audit discovered 112 project skills:

- 112/112 passed the structural error gate.
- 12/112 were warning-free.
- Only two had colocated, versioned eval definitions.
- 87 emitted the static signal for missing behavioral-eval evidence.

This demonstrated three distinct states: structural validity, an eval
definition being present, and an executed behavioral result. None implies the
next.

## Knowledge preservation

Two oversized operational skills were compacted into active routers. Their
long-form bodies moved to one-hop reference archives with source commit,
original SHA-256, annotated archive SHA-256, and extraction boundaries. Routing
maps pointed to existing focused sibling skills instead of creating duplicate
"subskills." The host has no automatic subskill dependency mechanism, so every
sibling read remained explicit.

## Harness failures that improved the Factory

1. **No checkpoint:** one timeout discarded 53 completed records. The Factory
   added per-run append/fsync, fingerprinted resume, and atomic reports.
2. **Host contamination:** a retry loaded the broad host/project shelf, hit a
   skill-context budget, and omitted descriptions/skills. Those records were
   retained as diagnostic-only evidence.
3. **Marker undercount:** a marker-only adapter missed runs where the trace
   proved an exact read of the target `SKILL.md`. Activation telemetry was split
   into marker and exact-read channels.
4. **Temp retention:** interrupted/test runs left disposable workspaces,
   including copied auth state. Exact-prefix cleanup removed the cache, and
   tests now prove they leave no temp roots.

The accepted adapter used an auth-only disposable home, empty Git workspace,
zero or one target skill, explicit model and CLI identity, disabled unrelated
host features, a minimal environment allowlist, and contamination detection.

## Final frozen results

Each suite ran ten cases, two arms, and three trials: 60 runs per skill.

| Router | Trigger | Skill outcome | Baseline | Delta | Overall | Verdict |
|---|---:|---:|---:|---:|---:|---|
| Workflow A | 83.3% | 81.0% | 19.0% | +61.9pp | 70.0% | FAIL: routing and overall |
| Workflow B | 86.7% | 100.0% | 57.1% | +42.9pp | 86.7% | FAIL: routing |

Both skills materially improved functional outcomes. Neither met the declared
90% routing gate. Workflow A over-triggered on an adjacent operational workflow
and migration-prefix prompts. Workflow B missed fetch/provider activations and
over-triggered on adjacent workflow and UI prompts. Thresholds were not changed
after seeing the results.

## Learnings

- Static PASS across a shelf is inventory evidence, not behavioral health.
- Compact routing metadata can fail even when the loaded body is highly useful.
- Negative controls are first-class; outcome-only suites hide over-triggering.
- General baselines already solve some safety cases, so absolute skill outcomes
  need a no-skill delta.
- Repeated trials expose routing variance that a smoke test misses.
- Exact runtime/fingerprint identity belongs in the report, not chat history.
- Failed, diagnostic, and superseded evidence should be retained with explicit
  scoring boundaries.
- Raw trajectories and temporary auth/workspaces are not durable eval data.

## Durable remediation

The result produced a migration queue rather than a false PASS: narrow the
routers' positive/negative discovery metadata, strengthen the named functional
misses, assign a new fingerprint to the changed suite/skill, and rerun without
weakening thresholds.

## Public evidence receipt

- Source class: private repository snapshot reviewed locally on 2026-07-21
- Published evidence: sanitized aggregate metrics and reusable harness findings only
- Withheld: repository/product identity, branch and commit identifiers, report
  paths, workflow names, prompts, trajectories, credentials, and auth state
