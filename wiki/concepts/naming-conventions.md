# Naming Conventions

## What it is

Skill **folder names** and frontmatter `name:` must **match** and follow agentskills.io rules: lowercase letters, numbers, hyphens; 1–64 characters; no leading/trailing hyphen; no consecutive hyphens. **Gerund-form** names (`processing-pdfs`) are recommended by Anthropic for clarity of ongoing capability.

## Why it matters

Malformed names break discovery or validators. Generic names harm **matching** and collide across libraries. Reserved words (`claude`, `anthropic`, `mcp`, `agent`, …) create policy and UX issues—SkillCheck documents these explicitly.

## How to do it

1. Prefer **domain-action** or **action-object**: `github-pr-reviewer`, `weekly-report-generator`.
2. Use **gerunds** when they read naturally (`analyzing-spreadsheets`); gstack uses short **verbs/nouns** (`review`, `ship`, `qa`)—still specific inside descriptions.
3. Avoid **vague** tokens: `helper`, `utils`, `misc`, `manager`, `handler`.
4. Avoid **reserved** terms and impersonation: `skill`, `claude`, `tools`, `ai`, `bot`, etc.
5. Keep **consistent terminology** in the body once you pick a term (Anthropic).

## Good example

agentskills.io examples: `stripe-integration`-style hyphenated identifiers; Anthropic examples `processing-pdfs`, `managing-databases`. gstack pairs short `name:` with rich `description:` (`browse`, `review`) so discovery relies on description keywords. Sources: `raw/docs/agentskills-io-spec.md`, `raw/docs/anthropic-best-practices.md`, `raw/repos/gstack/browse/SKILL.md`.

## Bad example

`name: claude-helper` (reserved + vague), or `name: data` (over-generic). SkillCheck mistake #3. Fix by scoping: `customer-data-import` + description triggers. Source: `raw/docs/skill-validation-7-mistakes.md`.

## Sources

- `raw/docs/agentskills-io-spec.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/docs/skill-validation-7-mistakes.md`
- `raw/repos/gstack/browse/SKILL.md`
