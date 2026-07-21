# Monthly Update - May 2026

## Search Method

Started from top GitHub repositories using `raw/repos/github-ranking/Top100/Top-100-stars.md`, then scanned TypeScript, Python, Rust, Go, Shell, and JavaScript rankings plus the May 25 full ranking CSV. Candidates were filtered with `scripts/discovery-keywords.txt` and scored with the 1-5 relevance rubric in `scripts/update-sources.md`.

## Candidate Table

| Repo | Stars | Score | Decision | Why |
|------|-------|-------|----------|-----|
| anthropics/skills | ~140K | 5 | Added | Direct first-party Agent Skills examples, template, and spec pointer |
| google-gemini/gemini-cli | ~105K | 4 | Added | Terminal agent with `.gemini/skills`, built-in skill creator, evals |
| anomalyco/opencode | ~165K | 4 | Added | Coding agent with `.opencode/skills` and skill-loading fixtures |
| cline/cline | ~62K | 4 | Added | Coding agent with `.agents` / `.cline` skill examples |
| browser-use/browser-use | ~95K | 4 | Added | Browser agent with focused operational skills |
| addyosmani/agent-skills | ~45K | 5 | Added | Production engineering skill library with anatomy guide and validator |
| safishamsi/graphify | ~53K | 5 | Added | Cross-host command skill with persistent graph workflow |
| nexu-io/open-design | ~51K | 5 | Added | Large design-skill system with GenUI atoms and examples |
| github/github-mcp-server | ~30K | 3 | Added | Official GitHub MCP server; tool-side complement to GitHub skills |
| VoltAgent/awesome-claude-code-subagents | ~20K | 3 | Added | Subagent catalog useful for skill vs agent boundary analysis |
| anthropics/claude-code | ~126K | 4 | Skipped for now | High-signal, but shallow clone stalled; needs targeted sparse ingest |
| n8n-io/n8n | ~190K | 2 | Skipped | Workflow automation platform; less direct skill-authoring signal |
| langgenius/dify | ~143K | 2 | Skipped | Agent workflow platform; less direct SKILL.md evidence |
| langflow-ai/langflow | ~149K | 2 | Skipped | Agent workflow builder; lower skill-format signal |
| Significant-Gravitas/AutoGPT | ~185K | 3 | Skipped | Agent framework, but less current SKILL.md relevance than added repos |

## Expanded 100+ Candidate Review

The first update pass reviewed a focused top-repo set. A second pass scanned the May 25 ranking CSV and found 222 additional keyword-matching repos. The table below records the first 120 reviewed candidates beyond the repos already in `raw/repos/SOURCES.md`; high-signal and strong-candidate repos were considered for cloning, while broad framework/tooling repos were kept as context only unless they taught SKILL.md authoring directly.

