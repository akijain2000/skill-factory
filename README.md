# Skill Factory

**An LLM knowledge base and course for authoring production-quality AI agent skills.**

Built on [Karpathy's LLM-KB pattern](https://x.com/karpathy/status/1909366683415642209): raw sources are collected from 19 repositories and 12 reference documents, LLM-compiled into a structured wiki of 40+ articles, then queried by a meta-skill to produce better [SKILL.md](https://agentskills.io/specification) files.

```
                ┌─────────────────────────────────────────────┐
                │            RAW SOURCES (19 repos)           │
                │  gstack, superpowers, fabric, codex, ...    │
                │  + 12 reference docs (specs, best practices)│
                └────────────────────┬────────────────────────┘
                                     │
                          compile-wiki.md (LLM)
                                     │
                                     ▼
                ┌─────────────────────────────────────────────┐
                │         COMPILED WIKI (40+ articles)        │
                │  20 concepts · 9 research · 11 examples     │
                │  INDEX.md · GLOSSARY.md · query logs        │
                └────────────────────┬────────────────────────┘
                                     │
                    authoring/SKILL.md + skill-maker + prompt-decomposer
                                     │
                                     ▼
                ┌─────────────────────────────────────────────┐
                │        NEW SKILLS (higher quality)          │
                │  Validated · Host-portable · Token-lean     │
                └────────────────────┬────────────────────────┘
                                     │
                          health-check.md (audit loop)
                                     │
                                     ▼
                              Wiki improves ↺
```

---

## What this is

This repo is five things:

1. **A knowledge base** -- 40+ wiki articles distilled from 19 top AI agent repos (700K+ stars combined), covering every pattern, anti-pattern, and technique for writing skills
2. **An 11-module course** -- Zero-to-hero curriculum with hands-on labs, sample problems, and before/after examples
3. **A Skill Maker** -- A gstack-style interactive `skill-maker/SKILL.md` that asks forcing questions, challenges assumptions, and guides you through creating validated skills
4. **A Prompt Decomposer** -- A `prompt-decomposer/SKILL.md` that takes a large prompt, system instructions, or runbook and identifies sections that could become standalone skills, then helps you build them
5. **A meta-skill** -- An `authoring/SKILL.md` that queries the wiki to help you write, review, and improve skills using everything the KB has learned

## Why this exists

The SKILL.md format is an open standard supported by 27+ AI coding agents (Claude Code, Cursor, Codex CLI, Gemini CLI, and more). But writing a good skill is harder than it looks. Most skills fail at the description (the agent never activates them), are too long (they waste the context window), or miss critical patterns (no validation loops, no output templates, no gotchas).

This project codifies what works and what doesn't, drawn from analyzing 4000+ real skills across the ecosystem. It also helps you decompose existing large prompts into modular, reusable skills.

---

## Directory Structure

```
skill-factory/
├── SKILL.md                     # Entry point: A/B/C/D concierge router
├── course/                      # 11-module skill authoring course
│   ├── README.md                # Course overview and map
│   ├── 01-what-are-skills.md    # Foundation: what skills are, how agents use them
│   ├── 02-skillmd-format.md     # Spec mastery: frontmatter, body, references
│   ├── 03-writing-descriptions.md # The #1 failure point in skill authoring
│   ├── 04-progressive-disclosure.md # Token economics and right-sizing
│   ├── 05-patterns-that-work.md # 8 battle-tested patterns from top repos
│   ├── 06-anti-patterns.md      # 14 mistakes to avoid
│   ├── 07-your-first-skill.md   # Hands-on lab: build a real skill
│   ├── 08-advanced-techniques.md # Meta-skills, composition, instincts
│   ├── 09-multi-host.md         # Ship everywhere: Cursor, Claude, Codex, Gemini
│   ├── 10-maintaining-library.md # Living systems: feedback loops, stocktakes
│   └── 11-using-skill-maker.md  # Capstone: guided creation with the Skill Maker
│
├── wiki/                        # LLM-compiled knowledge base
│   ├── INDEX.md                 # Master table of contents (start here)
│   ├── GLOSSARY.md              # Key terms with cross-references
│   ├── concepts/                # 20 core skill-authoring concept articles
│   │   ├── anti-rationalization.md
│   │   ├── checklist-workflows.md
│   │   ├── composition-patterns.md
│   │   ├── degrees-of-freedom.md
│   │   ├── description-writing.md
│   │   ├── error-handling-in-scripts.md
│   │   ├── feedback-loops.md
│   │   ├── gotchas-sections.md
│   │   ├── host-compatibility.md
│   │   ├── implementation-patterns.md
│   │   ├── instinct-model.md
│   │   ├── meta-skills.md
│   │   ├── naming-conventions.md
│   │   ├── plan-validate-execute.md
│   │   ├── progressive-disclosure.md
│   │   ├── skill-categories.md
│   │   ├── skill-discovery.md
│   │   ├── template-patterns.md
│   │   ├── token-budget.md
│   │   └── validation-loops.md
│   ├── research/                # 9 ecosystem analysis and deep-dive articles
│   │   ├── anatomy-of-a-good-skill.md
│   │   ├── anti-patterns.md
│   │   ├── cursorrules-vs-skills.md
│   │   ├── gstack-deep-dive.md
│   │   ├── host-differences.md
│   │   ├── landscape.md
│   │   ├── openai-skills-analysis.md
│   │   ├── spec-reference.md
│   │   └── tool-design-evolution.md
│   ├── examples/
│   │   ├── good/                # 7 exemplary skills with annotations
│   │   └── bad/                 # 4 anti-pattern skills with analysis
│   └── queries/                 # Filed Q&A and update logs
│
├── prompt-decomposer/           # Prompt-to-skills extractor
│   └── SKILL.md                 # Analyze big prompts, suggest skill candidates
│
├── skill-maker/                 # Interactive skill creator
│   └── SKILL.md                 # gstack-style guided creation with 7 phases
│
├── authoring/                   # The meta-skill
│   └── SKILL.md                 # Queries wiki to help author skills
│
├── raw/                         # Source material (repos gitignored)
│   ├── repos/                   # 19 cloned repositories (local only)
│   │   └── SOURCES.md           # Manifest with URLs, stars, relevance
│   └── docs/                    # 12 reference documents saved as markdown
│       ├── agentpatterns-skill-authoring.md
│       ├── agentskills-io-best-practices.md
│       ├── agentskills-io-spec.md
│       ├── anthropic-best-practices.md
│       ├── applied-anthropic-playbook.md
│       ├── mdskills-ai-spec.md
│       ├── openai-agents-md-spec.md
│       ├── skill-validation-7-mistakes.md
│       ├── trq212-art-not-science.md
│       ├── trq212-bash-all-you-need.md
│       ├── trq212-file-system-state.md
│       └── trq212-skills-abstraction.md
│
├── scripts/                     # Automation
│   ├── compile-wiki.md          # LLM instructions: compile raw/ into wiki/
│   ├── health-check.md          # LLM instructions: audit wiki quality
│   ├── update-sources.md        # LLM instructions: monthly discovery + update
│   ├── discovery-keywords.txt   # Keywords for finding new repos
│   └── validate-skill.ts       # Automated SKILL.md linter (Bun/Node)
│
├── SKILL_SPEC.md                # Opinionated quality standard for skills
└── README.md                    # You are here
```

---

## Quick Start

**Tell your AI agent to read `SKILL.md` in this repo.** It will ask what you want to do:

- **A) Review and improve an existing skill** -- guided brainstorm review (YC office-hours style) or quick validator report
- **B) Brainstorm and create a new skill** -- interactive 7-phase Skill Maker with forcing questions
- **C) Learn about skill authoring** -- 11-module course, zero to hero
- **D) Extract skills from a big prompt** -- paste a large system prompt or instruction set and break it into modular skills

