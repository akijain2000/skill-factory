# Anti-Rationalization

## What it is

**Anti-rationalization** is a family of techniques that block agents (and humans) from substituting plausible stories for verified behavior. Two concrete mechanisms stand out in high-signal corpora: **rationalization tables**—two-column “excuse vs reality” matrices—and **XML guard tags** such as `<EXTREMELY-IMPORTANT>` blocks that visually scaffold non-negotiable rules. These pair naturally with **Claude Search Optimization (CSO)** discipline for skill metadata.

## Why it matters

Agents optimize for fluency. Without friction, they compress multi-step workflows into single steps, skip checks, and treat confidence as evidence. Test-backed work on the **superpowers** plugin showed a separate failure mode: if the YAML `description` **summarizes the skill’s workflow**, the model may follow that summary and **skip the SKILL.md body**—for example collapsing a two-stage review into one because the description mentioned “code review between tasks.” Rationalization tables and guard tags increase the cost of “just this once” shortcuts by naming the excuse and the required counter-action in one glance.

## How to do it

1. **CSO-safe descriptions:** Put **only activation** in `description` (when to load the skill). Keep procedural “what” inside the body, not the frontmatter summary.
2. **Rationalization tables:** For each common shortcut (“This is just a simple question”), pair it with a corrective line (“Questions are tasks—check for skills first”).
3. **Guard tags:** Use consistent, rare XML-style wrappers for rules that must not be paraphrased away; keep them short and scannable.
4. **Combine with gates:** Tables work best next to an explicit ordered gate (identify proof → run → read output → then claim).

## Good example

The **verification-before-completion** skill in superpowers combines a stated iron law, a stepwise gate function, and a rationalization-prevention table mapping excuses to required behavior. Source: `raw/repos/superpowers/skills/verification-before-completion/SKILL.md`.

## Bad example

A `description` that says “Runs tests between subagent tasks and performs code review after each task” encodes workflow in discovery text; under CSO-style behavior the agent may never read the body’s two-stage rules. Prefer: “Use when dispatching subagents for multi-step implementation” plus full procedure in the body.

## Sources

- `raw/repos/superpowers/skills/verification-before-completion/SKILL.md`
- `raw/repos/superpowers/README.md`