| Repo | Stars | Score | Decision | Why |
|------|-------|-------|----------|-----|
| affaan-m/ecc | ~190K | 5 | High-signal | The agent harness performance optimization system. Skills, instincts, memory, security, an |
| multica-ai/andrej-karpathy-skills | ~152K | 5 | High-signal | A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's ob |
| chalarangelo/30-seconds-of-code | ~127K | 5 | High-signal | Coding articles to level up your development skills |
| bytedance/deer-flow | ~69K | 5 | High-signal | An open-source long-horizon SuperAgent harness that researches, codes, and creates. With t |
| juliusbrussee/caveman | ~64K | 5 | High-signal | 🪨 why use many token when few token do trick — Claude Code skill that cuts 65% of tokens b |
| santifer/career-ops | ~47K | 5 | High-signal | AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, PDF gener |
| googleworkspace/cli | ~26K | 5 | High-signal | Google Workspace CLI — one command-line tool for Drive, Gmail, Calendar, Sheets, Docs, Cha |
| donchitos/claude-code-game-studios | ~19K | 5 | High-signal | Turn Claude Code into a full game dev studio — 49 AI agents, 72 workflow skills, and a com |
| zarazhangrui/frontend-slides | ~18K | 5 | High-signal | Create beautiful slides on the web using Claude's frontend skills |
| alchaincyf/huashu-design | ~14K | 5 | High-signal | Huashu Design · HTML-native design skill for Claude Code · Claude Code 里 HTML 原生的设计 skill  |
| op7418/guizang-ppt-skill | ~11K | 5 | High-signal | AI-agent Skill for generating polished HTML slide decks: editorial magazine and Swiss layo |
| orchestra-research/ai-research-skills | ~8K | 5 | High-signal | Comprehensive open-source library of AI research and engineering skills for any AI model.  |
| gudastudio/skills | ~2K | 5 | High-signal | This repository contains a collection of Agent Skills developed by GudaStudio, enabling se |
| ultraworkers/claw-code | ~192K | 4 | Strong candidate | The repo is finally unlocked. enjoy the party! The fastest repo in history to surpass 100K |
| anthropics/claude-code | ~126K | 4 | Strong candidate | Claude Code is an agentic coding tool that lives in your terminal, understands your codeba |
| farion1231/cc-switch | ~79K | 4 | Strong candidate | A cross-platform desktop All-in-One assistant for Claude Code, Codex, OpenCode, OpenClaw,  |
| thedotmack/claude-mem | ~77K | 4 | Strong candidate | Persistent Context Across Sessions for Every Agent –  Captures everything your agent does  |
| gsd-build/get-shit-done | ~63K | 4 | Strong candidate | A light-weight and powerful meta-prompting, context engineering and spec-driven developmen |
| shareai-lab/learn-claude-code | ~62K | 4 | Strong candidate | Bash is all you need -  A nano claude code–like 「agent harness」, built from 0 to 1 |
| code-yeongyu/oh-my-openagent | ~59K | 4 | Strong candidate | omo; the best agent harness - previously oh-my-opencode |
| ruvnet/ruflo | ~54K | 4 | Strong candidate | 🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swar |
| earendil-works/pi | ~54K | 4 | Strong candidate | AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vL |
| router-for-me/cliproxyapi | ~34K | 4 | Strong candidate | Wrap Gemini CLI, Antigravity, ChatGPT Codex, Claude Code, Grok Build as an OpenAI/Gemini/C |
| hmbown/codewhale | ~34K | 4 | Strong candidate | Coding agent for open source, open weight models  |
| bloopai/vibe-kanban | ~26K | 4 | Strong candidate | Get 10X more out of Claude Code, Codex or any coding agent |
| openai/symphony | ~24K | 4 | Strong candidate | Symphony turns project work into isolated, autonomous implementation runs, allowing teams  |
| manaflow-ai/cmux | ~19K | 4 | Strong candidate | Ghostty-based macOS terminal with vertical tabs and notifications for AI coding agents |
| steipete/codexbar | ~13K | 4 | Strong candidate | Show usage stats for OpenAI Codex and Claude Code, without having to login. |
| jnmetacode/agency-agents-zh | ~12K | 4 | Strong candidate | 🎭 211 个即插即用的 AI 专家角色 — 支持 Hermes Agent/Claude Code/Cursor/Copilot 等 16 种工具，覆盖工程/设计/营销/金融等  |
| n8n-io/n8n | ~189K | 3 | Context only | Fair-code workflow automation platform with native AI capabilities. Combine visual buildin |
| f/prompts.chat | ~162K | 3 | Context only | f.k.a. Awesome ChatGPT Prompts. Share, discover, and collect prompts from the community. F |
| langgenius/dify | ~142K | 3 | Context only | Production-ready platform for agentic workflow development. |
| ggml-org/llama.cpp | ~112K | 3 | Context only | LLM inference in C/C++ |
| shubhamsaboo/awesome-llm-apps | ~111K | 3 | Context only | 100+ AI Agent & RAG apps you can actually run — clone, customize, ship. |
| infiniflow/ragflow | ~81K | 3 | Context only | RAGFlow is a leading open-source Retrieval-Augmented Generation (RAG) engine that fuses cu |
| vllm-project/vllm | ~80K | 3 | Context only | A high-throughput and memory-efficient inference and serving engine for LLMs |
| tauricresearch/tradingagents | ~79K | 3 | Context only | TradingAgents: Multi-Agents LLM Financial Trading Framework |
| paddlepaddle/paddleocr | ~78K | 3 | Context only | Turn any PDF or image document into structured data for your AI. A powerful, lightweight O |
| nomic-ai/gpt4all | ~77K | 3 | Context only | GPT4All: Run Local LLMs on Any Device. Open-source and available for commercial use. |
| hiyouga/llamafactory | ~71K | 3 | Context only | Unified Efficient Fine-Tuning of 100+ LLMs & VLMs (ACL 2024) |
| binary-husky/gpt_academic | ~70K | 3 | Context only | 为GPT/GLM等LLM大语言模型提供实用化交互接口，特别优化论文阅读/润色/写作体验，模块化设计，支持自定义快捷按钮&函数插件，支持Python和C++等项目剖析&自译解功能，P |
| foundationagents/metagpt | ~68K | 3 | Context only | 🌟 The Multi-Agent Framework: First AI Software Company, Towards Natural Language Programmi |
| unclecode/crawl4ai | ~66K | 3 | Context only | 🚀🤖 Crawl4AI: Open-source LLM Friendly Web Crawler & Scraper. Don't be shy, join here: http |
| opendatalab/mineru | ~64K | 3 | Context only | Transforms complex documents like PDFs and Office docs into LLM-ready markdown/JSON for yo |
| pathwaycom/pathway | ~63K | 3 | Context only | Python ETL framework for stream processing, real-time analytics, LLM pipelines, and RAG. |
| mintplex-labs/anything-llm | ~60K | 3 | Context only | The all-in-one AI productivity accelerator. On device and privacy first with no annoying s |
| warpdotdev/warp | ~59K | 3 | Context only | Warp is an agentic development environment, born out of the terminal. |
| microsoft/autogen | ~58K | 3 | Context only | A programming framework for agentic AI |
| sansan0/trendradar | ~58K | 3 | Context only | ⭐AI-driven public opinion & trend monitor with multi-platform aggregation, RSS, and smart  |
| harry0703/moneyprinterturbo | ~57K | 3 | Context only | 利用AI大模型，一键生成高清短视频 Generate short videos with one click using AI LLM. |
| starship/starship | ~57K | 3 | Context only | ☄🌌️  The minimal, blazing-fast, and infinitely customizable prompt for any shell! |
| upstash/context7 | ~56K | 3 | Context only | Context7 Platform -- Up-to-date code documentation for LLMs and AI code editors |
| shanraisshan/claude-code-best-practice | ~54K | 3 | Context only | from vibe coding to agentic engineering - practice makes claude perfect |
| rtk-ai/rtk | ~53K | 3 | Context only | CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. Single Rust |
| mudler/localai | ~46K | 3 | Context only | LocalAI is the open-source AI engine. Run any model - LLMs, vision, voice, image, video -  |
| jeecgboot/jeecgboot | ~46K | 3 | Context only | AI 低代码平台，「低代码 + 零代码」双模式驱动：低代码一键生成前后端代码，零代码 5 分钟搭建系统，AI Skills 一句话画流程、设计表单、生成整套系统。内置 AI聊天、知 |
| cherryhq/cherry-studio | ~46K | 3 | Context only | AI productivity studio with smart chat, autonomous agents, and 300+ assistants. Unified ac |
| aaif-goose/goose | ~45K | 3 | Context only | an open source, extensible AI agent that goes beyond code suggestions - install, execute,  |
| pingcap/tidb | ~40K | 3 | Context only | TiDB is built for agentic workloads that grow unpredictably, with ACID guarantees and nati |
| zhulinsen/daily_stock_analysis | ~38K | 3 | Context only | LLM驱动的 A/H/美股智能分析：多数据源行情 + 实时新闻 + LLM决策仪表盘 + 多渠道推送，零成本定时运行，纯白嫖. LLM-powered stock analysis |
| quantumnous/new-api | ~35K | 3 | Context only | A unified AI model hub for aggregation & distribution. It supports cross-converting variou |
| songquanpeng/one-api | ~34K | 3 | Context only | LLM API 管理 & 分发系统，支持 OpenAI、Azure、Anthropic Claude、Google Gemini、DeepSeek、字节豆包、ChatGLM、文心一 |
| conductor-oss/conductor | ~31K | 3 | Context only | Conductor is an event driven agentic workflow engine providing durable and highly resilien |
| microsoft/semantic-kernel | ~27K | 3 | Context only | Integrate cutting-edge LLM technology quickly and easily into your apps |
| 78/xiaozhi-esp32 | ~26K | 3 | Context only | An MCP-based chatbot / 一个基于MCP的聊天机器人 |
| alexsjones/llmfit | ~26K | 3 | Context only | Hundreds of models & providers. One command to find what runs on your hardware. |
| mozilla-ai/llamafile | ~24K | 3 | Context only | Distribute and run LLMs with a single file. |
| liguodongiot/llm-action | ~24K | 3 | Context only | 本项目旨在分享大模型相关技术原理以及实战经验（大模型工程化、大模型应用落地） |
| spaceship-prompt/spaceship-prompt | ~20K | 3 | Context only | 🚀✨ Minimalistic, powerful and extremely customizable Zsh prompt |
| wdndev/llm_interview_note | ~14K | 3 | Context only | 主要记录大语言大模型（LLMs） 算法（应用）工程师相关的知识及面试题 |
| sindresorhus/pure | ~14K | 3 | Context only | Pretty, minimal and fast ZSH prompt |
| powershellmafia/powersploit | ~12K | 3 | Context only | PowerSploit - A PowerShell Post-Exploitation Framework |
| hmemcpy/milewski-ctfp-pdf | ~11K | 3 | Context only | Bartosz Milewski's 'Category Theory for Programmers' unofficial PDF and LaTeX source |
| louisshark/chatgpt_system_prompt | ~10K | 3 | Context only | A collection of GPT system prompts and various prompt injection/leaking knowledge. |
| ohmyzsh/ohmyzsh | ~187K | 2 | Skipped | 🙃   A delightful community-driven (with 2,500+ contributors) framework for managing your z |
| microsoft/vscode | ~185K | 2 | Skipped | Visual Studio Code |
| significant-gravitas/autogpt | ~184K | 2 | Skipped | AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission i |
| github/gitignore | ~174K | 2 | Skipped | A collection of useful .gitignore templates |
| ollama/ollama | ~172K | 2 | Skipped | Get up and running with Kimi-K2.5, GLM-5, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and othe |
| nousresearch/hermes-agent | ~165K | 2 | Skipped | The agent that grows with you |
| huggingface/transformers | ~160K | 2 | Skipped | 🤗 Transformers: the model-definition framework for state-of-the-art machine learning model |
| langflow-ai/langflow | ~148K | 2 | Skipped | Langflow is a powerful tool for building and deploying AI-powered agents and workflows. |
| open-webui/open-webui | ~138K | 2 | Skipped | User-friendly AI Interface (Supports Ollama, OpenAI API, ...) |
| langchain-ai/langchain | ~137K | 2 | Skipped | The agent engineering platform. |
| firecrawl/firecrawl | ~123K | 2 | Skipped | 🔥 Search, scrape, and clean the web for AI agents. |
| msitarzewski/agency-agents | ~104K | 2 | Skipped | A complete AI agency at your fingertips - From frontend wizards to Reddit community ninjas |
| openai/whisper | ~100K | 2 | Skipped | Robust Speech Recognition via Large-Scale Weak Supervision |
| neovim/neovim | ~99K | 2 | Skipped | Vim-fork focused on extensibility and usability |
| microsoft/playwright | ~89K | 2 | Skipped | Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Fire |
| chatgptnextweb/nextchat | ~88K | 2 | Skipped | ✨ Light and Fast AI Assistant. Support: Web / iOS / MacOS / Android /  Linux / Windows |
| home-assistant/core | ~87K | 2 | Skipped | :house_with_garden: Open source home automation that puts local control and privacy first. |
| nextlevelbuilder/ui-ux-pro-max-skill | ~82K | 2 | Skipped | An AI SKILL that provide design intelligence for building professional UI/UX multiple plat |
| fighting41love/funnlp | ~80K | 2 | Skipped | 中英文敏感词、语言检测、中外手机/电话归属地/运营商查询、名字推断性别、手机号抽取、身份证抽取、邮箱抽取、中日文人名库、中文缩写库、拆字词典、词汇情感值、停用词、反动词表、暴恐词表 |
| lobehub/lobehub | ~77K | 2 | Skipped | 🤯 LobeHub is your Chief Agent Operator, organizing your agents into 7×24 operations by hir |
| ansible/ansible | ~68K | 2 | Skipped | Ansible is a radically simple IT automation platform that makes your applications and syst |
| openbb-finance/openbb | ~68K | 2 | Skipped | Financial data platform for analysts, quants and AI agents. |
| paperclipai/paperclip | ~67K | 2 | Skipped | The open-source app everyone uses to manage agents at work |
| labmlai/annotated_deep_learning_paper_implementations | ~66K | 2 | Skipped | 🧑‍🏫 60+ Implementations/tutorials of deep learning papers with side-by-side notes 📝; inclu |
| xtekky/gpt4free | ~66K | 2 | Skipped | The official gpt4free repository / various collection of powerful language models / opus 4 |
| unslothai/unsloth | ~65K | 2 | Skipped | Unsloth Studio is a web UI for training and running open models like Gemma 4, Qwen3.6, Dee |
| 666ghj/mirofish | ~62K | 2 | Skipped | A Simple and Universal Swarm Intelligence Engine, Predicting Anything. 简洁通用的群体智能引擎，预测万物 |
| adam-p/markdown-here | ~60K | 2 | Skipped | Google Chrome, Firefox, and Thunderbird extension that lets you write email in Markdown an |
| filosottile/mkcert | ~58K | 2 | Skipped | A simple zero-config tool to make locally trusted development certificates with any names  |
| karpathy/nanogpt | ~58K | 2 | Skipped | The simplest, fastest repository for training/finetuning medium-sized GPTs. |
| rvc-boss/gpt-sovits | ~57K | 2 | Skipped | 1 min voice data can also be used to train a good TTS model! (few shot voice cloning) |
| h5bp/html5-boilerplate | ~57K | 2 | Skipped | A professional front-end template for building fast, robust, and adaptable web apps or sit |
| zylon-ai/private-gpt | ~57K | 2 | Skipped | Interact with your documents using the power of GPT, 100% privately, no data leaks |
| mem0ai/mem0 | ~56K | 2 | Skipped | Universal memory layer for AI Agents |
| foundationagents/openmanus | ~56K | 2 | Skipped | No fortress, purely open ground.  OpenManus is Coming. |
| coollabsio/coolify | ~55K | 2 | Skipped | An open-source, self-hostable PaaS alternative to Vercel, Heroku & Netlify that lets you e |
| antonosika/gpt-engineer | ~55K | 2 | Skipped | CLI platform to experiment with codegen. Precursor to: https://lovable.dev |
| zie619/n8n-workflows | ~54K | 2 | Skipped | all of the workflows of n8n i could find (also from the site itself) |
| lencx/chatgpt | ~54K | 2 | Skipped | 🔮 ChatGPT Desktop Application (Mac, Windows and Linux) |
| karpathy/nanochat | ~54K | 2 | Skipped | The best ChatGPT that $100 can buy. |
| datawhalechina/hello-agents | ~53K | 2 | Skipped | 📚 《从零开始构建智能体》——从零开始的智能体原理与实践教程 |
| flowiseai/flowise | ~53K | 2 | Skipped | Build AI Agents, Visually |
| crewaiinc/crewai | ~52K | 2 | Skipped | Framework for orchestrating role-playing, autonomous AI agents. By fostering collaborative |
| ggml-org/whisper.cpp | ~50K | 2 | Skipped | Port of OpenAI's Whisper model in C/C++ |
| huginn/huginn | ~49K | 2 | Skipped | Create agents that monitor and act on your behalf.  Your agents are standing by! |
| hashicorp/terraform | ~48K | 2 | Skipped | Terraform enables you to safely and predictably create, change, and improve infrastructure |