Or jump directly:

```
# Review a skill
Read SKILL.md and help me review my skill at path/to/my-skill/

# Create a skill
Read skill-maker/SKILL.md and help me create a skill for [your idea]

# Break a big prompt into skills
Read prompt-decomposer/SKILL.md and analyze this prompt for skill candidates

# Take the course
Read course/README.md
```

### Additional tools

**Validate a skill:**

```bash
bun run scripts/validate-skill.ts path/to/your-skill/
```

**Compile the wiki** (after adding new sources):

```
Read scripts/compile-wiki.md and compile the wiki.
```

**Run a health check:**

```
Read scripts/health-check.md and run a health check.
```

---

## Monthly Auto-Updates

The knowledge base auto-discovers new repos from [GitHub Rankings](https://github.com/EvanLi/Github-Ranking) and recompiles the wiki.

**To run:**

```
Read scripts/update-sources.md and run the monthly update.
```

**What it does:**

1. Pulls fresh GitHub star rankings across TypeScript, Python, Rust, Go, Shell, JavaScript
2. Filters for AI coding repos using `scripts/discovery-keywords.txt`
3. Scores candidates by relevance (1-5), keeps 3+
4. Clones new repos, `git pull` on existing ones
5. Incrementally recompiles affected wiki articles
6. Regenerates INDEX.md and GLOSSARY.md
7. Logs everything to `wiki/queries/monthly-update-YYYY-MM.md`

Source manifest: [raw/repos/SOURCES.md](raw/repos/SOURCES.md)

---

## What the Wiki Covers

### Core Concepts (20 articles)

| Pattern | What you learn |
|---------|---------------|
| Progressive Disclosure | Three-phase loading: discovery, activation, execution |
| Description Writing | The CSO rule: never summarize workflow in the description |
| Token Budget | Right-sizing skills from 10-line micro-skills to 500-line reference-heavy skills |
| Validation Loops | Do-validate-fix cycles that actually work |
| Template Patterns | Output format contracts, Fabric-style headings, template tokens |
| Anti-Rationalization | Preventing agents from skipping your instructions |
| Instinct Model | Sub-skill YAML units that evolve into full skills |
| Meta-Skills | Skills that govern other skills: stocktake, distillation, compliance, decomposition |
| Composition Patterns | Runtime stacking, subagent choreography, template tokens |
| Plan-Validate-Execute | Safe patterns for destructive or batch operations |
| Host Compatibility | Shipping skills across Claude, Cursor, Codex, Gemini |
| Degrees of Freedom | Matching instruction tightness to task fragility |
| Skill Categories | Anthropic's nine skill types: Library, Verification, Data, Business, and more |
| Implementation Patterns | Five recurring workflow patterns: Sequential, Multi-MCP, Iterative, Context-Aware, Domain-Specific |
| Checklist Workflows | Ordered, checkable steps for multi-phase agent work |
| Gotchas Sections | Environment-specific facts that break defaults -- highest value per token |
| Error Handling in Scripts | Bundled scripts that validate inputs and surface clear errors |
| Feedback Loops | Refining skills using real runs, traces, and evaluation baselines |
| Naming Conventions | Folder and name field rules, hyphens, reserved tokens to avoid |
| Skill Discovery | Host surfacing, meta-skill bootstraps, description-first routing |

### Research (9 articles)

- Anatomy of a good skill -- structural checklist
- Anti-patterns catalog -- 14+ mistakes with fixes
- gstack deep dive -- template engine, gen-skill-docs, preamble tiers
- Host differences -- where skills load across 5+ agents
- Landscape analysis -- 19 repos compared
- OpenAI skills analysis -- curated layers, validation scripts
- Spec reference -- agentskills.io distilled
- .cursorrules vs SKILL.md -- always-on vs on-demand
- Tool design evolution -- how Anthropic iterated on AskUserQuestion, TodoWrite, search

### Curated Examples

- 7 good examples with annotations (freeze, verification-before-completion, grill-me micro-skill, and more)
- 4 bad examples with analysis showing exactly what went wrong

---

## Course Overview

The [course/](course/) directory contains an 11-module curriculum with hands-on labs:

| # | Module | Time | What You Learn |
|---|--------|------|----------------|
| 1 | What Are Skills? | 30 min | Foundation + dissect 3 real skills (micro, standard, anti-pattern) |
| 2 | The SKILL.md Format | 30 min | Spec mastery + build and validate a skeleton from scratch |
| 3 | Writing Descriptions | 40 min | CSO rule + 5 progressive description-writing challenges |
| 4 | Progressive Disclosure | 30 min | Token economics + cut-the-fat and micro-skill writing labs |
| 5 | Patterns That Work | 40 min | 8 patterns + scenario-based pattern matching exercise |
| 6 | Anti-Patterns | 30 min | 14 mistakes + 3 broken skills to find and fix (bug hunt) |
| 7 | Your First Skill | 45 min | 3 guided tracks: beginner (micro), intermediate (standard), advanced (reference-heavy) |
| 8 | Advanced Techniques | 40 min | Instinct writing lab + rationalization table exercise + degrees of freedom |
| 9 | Multi-Host Compatibility | 30 min | Portability audit + OpenClaude model-agnostic insight |
| 10 | Maintaining a Library | 30 min | Full maintenance loop: inventory, validate, extract shared rules |
| 11 | Using the Skill Maker | 30 min | Capstone: guided creation with the Skill Maker + Prompt Decomposer |

---

## Source Repositories Analyzed

19 repositories totaling 700K+ GitHub stars:

| Repo | Stars | Key Contribution |
|------|-------|-----------------|
| [superpowers](https://github.com/obra/superpowers) | 131K | CSO rule, rationalization tables, subagent choreography |
| [everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 132K | Instinct model, skill stocktake, compliance measurement |
| [system-prompts](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | 134K | Agent internals for Cursor, Claude, Codex |
| [mcp-servers](https://github.com/modelcontextprotocol/servers) | 83K | MCP tool wiring patterns |
| [openai-codex](https://github.com/openai/codex) | 72K | Rust CLI architecture, skill loading |
| [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | 50K | Curated skill catalog |
| [fabric](https://github.com/danielmiessler/fabric) | 40K | Modular AI prompts, rigid headings, template tokens |
| [goose](https://github.com/block/goose) | 34K | Extensible agent beyond suggestions |
| [A2A](https://github.com/a2aproject/A2A) | 23K | Agent-to-agent protocol |
| [mattpocock-skills](https://github.com/mattpocock/skills) | 11K | Micro-skills (10-line skills that work) |
| [Github-Ranking](https://github.com/EvanLi/Github-Ranking) | 11K | Discovery source for monthly updates |
| [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | 8K | .cursorrules collection |
| [openai-skills](https://github.com/openai/skills) | 5K | Official Codex CLI skill examples |
| [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | 4K | 4000+ community skills with validation |
| [anthropic-plugins](https://github.com/anthropics/claude-plugins-official) | 3K | Official Anthropic plugin examples |
| [gstack](https://github.com/garrytan/gstack) | 2K | Template engine, 40+ skills, multi-host |
| [autoresearch](https://github.com/karpathy/autoresearch) | 1K | Markdown-as-program paradigm |
| [openclaude](https://github.com/Gitlawb/openclaude) | 7K | Claude Code fork with provider shim -- proves skills are model-agnostic |
| [voltagent-awesome-skills](https://github.com/VoltAgent/awesome-agent-skills) | 1K | Curated skill link catalog |

---

## Key Discoveries

Patterns we identified that aren't documented elsewhere:

1. **CSO (Claude Search Optimization)** -- Never summarize your skill's workflow in the description. The agent reads the summary and skips the body. Source: superpowers (131K stars).

2. **Nine skill categories** -- Anthropic cataloged hundreds of internal skills into 9 types: Library & API Reference, Product Verification, Data Fetching, Business Process, Code Scaffolding, Code Quality, CI/CD, Runbooks, Infrastructure Ops. The best skills fit cleanly into one. Source: Thariq (@trq212), Anthropic.

3. **Delta from baseline** -- Only include what the agent doesn't already know. Instructions it would follow correctly anyway waste tokens and dilute the rules that matter. Source: Thariq (@trq212), Anthropic.

4. **Five implementation patterns** -- Sequential Workflow, Multi-MCP Coordination, Iterative Refinement, Context-Aware Tool Selection, Domain-Specific Intelligence. Each has a distinct shape; choose the one matching your task type. Source: AgentPatterns.ai.

5. **The /gotcha skill** -- Real-time mistake capture: type `/gotcha Claude forgot --profile flightmap` and it auto-files the gotcha to the right skill. Solves the #1 problem: nobody goes back to update their skills. Source: applied Anthropic playbook.

6. **Instinct Model** -- A unit smaller than a skill: one trigger, one action, confidence-weighted, evidence-backed. Instincts evolve into full skills when they accumulate enough evidence. Source: everything-claude-code.

7. **Rationalization Tables** -- Agents talk themselves out of following instructions. Counter this with explicit tables of "excuses vs reality." Source: superpowers.

8. **Micro-skills** -- Some skills are 10 lines. The agent already knows HOW to do things -- it just needs permission and direction. Source: mattpocock/skills.

9. **Compliance Measurement** -- Don't hope your skill works, measure it. Generate behavioral specs, run scenarios, capture tool traces, classify adherence. Source: everything-claude-code.

10. **Negative triggers** -- Prevent over-triggering by adding `Do NOT use for...` to descriptions. Source: AgentPatterns.ai.

---

### Reference Articles Analyzed

In addition to repos, 12 reference documents are saved in `raw/docs/`:

| Article | Author | Key Contribution |
|---------|--------|-----------------|
| Skills Are the Abstraction | Thariq (@trq212), Anthropic | 9 skill categories, built-in variables, config pattern, composition |
| Building an Agent Is Art Not Science | Thariq (@trq212), Anthropic | AskUserQuestion evolution, TodoWrite->Task, search evolution |
| Your Agent Should Use a File System | Thariq (@trq212), Anthropic | File system as state representation for agents |
| Bash Is All You Need | Thariq (@trq212), Anthropic | Non-coding agents need bash for grounded verification |
| Applied Anthropic Playbook | billkhiz (dev.to) | /gotcha pattern, /preflight sub-files, non-code skills |
| Skill Authoring Patterns | AgentPatterns.ai | 5 implementation patterns, negative triggers, testing methodology |
| agentskills.io Spec | agentskills.io | Open Agent Skills specification baseline for portable skill folders |
| agentskills.io Best Practices | agentskills.io | Recommended patterns for spec-compliant skill authoring |
| Anthropic Best Practices | Anthropic | Official best practices for Claude-based agent skill design |
| OpenAI agents.md Spec | OpenAI | Codex CLI agent configuration and skill loading specification |
| mdskills.ai Spec | mdskills.ai | Alternative markdown skills specification and tooling |
| 7 Skill Validation Mistakes | Various | Common validation failures and how to avoid them |

---

## Architecture: The Karpathy Pattern

This project implements the LLM Knowledge Base pattern described by [Andrej Karpathy](https://x.com/karpathy/status/1909366683415642209):

1. **Raw data ingest** -- Clone repos, save articles, capture specs into `raw/`
2. **LLM compilation** -- An LLM reads raw sources and writes structured wiki articles into `wiki/`
3. **Auto-maintained indexes** -- INDEX.md and GLOSSARY.md are regenerated after every compilation
4. **Skill creation tools** -- Three wiki-backed workflows: `authoring/SKILL.md` (review and improve), `skill-maker/SKILL.md` (interactive creation), and `prompt-decomposer/SKILL.md` (extract skills from large prompts)
5. **Feedback loops** -- Health checks, monthly updates, and query logs feed back into the wiki
6. **Incremental enhancement** -- Each compilation pass improves existing articles and adds new ones

The wiki is the LLM's compiled knowledge -- not a static document, but a living system that gets smarter with every update cycle.

---

## Contributing

Contributions welcome:

- **Add a source repo**: Clone it into `raw/repos/`, add to `SOURCES.md`, recompile the wiki
- **Write a wiki article**: Follow the patterns in existing concept/research articles
- **Add a curated example**: Good or bad, with annotations explaining why
- **Improve the course**: Each module should be self-contained and hands-on
- **Report a gap**: Open an issue if the wiki is missing a pattern you've seen

---

## License

MIT
