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

## Built-in variables (Claude Code)

Claude Code provides two variables that skills can use for portable file references:

- **`${CLAUDE_SKILL_DIR}`** -- directory of the current skill file. Use it to reference sibling assets (templates, config snippets) without hardcoding paths.
- **`${CLAUDE_PLUGIN_DATA}`** -- stable data directory that survives skill upgrades. Use for persistent state (user preferences, learned conventions). Data written to `${CLAUDE_SKILL_DIR}` may be deleted on upgrade.

Source: `raw/docs/trq212-skills-abstraction.md`.

## Setup Config Pattern

Store initial setup in `config.json` under `${CLAUDE_PLUGIN_DATA}`. If absent on first run, prompt via `AskUserQuestion` before proceeding. This avoids hard-coding team-specific values like AWS profiles, project keys, or default assignees.

```markdown
## Setup

On first use, check for `${CLAUDE_PLUGIN_DATA}/config.json`.
- If present: load team name, default assignees, and project key from it.
- If absent: ask the user for these values, then write them for future sessions.
```

Source: `raw/docs/trq212-skills-abstraction.md`, `raw/docs/agentpatterns-skill-authoring.md`.

## Global vs. project-level skill organization

Skills can be organized in two layers:
- **Global skills** (`~/.claude/skills/`) -- available in every project. Reusable utilities like `/preflight`, `/gotcha`, `/explain`.
- **Project-level skills** (`.claude/skills/`) -- override or extend global skills for specific repos. Custom release flows, project-specific verification.

One practitioner reports 13 global skills and 6 project-level overrides across 4 projects. Source: `raw/docs/applied-anthropic-playbook.md`.

## Good example

Curated `spreadsheet` description ties file types and workflows to triggers: "creating, editing, analyzing, or formatting spreadsheets (`.xlsx`, `.csv`, `.tsv`) with formula-aware workflows…"—rich keywords for implicit routing. Source: `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`.

## Bad example

`name: helper` / `description: "Misc utilities for the project."`—unsearchable and non-specific; also violates naming guidance. Discovery cannot map user intent to the skill. Source pattern: `raw/docs/skill-validation-7-mistakes.md`.

## Sources

- `raw/docs/agentskills-io-spec.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/docs/openai-agents-md-spec.md`
- `raw/docs/skill-validation-7-mistakes.md`
- `raw/docs/trq212-skills-abstraction.md` (built-in variables, config pattern)
- `raw/docs/applied-anthropic-playbook.md` (global vs project-level organization)
- `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`
- `raw/repos/superpowers/skills/using-superpowers/SKILL.md` (mandatory-invocation bootstrap pattern)
