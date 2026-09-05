# Skill Evolution: 100-Repo Expansion Findings

The May 25, 2026 sparse expansion added 100 more source repos from top GitHub rankings. The new corpus changes the course in one important way: strong skills are no longer just portable Markdown procedures. They are becoming a runtime layer that composes with agents, memory, MCP, hooks, commands, validators, and orchestration systems.

## What changed

### 1. Skills moved from standalone packs into product repos

Early Skill Factory sources were mostly dedicated skill packs, prompt libraries, and coding-agent repos. The new scan found skills embedded directly inside product and platform repos: `n8n`, `Dify`, `LobeHub`, `Warp`, `Open WebUI`, `VS Code`, `AutoGPT`, and other large projects now carry skill-like docs, agent instructions, plugin folders, or workflow templates.

Authoring implication: search only for `SKILL.md` and you miss half the ecosystem. Scan for host folders (`.claude`, `.codex`, `.agents`, `.gemini`, `.cursor`, `.opencode`, `.cline`), project instructions (`AGENTS.md`, `CLAUDE.md`), commands, hooks, MCP config, validators, and generated docs.

### 2. Skills compose with subagents

`shanraisshan/claude-code-best-practice` documents subagent frontmatter fields such as `skills`, `maxTurns`, `mcpServers`, `hooks`, `memory`, `effort`, and `initialPrompt`. Its key lesson is that skills can be preloaded into a subagent, not merely discovered by the main agent.

Authoring implication: for complex workflows, design a skill as reusable static knowledge and decide whether the executor should be the main agent or a specialized subagent. If the workflow needs a clean context window, tool subset, or role-specific behavior, write the skill so it can be handed to an agent explicitly.

### 3. Memory became a sibling to skills

The same source separates static skills from dynamic memory. A skill captures durable procedure; memory captures evolving user, project, or local facts. ECC reinforces the same direction with continuous-learning skills that observe sessions, create instincts, and promote repeated corrections into skills, commands, or agents.

Authoring implication: do not cram mutable facts into `SKILL.md`. Put stable process in the skill, current facts in memory, and session-derived corrections into instincts until they are proven enough to promote.

### 4. MCP is now scoped infrastructure, not a global toolbox

New sources show MCP server config at user, project, and subagent scopes. `github-mcp-server`, `context7`, `caveman-shrink`, and Symphony-style work orchestration all point in the same direction: skills increasingly assume tool capabilities are installed and scoped deliberately.

Authoring implication: every skill that depends on tools should say which capability boundary it expects. For example: project-level GitHub MCP for repo work, subagent-level browser MCP for QA, user-level documentation MCP for general lookup.

### 5. Commands are compatibility surfaces; skills are the canonical workflow

ECC describes a system of agents, skills, hooks, commands, rules, and MCP config. Its `CLAUDE.md` treats `skills/` as workflow definitions and domain knowledge, while commands dispatch or shortcut workflows. GSD similarly offers minimal install profiles and consolidated parent skills to reduce prompt overhead.

Authoring implication: use commands for entry points and muscle memory, but keep the canonical workflow in a skill or shared rule so it survives host changes and can be invoked by agents without relying on a slash-command UI.

### 6. Verification moved upstream into planning

GSD's planner templates derive `must_haves` from the phase goal before execution and then use verification agents or checklists after implementation. This makes success criteria part of task decomposition, not an afterthought.

Authoring implication: skill labs and workflows should ask for proof before work begins: what must be true, what command or artifact proves it, and what evidence should be reported before claiming completion.

### 7. Token economy is now an explicit skill design problem

`caveman` and `caveman-shrink` treat token reduction as a first-class workflow. The MCP shrink server compresses prose fields while preserving code, URLs, paths, and identifiers. GSD's minimal install profile reports large prompt-overhead reductions by installing only core loop skills.

Authoring implication: do not only shorten prose. Control loaded surfaces: fewer default skills, smaller frontmatter, on-demand references, compact MCP descriptions, and source-specific sparse ingestion.

### 8. Browser QA tool choice has token economics

`shanraisshan/claude-code-best-practice` compares Chrome DevTools MCP, Claude in Chrome, and Playwright MCP. The practical lesson is tool selection by task: Playwright for repeatable E2E and lower overhead, Chrome DevTools for deep network/performance debugging, browser-session tools for logged-in manual verification.

Authoring implication: a browser QA skill should route by evidence need, not by favorite tool. The skill should name when to use Playwright, when to use DevTools, and what artifact counts as proof.

## What this changes in Skill Factory

- The course should teach skill authoring as a four-layer system: skill = static procedure, memory = evolving facts, MCP = scoped capability, subagent = execution context.
- Source updates must end with a synthesis artifact. Cloning repos is collection, not learning.
- Example reviews should annotate runtime fit: whether a behavior belongs in `SKILL.md`, command, memory, hook, MCP config, or subagent frontmatter.
- Maintenance labs should include large-scale sparse scans, because top repos are now too large to clone naively.
- The landscape article should treat product repos and host folders as first-class sources, not only dedicated skill repos.

## Sources

- `raw/repos/affaan-m-ecc/CLAUDE.md` -- production plugin structure: agents, skills, hooks, commands, rules, MCP config, continuous learning.
- `raw/repos/shanraisshan-claude-code-best-practice/best-practice/claude-subagents.md` -- subagent fields including skills, hooks, MCP servers, effort, memory, and initial prompts.
- `raw/repos/shanraisshan-claude-code-best-practice/reports/claude-agent-memory.md` -- skills as static knowledge plus memory as dynamic knowledge.
- `raw/repos/gsd-build-get-shit-done/get-shit-done/templates/planner-subagent-prompt.md` -- goal-backward verification and `must_haves`.
- `raw/repos/caveman/src/mcp-servers/caveman-shrink/README.md` -- MCP description compression while preserving identifiers and code-like tokens.
- `raw/repos/anthropics-claude-code/examples/settings/README.md` -- sandbox scope caveat: Bash sandboxing does not automatically cover other tools or MCP.
- `raw/repos/openai-symphony/elixir/README.md` -- work orchestration, isolated agent runs, Codex sandbox policy, and repo-local skills.