## New Sources Added

- `anthropic-skills`: Direct Anthropic skills repository with 18 `SKILL.md` files, template, and spec pointer.
- `gemini-cli`: 20 `SKILL.md` files, including `.gemini/skills` and a built-in skill creator sample.
- `opencode`: 4 `SKILL.md` files under `.opencode` and test fixtures.
- `cline`: 4 `SKILL.md` files under `.agents` / `.cline`.
- `browser-use`: 4 focused browser/cloud/open-source skills.
- `agent-skills`: 23 production engineering skills, `docs/skill-anatomy.md`, and `scripts/validate-skills.js`.
- `graphify`: Cross-host command skill variants such as `graphify/skill-codex.md`.
- `open-design`: 422 `SKILL.md` files spanning atoms, examples, and design workflows.
- `github-mcp-server`: Official GitHub MCP server for repo/issue/PR/workflow tools.
- `awesome-claude-code-subagents`: Catalog of 154+ Claude Code subagents.

Additional high-signal sources from the expanded scan:

- `karpathy-skills`: Karpathy-derived Claude Code behavior guide; one root skill-like instruction set.
- `deer-flow`: 22 `SKILL.md` files in a long-horizon SuperAgent harness.
- `caveman`: 15 `SKILL.md` files focused on terse, token-saving agent behavior.
- `career-ops`: 3 `SKILL.md` files for job-search workflows.
- `googleworkspace-cli`: 95 `SKILL.md` files around Google Workspace agent capabilities.
- `claude-code-game-studios`: 73 `SKILL.md` files in a game-studio agent hierarchy.
- `frontend-slides`: 2 `SKILL.md` files for Claude frontend slide generation.
- `huashu-design`: 1 HTML-native design skill for Claude Code.
- `guizang-ppt-skill`: 1 presentation-generation skill.
- `ai-research-skills`: 98 `SKILL.md` files for AI research and engineering workflows.
- `guda-skills`: Agent Skills collection; no root `SKILL.md` files in the shallow count, but useful for packaging comparison.
- `claude-mem`: 18 `SKILL.md` files around persistent context/memory.
- `learn-claude-code`: 4 `SKILL.md` files plus a nano Claude Code-like harness.
- `cc-switch`: Cross-agent assistant launcher; no `SKILL.md` files in the shallow count, but useful host interoperability signal.
- `vibe-kanban`: Coding-agent orchestration UI; no `SKILL.md` files in the shallow count, but relevant to orchestration patterns.
- `codexbar`: 1 `SKILL.md` file plus Codex/Claude usage monitoring patterns.

