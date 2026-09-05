# Skill Factory Wiki Index

Last compiled: 2026-09-05

## Concepts (core patterns for skill authoring)

- [Anti-Rationalization](concepts/anti-rationalization.md) -- CSO-related failure modes, rationalization tables, XML guard tags.
- [Checklist Workflows](concepts/checklist-workflows.md) -- Ordered, checkable steps so agents track complex multi-phase work.
- [Composition Patterns](concepts/composition-patterns.md) -- Runtime stacking, subagent choreography, deterministic+LLM phases, template tokens.
- [Degrees of Freedom](concepts/degrees-of-freedom.md) -- Match instruction tightness to task fragility (narrow bridge vs open field).
- [Description Writing](concepts/description-writing.md) -- Discovery frontmatter; CSO: procedural detail stays in body, not YAML summaries.
- [Error Handling in Scripts](concepts/error-handling-in-scripts.md) -- Bundled scripts validate inputs, surface clear errors, exit meaningfully.
- [Skill Evidence Lifecycle](concepts/evidence-lifecycle.md) -- Placement, privacy, fingerprints, checkpoint retention, and proof boundaries for skill data.
- [Feedback Loops](concepts/feedback-loops.md) -- Refine skills using real runs, traces, and evaluation baselines.
- [Gotchas Sections](concepts/gotchas-sections.md) -- Environment facts that break defaults; high value per token.
- [Host Compatibility](concepts/host-compatibility.md) -- SKILL.md across hosts plus MCP, A2A, Codex, and goose context.
- [Instinct Model](concepts/instinct-model.md) -- Sub-skill YAML units with confidence and scope; promotion path to full skills.
- [Meta-Skills](concepts/meta-skills.md) -- Skills about skills: stocktake, rules distillation, compliance, create_pattern.
- [Naming Conventions](concepts/naming-conventions.md) -- Folder and `name:` must match spec; hyphens; avoid reserved tokens.
- [Plan, Validate, Execute](concepts/plan-validate-execute.md) -- Plan artifact, validate, then run batch or destructive work.
- [Progressive Disclosure](concepts/progressive-disclosure.md) -- Discovery, activation, then on-demand references and scripts.
- [Skill Discovery](concepts/skill-discovery.md) -- Runtime skill routing plus authoring-time repo discovery for stronger skills.
- [Skill Evaluations](concepts/skill-evaluations.md) -- Positive/negative routing, isolated repeated trials, skill-vs-baseline ablation, regression, and retirement.
- [Template Patterns](concepts/template-patterns.md) -- Fixed output shapes, Fabric headings, tokens, explicit output contracts.
- [Token Budget](concepts/token-budget.md) -- Shared context; instincts and micro-skills as right-sizing examples.
- [Skill Categories](concepts/skill-categories.md) -- Anthropic's nine skill types: Library, Verification, Data, Business, Scaffolding, Quality, CI/CD, Runbooks, Infra.
- [Implementation Patterns](concepts/implementation-patterns.md) -- Five recurring workflow patterns: Sequential, Multi-MCP, Iterative, Context-Aware, Domain-Specific.
- [Validation Loops](concepts/validation-loops.md) -- Task validate-fix loops plus library-scale stocktake and compliance measurement.

- [Skill Supply Chain](concepts/skill-supply-chain.md) -- Source identity, licensing, whole-bundle inspection, package hashes, and incomplete-scan evidence.
- [Retrieval and Interference](concepts/retrieval-and-interference.md) -- Ranking, activation, outcomes, and isolated versus shelf/package experiments.

## Research (ecosystem analysis)

- [Anatomy of a Good Skill](research/anatomy-of-a-good-skill.md) -- Checklist of structural patterns strong skills share across corpora.
- [Anti-Patterns](research/anti-patterns.md) -- Catalog of mistakes with symptoms, examples, and fixes.
- [.cursorrules vs SKILL.md](research/cursorrules-vs-skills.md) -- Contrasts always-on editor rules with on-demand skill packs.
- [gstack Deep Dive](research/gstack-deep-dive.md) -- Templates, gen-skill-docs, placeholders, and committed SKILL.md output.
- [Host Differences](research/host-differences.md) -- Where project docs, skills, and rules load and merge per host.
- [Landscape](research/landscape.md) -- Current source-corpus map: formats, scale, MCP/A2A context, strengths, trade-offs.
- [OpenAI Skills Analysis](research/openai-skills-analysis.md) -- Patterns from openai/skills system and curated layers.
- [Repo Discovery Loop](research/repo-discovery-loop.md) -- How to search, score, clone, and distill external repos into better skills.
- [Skill Evolution 2026-05](research/skill-evolution-2026-05.md) -- 100-repo expansion findings: skills now compose with agents, memory, MCP, hooks, commands, and verification.
- [Spec Reference](research/spec-reference.md) -- agentskills.io distilled: layout, frontmatter, constraints as lint target.
- [Tool Design Evolution](research/tool-design-evolution.md) -- How Anthropic iterated on AskUserQuestion, TodoWrite, search, and progressive disclosure.

