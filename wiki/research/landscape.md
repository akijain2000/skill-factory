# State of the Agent Skill Ecosystem

The “skill” layer for coding agents sits between the base model and project-specific rules: packaged procedures, bundled scripts, and domain playbooks that hosts discover and load on demand. This article compares **eighteen** high-signal repositories in the local Skill Factory corpus—by format, scale, host compatibility, and engineering trade-offs—not to crown a winner but to show where each system optimizes. (The first seven entries were the original batch; eleven more were added in April 2026.)

## gstack (`garrytan/gstack`)

- **GitHub:** https://github.com/garrytan/gstack  
- **Stars (API snapshot, 2026-04-02):** ~62,043  
- **Skill count:** 34 `SKILL.md` files under the repo root (each skill directory also maintains a `SKILL.md.tmpl` source; `scripts/gen-skill-docs.ts` is ~487 lines).  
- **Formats:** Primary artifact is **SKILL.md** generated from **SKILL.md.tmpl** templates; installation is orchestrated by `setup` (~686 lines), which builds the browse binary, regenerates `.agents/` Codex outputs, and symlinks into host-specific skill roots.  
- **Host compatibility:** Documented paths include Claude Code (`~/.claude/skills/`, project `.claude/skills/`), Codex / “agents” hosts (`.agents/skills/`, `~/.codex/skills/`), Factory Droid (`.factory/skills/`), Kiro, and `setup --host auto` detection.  
- **Strengths:** Industrial-grade **multi-host generation** (frontmatter transforms, path rewrites, optional `agents/openai.yaml`), **template placeholders** tied to real code (`{{COMMAND_REFERENCE}}`, etc.), and **validation tiers** (static command registry checks vs. gated E2E). The architecture doc explains the persistent browser daemon—skills are not prose-only.  
- **Weaknesses:** Heavy operational surface (Bun, Playwright Chromium, binary build). Skills assume gstack runtime assets; portability to minimal hosts requires the setup pipeline.  
- **Notable patterns:** `preamble-tier` in frontmatter, `allowed-tools` lists, hook-based safety skills with **inline safety advisory prose** on non-Claude hosts, and “committed generated SKILL.md” for CI freshness checks.

## autoresearch (`karpathy/autoresearch`)

- **GitHub:** https://github.com/karpathy/autoresearch  
- **Stars:** ~64,252  
- **Skill count:** **0** `SKILL.md` in this clone; the agent contract is **`program.md`** (~115 lines in the sampled file).  
- **Formats:** **program.md** as a lightweight “org chart in prose”—setup branches, experiment loop, logging to `results.tsv`, constraints on what files may be edited.  
- **Host compatibility:** README frames it as “Claude/Codex or whatever”—host-agnostic Markdown, not agentskills.io discovery.  
- **Strengths:** Extreme **scope control** (single editable file `train.py`); **fixed 5-minute wall-clock budget** makes experiments comparable; output formats are specified with concrete examples (val_bpb block, TSV schema).  
- **Weaknesses:** Not interoperable with SKILL.md marketplaces; no progressive disclosure model; human maintains `program.md` outside standard skill tooling.  
- **Notable pattern:** Treating Markdown as **experiment firmware** rather than a shippable capability pack—useful mental model for research/automation repos.

## openai-skills (`openai/skills`)

- **GitHub:** https://github.com/openai/skills  
- **Stars:** ~16,033  
- **Skill count:** **45** `SKILL.md` files locally (`skills/.system/` + `skills/.curated/`; README references `.experimental/` which may not be present in shallow clones).  
- **Formats:** Standard **SKILL.md** with YAML frontmatter; curated skills often add **`metadata.short-description`**; system skills like `skill-creator` document **`agents/openai.yaml`** UI metadata.  
- **Host compatibility:** Positioned for **Codex** (bundled `.system` skills; `$skill-installer` workflow); aligns with agentskills.io narrative.  
- **Strengths:** **Curated vs. system** separation; concise, task-shaped skills (e.g. `gh-address-comments` ~26 lines body) with explicit prereqs; meta-skill teaches degrees of freedom and bundling (`scripts/`, `references/`).  
- **Weaknesses:** Smaller corpus than aggregator repos; some skills depend on bundled Python (`scripts/fetch_comments.py`)—host must allow execution.  
- **Notable patterns:** **Install-by-name** distribution; **metadata** block for UI chips; strong alignment between description and first H1 section.