## 100-Repo Sparse Expansion

After the focused 26-repo update, a third pass selected 100 additional repos from 377 available keyword-matching candidates in the May 25 ranking CSV. The expansion used sparse partial clones so large repos could be ingested without checking out full source trees.

Sparse checkout prioritized:

- `README*` and nested README files
- `SKILL.md`, `AGENTS.md`, and `CLAUDE.md` at any depth
- host folders: `.claude`, `.codex`, `.agents`, `.gemini`, `.opencode`, `.cline`, `.cursor`
- skill/runtime folders: `skills`, `skill`, `agents`, `commands`, `plugins`, `docs`
- scripts with `skill`, `validate`, `check`, `agent`, `prompt`, or `mcp` in the name

Expansion coverage:

- 100/100 selected repos cloned successfully.
- 1,645 `SKILL.md` files found in the 100-repo sparse batch.
- 165 `AGENTS.md` files found in the batch.
- 73 `CLAUDE.md` files found in the batch.
- Whole local source corpus now exposes 8,859 `SKILL.md` files across 144 non-ranking repos.

Highest-signal learning sources from the expansion:

- `affaan-m/ecc`: skills as one surface in a larger runtime with agents, hooks, commands, rules, MCP config, instincts, memory, security, and continuous learning.
- `shanraisshan/claude-code-best-practice`: subagents can preload skills and use scoped MCP, hooks, memory, effort, and max-turn configuration.
- `gsd-build/get-shit-done`: goal-backward verification and `must_haves` are derived during planning, before execution.
- `caveman`: token reduction is not just prose style; it can be implemented as an MCP middleware that compresses tool descriptions.
- `openai/symphony`: teams are moving from "manage coding agent sessions" to "manage work units with isolated runs and proof-of-work gates."
- `anthropics/claude-code`: settings examples clarify that Bash sandboxing does not automatically sandbox Read, Write, WebSearch, WebFetch, MCP, hooks, or internal commands.

