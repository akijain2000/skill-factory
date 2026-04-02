# Skill Factory Wiki Index

Last compiled: 2026-04-02

## Concepts (core patterns for skill authoring)

- [Anti-Rationalization](concepts/anti-rationalization.md) -- CSO-related failure modes, rationalization tables, XML guard tags.
- [Checklist Workflows](concepts/checklist-workflows.md) -- Ordered, checkable steps so agents track complex multi-phase work.
- [Composition Patterns](concepts/composition-patterns.md) -- Runtime stacking, subagent choreography, deterministic+LLM phases, template tokens.
- [Degrees of Freedom](concepts/degrees-of-freedom.md) -- Match instruction tightness to task fragility (narrow bridge vs open field).
- [Description Writing](concepts/description-writing.md) -- Discovery frontmatter; CSO: procedural detail stays in body, not YAML summaries.
- [Error Handling in Scripts](concepts/error-handling-in-scripts.md) -- Bundled scripts validate inputs, surface clear errors, exit meaningfully.
- [Feedback Loops](concepts/feedback-loops.md) -- Refine skills using real runs, traces, and evaluation baselines.
- [Gotchas Sections](concepts/gotchas-sections.md) -- Environment facts that break defaults; high value per token.
- [Host Compatibility](concepts/host-compatibility.md) -- SKILL.md across hosts plus MCP, A2A, Codex, and goose context.
- [Instinct Model](concepts/instinct-model.md) -- Sub-skill YAML units with confidence and scope; promotion path to full skills.
- [Meta-Skills](concepts/meta-skills.md) -- Skills about skills: stocktake, rules distillation, compliance, create_pattern.
- [Naming Conventions](concepts/naming-conventions.md) -- Folder and `name:` must match spec; hyphens; avoid reserved tokens.
- [Plan, Validate, Execute](concepts/plan-validate-execute.md) -- Plan artifact, validate, then run batch or destructive work.
- [Progressive Disclosure](concepts/progressive-disclosure.md) -- Discovery, activation, then on-demand references and scripts.
- [Skill Discovery](concepts/skill-discovery.md) -- Host surfacing, meta-skill bootstraps, and description-first routing.
- [Template Patterns](concepts/template-patterns.md) -- Fixed output shapes, Fabric headings, tokens, explicit output contracts.
- [Token Budget](concepts/token-budget.md) -- Shared context; instincts and micro-skills as right-sizing examples.
- [Validation Loops](concepts/validation-loops.md) -- Task validate-fix loops plus library-scale stocktake and compliance measurement.

## Research (ecosystem analysis)

- [Anatomy of a Good Skill](research/anatomy-of-a-good-skill.md) -- Checklist of structural patterns strong skills share across corpora.
- [Anti-Patterns](research/anti-patterns.md) -- Catalog of mistakes with symptoms, examples, and fixes.
- [.cursorrules vs SKILL.md](research/cursorrules-vs-skills.md) -- Contrasts always-on editor rules with on-demand skill packs.
- [gstack Deep Dive](research/gstack-deep-dive.md) -- Templates, gen-skill-docs, placeholders, and committed SKILL.md output.
- [Host Differences](research/host-differences.md) -- Where project docs, skills, and rules load and merge per host.
- [Landscape](research/landscape.md) -- Seventeen repos: formats, scale, MCP/A2A context, strengths, trade-offs.
- [OpenAI Skills Analysis](research/openai-skills-analysis.md) -- Patterns from openai/skills system and curated layers.
- [Spec Reference](research/spec-reference.md) -- agentskills.io distilled: layout, frontmatter, constraints as lint target.

## Examples

Good:

- [verification-before-completion (superpowers)](examples/good/verification-before-completion-superpowers.md) -- Iron law, gate function, rationalization table; upstream obra/superpowers.
- [grill-me micro-skill](examples/good/grill-me-micro-skill.md) -- Minimum viable body; mattpocock/skills.
- [verification-before-completion (antigravity fork)](examples/good/verification-before-completion.md) -- Community copy of the same behavioral pattern.
- [writing-plans](examples/good/writing-plans.md) -- Bite-sized tasks, plan header template, execution handoff.
- [freeze](examples/good/freeze.md) -- gstack-style scoped edits.
- [gh-fix-ci](examples/good/gh-fix-ci.md) -- Curated narrow workflow skill.
- [openai-docs](examples/good/openai-docs.md) -- MCP-forward documentation skill.

Bad (anti-patterns):

- See `wiki/examples/bad/` (task-intelligence, ui-skills, workflow-automation, yann-lecun).

## Queries (filed Q&A outputs)

- [Monthly update 2026-04](queries/monthly-update-2026-04.md) -- Ten-repo ingestion, concept tweaks, stats, article backlog.
