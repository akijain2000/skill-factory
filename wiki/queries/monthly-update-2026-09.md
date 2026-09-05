# Monthly Update — September 2026

Observed: 2026-09-05. Local corpus refresh; external publication and live-model
behavioral evaluation are not part of the evidence reported here.

## Result

- Checked all **147** previous source entries: **114** changed revision, **33** unchanged.
- Added **7** sources: **154** tracked entries, **153** unique canonical repositories.
- Inspected **43** exact files across **15** sources, including helpers and test definitions.
- Preserved the previous sampled paths/hashes and old/new repository revisions.
- Updated all four Skill Factory skills, the source-update runbook, quality spec,
  wiki concepts/research, and Modules 10 and 12.
- Defined 16 regression scenarios; these are not executed behavioral results.

## Search method and limits

Read the frozen `EvanLi/Github-Ranking` overall top-100 file: 100 ranking rows,
34 matches against the existing discovery keywords. Supplemented this with four
DeepAPI GitHub repository searches, each capped at 40 returned results:

| Query | Sort | Purpose |
|---|---|---|
| `"agent skills"` | stars | Established skill ecosystem and official sources |
| `"skill-creator"` | updated | Recently maintained authoring workflows |
| `skills benchmark` | stars | Evaluation methods and counterexamples |
| `"SKILL.md" created:>2026-07-21` | stars | Projects created since the prior refresh |

The combined screen contains **190 distinct candidate records**. Each record
has a relevance score, decision, evidence boundary, and rationale in the
[machine-readable dataset](../../raw/datasets/source-refresh-2026-09-05.json).
Metadata screening is not deep review. This was a bounded overall-ranking plus
targeted-search pass, not an exhaustive language-ranking/full-CSV ecosystem scan.
The result caps and reported total counts remain in the search receipts. Newly
added to this corpus does not imply newly created upstream.

## Retained candidate table

| Repo | Observed stars | Score | Eval evidence | Decision | Why |
|---|---:|---:|---|---|---|
| [agentskills/agentskills](https://github.com/agentskills/agentskills) | 25,048 | 5 | Source + test/eval definitions; not run | Retained | Official format plus authoring and evaluation guidance |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | 30,438 | 5 | Source + test/eval definitions; not run | Retained | Whole-skill update hashes and installation boundary regression tests |
| [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector) | 16,218 | 5 | Source + test/eval definitions; not run | Retained | Bundled execution-surface inspection and incomplete-scan gates |
| [EverMind-AI/SkillCorpus](https://github.com/EverMind-AI/SkillCorpus) | 543 | 5 | Source + test/eval definitions; not run | Retained | Curated multi-source skill retrieval with ranking metrics and license gates |
| [rpamis/comet](https://github.com/rpamis/comet) | 2,928 | 5 | Source + test/eval definitions; not run | Retained | Named eval treatments, package snapshots, and explicit reliability estimators |
| [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) | 404 | 5 | Source + test/eval definitions; not run | Retained | Tiered evaluation, trusted negative-control evidence, and runtime isolation tests |
| [langchain-ai/skills-benchmarks](https://github.com/langchain-ai/skills-benchmarks) | 116 | 5 | Source + test/eval definitions; not run | Retained | No-skill and multi-skill treatment definitions; packaging and interference experiments |

Other skill packs and authoring forks remain context-only leads unless they
change a specific authoring decision. Robotics and unrelated domain benchmarks
were excluded from the general-authoring shortlist. All candidate decisions,
including those exclusions, are retained rather than silently discarded.

## Existing-source changes

| Source | Observed change | Action |
|---|---|---|
| Matt Pocock skills | Removed sampled `writing-great-skills` path; current README routes to `writing-for-agents` | Replace the active sampled path; retain historical receipt; teach branch-specific pointers |
| gstack | September release documents background-dispatch default regression and recovery | Add host-specific execution, timeout, result, and mutation-owner checks |
| Superpowers | Current release notes expand supported hosts | Preserve versioned host-support boundary; avoid copying mandatory process globally |
| Gemini Skills | README changed, including package/install surface | Refresh its sampled receipt; treat evaluation prose as upstream claims |
| OpenAI and Anthropic authoring | Four prior samples, including SkillsBench README, retain identical content hashes | Record unchanged samples honestly; do not invent Markdown changes from HEAD movement |
| Other tracked sources | Current HEAD checked for every entry | Mark revision-only review where no file was sampled; no whole-repo review claim |

Canonical redirects: `sickn33/antigravity-awesome-skills` →
`sickn33/agentic-awesome-skills`; `affaan-m/everything-claude-code` →
`affaan-m/ECC`; `block/goose` → `aaif-goose/goose`;
`safishamsi/graphify` → `Graphify-Labs/graphify`;
`santifer/career-ops` → `career-ops-hq/career-ops`;
`qualcomm/nexa-sdk` → `qualcomm/GenieX`.

The `everything-claude-code` and `affaan-m-ecc` IDs intentionally remain as
historical aliases of one repository. They are not independent evidence.

## Adopted learnings

1. Inspect the selected skill's whole execution surface, applicable license, and
   scanner completeness. Zero findings with incomplete coverage is not safety proof.
2. Preserve the prior lock; separate changed HEADs, sampled files, and package hashes.
3. Give disclosed references distinct trigger conditions; keep shared invariants reachable.
4. Separate retrieval relevance, observed activation, task outcomes, and package effects.
5. Treat a set used to select the best description as validation; reserve an untouched holdout.
6. Keep unknown telemetry, runtime failure, missing metrics, and answer leakage explicit.
7. Give authorized delegated work host-specific completion and recovery contracts.

See [the synthesis](../research/skill-evolution-2026-09.md),
[skill supply chain](../concepts/skill-supply-chain.md), and
[retrieval and interference](../concepts/retrieval-and-interference.md).

## Evidence and workspace preservation

The original checkout was already one commit ahead of fetched `origin/main`,
with a July observation and its index entry modified locally. Those changes were
preserved. No third-party source installer, hook, or live benchmark was executed.
Ignored clones were absent at intake; selected pinned file snapshots were rebuilt
as disposable caches. Existing `raw/docs/` captures were left unchanged.

The default lock script fetches directly from GitHub. This run used its exported
`buildLock` with frozen DeepAPI revision receipts and verified local file bytes,
following the configured research provider. All **154 repository entries and 43
artifacts resolve**, and the final lock's manifest hash matches. API rate-limit
reads were retried with throttling. Removed or guessed discovery paths were
resolved through current listings; none remain in the accepted artifact lock.

## Validation

The [health report](health-report-2026-09-05.md) records the final local checks.
Structural validation, executable harness unit tests, and link/provenance checks
are local evidence. The 16 new scenarios have no live host adapter execution in
this refresh; behavioral improvement remains unverified. Upstream test files
were inspected, not run. No push, publication, or shelf-wide installation was performed.

## Sources

- [Per-source coverage, candidates, and exact artifact URLs](../../raw/datasets/source-refresh-2026-09-05.json)
- [Source manifest](../../raw/repos/SOURCES.md)
- [Revision and artifact lock](../../raw/repos/SOURCES.lock.json)
- [Regression definitions](../../evals/authoring-refresh-cases.md)
