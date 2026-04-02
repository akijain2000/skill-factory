# Checklist Workflows

## What it is

**Checklist workflows** break complex work into **ordered, checkable steps** the agent can track—numbered lists, explicit gates, or markdown checkboxes. They implement Anthropic's guidance to use **workflows for complex tasks** and agentskills.io's pattern of **checklists for multi-step flows**.

## Why it matters

Long free-form prose invites skipped steps (no tests, no user confirmation). Checklists make omissions obvious in traces and align with how models follow structured instructions. They also map cleanly to human oversight ("stop if step 3 fails").

## How to do it

1. **Order matters**: put sequencing errors impossible (validate before deploy).
2. Keep each step **one action** or one decision point; split if it mixes concerns.
3. Add **explicit outputs** per step ("echo branch name", "write plan to STDOUT") where gstack-style preamble shows value.
4. For branches (React vs Vue), use **conditional** sub-checklists (antigravity anatomy pattern).
5. Pair checklists with **validation loops** for quality-critical phases.

## Good example

`winui-app` uses a **Required Flow** with 20 numbered rules—from task classification through packaging defaults, template recovery, build+launch verification, and design constraints—so the agent cannot "finish" without addressing launch proof. Source: `raw/repos/openai-skills/skills/.curated/winui-app/SKILL.md`.

## Bad example

A heading labeled "Checklist" with empty bullets underneath—structure without content. Empty sections after headings are listed as a top validation mistake: they look organized but teach nothing and waste tokens. Source: `raw/docs/skill-validation-7-mistakes.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/repos/openai-skills/skills/.curated/winui-app/SKILL.md`
- `raw/repos/antigravity-awesome-skills/docs/contributors/skill-anatomy.md`
- `raw/docs/skill-validation-7-mistakes.md`
