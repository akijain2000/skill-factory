# Module 5: Patterns That Work

Battle-tested patterns from analyzing 19 repos and 4000+ skills.

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

\```json
{
  "status": "pass" | "fail",
  "issues": [
    { "file": "path", "line": 42, "severity": "error", "message": "..." }
  ],
  "summary": "2 errors, 1 warning"
}
\```
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

---

## Try It: Pattern Matching

For each scenario below, identify which pattern(s) to use, then write the relevant section of a SKILL.md.

### Scenario 1: Database migration runner

> Your skill runs database migrations. Some migrations are destructive (DROP TABLE). You need the agent to show what will happen before executing.

Which pattern? **Plan-validate-execute**

Write the workflow section:

```markdown
## Workflow
1. Scan `migrations/` for pending files
2. Classify each as safe (CREATE, ADD) or destructive (DROP, ALTER, DELETE)
3. Present a migration plan showing each file and its classification
4. If any migration is destructive, ask for explicit user approval
5. Execute migrations in order
6. Verify each migration succeeded before proceeding to the next
```

### Scenario 2: Linter auto-fixer

> Your skill runs ESLint, reads the errors, fixes them in the source files, and re-runs until clean. But sometimes fixes introduce new errors.

Which pattern? **Validation loop** (with a stop condition)

Write the workflow section:

```markdown
## Workflow
1. Run `npx eslint . --format json`
2. If no errors, done
3. Read each error, fix it in the source file
4. Re-run `npx eslint . --format json`
5. Repeat steps 3-4 until clean or 5 iterations reached
6. If still failing after 5 iterations, report remaining issues to the user
```

### Scenario 3: API integration

> Your skill calls a third-party API. The API has quirky error codes that aren't standard HTTP errors. The agent needs to handle code 4201 ("silent rate limit") and code 5500 ("temporary maintenance").

Which pattern? **Gotchas section**

Write the gotchas:

```markdown
## Gotchas
- Code 4201 means silent rate limit: wait 120s and retry (API returns 200 with this error code in the body, not a 429)
- Code 5500 means temporary maintenance: retry after 5 minutes, do not alert the user
- All timestamps in responses are Unix milliseconds, not seconds
```

### Scenario 4: Code review output

> Your skill reviews code and reports issues. You need consistent output so the team can parse it programmatically.

Which pattern? **Output format template**

Write the output section:

```markdown
## Output format

For each issue found, output:

\```
[SEVERITY] file.ts:42 -- Description of the issue
\```

Severity levels: ERROR (must fix), WARN (should fix), INFO (suggestion)

End with a summary line:

\```
Review complete: 2 errors, 1 warning, 3 info across 5 files
\```
```

### Scenario 5: Ship workflow

> Your skill ships code. Developers keep skipping the CHANGELOG step because "it's just a small change." The agent also tends to skip it.

Which pattern? **Rationalization table** + **Checklist**

Write both:

```markdown
## Before shipping

- [ ] All tests pass
- [ ] CHANGELOG updated
- [ ] Version bumped in package.json
- [ ] PR description written

## Common rationalizations

| Thought | Reality |
|---------|---------|
| "This is too small for a CHANGELOG entry" | Users read changelogs. Every user-facing change gets an entry. |
| "I'll update the CHANGELOG later" | Later never comes. Update it now. |
| "The PR description covers it" | PR descriptions are for reviewers. CHANGELOG is for users. |
```

---

## Checkpoint

Before moving on, you should be able to:
- Identify which pattern fits a given scenario
- Write a validation loop with a stop condition
- Write a plan-validate-execute workflow for destructive operations
- Write gotchas that capture environment-specific facts
- Write a rationalization table that prevents agent shortcutting

## Further reading

- [wiki/concepts/validation-loops.md](../wiki/concepts/validation-loops.md)
- [wiki/concepts/template-patterns.md](../wiki/concepts/template-patterns.md)
- [wiki/concepts/gotchas-sections.md](../wiki/concepts/gotchas-sections.md)
- [wiki/concepts/anti-rationalization.md](../wiki/concepts/anti-rationalization.md)

Next: [Module 6: Anti-Patterns](06-anti-patterns.md)
