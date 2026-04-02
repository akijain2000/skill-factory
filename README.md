# Skill Factory

**An LLM knowledge base and course for authoring production-quality AI agent skills.**

Built on [Karpathy's LLM-KB pattern](https://x.com/karpathy/status/1909366683415642209): raw sources are collected from 19 repositories and 6 reference documents, LLM-compiled into a structured wiki of 30+ articles, then queried by a meta-skill to produce better [SKILL.md](https://agentskills.io/specification) files.

```
                ┌─────────────────────────────────────────────┐
                │            RAW SOURCES (19 repos)           │
                │  gstack, superpowers, fabric, codex, ...    │
                │  + 6 reference docs (specs, best practices) │
                └────────────────────┬────────────────────────┘
                                     │
                          compile-wiki.md (LLM)
                                     │
                                     ▼
                ┌─────────────────────────────────────────────┐
                │         COMPILED WIKI (30+ articles)        │
                │  18 concepts · 8 research · 11 examples     │
                │  INDEX.md · GLOSSARY.md · query logs        │
                └────────────────────┬────────────────────────┘
                                     │
                          authoring/SKILL.md (meta-skill)
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

This repo is three things:

1. **A knowledge base** -- 30+ wiki articles distilled from 19 top AI agent repos (700K+ stars combined), covering every pattern, anti-pattern, and technique for writing skills
2. **A 10-module course** -- Zero-to-hero curriculum that teaches you skill authoring from scratch
3. **A meta-skill** -- An `authoring/SKILL.md` that queries the wiki to help you write, review, and improve skills using everything the KB has learned

## Why this exists

The SKILL.md format is an open standard supported by 27+ AI coding agents (Claude Code, Cursor, Codex CLI, Gemini CLI, and more). But writing a good skill is harder than it looks. Most skills fail at the description (the agent never activates them), are too long (they waste the context window), or miss critical patterns (no validation loops, no output templates, no gotchas).

This project codifies what works and what doesn't, drawn from analyzing 4000+ real skills across the ecosystem.

---

## Directory Structure

```
skill-factory/
├── course/                      # 10-module skill authoring course
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
│   └── 10-maintaining-library.md # Living systems: feedback loops, stocktakes
│
├── wiki/                        # LLM-compiled knowledge base
│   ├── INDEX.md                 # Master table of contents (start here)
│   ├── GLOSSARY.md              # Key terms with cross-references
│   ├── concepts/                # 18 core skill-authoring concept articles
│   │   ├── anti-rationalization.md
│   │   ├── checklist-workflows.md
│   │   ├── composition-patterns.md
│   │   ├── degrees-of-freedom.md
│   │   ├── description-writing.md
│   │   ├── error-handling-in-scripts.md
│   │   ├── feedback-loops.md
│   │   ├── gotchas-sections.md
│   │   ├── host-compatibility.md
│   │   ├── instinct-model.md
│   │   ├── meta-skills.md
│   │   ├── naming-conventions.md
│   │   ├── plan-validate-execute.md
│   │   ├── progressive-disclosure.md
│   │   ├── skill-discovery.md
│   │   ├── template-patterns.md
│   │   ├── token-budget.md
│   │   └── validation-loops.md
│   ├── research/                # 8 ecosystem analysis and deep-dive articles
│   │   ├── anatomy-of-a-good-skill.md
│   │   ├── anti-patterns.md
│   │   ├── cursorrules-vs-skills.md
│   │   ├── gstack-deep-dive.md
│   │   ├── host-differences.md
│   │   ├── landscape.md
│   │   ├── openai-skills-analysis.md
│   │   └── spec-reference.md
│   ├── examples/
│   │   ├── good/                # 7 exemplary skills with annotations
│   │   └── bad/                 # 4 anti-pattern skills with analysis
│   └── queries/                 # Filed Q&A and update logs
│
├── authoring/                   # The meta-skill
│   └── SKILL.md                 # Queries wiki to help author skills
│
├── raw/                         # Source material (repos gitignored)
│   ├── repos/                   # 19 cloned repositories (local only)
│   │   └── SOURCES.md           # Manifest with URLs, stars, relevance
│   └── docs/                    # 6 reference documents saved as markdown
│       ├── anthropic-best-practices.md
│       ├── agentskills-io-spec.md
│       ├── agentskills-io-best-practices.md
│       ├── openai-agents-md-spec.md
│       ├── skill-validation-7-mistakes.md
│       └── mdskills-ai-spec.md
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

### 1. Use the course (no setup needed)

Start with [course/README.md](course/README.md). Read the 10 modules in order. Each builds on the previous one.

### 2. Use the meta-skill to write a skill

Tell your AI agent:

```
Read authoring/SKILL.md and help me create a skill for [your idea].
```

The meta-skill will query the wiki, apply best practices, and draft a validated SKILL.md.

### 3. Validate a skill

```bash
# Using Bun
bun run scripts/validate-skill.ts path/to/your-skill/

# Using Node (tsx)
npx tsx scripts/validate-skill.ts path/to/your-skill/
```

The validator checks: name format, description quality (WHAT verb + WHEN trigger), body length, empty sections, AI slop words, path format, and nested references.

### 4. Compile the wiki (if you add new sources)

```
Read scripts/compile-wiki.md and compile the wiki.
```

This scans `raw/repos/` and `raw/docs/`, then writes/updates concept articles, research articles, curated examples, and regenerates INDEX.md and GLOSSARY.md.

### 5. Run a health check

```
Read scripts/health-check.md and run a health check.
```

Finds broken links, stale sources, terminology inconsistencies, and content gaps.

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

### Core Concepts (18 articles)

| Pattern | What you learn |
|---------|---------------|
| Progressive Disclosure | Three-phase loading: discovery, activation, execution |
| Description Writing | The CSO rule: never summarize workflow in the description |
| Token Budget | Right-sizing skills from 10-line micro-skills to 500-line reference-heavy skills |
| Validation Loops | Do-validate-fix cycles that actually work |
| Template Patterns | Output format contracts, Fabric-style headings, template tokens |
| Anti-Rationalization | Preventing agents from skipping your instructions |
| Instinct Model | Sub-skill YAML units that evolve into full skills |
| Meta-Skills | Skills that govern other skills: stocktake, distillation, compliance |
| Composition Patterns | Runtime stacking, subagent choreography, template tokens |
| Plan-Validate-Execute | Safe patterns for destructive or batch operations |
| Host Compatibility | Shipping skills across Claude, Cursor, Codex, Gemini |
| Degrees of Freedom | Matching instruction tightness to task fragility |
| And 6 more... | Naming, checklists, gotchas, error handling, feedback, discovery |

### Research (8 articles)

- Anatomy of a good skill -- structural checklist
- Anti-patterns catalog -- 14+ mistakes with fixes
- gstack deep dive -- template engine, gen-skill-docs, preamble tiers
- Host differences -- where skills load across 5+ agents
- Landscape analysis -- 18 repos compared
- OpenAI skills analysis -- curated layers, validation scripts
- Spec reference -- agentskills.io distilled
- .cursorrules vs SKILL.md -- always-on vs on-demand

### Curated Examples

- 7 good examples with annotations (freeze, verification-before-completion, grill-me micro-skill, and more)
- 4 bad examples with analysis showing exactly what went wrong

---

## Course Overview

The [course/](course/) directory contains a 10-module curriculum:

| # | Module | Time | What You Learn |
|---|--------|------|----------------|
| 1 | What Are Skills? | 30 min | Foundation: how agents discover, activate, and execute skills |
| 2 | The SKILL.md Format | 30 min | Spec mastery: frontmatter fields, body structure, size limits |
| 3 | Writing Descriptions | 30 min | The #1 failure point -- CSO rule, WHAT+WHEN formula, trigger keywords |
| 4 | Progressive Disclosure | 20 min | Token economics, micro-skills, reference splitting |
| 5 | Patterns That Work | 30 min | 8 battle-tested patterns from 18 repos |
| 6 | Anti-Patterns | 20 min | 14 mistakes to avoid with real examples |
| 7 | Your First Skill | 40 min | Hands-on lab: write, validate, test, iterate |
| 8 | Advanced Techniques | 30 min | Meta-skills, composition, instincts, anti-rationalization |
| 9 | Multi-Host Compatibility | 20 min | Ship to Cursor, Claude Code, Codex CLI, Gemini CLI |
| 10 | Maintaining a Library | 20 min | Feedback loops, stocktakes, health checks |

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

2. **Instinct Model** -- A unit smaller than a skill: one trigger, one action, confidence-weighted, evidence-backed. Instincts evolve into full skills when they accumulate enough evidence. Source: everything-claude-code.

3. **Rationalization Tables** -- Agents talk themselves out of following instructions. Counter this with explicit tables of "excuses vs reality." Source: superpowers.

4. **Micro-skills** -- Some skills are 10 lines. The agent already knows HOW to do things -- it just needs permission and direction. Source: mattpocock/skills.

5. **Compliance Measurement** -- Don't hope your skill works, measure it. Generate behavioral specs, run scenarios, capture tool traces, classify adherence. Source: everything-claude-code.

---

## Architecture: The Karpathy Pattern

This project implements the LLM Knowledge Base pattern described by [Andrej Karpathy](https://x.com/karpathy/status/1909366683415642209):

1. **Raw data ingest** -- Clone repos, save articles, capture specs into `raw/`
2. **LLM compilation** -- An LLM reads raw sources and writes structured wiki articles into `wiki/`
3. **Auto-maintained indexes** -- INDEX.md and GLOSSARY.md are regenerated after every compilation
4. **Meta-skill queries** -- `authoring/SKILL.md` queries the compiled wiki to assist in creating new skills
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
