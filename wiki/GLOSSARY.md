# Glossary

## A

**Ablation (skill)** -- Controlled comparison of the same task, model, harness, fixtures, and limits with the skill enabled and absent. See [Skill Evaluations](concepts/skill-evaluations.md).

**Activation** -- Phase when the full SKILL.md body loads after a task matches discovery metadata. See [Progressive Disclosure](concepts/progressive-disclosure.md).

**AdaRubric** -- A task-adaptive evaluation framework (arXiv:2603.21362, 2026) that generates domain-specific rubrics for scoring LLM agent trajectories; applicable to evaluating skill-agent combinations where fixed rubrics miss domain-specific quality dimensions. See [Agent Factory wiki](https://github.com/akijain2000/agent-factory/blob/main/wiki/research/adarubric-evaluation.md).

**agents/openai.yaml** -- Codex UI companion file with display name, short description, default prompt. See [Host Differences](research/host-differences.md), [OpenAI Skills Analysis](research/openai-skills-analysis.md).

**agentskills.io** -- Open Agent Skills specification baseline for portable skill folders. See [Spec Reference](research/spec-reference.md).

**AGENTS.md** -- Always-on project instruction document chain (e.g. merged root→cwd with byte caps on some hosts). See [Host Differences](research/host-differences.md), [.cursorrules vs SKILL.md](research/cursorrules-vs-skills.md).

**Allowed-tools** -- Optional experimental frontmatter field: space-delimited tool pre-approval list. See [Spec Reference](research/spec-reference.md), [Host Compatibility](concepts/host-compatibility.md).

**assets/** -- Optional skill folder for static templates, schemas, or files copied into deliverables. See [Spec Reference](research/spec-reference.md), [Template Patterns](concepts/template-patterns.md).

## B

**Behavioral PASS** -- A frozen, repeated skill-versus-baseline run met its declared routing, outcome, delta, and reliability gates. It does not imply production/provider proof. See [Skill Evaluations](concepts/skill-evaluations.md), [Skill Evidence Lifecycle](concepts/evidence-lifecycle.md).

## C

**Capability skill** -- Skill that supplies knowledge or procedure the base model cannot perform consistently; a candidate for evidence-based retirement when the baseline catches up. See [Skill Evaluations](concepts/skill-evaluations.md).

**Checklist workflow** -- Ordered numbered or checkbox steps the agent follows through multi-phase work. See [Checklist Workflows](concepts/checklist-workflows.md).

**Checkpoint (eval)** -- Append-only normalized per-run state used to resume an interrupted suite under unchanged fingerprints. It is not a raw model trajectory. See [Skill Evidence Lifecycle](concepts/evidence-lifecycle.md).

**CLASSic Framework** -- A five-dimensional operational evaluation framework (Zylos Research, 2026) measuring agent production-readiness across Cost, Latency, Accuracy, Stability, and Security; useful for evaluating skill-agent combinations beyond structural quality. See [Agent Factory wiki](https://github.com/akijain2000/agent-factory/blob/main/wiki/research/classic-framework.md).

**Coherent units** -- One clear mission per skill; split competing goals into separate skills. See [Skill Discovery](concepts/skill-discovery.md), [Anatomy of a Good Skill](research/anatomy-of-a-good-skill.md).

**Codex** -- OpenAI coding agent host with explicit vs implicit skill invocation. See [Skill Discovery](concepts/skill-discovery.md), [Host Differences](research/host-differences.md).

**Compatibility** -- Optional frontmatter string (≤500 chars) describing environment or OS needs. See [Spec Reference](research/spec-reference.md), [Host Compatibility](concepts/host-compatibility.md).

**Cursor Rules** -- Modern Cursor project rules alongside legacy `.cursorrules`. See [Host Differences](research/host-differences.md).

**Cursorrules** -- Legacy `.cursorrules` file: usually always-on editor guidance without skill frontmatter. See [.cursorrules vs SKILL.md](research/cursorrules-vs-skills.md).

## D

**Degrees of freedom** -- How strictly the skill constrains the model (high vs medium vs low) for the task’s fragility. See [Degrees of Freedom](concepts/degrees-of-freedom.md).

**Description** -- Required YAML field (1–1024 chars): WHAT, WHEN, keywords; typically third person. See [Description Writing](concepts/description-writing.md), [Spec Reference](research/spec-reference.md).

**Discovery (phase)** -- Loads only skill `name` and `description` before full body load. See [Progressive Disclosure](concepts/progressive-disclosure.md), [Skill Discovery](concepts/skill-discovery.md).

**Diagnostic evidence** -- Interrupted, contaminated, or superseded run data retained to explain a failure but explicitly excluded from accepted aggregate scoring. See [Skill Evidence Lifecycle](concepts/evidence-lifecycle.md).

## E

**Evidence fingerprint** -- Compatible hashes for evaluator, suite, complete skill directory, and adapter command/content, paired with model and host runtime identity. Resume and regression comparison fail closed on mismatch. See [Skill Evidence Lifecycle](concepts/evidence-lifecycle.md).

**Evidence lifecycle** -- Placement contract separating raw research, active instructions, historical references, eval definitions, checkpoints, reports, and operational proof. See [Skill Evidence Lifecycle](concepts/evidence-lifecycle.md).

**Execution (phase)** -- Loads `references/`, `scripts/`, and `assets/` only when instructions say to. See [Progressive Disclosure](concepts/progressive-disclosure.md).

**Explicit invocation** -- User names the skill; contrast with implicit routing from description. See [Skill Discovery](concepts/skill-discovery.md), [Host Differences](research/host-differences.md).

## F

**Feedback loop (authoring)** -- Iterating SKILL.md using real task runs, traces, and author vs executor sessions. See [Feedback Loops](concepts/feedback-loops.md).

**Frontmatter** -- YAML block atop SKILL.md with required `name` and `description` plus optional fields. See [Spec Reference](research/spec-reference.md).

## G

**gen-skill-docs** -- gstack TypeScript generator that expands `SKILL.md.tmpl` into committed SKILL.md. See [gstack Deep Dive](research/gstack-deep-dive.md).

**Gotchas** -- Environment- or stack-specific facts that correct wrong default assumptions cheaply. See [Gotchas Sections](concepts/gotchas-sections.md).

## H

**Hooks** -- Claude Code frontmatter feature for lifecycle interception (e.g. safety). See [Host Differences](research/host-differences.md).

## I

**Implicit invocation** -- Host auto-selects a skill when the description matches the user task. See [Skill Discovery](concepts/skill-discovery.md), [Host Differences](research/host-differences.md).

## M

**Metadata** -- Optional frontmatter key-value map; hosts may define sub-keys (e.g. short-description). See [Spec Reference](research/spec-reference.md), [Anatomy of a Good Skill](research/anatomy-of-a-good-skill.md).

**Meta-skill** -- Skill that teaches authoring or validation (e.g. skill-creator) as executable guidance. See [OpenAI Skills Analysis](research/openai-skills-analysis.md).

**MCP scope** -- Where a tool server is made available: user, project, or subagent. Newer agent systems use scope to avoid giving every workflow every tool. See [Skill Evolution 2026-05](research/skill-evolution-2026-05.md), [Host Compatibility](concepts/host-compatibility.md).

**Memory** -- Dynamic user, project, or local facts that evolve over time; a sibling to skills rather than a replacement. Stable procedure belongs in SKILL.md, changing facts belong in memory. See [Skill Evolution 2026-05](research/skill-evolution-2026-05.md), [Feedback Loops](concepts/feedback-loops.md).

## N

**Naming (skill)** -- Lowercase letters, digits, hyphens; 1–64 chars; must match parent directory name. See [Naming Conventions](concepts/naming-conventions.md), [Spec Reference](research/spec-reference.md).

## O

**One-level references** -- SKILL.md links directly to a reference file; avoid A→B→C chains. See [Progressive Disclosure](concepts/progressive-disclosure.md), [Anti-Patterns](research/anti-patterns.md).

## P

**Plan-validate-execute** -- Emit a plan, validate against truth or policy, then execute destructive or batch steps. See [Plan, Validate, Execute](concepts/plan-validate-execute.md).

**Preamble-tier** -- gstack frontmatter (1–4) controlling how much shared preamble is injected. See [gstack Deep Dive](research/gstack-deep-dive.md), [Landscape](research/landscape.md).

**Preference skill** -- Skill that protects organization-specific policy, style, or workflow rather than a temporary model capability gap. See [Skill Evaluations](concepts/skill-evaluations.md).

**Progressive disclosure** -- Three-phase model: discovery metadata, activation body, execution-time assets. See [Progressive Disclosure](concepts/progressive-disclosure.md).

**program.md** -- autoresearch-style single Markdown “agent contract” outside SKILL.md discovery. See [Landscape](research/landscape.md).

**Prompt decomposer** -- Meta-skill that analyzes a large prompt or instruction set, identifies sections extractable as standalone skills, and routes approved candidates to the Skill Maker. See [Meta-Skills](concepts/meta-skills.md).

## Q

**quick_validate.py** -- OpenAI skill-creator script that fails fast with specific SKILL.md and frontmatter errors. See [Error Handling in Scripts](concepts/error-handling-in-scripts.md), [Host Compatibility](concepts/host-compatibility.md).

## R

**references/** -- Optional folder for long docs loaded only when SKILL.md instructs. See [Spec Reference](research/spec-reference.md).

**Reserved names** -- Tokens such as `claude`, `mcp`, `skill` to avoid in skill names per guidance. See [Naming Conventions](concepts/naming-conventions.md), [Anti-Patterns](research/anti-patterns.md).

**Routing index** -- Table mapping request types to which reference files to open. See [Progressive Disclosure](concepts/progressive-disclosure.md).

**Repo discovery loop** -- Authoring-time workflow that searches rankings and curated repos, scores high-signal sources, clones approved repos into `raw/repos/`, and distills reusable patterns into the wiki before writing or revising skills. See [Skill Discovery](concepts/skill-discovery.md), [Repo Discovery Loop](research/repo-discovery-loop.md).

## S

**Sandbox escalation** -- Raised permissions for specific commands (e.g. network deploy) where hosts support it. See [OpenAI Skills Analysis](research/openai-skills-analysis.md), [Gotchas Sections](concepts/gotchas-sections.md).

**scripts/** -- Optional folder for bundled, self-contained helpers with clear errors and exit codes. See [Error Handling in Scripts](concepts/error-handling-in-scripts.md), [Spec Reference](research/spec-reference.md).

**SKILL.md** -- Required markdown instruction file with YAML frontmatter in each skill directory. See [Spec Reference](research/spec-reference.md).

**Skill-agent composition** -- Pattern where a subagent preloads one or more skills plus a scoped tool set, memory, turn limit, and execution prompt. Use when a workflow needs a clean context or role-specific executor. See [Composition Patterns](concepts/composition-patterns.md), [Skill Evolution 2026-05](research/skill-evolution-2026-05.md).

**Skill evaluation** -- Repeated, isolated measurement of routing and outcomes with and without a skill. Static SKILL.md lint is not behavioral evaluation. See [Skill Evaluations](concepts/skill-evaluations.md).

**Sibling skill** -- Independent focused skill explicitly selected by a router. Agent Skills has no native automatic subskill dependency loading. See [Composition Patterns](concepts/composition-patterns.md), [Skill Evidence Lifecycle](concepts/evidence-lifecycle.md).

**Source lock** -- Durable record of a repository revision and exact sampled artifact hashes used for authoring decisions. It is provenance, not behavioral proof. See [Source provenance lock observation](queries/observation-20260721-source-provenance-lock.md).

**Structural validation** -- Static checks for skill shape, metadata, size, links, and anti-patterns. Structural PASS does not imply an eval definition exists, ran, or passed. See [Validation Loops](concepts/validation-loops.md), [Skill Evaluations](concepts/skill-evaluations.md).

**SKILL.md.tmpl** -- gstack template source merged with placeholders before generation. See [gstack Deep Dive](research/gstack-deep-dive.md).

**Stop conditions** -- When to end validation loops or escalate (max iterations, user gate). See [Validation Loops](concepts/validation-loops.md), [Anatomy of a Good Skill](research/anatomy-of-a-good-skill.md).

## T

**Table of contents** -- Recommended at top of SKILL.md when the body exceeds ~100 lines. See [Progressive Disclosure](concepts/progressive-disclosure.md), [Anti-Patterns](research/anti-patterns.md).

**Template pattern** -- Explicit output skeleton (markdown, JSON, report sections) plus examples. See [Template Patterns](concepts/template-patterns.md).

**Third person** -- Preferred voice for descriptions so injected context reads correctly. See [Description Writing](concepts/description-writing.md).

**Token budget** -- Deliberate sizing of description, body, and references against shared context limits. See [Token Budget](concepts/token-budget.md).

## V

**Validation loop** -- Pattern: perform work, run a validator, fix, repeat until success or bound. See [Validation Loops](concepts/validation-loops.md).

## W

**WHAT + WHEN** -- Description must state the action (verb) and concrete trigger phrases. See [Description Writing](concepts/description-writing.md), [Anatomy of a Good Skill](research/anatomy-of-a-good-skill.md).
