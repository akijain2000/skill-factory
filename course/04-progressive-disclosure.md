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
description: Interview relentlessly about a plan until shared understanding
  is reached. Use when refining plans, proposals, or design decisions.
---

Interview me relentlessly about every aspect of this plan until we reach
a shared understanding. Walk down each branch of the design tree, resolving
dependencies between decisions one-by-one. For each question, provide your
recommended answer.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the
codebase instead.
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

---

## Try It: Right-size a skill

### Lab 4A: Cut the fat (15 min)

Here's an over-explained skill body. Your job: cut everything the agent already knows. Count lines before and after.

```markdown
# Database Migration Runner

## What is a database migration?

A database migration is a way to evolve your database schema over time.
Migrations are typically SQL files that modify tables, columns, indexes,
and constraints. They are applied in order and tracked so you know which
ones have been run.

## What is PostgreSQL?

PostgreSQL is a powerful, open-source relational database system. It uses
SQL for queries and supports advanced features like JSON columns, full-text
search, and custom types.

## Workflow

1. Check the `migrations/` folder for pending migration files
2. Read each pending migration file
3. Run `psql -f <migration_file>` against the database
4. Verify the migration applied successfully by checking the schema
5. If a migration fails, read the error and fix the SQL
6. Re-run the failed migration
7. Repeat until all migrations are applied

## How SQL works

SQL (Structured Query Language) is used to communicate with databases.
Common commands include SELECT, INSERT, UPDATE, DELETE, CREATE TABLE,
and ALTER TABLE. Migrations typically use DDL (Data Definition Language)
commands like CREATE, ALTER, and DROP.

## Gotchas
- Always run migrations in a transaction so failures can roll back
- Check for `IF NOT EXISTS` to make migrations idempotent
- The CI database may have a different schema version than local
```

What to cut:
- "What is a database migration?" -- the agent knows this
- "What is PostgreSQL?" -- the agent knows this
- "How SQL works" -- the agent knows this
- Total cut: ~15 lines of unnecessary explanation

What to keep:
- The workflow (the agent needs to know YOUR process)
- The gotchas (environment-specific facts the agent can't guess)

After cutting (from ~30 lines to ~15):

```markdown
# Database Migration Runner

Run pending migration files against the database and fix failures.

## Workflow
1. Check `migrations/` for pending files (ordered by timestamp prefix)
2. Run each with `psql -f <file>`
3. If a migration fails, read the error, fix the SQL, re-run
4. Repeat until all migrations applied

## Gotchas
- Always run migrations in a transaction so failures roll back
- Use `IF NOT EXISTS` for idempotency
- CI database may have a different schema version than local
```

### Lab 4B: Split a reference-heavy skill (15 min)

This skill body is 600 lines because it includes a full API error code table. Your job: move the table to a reference file with a conditional load instruction.

Before (in SKILL.md):

```markdown
## Error handling

When the API returns an error, look up the code in this table:

| Code | Meaning | Fix |
|------|---------|-----|
| 1001 | Invalid API key | Check .env for ACME_API_KEY |
| 1002 | Rate limited | Wait 60s and retry |
| 1003 | Payload too large | Chunk the request |
... (imagine 50 more rows) ...
```

After (SKILL.md):

```markdown
## Error handling

If the API returns a non-200 status, read
[references/error-codes.md](references/error-codes.md) for the fix.
```

After (references/error-codes.md):

```markdown
# ACME API Error Codes

| Code | Meaning | Fix |
|------|---------|-----|
| 1001 | Invalid API key | Check .env for ACME_API_KEY |
| 1002 | Rate limited | Wait 60s and retry |
| 1003 | Payload too large | Chunk the request |
... (full table) ...
```

The key: the reference file only loads when the agent encounters an API error. In the happy path, those 50 rows never consume context.

### Lab 4C: Write a micro-skill (10 min)

Write a micro-skill (under 20 lines total) for this scenario:

> You want the agent to always explain its reasoning before making code changes. It should think through implications, list affected files, and get approval before editing.

Hints:
- The agent already knows how to reason. You're giving it permission and structure.
- This could be as short as grill-me (7 lines of body).

Sample solution:

```markdown
---
name: think-before-editing
description: Explain reasoning and list affected files before making any
  code changes. Use when cautious editing is needed or when asked to think
  first.
---

Before editing any file:
1. State what you plan to change and why
2. List every file that will be affected
3. Explain potential side effects
4. Wait for approval before proceeding

If a change affects more than 3 files, break it into smaller steps.
```

Total: 14 lines. The agent knows how to reason -- this just structures when and how.

---

## Checkpoint

Before moving on, you should be able to:
- Identify which sections of a skill the agent already knows (and cut them)
- Split a reference-heavy skill into SKILL.md + references/ with conditional loads
- Write a micro-skill under 20 lines for a behavior the agent already understands
- Explain the three-phase loading model and why each phase exists

## Further reading

- [wiki/concepts/progressive-disclosure.md](../wiki/concepts/progressive-disclosure.md)
- [wiki/concepts/token-budget.md](../wiki/concepts/token-budget.md)
- [wiki/concepts/instinct-model.md](../wiki/concepts/instinct-model.md)

Next: [Module 5: Patterns That Work](05-patterns-that-work.md)
