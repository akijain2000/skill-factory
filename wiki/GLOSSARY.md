# Glossary

## A

**Activation** -- Phase when the full SKILL.md body loads after a task matches discovery metadata. See [Progressive Disclosure](concepts/progressive-disclosure.md).

**agents/openai.yaml** -- Codex UI companion file with display name, short description, default prompt. See [Host Differences](research/host-differences.md), [OpenAI Skills Analysis](research/openai-skills-analysis.md).

**agentskills.io** -- Open Agent Skills specification baseline for portable skill folders. See [Spec Reference](research/spec-reference.md).

**AGENTS.md** -- Always-on project instruction document chain (e.g. merged root→cwd with byte caps on some hosts). See [Host Differences](research/host-differences.md), [.cursorrules vs SKILL.md](research/cursorrules-vs-skills.md).

**Allowed-tools** -- Optional experimental frontmatter field: space-delimited tool pre-approval list. See [Spec Reference](research/spec-reference.md), [Host Compatibility](concepts/host-compatibility.md).

**assets/** -- Optional skill folder for static templates, schemas, or files copied into deliverables. See [Spec Reference](research/spec-reference.md), [Template Patterns](concepts/template-patterns.md).

## C

**Checklist workflow** -- Ordered numbered or checkbox steps the agent follows through multi-phase work. See [Checklist Workflows](concepts/checklist-workflows.md).

**Coherent units** -- One clear mission per skill; split competing goals into separate skills. See [Skill Discovery](concepts/skill-discovery.md), [Anatomy of a Good Skill](research/anatomy-of-a-good-skill.md).

**Codex** -- OpenAI coding agent host with explicit vs implicit skill invocation. See [Skill Discovery](concepts/skill-discovery.md), [Host Differences](research/host-differences.md).

**Compatibility** -- Optional frontmatter string (≤500 chars) describing environment or OS needs. See [Spec Reference](research/spec-reference.md), [Host Compatibility](concepts/host-compatibility.md).

**Cursor Rules** -- Modern Cursor project rules alongside legacy `.cursorrules`. See [Host Differences](research/host-differences.md).

**Cursorrules** -- Legacy `.cursorrules` file: usually always-on editor guidance without skill frontmatter. See [.cursorrules vs SKILL.md](research/cursorrules-vs-skills.md).

## D

**Degrees of freedom** -- How strictly the skill constrains the model (high vs medium vs low) for the task’s fragility. See [Degrees of Freedom](concepts/degrees-of-freedom.md).

**Description** -- Required YAML field (1–1024 chars): WHAT, WHEN, keywords; typically third person. See [Description Writing](concepts/description-writing.md), [Spec Reference](research/spec-reference.md).

**Discovery (phase)** -- Loads only skill `name` and `description` before full body load. See [Progressive Disclosure](concepts/progressive-disclosure.md), [Skill Discovery](concepts/skill-discovery.md).

## E

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

## N

**Naming (skill)** -- Lowercase letters, digits, hyphens; 1–64 chars; must match parent directory name. See [Naming Conventions](concepts/naming-conventions.md), [Spec Reference](research/spec-reference.md).

## O

**One-level references** -- SKILL.md links directly to a reference file; avoid A→B→C chains. See [Progressive Disclosure](concepts/progressive-disclosure.md), [Anti-Patterns](research/anti-patterns.md).

## P

**Plan-validate-execute** -- Emit a plan, validate against truth or policy, then execute destructive or batch steps. See [Plan, Validate, Execute](concepts/plan-validate-execute.md).

**Preamble-tier** -- gstack frontmatter (1–4) controlling how much shared preamble is injected. See [gstack Deep Dive](research/gstack-deep-dive.md), [Landscape](research/landscape.md).

**Progressive disclosure** -- Three-phase model: discovery metadata, activation body, execution-time assets. See [Progressive Disclosure](concepts/progressive-disclosure.md).

**program.md** -- autoresearch-style single Markdown “agent contract” outside SKILL.md discovery. See [Landscape](research/landscape.md).

## Q

**quick_validate.py** -- OpenAI skill-creator script that fails fast with specific SKILL.md and frontmatter errors. See [Error Handling in Scripts](concepts/error-handling-in-scripts.md), [Host Compatibility](concepts/host-compatibility.md).

## R

**references/** -- Optional folder for long docs loaded only when SKILL.md instructs. See [Spec Reference](research/spec-reference.md).

**Reserved names** -- Tokens such as `claude`, `mcp`, `skill` to avoid in skill names per guidance. See [Naming Conventions](concepts/naming-conventions.md), [Anti-Patterns](research/anti-patterns.md).

**Routing index** -- Table mapping request types to which reference files to open. See [Progressive Disclosure](concepts/progressive-disclosure.md).

## S

**Sandbox escalation** -- Raised permissions for specific commands (e.g. network deploy) where hosts support it. See [OpenAI Skills Analysis](research/openai-skills-analysis.md), [Gotchas Sections](concepts/gotchas-sections.md).

**scripts/** -- Optional folder for bundled, self-contained helpers with clear errors and exit codes. See [Error Handling in Scripts](concepts/error-handling-in-scripts.md), [Spec Reference](research/spec-reference.md).

**SKILL.md** -- Required markdown instruction file with YAML frontmatter in each skill directory. See [Spec Reference](research/spec-reference.md).

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
