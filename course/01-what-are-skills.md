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

---

## Try It: Dissect 3 Real Skills

This lab teaches you to read skills critically. You'll examine one micro-skill, one standard skill, and one anti-pattern.

### Lab 1A: The micro-skill (5 min)

Read this real skill from Matt Pocock's collection (11K stars):

```markdown
---
name: grill-me
description: Interview the user relentlessly about a plan or design until
  reaching shared understanding, resolving each branch of the decision tree.
  Use when user wants to stress-test a plan, get grilled on their design,
  or mentions "grill me".
---

Interview me relentlessly about every aspect of this plan until we reach
a shared understanding. Walk down each branch of the design tree, resolving
dependencies between decisions one-by-one. For each question, provide your
recommended answer.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the
codebase instead.
```

Answer these questions:
1. How many lines is the body? (Answer: 7 -- this is a micro-skill)
2. What's the WHAT verb in the description? (Answer: "Interview")
3. What's the WHEN trigger? (Answer: "Use when user wants to stress-test a plan...")
4. Why is the body so short? (Answer: The agent already knows how to interview. The skill just gives it permission and direction.)

### Lab 1B: The standard skill (10 min)

Read `wiki/examples/good/freeze.md` in this repo. Answer:
1. What problem does it solve?
2. How many workflow steps does it have?
3. What makes the description effective?
4. Does it have a gotchas section? Why or why not?

### Lab 1C: The anti-pattern (10 min)

Read `wiki/examples/bad/task-intelligence.md`. Answer:
1. What's wrong with the name?
2. What's wrong with the description?
3. Is the body too long, too short, or about right?
4. List 3 specific things you'd fix.

### Lab 1D: Find skills on your machine (5 min)

Run this in your terminal:

```bash
find ~ -name "SKILL.md" -maxdepth 5 2>/dev/null | head -20
```

Pick any skill you find. Open it and answer:
1. What's the name? Does it match the folder name?
2. Is the description in third person?
3. How many lines is the body?
4. Would you rate this skill as micro, standard, or reference-heavy?

---

## Checkpoint

Before moving on, you should be able to answer:
- What are the two required parts of a SKILL.md? (frontmatter + body)
- What are the three phases of how agents load skills? (discovery, activation, execution)
- Why do skills exist instead of just putting everything in AGENTS.md? (on-demand loading saves context window)
- What's the difference between a skill and a .cursorrules file? (skills are portable, on-demand; cursorrules are always-on, editor-specific)

## Further reading

- [wiki/research/spec-reference.md](../wiki/research/spec-reference.md) -- The full spec distilled
- [wiki/research/landscape.md](../wiki/research/landscape.md) -- State of the ecosystem

Next: [Module 2: The SKILL.md Format](02-skillmd-format.md)
