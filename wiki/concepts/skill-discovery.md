# Skill Discovery

## What it is

**Skill discovery** is how an agent **finds** candidate skills at session start and **selects** one when a task matches. Typically phase one loads only **name + description** for many skills; phase two loads the winning SKILL.md body. Codex adds **explicit** invocation (user names the skill) and **implicit** (auto-select from description match).

## Why it matters

If descriptions lack triggers and keywords, the right skill never enters phase two—no matter how good the body is. agentskills.io: description should include keywords for matching; Anthropic: with 100+ skills, description is critical for selection.

## How to do it

1. Optimize the **description** for retrieval: WHAT + WHEN + keywords (see description-writing article).
2. Keep **skill scope coherent**—too narrow forces loading many skills; too broad mis-fires on unrelated tasks (agentskills.io "coherent units").
3. For Codex, place skills where the host scans: `.agents/skills/` hierarchies per OpenAI guide.
4. Align **folder name** and `name:` field (spec requirement) so filesystem and metadata agree.
5. Avoid **reserved/vague names** that collide or tell nothing (`helper`, `skills`, `claude`). Source: SkillCheck list.
6. Some distributions ship a **bootstrap meta-skill** (e.g. **superpowers** `using-superpowers`) that instructs the model to **invoke the Skill tool** before acting when any skill might apply—tightening discovery at the cost of extra tool calls. Use only when your team wants that enforcement.

## Good example

Curated `spreadsheet` description ties file types and workflows to triggers: "creating, editing, analyzing, or formatting spreadsheets (`.xlsx`, `.csv`, `.tsv`) with formula-aware workflows…"—rich keywords for implicit routing. Source: `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`.

## Bad example

`name: helper` / `description: "Misc utilities for the project."`—unsearchable and non-specific; also violates naming guidance. Discovery cannot map user intent to the skill. Source pattern: `raw/docs/skill-validation-7-mistakes.md`.

## Sources

- `raw/docs/agentskills-io-spec.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/docs/openai-agents-md-spec.md`
- `raw/docs/skill-validation-7-mistakes.md`
- `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`
- `raw/repos/superpowers/skills/using-superpowers/SKILL.md` (mandatory-invocation bootstrap pattern)
