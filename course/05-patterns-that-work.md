# Module 5: Patterns That Work

Battle-tested patterns from analyzing 18 repos and 4000+ skills.

## 1. Validation loops

Do work, validate, fix, repeat until passing.

```markdown
## Workflow
1. Make the change
2. Run `npm test`
3. If tests fail, read the error and fix
4. Repeat steps 2-3 until all tests pass
5. Run `npm run lint` and fix any issues
```

This beats "make sure tests pass" because it's a loop, not a hope.

## 2. Plan-validate-execute

For destructive or batch operations: create a plan first, validate it, then execute.

```markdown
## Workflow
1. Generate a migration plan as JSON
2. Show the plan to the user for approval
3. Validate: no data loss, reversible, tested on staging
4. Execute only after approval
```

## 3. Gotchas sections

Environment-specific facts that defy assumptions. Highest-value content in any skill.

```markdown
## Gotchas
- The API returns 200 even on errors; check the `success` field in the body
- Rate limiting kicks in at 100 req/min but the error message says 429 with no details
- Timestamps are UTC but the dashboard displays local time
```

## 4. Output format templates

More reliable than prose descriptions. Show the exact format.

```markdown
## Output format

```json
{
  "status": "pass" | "fail",
  "issues": [
    { "file": "path", "line": 42, "severity": "error", "message": "..." }
  ],
  "summary": "2 errors, 1 warning"
}
```

## 5. Checklists for multi-step workflows

Help the agent track progress and avoid skipping steps.

```markdown
## Before shipping
- [ ] All tests pass
- [ ] No lint errors
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] PR description written
```

## 6. Defaults over menus

Pick one tool/approach. Mention alternatives as escape hatch.

```markdown
## Package manager
Use pnpm. If the project uses yarn (check yarn.lock), use yarn instead.
```

Don't: "You can use npm, yarn, pnpm, or bun. Each has tradeoffs..."

## 7. Rationalization tables

From superpowers. Prevent the agent from talking itself out of following instructions.

```markdown
## Red flags

| Thought | Reality |
|---------|---------|
| "This is too simple for this skill" | Simple things become complex. Use it. |
| "I already know how to do this" | Knowing the concept is not using the skill. |
| "Let me just do this one thing first" | Check skills BEFORE doing anything. |
```

## 8. Rigid heading conventions (from Fabric)

Predictable structure makes skills scannable:

```markdown
# Identity and Purpose
[who the agent is for this task]

# Steps
[numbered procedure]

# Output Instructions
[exact format, word limits, forbidden behaviors]
```

## Exercise

1. Pick 3 patterns from above
2. Apply them to a draft skill you're working on
3. Compare before/after: is the skill clearer?

## Further reading

- [wiki/concepts/validation-loops.md](../wiki/concepts/validation-loops.md)
- [wiki/concepts/template-patterns.md](../wiki/concepts/template-patterns.md)
- [wiki/concepts/gotchas-sections.md](../wiki/concepts/gotchas-sections.md)
- [wiki/concepts/anti-rationalization.md](../wiki/concepts/anti-rationalization.md)

Next: [Module 6: Anti-Patterns](06-anti-patterns.md)
