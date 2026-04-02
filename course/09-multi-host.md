# Module 9: Multi-Host Compatibility

Ship your skill to every agent, not just one.

## The portable core

The agentskills.io spec is the common ground. If your SKILL.md uses only these fields, it works everywhere:

```yaml
---
name: my-skill
description: Does X. Use when Y.
---
```

## Host-specific locations

| Host | Install Path | Project Path |
|------|-------------|-------------|
| Claude Code | `~/.claude/skills/my-skill/` | `.claude/skills/my-skill/` |
| Cursor | `~/.cursor/skills/my-skill/` | `.cursor/skills/my-skill/` or `.agents/skills/my-skill/` |
| Codex CLI | `~/.codex/skills/my-skill/` | `.agents/skills/my-skill/` |
| Gemini CLI | N/A | `.agents/skills/my-skill/` |

## Extended fields (not portable)

Some hosts add fields beyond the spec:

| Field | Host | Purpose |
|-------|------|---------|
| `allowed-tools` | Claude Code | Pre-approve tools |
| `context: fork` | Claude Code | Run in isolated subagent |
| `agent` | Claude Code | Subagent type specification |
| `hooks` | Claude Code | Lifecycle event handlers |
| `agents/openai.yaml` | Codex | Agent-specific config |

If you use these, your skill won't work on other hosts without modification.

## Portability strategy

1. **Keep SKILL.md portable**: Use only `name` + `description` in frontmatter
2. **Host-specific config**: Put in separate files (`agents/openai.yaml`, `.claude/settings.json`)
3. **Tool references**: Use generic descriptions ("run the test suite") not specific tool names ("use Bash(npm:*)")
4. **Don't hardcode paths**: Use relative paths from the skill root

## Adjacent protocols

- **MCP (Model Context Protocol)**: How agents connect to external tools. Not a skill format, but skills can reference MCP tools.
- **A2A (Agent2Agent)**: Protocol for agents to talk to each other. Emerging standard for multi-agent workflows.
- **AGENTS.md**: Loaded every prompt (project context), not on-demand like skills. Different purpose.

## Exercise

1. Take a skill you wrote for one host
2. Remove host-specific fields from the frontmatter
3. Test it on a different agent
4. Does it activate? Does the workflow work?

## Further reading

- [wiki/concepts/host-compatibility.md](../wiki/concepts/host-compatibility.md)
- [wiki/research/host-differences.md](../wiki/research/host-differences.md)

Next: [Module 10: Maintaining a Skill Library](10-maintaining-library.md)
