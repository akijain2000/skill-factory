# SKILL.md -- The Agent Skills Format (mdskills.ai)

Source: https://www.mdskills.ai/specs/skill-md
Retrieved: 2026-04-02

## Overview

SKILL.md is an open standard for packaging reusable AI agent capabilities. Created by Anthropic and standardized at agentskills.io. Supported by 27+ AI agents including Claude Code, Cursor, Codex, Gemini CLI, and VS Code.

## Problem Solved

Without skills, you repeat the same complex prompts every time. SKILL.md packages instructions once so any compatible agent can pick them up automatically. Loaded on demand, so they don't bloat the context window.

## How It Works

A skill is a folder containing a SKILL.md file with YAML frontmatter and markdown instructions.

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| name | Yes | Unique identifier. Max 64 chars, lowercase, hyphens. |
| description | Yes | What + when. Max 1024 chars. |
| license | No | SPDX identifier or file reference. |
| compatibility | No | Environment requirements. |
| metadata | No | Arbitrary key-value pairs. |
| allowed-tools | No | Space-delimited pre-approved tools. |

## Progressive Disclosure

1. Discovery: Agent reads only name/description (~100 tokens)
2. Activation: Full SKILL.md loads when task matches (< 5000 tokens)
3. Execution: Agent follows instructions, loading referenced files as needed

## Related Specs

- AGENTS.md: Project-level context (loaded every prompt)
- CLAUDE.md: Claude-specific project rules
- MCP: Connecting agents to external tools and services
