# Host Compatibility

## What it is

**Host compatibility** is how the same SKILL.md folder behaves across **Claude Code, Cursor, Codex, Gemini CLI, VS Code**, and community agents (27+ per mdskills.ai). All share the core idea: YAML frontmatter + markdown body + optional bundles; hosts differ in **discovery paths**, **extra frontmatter**, and **companion project files** (AGENTS.md vs CLAUDE.md).

## Why it matters

A skill that assumes only Claude's hooks will confuse Codex users; missing `agents/openai.yaml` hurts OpenAI UIs. The optional `compatibility` frontmatter field exists precisely to declare environment needs. Authors should know what is **portable** vs **vendor extension**.

## How to do it

1. Stick to **agentskills.io baseline**: `name`, `description`, optional `license`, `compatibility`, `metadata`, `allowed-tools` (experimental).
2. Document **dependencies** and OS assumptions in body or `compatibility:` string.
3. For OpenAI Codex, add **`agents/openai.yaml`** per skill-creator; run validation scripts if provided.
4. Do not conflate **AGENTS.md** (always-on project context, merged root→cwd) with **SKILL.md** (on-demand capability)—OpenAI guide stresses this distinction.
5. Use **forward slashes** in paths (Anthropic anti-pattern: Windows-only paths).
6. Test on **more than one model tier** when possible (Haiku/Sonnet/Opus guidance from Anthropic).

## MCP and A2A (adjacent to SKILL hosts)

**Model Context Protocol (MCP)** is not a skill format: it is how many hosts attach **tools, resources, and prompts** via sidecar servers. Official **reference servers** live in `modelcontextprotocol/servers` (Everything, Fetch, Filesystem, Git, Memory, etc.); production deployments usually use the [MCP Registry](https://registry.modelcontextprotocol.io/) or vendor-maintained servers. Skills teach *when and how* to use those tools; MCP implements *the tool surface*.

**Agent2Agent (A2A)** is also not SKILL.md: it is an **inter-agent** protocol (JSON-RPC over HTTP(S), **Agent Cards**, streaming/async) for collaboration between opaque agents. It complements MCP (tools/data) by standardizing **agent-to-agent** messaging—relevant when your workflow spans multiple agent runtimes rather than a single Claude/Codex session.

**Terminal/agent products** such as **OpenAI Codex** (`openai/codex`, Rust CLI) and **goose** (`block/goose`, MCP-centric local agent) load project rules and skills per their own docs; still use the same **portable SKILL.md** baseline when you want overlap with Codex `.agents/skills/` or Claude paths.

**Provider shims** such as **OpenClaude** (`Gitlawb/openclaude`) demonstrate that Claude Code's entire tool system (Bash, FileRead/Write/Edit, Glob, Grep, WebFetch, WebSearch, Agent, MCP, Tasks) can be driven by **any** LLM via an OpenAI-compatible API translation layer (`openaiShim.ts`, ~1100 lines). The shim translates Anthropic message blocks to OpenAI messages, Anthropic tool_use/tool_result to OpenAI function calls, and OpenAI SSE streaming back to Anthropic stream events. This means skills authored for Claude Code's tool surface are **functionally portable** to GPT-4o, DeepSeek, Gemini, Llama, and 200+ models -- the skill instructions don't change, only the underlying model quality varies.

## Good example

The **mdskills.ai** spec lists the same progressive disclosure model across Claude Code, Cursor, Codex, Gemini CLI, VS Code—skills as portable packs. OpenAI **skill-creator** documents Codex discovery under `.agents/skills/` and explicit vs implicit invocation. Sources: `raw/docs/mdskills-ai-spec.md`, `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`.

## Bad example

Hard-coding "Run this in Claude Code only" without fallbacks, or relying on undocumented frontmatter that **quick_validate.py** rejects (unexpected keys). Ship skills that assume `~/.claude/` paths without noting other hosts. Source for validation constraints: `raw/repos/openai-skills/skills/.system/skill-creator/scripts/quick_validate.py`, `raw/docs/openai-agents-md-spec.md`.

## Sources

- `raw/docs/mdskills-ai-spec.md`
- `raw/docs/agentskills-io-spec.md`
- `raw/docs/openai-agents-md-spec.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`
- `raw/repos/openai-skills/skills/.system/skill-creator/scripts/quick_validate.py`
- `raw/repos/mcp-servers/README.md`
- `raw/repos/A2A/README.md`
- `raw/repos/openai-codex/README.md`
- `raw/repos/goose/README.md`
- `raw/repos/openclaude/README.md`, `src/services/api/openaiShim.ts`
