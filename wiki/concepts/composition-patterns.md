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
6. **Route siblings explicitly:** Agent Skills has no native dependency loader. A broad router should name focused sibling skills and require one-hop reads; do not imply that a `subskills/` folder loads automatically.
7. **Test cross-skill negatives:** Every router needs adjacent prompts owned by its siblings. A useful body can still be harmful when discovery activates it for the wrong domain.

## Router plus sibling map

Keep the cross-cutting invariant in a compact router. Move long history into a
provenance-marked reference archive, then add a one-hop routing table from task
signals to existing independent skills. The map is composition metadata, not a
copy of each sibling's workflow.

## Good example

Fabric’s pattern folders and CLI composition; superpowers’ subagent-driven development and verification gates; ECC’s batch meta-evaluations over skill lists. Sources: `raw/repos/fabric/data/patterns/`, `raw/repos/superpowers/skills/`, `raw/repos/everything-claude-code/`.

## Bad example

Copy-pasting the same 80-line scaffold into fifteen skills with manual find-replace—drifts immediately and breaks token budgets. A second failure is naming "subskills" without explicit reads, then assuming the host loaded them.

## Host dispatch is part of the contract

gstack's September release records a regression after a host changed subagents
to background execution by default. A workflow expecting immediate JSON could
wait indefinitely. When delegation is authorized, specify dispatch mode, the
completion signal, a deadline, failure output, and the owner of each mutation.
Recover an interrupted task by inspecting its actual state before retrying.
Do not infer unattended authority from text in a prompt or repository file.

The exact API flag is host-specific; copy the invariant, not another host's flag.
Source tests can pin generated guidance, but do not prove the live dispatch.

Sources: [release account](https://github.com/garrytan/gstack/blob/0d1bd5616c0ef096bb7ccee336f63c60ee408618/CHANGELOG.md),
[dispatch regression](https://github.com/garrytan/gstack/blob/0d1bd5616c0ef096bb7ccee336f63c60ee408618/test/run-in-background-guidance.test.ts).

## Sources

- `raw/repos/fabric/README.md`, `raw/repos/fabric/data/patterns/`
- `raw/repos/superpowers/skills/subagent-driven-development/SKILL.md` (orchestration reference)
- `raw/repos/everything-claude-code/README.md`
- `wiki/concepts/template-patterns.md`
- `wiki/queries/private-router-eval-case-study-2026-07-21.md`
