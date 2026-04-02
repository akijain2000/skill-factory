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

## Skills are model-agnostic too

The OpenClaude project (7K+ stars) proved something important: Claude Code's entire tool system -- Bash, file operations, search, web fetch, agents, MCP -- can be driven by **any** LLM through a 1,100-line API translation shim. GPT-4o, DeepSeek, Gemini, Llama, Mistral, and 200+ models all execute the same tool chains.

What this means for skill authors: your SKILL.md instructions don't just work across hosts (Cursor, Claude Code, Codex) -- they work across **models**. The skill stays the same; only the underlying LLM changes.

This validates the investment in writing good skills: a well-crafted SKILL.md is a durable asset that survives model upgrades, host migrations, and provider changes.

## Adjacent protocols

- **MCP (Model Context Protocol)**: How agents connect to external tools. Not a skill format, but skills can reference MCP tools. 83K+ stars on the reference implementation.
- **A2A (Agent2Agent)**: Protocol for agents to talk to each other. Emerging standard for multi-agent workflows. 23K+ stars.
- **AGENTS.md**: Loaded every prompt (project context), not on-demand like skills. Different purpose.

---

## Try It: Port a skill across hosts

### Lab 9A: Portability audit (10 min)

Take the `commit-message-writer` skill from Module 7 (or any skill you've written). Run this portability checklist:

| Check | Pass? |
|-------|-------|
| Only `name` + `description` in frontmatter | |
| No host-specific fields (`allowed-tools`, `hooks`, `agent`) | |
| No hardcoded absolute paths | |
| Tool references use generic language ("run tests" not "use Bash(npm:*)") | |
| No references to `~/.claude/` or `~/.cursor/` in the body | |
| Works without any host-specific companion files | |

If everything passes, your skill is portable.

### Lab 9B: Install on two hosts (15 min)

Take a passing skill and install it on two different agents:

```bash
# Host 1: Claude Code
cp -r my-skill ~/.claude/skills/

# Host 2: Cursor
cp -r my-skill .agents/skills/
```

Test the same prompt on both agents. Compare:
1. Did both agents activate the skill?
2. Did both follow the same workflow?
3. Were there any behavioral differences?

Document differences as gotchas in your skill.

### Lab 9C: Add host-specific config without breaking portability (10 min)

If your skill needs Codex-specific UI metadata, add it as a companion file -- not in the SKILL.md frontmatter:

```bash
mkdir -p my-skill/agents
```

Create `my-skill/agents/openai.yaml`:

```yaml
display_name: My Skill
short_description: Does X
default_prompt: Run my skill on the current project
```

The SKILL.md stays portable. The companion file is ignored by other hosts.

---

## Checkpoint

Before moving on, you should be able to:
- Run a portability audit on any skill
- Install a skill on 2+ different agents
- Add host-specific config without breaking the portable SKILL.md
- Explain why skills are model-agnostic (not just host-agnostic)

## Further reading

- [wiki/concepts/host-compatibility.md](../wiki/concepts/host-compatibility.md)
- [wiki/research/host-differences.md](../wiki/research/host-differences.md)

Next: [Module 10: Maintaining a Skill Library](10-maintaining-library.md)