All 100 repo names are now listed in `raw/repos/SOURCES.md`; the full candidate TSV used for the expansion was generated at `/tmp/skill_factory_100_new_repos.tsv` during the run.

## Existing Sources Updated

All existing source repos were fetched. Many shallow clones had upstream forced updates; after confirming clean working trees, they were refreshed to their fetched `origin/<branch>` tip.

## Wiki Articles Updated

- `raw/repos/SOURCES.md`: added 26 focused repos plus 100 sparse expansion repos and a monthly discovery log.
- `wiki/research/landscape.md`: added a May 2026 source batch synthesis.
- `wiki/research/skill-evolution-2026-05.md`: added the 100-repo synthesis article.
- `wiki/INDEX.md`: added this monthly update note.
- `wiki/GLOSSARY.md`: added memory, MCP scope, and skill-agent composition terms.
- `course/08-advanced-techniques.md`: added skill-agent-memory-MCP layering and goal-backward verification labs.
- `course/10-maintaining-library.md`: added the 100-repo sparse expansion maintenance lab.

## New Patterns Observed

- First-party skill specs are now split across direct skill repos (`anthropics/skills`) and plugin repos (`anthropics/claude-plugins-official`).
- Multiple coding agents now ship host-native skill folders inside their own repos: `.gemini/skills`, `.opencode/skills`, `.agents/skills`, `.cline/skills`.
- Addy Osmani's `agent-skills` makes rationalization tables, red flags, and verification sections validator-enforced rather than merely recommended.
- Open Design shows skill atoms and GenUI surfaces as a design-system-like composition layer.
- Graphify demonstrates a persistent artifact pattern: a skill can create durable state (`graphify-out/`) that future agent sessions should query before re-reading raw files.
- Skills increasingly compose with subagents: `skills` frontmatter can preload static skill content into a specialist executor.
- Memory is emerging as a sibling layer: static process in skills, dynamic user/project facts in memory, session corrections in instincts.
- MCP config is moving into scoped user/project/subagent capability boundaries instead of one global tool bag.
- Commands are often compatibility and convenience surfaces; canonical workflow still belongs in skills or shared rules.
- Planning templates increasingly derive verification `must_haves` before execution starts.
- Token economy now includes install-surface size, sparse source ingestion, MCP description length, and minimal skill profiles.

## Stats

- Total repos in `raw/repos/SOURCES.md`: 145 including `github-ranking`.
- New focused repos added this update: 26.
- Additional sparse expansion repos added this update: 100.
- New SKILL.md files observed in the 100-repo sparse expansion: 1,645.
- Whole local source corpus SKILL.md files visible after sparse expansion: 8,859.
- Expanded candidate scan: 377 keyword-matching repos available after excluding tracked sources; 100 cloned in the sparse expansion.
