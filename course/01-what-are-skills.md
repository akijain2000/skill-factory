# Module 1: What Are Skills?

## The problem skills solve

Every time you work with an AI coding agent, you repeat yourself. "Always run tests before committing." "Use pnpm, not npm." "Check for security issues in auth code." Skills package these instructions once so any compatible agent picks them up automatically.

## What a skill actually is

A skill is a **folder** containing a **SKILL.md** file. That's it.

```
my-skill/
  SKILL.md          <-- required: metadata + instructions
  scripts/          <-- optional: executable code
  references/       <-- optional: documentation
  assets/           <-- optional: templates, resources
```

The SKILL.md has two parts:

1. **YAML frontmatter** (name + description) -- the agent reads this at startup to decide if the skill is relevant
2. **Markdown body** -- the actual instructions, loaded only when the skill activates

```markdown
---
name: my-skill
description: Does X when Y happens. Use when you need Z.
---

# My Skill

Step 1: ...
Step 2: ...
```

## How agents use skills

The loading model has three phases:

1. **Discovery** (~100 tokens): Agent reads all skill names + descriptions at startup
2. **Activation** (< 5000 tokens): When a task matches, the full SKILL.md body loads
3. **Execution** (as needed): Agent follows instructions, loading referenced files on demand

This is called **progressive disclosure**. Your skill shares the context window with everything else -- conversation history, system prompt, other skills. Every token counts.

## Where skills live

| Agent | Skill Location |
|-------|---------------|
| Claude Code | `~/.claude/skills/` or project `.claude/skills/` |
| Cursor | `.cursor/skills/` or `.agents/skills/` |
| Codex CLI | `.agents/skills/` or `~/.codex/skills/` |
| Gemini CLI | `.agents/skills/` |

## The ecosystem today

The SKILL.md format is an open standard from [agentskills.io](https://agentskills.io/specification), supported by 27+ agents. Separate from skills, there are also:

- **AGENTS.md** -- project-level context loaded every prompt (not on demand)
- **CLAUDE.md** -- Claude-specific project rules
- **.cursorrules** -- Cursor-specific rules (being replaced by skills)

Skills are the future because they're portable, on-demand, and composable.

## Exercise

1. Find a skill on your machine: `find ~ -name "SKILL.md" -maxdepth 5 2>/dev/null | head -10`
2. Read one. Identify the frontmatter, the description, and the body.
3. Count the lines. Is it under 500?

## Further reading

- [wiki/research/spec-reference.md](../wiki/research/spec-reference.md) -- The full spec distilled
- [wiki/research/landscape.md](../wiki/research/landscape.md) -- State of the ecosystem

Next: [Module 2: The SKILL.md Format](02-skillmd-format.md)
