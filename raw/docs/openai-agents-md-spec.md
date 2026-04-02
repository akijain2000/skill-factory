# Custom Instructions with AGENTS.md (OpenAI Codex)

Source: https://developers.openai.com/codex/guides/agents-md/
Retrieved: 2026-04-02

## What is AGENTS.md

AGENTS.md files provide AI coding agents with project-specific instructions. Plain Markdown. No special syntax or schema required. Describes tech stack, conventions, file structure, rules.

## How Codex Discovers Guidance

Builds instruction chain at startup (once per run):

1. **Global scope**: `~/.codex/AGENTS.override.md` or `~/.codex/AGENTS.md` (first non-empty file)
2. **Project scope**: From Git root down to CWD, checking each directory for `AGENTS.override.md` > `AGENTS.md` > fallback filenames
3. **Merge order**: Concatenated root-down. Closer files override earlier guidance.

Stops at 32 KiB combined size (configurable via `project_doc_max_bytes`).

## Key Design Decisions

- Files closer to CWD take precedence (like CSS specificity)
- Empty files skipped
- Override files (`AGENTS.override.md`) take priority over base files
- Fallback filenames configurable via `project_doc_fallback_filenames`

## Skills Discovery (Codex)

Skills stored in `.agents/skills/` directories. Each skill requires a SKILL.md with frontmatter. Codex discovers from multiple scopes: current directory, parent folders, repo root, user home, system locations.

Two activation modes:
- **Explicit invocation**: User includes skill in prompt
- **Implicit invocation**: Codex auto-selects when task matches description

## Supported Agents (2026)

AGENTS.md supported by: OpenAI Codex CLI, GitHub Copilot, Cursor, Windsurf, Amp (Sourcegraph), Devin.

Claude Code and Gemini CLI use tool-specific alternatives (CLAUDE.md, GEMINI.md).

## Differences from SKILL.md

AGENTS.md is loaded every prompt (project context). SKILL.md is loaded on demand (specific capability). AGENTS.md has no frontmatter requirement. SKILL.md requires name + description frontmatter.
