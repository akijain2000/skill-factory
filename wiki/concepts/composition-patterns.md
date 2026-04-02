# Composition Patterns

## What it is

**Composition patterns** assemble small units into reliable end-to-end behavior: **runtime stacking** (strategy + context + pattern selected at invoke time, not pasted into one blob), **subagent choreography** (fresh subagent per task, staged reviews, controller supplying full task text so subagents skip fragile file reads), **deterministic + LLM phases** (shell for facts, subagents for judgment in bounded batches), and **template tokens** (`{{input}}`, `{{lang_code}}`) so shared scaffolds stay DRY.

## Why it matters

Monolithic prompts fight maintenance and discovery. Separating **what to do** (named pattern), **what we know** (context), and **how to say it** (template) matches how Fabric and similar libraries ship hundreds of variants. Orchestration patterns from superpowers and ECC show that **who reads what** matters as much as wording—wrong subagent file access or a description that substitutes for the body collapses multi-phase workflows.

## How to do it

1. **Stack at runtime:** Resolve pattern name + inject parameters + attach context; avoid duplicating full pattern text inside every skill.
2. **Choreograph subagents:** One task per fresh context; separate passes for spec compliance vs code quality when needed; paste authoritative task text from the controller.
3. **Script then judge:** Emit inventories and diffs with deterministic tools; only then ask the model for batch verdicts.
4. **Tokenize parameters:** Use explicit placeholders in templates; document required vs optional slots.
5. **Keep discovery thin:** Ensure stacked content does not duplicate workflow summaries into YAML descriptions (see CSO in `description-writing.md`).

## Good example

Fabric’s pattern folders and CLI composition; superpowers’ subagent-driven development and verification gates; ECC’s batch meta-evaluations over skill lists. Sources: `raw/repos/fabric/data/patterns/`, `raw/repos/superpowers/skills/`, `raw/repos/everything-claude-code/`.

## Bad example

Copy-pasting the same 80-line scaffold into fifteen skills with manual find-replace—drifts immediately and breaks token budgets.

## Sources

- `raw/repos/fabric/README.md`, `raw/repos/fabric/data/patterns/`
- `raw/repos/superpowers/skills/subagent-driven-development/SKILL.md` (orchestration reference)
- `raw/repos/everything-claude-code/README.md`
- `wiki/concepts/template-patterns.md`
