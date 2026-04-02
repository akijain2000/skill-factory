# Degrees of Freedom

## What it is

**Degrees of freedom** means calibrating how tightly you instruct the agent: **high** freedom for open-ended judgment, **medium** for templated code with parameters, **low** for fragile sequences that must run exactly. Anthropic uses the metaphor of a **narrow bridge** (strict steps) versus an **open field** (guidance only).

## Why it matters

Over-constraining creative work feels robotic and fights context; under-constraining migrations or auth flows causes data loss. agentskills.io: **match specificity to fragility**; also **provide defaults, not menus**—too many equal options paralyze or randomize behavior.

## How to do it

1. Classify the task: **fragile** (prod deploy, schema migration) → low freedom, explicit order.
2. For **judgment** tasks (copy tone, architecture tradeoffs) → principles + examples, not 50-step scripts.
3. Use **pseudocode or parameterized scripts** in the middle ground (ETL with config flags).
4. Offer **one default path**; mention alternates briefly (escape hatch).
5. Re-read for **contradictions**—"be concise" plus "exhaustive detail" forces impossible outputs (SkillCheck #7).

## Good example

OpenAI **skill-creator** copies Anthropic's tiering verbatim: high freedom text, medium pseudocode/scripts with parameters, low freedom for repeatable fragile ops—plus the bridge/field analogy. Source: `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`.

## Bad example

A creative brainstorming skill that mandates a single 40-step waterfall with no room for questions—or a database migration skill that says "pick any approach you like" with no ordering, backup, or validation. Each mismatches fragility. Source principles: `raw/docs/anthropic-best-practices.md`, `raw/docs/agentskills-io-best-practices.md`, `raw/docs/skill-validation-7-mistakes.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`
- `raw/docs/skill-validation-7-mistakes.md`
