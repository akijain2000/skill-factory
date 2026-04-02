# Module 2: The SKILL.md Format

## Frontmatter (required)

Every SKILL.md starts with YAML frontmatter between `---` fences.

### `name` (required)

```yaml
name: github-pr-review
```

Rules:
- Lowercase letters, numbers, hyphens only
- Max 64 characters
- Must match the parent directory name
- No consecutive hyphens, no leading/trailing hyphens

Good names follow **domain-action** or **gerund** patterns:
- `github-pr-review`, `processing-pdfs`, `deploying-to-vercel`

Avoid vague words: `helper`, `utils`, `misc`, `tool`, `agent`, `skill`

### `description` (required)

```yaml
description: Review pull requests for SQL safety, trust boundary violations, and structural issues. Use when asked to review a PR, check a diff, or do a pre-landing review.
```

Rules:
- Max 1024 characters
- Third person voice (it's injected into the system prompt)
- Must contain a **WHAT** verb: Create, Generate, Analyze, Review, etc.
- Must contain a **WHEN** trigger: "Use when...", "Activate when...", "Use for..."
- Include keywords users would actually type

This is the most important field. More in Module 3.

### Optional fields

```yaml
license: MIT
compatibility: Requires git and gh CLI
metadata:
  author: your-name
  version: "1.0"
allowed-tools: Bash(git:*) Read
```

## Body structure

After the frontmatter, write the instructions in Markdown. Recommended sections:

```markdown
# Skill Name

Overview in 2-4 sentences.

## When to use
- Trigger 1
- Trigger 2
- Trigger 3

## Workflow
1. Step one
2. Step two
3. Step three

## Examples

Input: ...
Output: ...

## Gotchas
- Thing that might surprise you
```

### Size budget

- **Target**: under 500 lines / 5000 tokens
- **Warning**: over 500 lines -- consider splitting
- **Error**: over 800 lines -- must split into reference files

If your skill is growing too long, move details to `references/REFERENCE.md` and tell the agent WHEN to load it: "Read references/api-errors.md if the API returns a non-200 status."

## File references

Keep one level deep from SKILL.md. No nesting.

```markdown
Good:  See [the reference](references/REFERENCE.md) for details.
Bad:   See [nested ref](references/advanced/deep/GUIDE.md).
```

---

## Try It: Build a Skeleton, Then Validate

### Lab 2A: Name game (5 min)

For each scenario, write the skill folder name. Check against the rules (lowercase, hyphens, no vague words, matches domain-action pattern):

1. A skill that generates commit messages from diffs
2. A skill that converts Figma designs to React components
3. A skill that monitors Kubernetes pod health
4. A skill that writes Postgres migration files

Answers (check yours):
1. `generate-commit-messages` or `commit-message-writer`
2. `figma-to-react` or `converting-figma`
3. `k8s-pod-monitor` or `monitoring-k8s-pods`
4. `postgres-migrations` or `writing-pg-migrations`

Bad answers: `helper`, `code-tool`, `my-skill`, `utils`

### Lab 2B: Write a minimal SKILL.md (15 min)

Create a folder and write a SKILL.md from scratch. Use this scenario:

> You want a skill that runs your test suite, reads failures, fixes them, and re-runs until all tests pass.

Step 1: Create the folder:

```bash
mkdir -p test-fix-loop
```

Step 2: Write the file. Start with just this:

```markdown
---
name: test-fix-loop
description: [you write this -- needs WHAT verb + WHEN trigger]
---

# Test Fix Loop

[2-sentence overview]

## Workflow
1. [first step]
2. [second step]
3. [third step -- validation]
4. [fourth step -- loop back if needed]

## Gotchas
- [one environment-specific fact]
```

Step 3: Run the validator:

```bash
bun run scripts/validate-skill.ts test-fix-loop/
```

Step 4: Fix every error the validator reports. Re-run until clean.

### Lab 2C: Before/after -- fixing a broken skeleton (10 min)

Here's a broken SKILL.md. Find all the issues:

```markdown
---
name: Code Helper
description: helps with code stuff
---

## Overview

## Workflow
1. Look at the code
2. Fix it
```

Issues to find:
1. **Name**: "Code Helper" has uppercase and a space (must be lowercase + hyphens)
2. **Name**: "helper" is a banned vague word
3. **Description**: No WHAT verb (should be "Analyze", "Review", etc.)
4. **Description**: No WHEN trigger (missing "Use when...")
5. **Description**: First person implied ("helps") instead of third person action
6. **Body**: Empty "Overview" section (wasted tokens, confuses agent)
7. **Body**: Workflow is too vague ("Look at the code" -- look at what? for what?)
8. **Body**: No gotchas section

Fixed version:

```markdown
---
name: code-review
description: Review code changes for style violations, security issues, and performance anti-patterns. Use when asked to review code, check a PR, or audit a file.
---

# Code Review

Review code changes against project standards, focusing on security, performance, and maintainability.

## Workflow
1. Read the changed files or diff
2. Check for security issues (hardcoded secrets, SQL injection, XSS)
3. Check for performance anti-patterns (N+1 queries, missing indexes)
4. Check for style violations against project conventions
5. Output a summary with file:line references for each issue

## Gotchas
- Some projects use `.eslintrc` for style; check before flagging style issues manually
```

---

## Checkpoint

Before moving on, you should be able to:
- Write a valid `name` field from a scenario description
- Write a minimal SKILL.md with frontmatter + body
- Run the validator and interpret its output
- Spot and fix at least 5 common structural issues in a broken SKILL.md

## Further reading

- [wiki/research/spec-reference.md](../wiki/research/spec-reference.md)
- [wiki/concepts/progressive-disclosure.md](../wiki/concepts/progressive-disclosure.md)

Next: [Module 3: Writing Descriptions](03-writing-descriptions.md)
