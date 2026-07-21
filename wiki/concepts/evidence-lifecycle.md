# Skill Evidence Lifecycle

## What it is

The skill evidence lifecycle assigns every artifact one durable role. Research,
active instructions, historical context, eval definitions, run checkpoints,
aggregate reports, and product proof should not share a file or be described as
the same kind of evidence.

## Why it matters

Skill work produces valuable data, but putting all of it in `SKILL.md` makes
activation expensive and turns dated history into current instructions. The
opposite failure is deleting intermediate evidence, which makes an eval
irreproducible and hides why a harness or skill failed.

Use this placement contract:

| Artifact | Canonical home | What it proves |
|---|---|---|
| External article or transcript distillation | `raw/docs/` | What a source said at capture time |
| Repository and sampled-file revision | `raw/repos/SOURCES.lock.json` | Which exact external revision and content were inspected |
| Active routing and execution contract | `<skill>/SKILL.md` | What the host may discover and load now |
| Long policy, commands, or historical playbook | `<skill>/references/` | On-demand context, not automatically current truth |
| Archive provenance | `<skill>/references/archive-provenance.md` | Source revision, original hash, archive hash, extraction boundary |
| Behavioral cases | `<skill>/evals/` or a paired eval directory | What should route and what outcomes should hold |
| Resumable run state | `*.runs.jsonl` checkpoint | Which normalized arms/trials completed under one fingerprint |
| Aggregate behavioral report | Dated `reports/` directory | Whether declared routing, outcome, delta, and reliability gates passed |
| Operational proof | Product/provider/database evidence store | Whether the real domain workflow worked; outside Skill Factory's static gate |

## Preserve comparability

A score is comparable only when its evidence identity is compatible. Freeze or
record:

- evaluator SHA-256
- suite SHA-256
- complete skill-directory SHA-256
- adapter command/content SHA-256
- model identifier
- host/CLI version

Resume must fail closed if any fingerprint changes. Regression comparison must
reject incompatible runtime metadata or fingerprints instead of interpreting
cross-harness movement as a skill change.

## Persist safely

1. Append and sync one normalized record after every arm/trial.
2. Store case id, arm, trial, trigger result, deterministic checks, numeric
   metrics, runtime identity, and fingerprints.
3. Exclude raw model output, raw traces, protected prompts, credentials, bearer
   URLs, and ambient environment values from committed checkpoints/reports.
4. Write the final report atomically only after every expected record exists.
5. Label interrupted, contaminated, or superseded checkpoints as diagnostic;
   never mix them into the accepted aggregate.
6. Delete disposable workspaces, output files, and copied auth homes. After an
   interrupted process, audit the adapter's exact temp-name prefix because a
   killed process cannot run `finally`.

## Keep failed evidence

A behavioral FAIL is durable evidence. Keep the report, thresholds, and named
failed cases. Do not weaken a threshold after reading the result. A skill can
show a strong outcome delta and still fail because it over-triggers, misses
positive routing, or is unreliable across trials.

Historical and diagnostic evidence should remain discoverable but visibly
excluded from the current score. This is preservation without evidence
laundering.

## Good example

A compact router links one-hop reference archives and focused sibling skills.
Its eval directory defines natural positive and adjacent negative prompts. A
clean adapter runs zero or one installed target skill, records fingerprints and
runtime identity, checkpoints normalized trials, and writes a dated FAIL report
when routing misses its declared gate. The failure becomes the remediation
queue, not an excuse to change the gate.

## Bad example

An author copies a long transcript, dated production claims, raw agent output,
and a single successful prompt into `SKILL.md`, then calls the skill validated
because static lint passes. The source, instruction, behavior, and operational
proof boundaries are all lost.

## Sources

- [`evals/README.md`](../../evals/README.md)
- [Behavioral eval checkpointing observation](../queries/observation-20260721-eval-checkpointing.md)
- [Source provenance lock observation](../queries/observation-20260721-source-provenance-lock.md)
- [Anonymized private-shelf router eval case study](../queries/private-router-eval-case-study-2026-07-21.md)
- [`raw/docs/dont-ship-skills-without-evals.md`](../../raw/docs/dont-ship-skills-without-evals.md)