## anthropic-plugins (`anthropics/claude-plugins-official`)

- **GitHub:** https://github.com/anthropics/claude-plugins-official  
- **Stars:** ~15,791  
- **Skill count:** **25** `SKILL.md` files nested under `plugins/*/skills/`.  
- **Formats:** Plugins bundle **`.claude-plugin/plugin.json`**, optional **MCP**, **commands/**, **agents/**, and **`skills/`** per official layout README. Individual skills are **SKILL.md** (e.g. `build-mcp-server` with `version:` and long phased workflow).  
- **Host compatibility:** **Claude Code** marketplace install (`/plugin install …`).  
- **Strengths:** **First-party quality bar** and security disclaimer; skills are **deep** (multi-phase interrogation before coding); rich **`references/`** splits for auth, deploy, elicitation.  
- **Weaknesses:** Not a flat skill grab-bag—users must reason about **plugin boundaries**; heavier than single-file rules.  
- **Notable patterns:** **Discovery-before-scaffold** workflows; explicit **decision tables**; version field in frontmatter for maintenance.

## awesome-cursorrules (`PatrickJS/awesome-cursorrules`)

- **GitHub:** https://github.com/PatrickJS/awesome-cursorrules  
- **Stars:** ~38,855  
- **Skill count:** **176** `.cursorrules` files under `rules/` (filename `.cursorrules`, not SKILL.md).  
- **Formats:** **`.cursorrules`**—plain prompt-style instructions; some entries use unconventional pseudo-code (e.g. Python list literals in a `.cursorrules` file ~38 lines).  
- **Host compatibility:** **Cursor** editor (legacy/global rules file); overlaps conceptually with project rules in newer Cursor versions.  
- **Strengths:** **Enormous surface area** of stacks (Next.js, FastAPI, mobile, etc.); fast to copy into a repo; encodes **style + architecture** in one blob.  
- **Weaknesses:** **No frontmatter** for discovery/activation; typically loaded as **persistent** editor context rather than on-demand skill selection; inconsistent structure across contributions.  
- **Notable patterns:** “You are an expert in …” role preamble; long **bullet doctrine** for frameworks; **RORO**, early-return error handling, and stack-specific libraries repeated across variants.

## antigravity-awesome-skills (`sickn33/antigravity-awesome-skills`)

- **GitHub:** https://github.com/sickn33/antigravity-awesome-skills  
- **Stars:** ~30,068 (README also claims 29k+ badge; registry comment in README: `stars=28867` as of 2026-03-31).  
- **Skill count:** **4,198** `SKILL.md` files in this workspace snapshot (`find … -name SKILL.md`); README advertises **1,340+** curated catalog size—discrepancy reflects full clone vs. marketing number or counting methodology.  
- **Formats:** **`SKILL.md`** plus **npm installer** (`npx antigravity-awesome-skills`) targeting multiple output roots; **plugin bundles** under `plugins/` (e.g. `antigravity-bundle-essentials`).  
- **Host compatibility:** Table-driven support for Claude Code, Cursor, Codex, Gemini CLI, Antigravity, Kiro, Copilot (manual), OpenCode (`.agents/skills`), AdaL, custom `--path`.  
- **Strengths:** **Installability** and **bundle** story; metadata-rich skills (e.g. `systematic-debugging` with `risk`, `source`, `date_added`); massive **cross-domain** coverage.  
- **Weaknesses:** At this scale, **uniform quality** is impossible without automation; risk of **near-duplicate** skills and stale third-party copies; token budget pressure if users install “everything.”  
- **Notable patterns:** Extra frontmatter for **provenance**; bundling by **role** (essentials vs. systems programming); installer-first UX vs. raw GitHub browsing.

## voltagent-awesome-skills (`VoltAgent/awesome-agent-skills`)

- **GitHub:** https://github.com/VoltAgent/awesome-agent-skills  
- **Stars:** ~13,849  
- **Skill count:** **0** `SKILL.md` in this clone—repository is a **curated index** (README ~1.2k+ lines of links). Badge in README: **1060+** skills enumerated by reference.  
- **Formats:** **Markdown catalog** + outbound links to officialskills.sh and vendor repos—not a monolithic skill tree.  
- **Host compatibility:** README claims Claude Code, Codex, Antigravity, Gemini CLI, Cursor, Copilot, OpenCode, Windsurf, etc.  
- **Strengths:** **Editorial positioning** (“real engineering teams” vs. bulk AI-generated dumps); **single starting point** for vendor-official skills; cross-links to sibling awesome lists.  
- **Weaknesses:** No local install artifact; **link rot** and version drift are external risks; less actionable without following out.  
- **Notable patterns:** **Trust signaling** through vendor sections; use as **meta-directory** rather than skill source.

## superpowers (`obra/superpowers`)

- **GitHub:** https://github.com/obra/superpowers  
- **Stars (approx., 2026-04):** ~131,000  
- **Skill count:** **14** `SKILL.md` files under `skills/` in this clone.  
- **Formats:** **SKILL.md** with YAML frontmatter; shipped as **Claude plugin** (official marketplace + `superpowers-marketplace`), **Cursor** plugin, **Codex/OpenCode** install via raw `INSTALL.md` fetch; **Gemini CLI** extension; **Copilot CLI** marketplace.  
- **Host compatibility:** Explicit per-host docs (`references/codex-tools.md`, Copilot, Gemini); bootstrap skill **`using-superpowers`** mandates Skill-tool invocation before responses.  
- **Strengths:** **End-to-end SDLC workflow** (brainstorm → worktrees → plans → subagent/TDD → review → branch finish); **non-optional** skill culture; clear **instruction priority** (user project docs override skills over default prompt); meta-skill **`writing-skills`**.  
- **Weaknesses:** Opinionated process (TDD/subagents) may fight team norms; heavy reliance on host **Skill tool** behavior; plugin update path varies by vendor.  
- **Notable patterns:** **Mandatory skill gate** (“even 1% chance” invoke skill); **graphviz** workflow diagrams inside SKILL.md; **SUBAGENT-STOP** guards for subagent contexts; **CSO-aware authoring** (keep procedural detail in body, not description summaries); **rationalization tables** in behavioral skills.

## everything-claude-code (`affaan-m/everything-claude-code`)

- **GitHub:** https://github.com/affaan-m/everything-claude-code  
- **Stars (approx., 2026-04):** ~132,000  
- **Skill count:** **425** `SKILL.md` files locally; plus agents, commands, hooks, rules, and install orchestration.  
- **Formats:** **Plugin** (`plugin.json`) + **SKILL.md** + **hooks** + **rules** (often manual install per README) + **shell/PowerShell installers** (`install.sh`, `install.ps1`), manifest-driven selective install, **SQLite** session/state in newer releases.  
- **Host compatibility:** Claude Code first; documented paths toward **Cursor, Codex (app/CLI), OpenCode, Gemini, Antigravity**, etc.  
- **Strengths:** **Harness performance** framing (token/memory/evals); **continuous learning** / instincts; **security** (AgentShield), **orchestration** commands, large **test** surface; selective profiles by language.  
- **Weaknesses:** High complexity; rules not auto-shipped by Claude plugins (manual step); many moving parts for small teams.  
- **Notable patterns:** **Install plan / state store** for incremental adoption; **hook profiles** (`ECC_HOOK_PROFILE`); parity across multiple harnesses; **instinct** YAML layer; **skill stocktake** and **compliance measurement** meta-workflows; **PreToolUse/PostToolUse** hook observers for session capture.

## mcp-servers (`modelcontextprotocol/servers`)

- **GitHub:** https://github.com/modelcontextprotocol/servers  
- **Stars (approx., 2026-04):** ~83,000  
- **Skill count:** **0** `SKILL.md`—this repo is **MCP server implementations**, not agent skills.  
- **Formats:** Reference servers (e.g. Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, Time) plus links to SDKs (TypeScript, Python, Go, Rust, etc.) and **MCP Registry**.  
- **Host compatibility:** Any MCP-capable client (Claude Desktop/Code, Codex-class tools, IDEs); transport/SDK-dependent.  
- **Strengths:** **Canonical patterns** for tools/resources/prompts; educational **SDK usage**; steers production users to **registry** and vendor-maintained servers.  
- **Weaknesses:** Explicitly **not** production-warranted as-is—security/threat model is operator’s job; README’s giant third-party list is **deprecated/unmaintained** per upstream notice.  
- **Notable patterns:** **Sidecar tool servers** as complement to SKILL.md (capabilities live in MCP, playbooks in skills).

## mattpocock-skills (`mattpocock/skills`)

- **GitHub:** https://github.com/mattpocock/skills  
- **Stars (approx., 2026-04):** ~11,000  
- **Skill count:** **19** `SKILL.md` files (one per skill folder).  
- **Formats:** **SKILL.md** + **`npx skills@latest add mattpocock/skills/...`** distribution (npm installer pattern).  
- **Host compatibility:** Aligns with **agentskills.io**-style consumption where the host loads added skill folders.  
- **Strengths:** **Tight, task-shaped** skills (PRD, plan, TDD, triage, Obsidian, pre-commit); **`write-a-skill`** documents progressive disclosure and folder layout; good **reference** for education content authors.  
- **Weaknesses:** Small corpus vs megarepos; some skills assume **GitHub** or **Claude Code** hooks (`git-guardrails-claude-code`).  
- **Notable patterns:** **Per-skill npm add** as distribution; interview-driven **grill-me** / **write-a-prd** workflows; **micro-skills** with minimal body length; **vertical-slice rules** as reusable XML blocks inside skills; explicit teaching that **description is the primary discovery surface**.

## system-prompts (`x1xhlol/system-prompts-and-models-of-ai-tools`)

- **GitHub:** https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools  
- **Stars (approx., 2026-04):** ~134,000  
- **Skill count:** **0** `SKILL.md`; content is **exported/leaked-style system prompts** and model metadata per product.  
- **Formats:** **Markdown/text trees** per vendor/tool (organizational varies); not a skill installer.  
- **Host compatibility:** N/A—**reference / research** only; legal and **ToS** sensitivity for reuse.  
- **Strengths:** **High signal** for what vendors emphasize (tool rules, safety, formatting); useful for **diffing** behavior across products.  
- **Weaknesses:** **Not a packaging standard**; provenance/ethics debated; prompts go stale as vendors ship updates.  
- **Notable patterns:** Treat as **corpus linguistics for agent design**, not copy-paste production prompts.

## fabric (`danielmiessler/fabric`)

- **GitHub:** https://github.com/danielmiessler/fabric  
- **Stars (approx., 2026-04):** ~40,000  
- **Skill count:** **0** `SKILL.md`; hundreds of **`data/patterns/<name>/`** folders (typically **`system.md`** + optional user/input files).  
- **Formats:** **CLI-first** “patterns” (Markdown prompts), **Go** binary, REST API, web UI, many **LLM provider** plugins; **Codex plugin** noted in upstream changelog.  
- **Host compatibility:** Standalone CLI/API; patterns can be **copied** into SKILL.md or tools manually.  
- **Strengths:** **Task taxonomy** (summarize, extract wisdom, audit, coding helpers); rigid **output sections** (IDEAS, QUOTES, …); strong **integration** story for humans augmenting workflows.  
- **Weaknesses:** Different **discovery model** than host-native skills; pattern quality uneven by community contribution; not agentskills.io layout.  
- **Notable patterns:** **Named pattern = one folder**; **section-scaffold** prompts parallel **template patterns** in skill authoring; **suggest_pattern** router; **create_pattern** meta-pattern; **template tokens** and rigid **IDENTITY / STEPS / OUTPUT / INPUT** headings.

## goose (`block/goose`)

- **GitHub:** https://github.com/block/goose  
- **Stars (approx., 2026-04):** ~34,000  
- **Skill count:** **0** `SKILL.md` at repo root narrative—product is an **agent runtime** (CLI + desktop).  
- **Formats:** Rust/core OSS agent; **MCP** extensions; docs and recipes rather than a flat skill markdown corpus in this clone.  
- **Host compatibility:** Local agent; bring-your-own model; MCP for tools.  
- **Strengths:** **Open, extensible** engineering agent; **Block**-backed ops story; good reference for **how skills/MCP/extensions** sit around a host binary.  
- **Weaknesses:** Not a skill marketplace; users compose behavior via **extensions** and docs vs downloading SKILL packs.  
- **Notable patterns:** **Desktop + CLI** parity; **MCP** as extension surface (compare to Claude Code MCP + skills).

## A2A (`a2aproject/A2A`)

- **GitHub:** https://github.com/a2aproject/A2A  
- **Stars (approx., 2026-04):** ~23,000  
- **Skill count:** **0** `SKILL.md`; **protocol spec** and SDK pointers.  
- **Formats:** **Agent2Agent** protocol—**JSON-RPC 2.0** over HTTP(S), **Agent Cards**, streaming/async patterns; Linux Foundation / Google contribution narrative.  
- **Host compatibility:** Implemented by **frameworks** (ADK, LangGraph, etc.), not by dropping files in `.claude/skills/`.  
- **Strengths:** **Inter-agent** collab without exposing memory/tools; complements **MCP** (tools) vs **A2A** (agent-to-agent).  
- **Weaknesses:** Different layer than **SKILL.md** authoring; adoption depends on **servers/SDKs**.  
- **Notable patterns:** **Opaque agents** + **capability discovery**; roadmap items like **`QuerySkill()`** echo skill ecosystem concepts at protocol level.

## awesome-claude-skills (`ComposioHQ/awesome-claude-skills`)

- **GitHub:** https://github.com/ComposioHQ/awesome-claude-skills  
- **Stars (approx., 2026-04):** ~50,000  
- **Skill count:** **864** `SKILL.md` files in this full clone (includes **bundled** plugin/skills trees—not only README links).  
- **Formats:** **Awesome list** (curated links) + **in-repo** skills (e.g. generators, **connect-apps** Composio path) + categories (docs, dev tools, data, …).  
- **Host compatibility:** **Claude Code / Claude ecosystem**-first; **Composio** path for **real actions** across SaaS.  
- **Strengths:** **Onboarding** for newcomers; **Composio** integration story (500+ apps); copies/points to **Anthropic** reference skills.  
- **Weaknesses:** List maintenance burden; **star counts** on linked repos drift; bundled tree is **large** to vendor into CI.  
- **Notable patterns:** **Curated awesome + executable plugin** hybrid; **action skills** beyond text generation.

## openai-codex (`openai/codex`)

- **GitHub:** https://github.com/openai/codex  
- **Stars (approx., 2026-04):** ~72,000  
- **Skill count:** **8** `SKILL.md` in this clone (embedded **samples** under `codex-rs/skills/src/assets/samples/`, plus **`.codex/skills/`** project examples).  
- **Formats:** **Rust** workspace (`codex-rs`), CLI/npm/Homebrew install; **AGENTS.md** project convention; skills as **bundled samples** + local `.codex` skills.  
- **Host compatibility:** **Codex CLI / IDE / app**; aligns with OpenAI **agents** doc patterns (see also `openai/skills` in corpus).  
- **Strengths:** **Reference implementation** of the coding agent; **sandbox/exec policy** stack; shows how **skills** ship **inside** the binary assets.  
- **Weaknesses:** Not a general skill marketplace repo—most users consume **released** CLI, not skill sources here.  
- **Notable patterns:** **Rust-native** agent core; **sample** skill-creator/plugin-creator/imagegen embedded for tooling UX.

## openclaude (`Gitlawb/openclaude`)

- **GitHub:** https://github.com/Gitlawb/openclaude  
- **Stars (approx., 2026-04):** ~7,200  
- **Skill count:** **0** `SKILL.md`; this is a **Claude Code source fork** with a provider abstraction shim, not a skill repository.  
- **Formats:** TypeScript codebase forked from the Claude Code npm source map exposure (March 31, 2026); added **`openaiShim.ts`** (~1,098 lines) translating Anthropic SDK interface to OpenAI Chat Completions API.  
- **Host compatibility:** Runs Claude Code's full tool system (Bash, FileRead/Write/Edit, Glob, Grep, WebFetch, WebSearch, Agent, MCP, Tasks) against **any** OpenAI-compatible model (GPT-4o, DeepSeek, Gemini, Llama, Mistral, Ollama, Codex backend, Atomic Chat).  
- **Strengths:** Proves Claude Code's tool surface is **model-agnostic** via a 786-line shim layer; streaming, multi-step tool chains, sub-agents, images all work; reveals internal tool translation architecture (Anthropic blocks to/from OpenAI function calls and SSE events).  
- **Weaknesses:** No thinking mode, no prompt caching, no beta features; model quality varies (smaller models struggle with agentic tool use); based on leaked/exposed source (legal/ToS sensitivity).  
- **Notable patterns:** **Provider shim as portability layer** -- skills authored for Claude Code's tool set work unchanged on 200+ models; the skill instructions stay constant, only the underlying LLM changes. This validates the thesis that **well-written SKILL.md files are model-independent**, not just host-independent.

## Comparison summary

| Repo | Primary unit | Scale | Discovery model | Best for |
|------|--------------|-------|-----------------|----------|
| gstack | SKILL.md (+ tmpl) | Tens (deep) | Slash commands + symlinks | End-to-end eng workflows + browser QA |
| autoresearch | program.md | 1 doc | Manual pointer | Controlled autonomous loops |
| openai-skills | SKILL.md | Dozens | Codex installer + system bundle | Reference-quality Codex skills |
| anthropic-plugins | plugin + SKILL | Dozens | Claude marketplace | Official MCP & setup journeys |
| awesome-cursorrules | .cursorrules | 100+ | Editor config | Stack-specific coding style |
| antigravity-awesome-skills | SKILL.md | 1000–4000+ | NPM + plugins | Breadth + installer ergonomics |
| voltagent-awesome-skills | README links | 1000+ refs | Human browsing | Vendor-official map |

| Repo (2026-04 batch) | Primary unit | Scale | Discovery model | Best for |
|----------------------|--------------|-------|-----------------|----------|
| superpowers | SKILL.md + plugin | 14 skills | Skill tool + marketplace | Mandatory workflow + TDD/subagent culture |
| everything-claude-code | plugin + skills + hooks | 400+ skills | Installers + plugin | Full harness tuning + cross-host parity |
| mcp-servers | MCP servers | Few refs | MCP client/registry | Tool sidecars + SDK examples |
| mattpocock-skills | SKILL.md | 19 | `npx skills add` | Small curated edu/PRD/TDD set |
| system-prompts | prompt dumps | Large tree | Browse-only | Research vendor system prompts |
| fabric | pattern folders | Many patterns | CLI/API aliases | Human-facing prompt library |
| goose | agent binary | n/a | MCP extensions | Self-hosted agent reference |
| A2A | protocol spec | n/a | Agent cards / JSON-RPC | Agent-to-agent interoperability |
| awesome-claude-skills | README + skills | 800+ SKILL.md in clone | Awesome + Composio plugin | Curated links + action integrations |
| openai-codex | Rust CLI + samples | 8 SKILL.md samples | Codex product | Terminal agent + embedded skill samples |
| openclaude | Provider shim | 0 (fork) | Any OpenAI-compat model | Model-agnostic skill execution proof |

**Analytical takeaway:** The ecosystem splits into **host-native packs** (gstack, OpenAI system skills, superpowers, ECC), **marketplace/directory** layers (Antigravity, VoltAgent, awesome-claude-skills), **editor rules** (awesome-cursorrules), **protocol/sidecar** layers (**MCP** tool servers, **A2A** agent mesh), **prompt libraries** (fabric, system-prompts research), **agent distributions** (**Codex**, **goose**) that embed or accompany skill-like assets, and **provider shims** (**openclaude**) that prove the tool surface is model-agnostic. Authors should pick the layer that matches **how often** the guidance must apply, **how narrow** the triggering intent is, and whether capability lives in **prose skills**, **tools (MCP)**, or **remote agents (A2A)**.

**Cross-repo synthesis (2026-04):** **superpowers** contributed test-backed **Claude Search Optimization (CSO)** lessons—YAML descriptions that summarize workflows can cause models to **skip SKILL.md bodies**—plus **rationalization tables** and other guardrails in skills such as **verification-before-completion**. **everything-claude-code** pairs a very large bundled skill surface with **meta-governance** (instincts, stocktake, rules distillation, compliance measurement, hook-driven session memory) so libraries are maintained, not only grown. **Fabric** remains the reference for **composable** prompts: routers like **suggest_pattern**, meta-patterns like **create_pattern**, and runtime **stacking** of strategy + context + pattern. **mattpocock/skills** demonstrates **micro-skills** (e.g. **grill-me**): a few lines of body can still encode a sharp behavioral loop when discovery text is precise.

## Sources

- `skill-factory/raw/repos/gstack/README.md`, `ARCHITECTURE.md`, `setup`, `scripts/gen-skill-docs.ts`  
- `skill-factory/raw/repos/autoresearch/README.md`, `program.md`  
- `skill-factory/raw/repos/openai-skills/README.md`, `skills/.curated/gh-address-comments/SKILL.md`, `skills/.system/skill-creator/SKILL.md`  
- `skill-factory/raw/repos/anthropic-plugins/README.md`, `plugins/mcp-server-dev/skills/build-mcp-server/SKILL.md`  
- `skill-factory/raw/repos/awesome-cursorrules/README.md`, sample `.cursorrules` under `rules/`  
- `skill-factory/raw/repos/antigravity-awesome-skills/README.md`, `plugins/antigravity-bundle-essentials/skills/systematic-debugging/SKILL.md`  
- `skill-factory/raw/repos/voltagent-awesome-skills/README.md`  
- `skill-factory/raw/repos/superpowers/README.md`, `skills/using-superpowers/SKILL.md`  
- `skill-factory/raw/repos/everything-claude-code/README.md`  
- `skill-factory/raw/repos/mcp-servers/README.md`  
- `skill-factory/raw/repos/mattpocock-skills/README.md`, `write-a-skill/SKILL.md`  
- `skill-factory/raw/repos/system-prompts/README.md`  
- `skill-factory/raw/repos/fabric/README.md`, `data/patterns/extract_wisdom/system.md`  
- `skill-factory/raw/repos/goose/README.md`  
- `skill-factory/raw/repos/A2A/README.md`  
- `skill-factory/raw/repos/awesome-claude-skills/README.md`  
- `skill-factory/raw/repos/openai-codex/README.md`  
- `skill-factory/raw/repos/openclaude/README.md`, `src/services/api/openaiShim.ts`  
- `skill-factory/raw/docs/agentskills-io-spec.md`, `agentskills-io-best-practices.md`  
- GitHub REST API `stargazers_count` for repos listed above (queried 2026-04-02)  
- Local counts: `find … -name 'SKILL.md' | wc -l`, `find … -name '.cursorrules' | wc -l`
