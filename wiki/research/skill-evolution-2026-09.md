# Skill Evolution: September 2026

Observation date: 2026-09-05. This is a focused source synthesis, not a benchmark
replication. The [coverage dataset](../../raw/datasets/source-refresh-2026-09-05.json)
records every source revision and the exact sampled artifacts.

## What changed in the corpus

All 147 previous source entries were checked against the July lock: 114 changed
revision, 33 did not. Six repository names redirected. Seven new sources bring
the manifest to 154 entries representing 153 distinct canonical repositories;
the two historical ECC IDs are retained for lineage, not counted as independent
evidence. The overall top-100 ranking and four bounded GitHub searches produced
190 distinct candidate records. Metadata screening is broader than artifact
inspection: 43 files across 15 sources were sampled, not all repository contents.

The useful change is better control of the boundary between source material,
installed skills, and evaluation evidence. New sources offer explicit security
coverage, package hashing, retrieval metrics, and runtime isolation tests.
Established sources also demonstrate why old metadata and operational defaults
cannot be assumed current.

## A repository change is not a skill change

The saved OpenAI authoring file, Anthropic authoring file and schema, and
SkillsBench README have unchanged sampled hashes even though their repositories
can advance. Gemini Skills' README changed. Matt Pocock's previously sampled
`writing-great-skills` path no longer resolves; the current README points to
`writing-for-agents`, whose scope includes skills and other agent-consumed docs.

This distinguishes three facts: the repository advanced, the selected file
changed, and the active package changed. Vercel's skills CLI has a regression
case where only a supporting script changes. Hashing the Markdown alone would
miss the update. Authors should preserve the old lock, compare exact paths at a
frozen revision, and fingerprint the complete operational package.

The renamed Matt Pocock guidance also sharpens progressive disclosure. A pointer
must encode when the agent should reach its target. Shared invariants belong on
every applicable execution path; branch-specific detail can remain outside the
main file. Weak pointers can cause inconsistent behavior even when the prose
behind them is correct. This changes how the authoring and decomposition skills
review references, without requiring a new folder hierarchy.

## Security inspection must report its coverage

NVIDIA SkillSpector inspects bundled execution surfaces and documents bounded
parsing, nested-artifact handling, and inspection ledgers. Its incomplete-analysis
contract prevents a partially inspected bundle from receiving the same decision
as a completed scan. The important authoring rule is not a particular scanner:
report what was inspected and what could not be inspected.

A source can include hooks, scripts, dependencies, nested files, and symlinks
outside the obvious `SKILL.md`. A valid frontmatter result does not cover those
surfaces. SkillCorpus adds another boundary: the corpus machinery's license and
the collected skills' licenses are separate. Record the applicable license and
revision before adapting or redistributing a skill. Source instructions remain
research data, not authority to execute setup or transmit local information.

## Retrieval needs its own measurements

SkillCorpus's matching layer implements ranking metrics such as MRR, Recall@k,
and full coverage. Its multi-source design deduplicates candidates and bounds
final selection. Those are retrieval properties, not proof of activation or task
completion. Its documented fail-open retrieval behavior also must not be copied
as a fail-open security decision; the two gates answer different questions.

LangChain's skill benchmark exposes both an empty `CONTROL` and a treatment with
13 production skills, alongside packaging variants and noise skills. A library
versus control experiment estimates a package effect. It cannot credit one skill
without further ablation. Skill Factory therefore keeps isolated zero/one-skill
tests as its base contract and documents a separate fixed-shelf experiment for
realistic interference. A larger catalog does not automatically justify loading
more of it into each task.

## Evaluation labels need operational definitions

The official Agent Skills optimization guide distinguishes training from
validation. Anthropic's description loop hides test scores from the improvement
model, but selects the winning iteration using `test_passed`. That set therefore
participates in model selection. An untouched final holdout is Skill Factory's
additional recommendation when claiming independent acceptance; this is an
inference from the observed selection procedure, not a claim that upstream
already implements a third split.

NVIDIA SkillEvaluator's tests provide useful negative examples: unreadable
activation telemetry remains unknown; spoofed reward evidence is replaced by
trusted trajectory evidence; runtime skill projections exclude evaluation
assets; missing metrics do not become zeros. These are inspected test definitions,
not an executed certification of SkillEvaluator or the local skill shelf.

Comet contributes explicit treatment and snapshot machinery and documented
reliability metrics. Its `pass^k` documentation describes an all-observed-runs-pass
indicator. That must be named as such rather than silently equated with another
estimator sharing the label. Authoring reports should publish formulas, trial
counts, conditions, and denominators before comparing results.

## Host defaults can invalidate a correct procedure

gstack's September changelog describes a host change that made subagents run in
the background by default. A parent expecting immediate JSON could stall. The
source now pins synchronous dispatch guidance and defines deadlines and recovery.
The transferable lesson is to specify dispatch semantics, completion evidence,
failure output, and mutation ownership for the actual host. The exact API flag is
not portable, and the presence of a source test is not live-host proof.

Superpowers' current release notes also demonstrate continued host expansion.
Treat platform support as a versioned claim. Do not inherit another project's
mandatory orchestration or approval behavior while adopting its useful patterns.

## What authors should do differently

- Review complete bundles and inspection coverage before adopting instructions.
- Preserve before/after source identity, including aliases and removed paths.
- Write branch-specific reference pointers with explicit completion criteria.
- Distinguish retrieval, activation, task outcomes, and package-level effects.
- Reserve final holdout evidence; retain unknown and failed states honestly.
- Specify host execution and recovery contracts for authorized delegation.

These changes are reflected in the four Skill Factory skills, the source-update
runbook, relevant concepts, Modules 10 and 12, and a development regression case
pack. Local static validation does not establish behavioral improvement. New
live-model trials and external publication remain separate evidence layers.

## Sources

- [Exact 43-file provenance and source coverage](../../raw/datasets/source-refresh-2026-09-05.json)
- [Current authoring pointers](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/productivity/writing-for-agents/SKILL.md)
- [Vercel package-hash regression](https://github.com/vercel-labs/skills/blob/435076e78988e1e6ec40d00b0b1d76bdbbc5419a/tests/root-level-lock-hash.test.ts)
- [SkillSpector bounds](https://github.com/NVIDIA/SkillSpector/blob/7805bb94843d91cb9937f57264ca52642164499b/docs/ANALYSIS_RESOURCE_BOUNDS.md)
- [SkillCorpus retrieval metrics](https://github.com/EverMind-AI/SkillCorpus/blob/2e8b8e5bca969a953f66ab14d2e91d8ad3d5a63b/skillcorpus/match/metrics.py)
- [LangChain treatments](https://github.com/langchain-ai/skills-benchmarks/blob/9195f8c296f7076152cf5c698d6abd4f84853eb9/treatments/common/main_skills.yaml)
- [Official optimization guide](https://github.com/agentskills/agentskills/blob/69ef37e9424c0a7ea9dd2293b559e43ec8176379/docs/skill-creation/optimizing-descriptions.mdx)
- [Anthropic selection loop](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/skill-creator/scripts/run_loop.py)
- [SkillEvaluator trusted invocation tests](https://github.com/NVIDIA/SkillEvaluator/blob/73b27dad60d3927e202ea6099ce79bb25053fd2b/tests/test_harbor_negative_control_evidence.py)
- [Comet evaluation definitions](https://github.com/rpamis/comet/blob/c1118e19d1fbce87706e4265ece17f50db21377e/eval/README.md)
- [gstack release account](https://github.com/garrytan/gstack/blob/0d1bd5616c0ef096bb7ccee336f63c60ee408618/CHANGELOG.md)