- [Skill Evolution 2026-09](research/skill-evolution-2026-09.md) -- Seven retained sources and concrete source, security, retrieval, dispatch, and evaluation lessons.

## Examples

Good:

- [verification-before-completion (superpowers)](examples/good/verification-before-completion-superpowers.md) -- Iron law, gate function, rationalization table; upstream obra/superpowers.
- [grill-me micro-skill](examples/good/grill-me-micro-skill.md) -- Minimum viable body; mattpocock/skills.
- [verification-before-completion (antigravity fork)](examples/good/verification-before-completion.md) -- Community copy of the same behavioral pattern.
- [writing-plans](examples/good/writing-plans.md) -- Bite-sized tasks, plan header template, execution handoff.
- [freeze](examples/good/freeze.md) -- gstack-style scoped edits.
- [gh-fix-ci](examples/good/gh-fix-ci.md) -- Curated narrow workflow skill.
- [openai-docs](examples/good/openai-docs.md) -- MCP-forward documentation skill.
- [repo-discovery-loop](examples/good/repo-discovery-loop.md) -- Annotated good workflow for turning repo search into wiki-backed skill improvements.

Bad (anti-patterns):

- [task-intelligence](examples/bad/task-intelligence.md) -- Fictional orchestrator dependencies, missing bundled assets, and vague multilingual triggers.
- [ui-skills](examples/bad/ui-skills.md) -- Circular abstract prose with no portable procedure or concrete discovery boundary.
- [workflow-automation](examples/bad/workflow-automation.md) -- Persona description, label-only patterns, and broken template-table content.
- [yann-lecun](examples/bad/yann-lecun.md) -- Oversized biography/persona dump that spends context without operational value.

## Queries (filed Q&A outputs)

- [Monthly update 2026-04](queries/monthly-update-2026-04.md) -- Ten-repo ingestion, concept tweaks, stats, article backlog.
- [Monthly update 2026-05](queries/monthly-update-2026-05.md) -- Top-GitHub scan, 377 candidate review, 26 focused sources, and 100 sparse expansion repos.
- [Repo discovery for better skills 2026-05-25](queries/repo-discovery-for-better-skills-2026-05-25.md) -- How GitHub/repo search becomes an authoring loop for improving SKILL.md quality.
- [Gap report: repo discovery pattern 2026-05-25](queries/gap-report-repo-discovery-pattern-2026-05-25.md) -- Documents the missing pattern and the files added to close it.
- [Eval checkpointing observation 2026-07-21](queries/observation-20260721-eval-checkpointing.md) -- Why long behavioral evals need privacy-safe per-run persistence, fingerprinted resume, and atomic reports.
- [Operational skill drift observation 2026-07-23](queries/observation-20260723-operational-skill-drift.md) -- Why plausible stale runbooks are control-plane vulnerabilities and need source contradiction plus negative behavior cases.
- [Source provenance lock observation 2026-07-21](queries/observation-20260721-source-provenance-lock.md) -- Separates disposable clones, repository revisions, sampled artifact hashes, and behavioral proof.
- [Anonymized private-shelf router eval case study 2026-07-21](queries/private-router-eval-case-study-2026-07-21.md) -- Strong outcome deltas still failed routing; documents isolation, checkpointing, activation telemetry, and evidence placement without identifying the source project.
- [Documentation refresh 2026-07-21](queries/documentation-refresh-2026-07-21.md) -- Complete 92-file Markdown review ledger, immutable raw boundary, new learnings, and validation contract.

- [Monthly update 2026-09](queries/monthly-update-2026-09.md) -- All-source revision census, 190 candidate records, seven additions, 43 samples, and applied learnings.
- [Health report 2026-09-05](queries/health-report-2026-09-05.md) -- Local structural/source-integrity checks, source lock integrity, index coverage, and explicit behavioral limits.

- [Documentation completion 2026-09-05](queries/documentation-completion-2026-09-05.md) -- Full repository Markdown review, evidence-tool hardening, and Atelier propagation with explicit behavioral limits.
