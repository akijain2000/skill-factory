# Description Writing

## What it is

The `description` field in SKILL.md frontmatter is the only metadata many hosts inject for **skill discovery** before the body loads. It should name the **capability** (strong verb + domain) and **when** to use it (explicit triggers), in **third person**, with keywords for matching—but **multi-step workflows belong in the body**, not in the description (see **Claude Search Optimization** below).

**Important nuance (CSO):** Discovery text is also what the model may **treat as the whole skill** if it satisfices. Workflow detail in frontmatter can replace reading the body; keep the YAML line activation-only for procedural skills.

## Why it matters

Validation of real-world skills shows missing **WHEN** triggers and missing **WHAT** verbs as two of the top failure modes: the model sees dozens of skills and cannot reliably pick yours. A vague description wastes tokens on every preload and still fails activation. Each skill has exactly one description—there is no second chance until the body loads.

## How to do it

1. Open with an action verb: *Analyze*, *Deploy*, *Review*, *Bootstrap*, *Generate*—not nominalizations like "generation" or weak frames like "A tool for…".
2. Add **Use when…** (or equivalent) with concrete phrases users say: quoted strings, comma-separated triggers, or "Applies to…".
3. Write in **third person** ("Deploys…", "Use when the user asks…") per agentskills.io and Anthropic guidance.
4. Pack **domain keywords** (stack, artifact types, outcomes) so embedding-style matching finds the skill.
5. Trim bloat: replace "This skill should be used when" with "Use when".
6. If proactive use is intended, say so ("Proactively suggest when…") like gstack skills do.

## Recommended structure

AgentPatterns.ai formalizes the structure as: **[What it does] + [When to use it] + [Key capabilities]**. This three-part formula ensures the description covers all three discovery needs in one scan.

## Negative triggers (preventing over-triggering)

When a skill fires on unrelated tasks, add explicit negative triggers:

```yaml
description: Advanced data analysis for CSV files. Use for statistical
  modelling, regression, clustering. Do NOT use for simple data
  exploration (use data-viz skill instead).
```

This is especially important when multiple skills cover adjacent domains. Source: AgentPatterns.ai, Anthropic internal practice.

## Debugging descriptions

Ask the agent: **"When would you use the [skill name] skill?"** It quotes the description back verbatim, revealing what's missing or misleading. If the agent can't articulate when to use the skill, the description needs work. Source: AgentPatterns.ai.

## Good example

The gstack `ship` skill frontmatter states the workflow (detect base branch, tests, VERSION, CHANGELOG, PR) and then: `Use when asked to "ship", "deploy", "push to main", "create a PR", "merge and push", or "get it deployed".` It adds proactive guidance in the same block. Source: `raw/repos/gstack/ship/SKILL.md`.

## Bad example

`description: "Handles deployment stuff and helps with Vercel."` — No clear verb, no trigger phrases, no keywords for matching. Compare to the curated `vercel-deploy` skill: `Deploy applications… Use when the user requests deployment actions like "deploy my app"…` Source contrast: `raw/repos/openai-skills/skills/.curated/vercel-deploy/SKILL.md` vs the bad pattern in `raw/docs/skill-validation-7-mistakes.md`.

## Claude Search Optimization (CSO) — descriptions vs bodies

Test-backed finding from the **superpowers** corpus: if the YAML `description` **summarizes the skill’s workflow** (the “what” and “how”), the agent may **follow that short text only** and **skip the SKILL.md body**. In one observed failure, a **two-stage review** (e.g. spec compliance, then code quality) collapsed to a **single stage** because the description mentioned interim steps like code review between tasks—the model never loaded the full procedure from the body.

**Authoring rule:** Treat `description` as **pure activation**: *when* to invoke the skill, trigger phrases, domain keywords, and optional “proactively suggest when…”—**not** a compressed playbook. Put ordered steps, gates, substeps, and tables in the **body** (and references). If you need both discovery and procedure, prefer a minimal WHEN line in frontmatter and an immediate H1 section that repeats nothing redundant—or accept that the body is authoritative and keep the description non-procedural.

This aligns with the framing that **“description is the only thing your agent sees”** for routing: it must not accidentally become the **only** thing the agent *obeys*. For rationalization tables and guard tags that reinforce body-level rules, see the Anti-Rationalization concept note under `wiki/concepts/anti-rationalization.md`.

## Sources

- `raw/docs/skill-validation-7-mistakes.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-spec.md`
- `raw/docs/agentpatterns-skill-authoring.md` (negative triggers, debugging, [What]+[When]+[Capabilities] structure)
- `raw/repos/gstack/ship/SKILL.md`
- `raw/repos/openai-skills/skills/.curated/vercel-deploy/SKILL.md`
- `raw/repos/superpowers/skills/` (CSO finding; compare description vs body across skills)
- `raw/repos/mattpocock-skills/` (author framing: description as primary discovery surface)
