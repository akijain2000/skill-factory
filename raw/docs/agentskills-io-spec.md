# Agent Skills Specification (agentskills.io)

Source: https://agentskills.io/specification
Retrieved: 2026-04-02

## Directory Structure

A skill is a directory containing, at minimum, a SKILL.md file:

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files
```

## SKILL.md Format

YAML frontmatter followed by Markdown content.

### Frontmatter Fields

| Field | Required | Constraints |
|-------|----------|-------------|
| name | Yes | Max 64 chars. Lowercase letters, numbers, hyphens only. Must not start/end with hyphen. Must match parent directory name. |
| description | Yes | Max 1024 chars. Non-empty. What it does + when to use it. Include keywords for agent matching. |
| license | No | License name or reference to bundled file. |
| compatibility | No | Max 500 chars. Environment requirements. |
| metadata | No | Arbitrary key-value mapping. |
| allowed-tools | No | Space-delimited pre-approved tools. Experimental. |

### Name Rules
- 1-64 characters
- Lowercase alphanumeric + hyphens only
- No start/end hyphens
- No consecutive hyphens
- Must match parent directory name

### Description Rules
- 1-1024 characters
- Should describe WHAT it does and WHEN to use it
- Include specific keywords for agent matching
- Third person voice

## Progressive Disclosure

Three-phase loading model:

1. **Discovery** (~100 tokens): Agent reads only name + description at startup
2. **Activation** (< 5000 tokens recommended): Full SKILL.md body loaded when task matches
3. **Execution** (as needed): Referenced files loaded on demand

Keep SKILL.md under 500 lines. Move details to separate files.

## File References

Use relative paths from skill root. Keep one level deep. Avoid nested reference chains.

## Optional Directories

### scripts/
Executable code. Should be self-contained, include helpful errors, handle edge cases.

### references/
Additional docs loaded on demand. Keep focused and small.

### assets/
Static resources: templates, images, data files, schemas.

## Extended Fields (Claude Code)

Beyond the base spec, Claude Code adds:
- `argument-hint`: Hint text in autocomplete
- `disable-model-invocation`: User-only invocation
- `user-invocable`: Controls /menu visibility
- `model`: Model override
- `context`: Can be "fork" for isolated subagent
- `agent`: Subagent type specification
- `hooks`: Lifecycle hooks

## Supported Agents (27+)

Claude Code, Cursor, OpenAI Codex, Gemini CLI, VS Code, GitHub Copilot, Amp, Roo Code, Goose, Windsurf, Continue, and more.
