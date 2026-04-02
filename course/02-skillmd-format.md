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

## Exercise

1. Write a minimal SKILL.md with just name + description + 3 workflow steps
2. Run the validator: `bun run scripts/validate-skill.ts your-skill/`
3. Fix any issues it flags

## Further reading

- [wiki/research/spec-reference.md](../wiki/research/spec-reference.md)
- [wiki/concepts/progressive-disclosure.md](../wiki/concepts/progressive-disclosure.md)

Next: [Module 3: Writing Descriptions](03-writing-descriptions.md)
