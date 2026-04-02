# Module 4: Progressive Disclosure

## The context window is a public good

Your skill shares the context window with the system prompt, conversation history, other skills' metadata, and the user's actual request. Every token you use is a token something else can't use.

## The three-phase model

1. **Discovery** (~100 tokens): Only `name` + `description` loaded. All skills at startup.
2. **Activation** (< 5000 tokens target): Full SKILL.md body loaded when the task matches.
3. **Execution** (as needed): Referenced files loaded on demand.

## Right-sizing your skill

### Micro-skills (10-50 lines)

Some skills don't need much. Matt Pocock's `grill-me` skill is ~10 lines:

```markdown
---
name: grill-me
description: Interview relentlessly about a plan until shared understanding is reached. Use when refining plans, proposals, or design decisions.
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the codebase instead.
```

This works because the agent already knows how to interview -- it just needs permission and direction.

### Standard skills (50-300 lines)

Most skills live here. Include workflow steps, examples, and gotchas.

### Reference-heavy skills (300-500 lines)

If approaching 500 lines, split:
- Keep core workflow in SKILL.md
- Move reference tables, API docs, edge cases to `references/`
- Tell the agent WHEN to load each file

```markdown
For API error codes, read [references/error-codes.md](references/error-codes.md).
Only load this if the API returns a non-200 status.
```

### The instinct layer (even smaller than skills)

Everything-claude-code invented "instincts" -- units smaller than skills:

```yaml
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.7
action: Use functional patterns over classes when appropriate.
```

Instincts evolve into full skills when they accumulate enough evidence.

## The test: does the agent need this?

For every paragraph, ask: "Would the agent get this wrong without this instruction?"

- If yes: keep it.
- If no: cut it.

Don't explain what a PDF is. Don't explain how HTTP works. Don't explain what a database migration does. Only add what the agent doesn't already know.

## Exercise

1. Take a skill over 300 lines. Identify which sections the agent already knows.
2. Cut those sections. Measure the line count reduction.
3. Move one reference-heavy section to a separate file with a conditional load instruction.

## Further reading

- [wiki/concepts/progressive-disclosure.md](../wiki/concepts/progressive-disclosure.md)
- [wiki/concepts/token-budget.md](../wiki/concepts/token-budget.md)
- [wiki/concepts/instinct-model.md](../wiki/concepts/instinct-model.md)

Next: [Module 5: Patterns That Work](05-patterns-that-work.md)
