# Skill Factory

**An LLM knowledge base and course for authoring production-quality AI agent skills.**

Built on [Karpathy's LLM-KB pattern](https://x.com/karpathy/status/1909366683415642209): raw sources are collected from 147 repositories and 13 reference documents, revision-locked, LLM-compiled into a structured 55-file wiki, then queried by a meta-skill to produce better [SKILL.md](https://agentskills.io/specification) files and reproducible behavioral eval suites.

```text
                ┌─────────────────────────────────────────────┐
                │            RAW SOURCES (147 repos)           │
                │  gstack, superpowers, Codex, Gemini, ...    │
                │  + 13 reference docs (specs, eval research) │
                └────────────────────┬────────────────────────┘
                                     │
                          compile-wiki.md (LLM)
                                     │
                                     ▼
                ┌─────────────────────────────────────────────┐
                │         COMPILED WIKI (55 files)            │
                │  22 concepts · 11 research · 12 examples    │
                │  8 query logs · INDEX.md · GLOSSARY.md      │
                └────────────────────┬────────────────────────┘
                                     │
                    authoring/SKILL.md + skill-maker + prompt-decomposer
                                     │
                                     ▼
                ┌─────────────────────────────────────────────┐
                │        NEW SKILLS (higher quality)          │
                │  Linted · Host-portable · Token-lean        │
                └────────────────────┬────────────────────────┘
                                     │
                    evaluate-skill.ts (behavioral ablation)
                                     │
                                     ▼
                              Wiki improves ↺
```

---

## What this is

This repo is six things:

1. **A knowledge base** -- 55 wiki files distilled from 147 AI agent repos, coding-agent repos, skill packs, and reference documents, covering patterns, anti-patterns, evidence lifecycle, and techniques for writing and evaluating skills
2. **A 12-module course** -- Zero-to-hero curriculum with hands-on labs, sample problems, before/after examples, and behavioral eval practice
3. **A Skill Maker** -- A gstack-style interactive `skill-maker/SKILL.md` that asks forcing questions, challenges assumptions, and guides you through creating structurally valid skills with explicit behavioral eval gates
4. **A Prompt Decomposer** -- A `prompt-decomposer/SKILL.md` that takes a large prompt, system instructions, or runbook and identifies sections that could become standalone skills, then helps you build them
5. **A meta-skill** -- An `authoring/SKILL.md` that queries the wiki to help you write, review, and improve skills using everything the KB has learned
6. **A behavioral eval harness** -- A host-neutral `scripts/evaluate-skill.ts` runner with isolated repeated skill-versus-baseline trials, privacy-safe checkpoints, fingerprinted resume, and atomic reports

## Why this exists

The SKILL.md format is an open standard supported by 27+ AI coding agents (Claude Code, Cursor, Codex CLI, Gemini CLI, and more). But writing a good skill is harder than it looks. Most skills fail at the description (the agent never activates them), are too long (they waste the context window), or miss critical patterns (no validation loops, no output templates, no gotchas).

This project codifies what works and what doesn't, drawn from analyzing 8,859 visible SKILL.md files across the ecosystem. It also helps you decompose prompts into modular skills and prove whether those skills improve behavior instead of merely passing structural lint.

---

## Directory Structure

```
skill-factory/
├── SKILL.md                     # Entry point: A/B/C/D/E concierge router
├── course/                      # 12-module skill authoring and eval course
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
│   ├── 11-using-skill-maker.md  # Capstone: guided creation with the Skill Maker
│   └── 12-evaluating-skills.md  # Routing, ablation, reliability, retirement
│
├── wiki/                        # LLM-compiled knowledge base
│   ├── INDEX.md                 # Master table of contents (start here)
│   ├── GLOSSARY.md              # Key terms with cross-references
│   ├── concepts/                # 22 core skill-authoring concept articles
│   │   ├── anti-rationalization.md
│   │   ├── checklist-workflows.md
│   │   ├── composition-patterns.md
│   │   ├── degrees-of-freedom.md
│   │   ├── description-writing.md
│   │   ├── error-handling-in-scripts.md
│   │   ├── evidence-lifecycle.md
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
│   │   ├── skill-evaluations.md
│   │   ├── template-patterns.md
│   │   ├── token-budget.md
│   │   └── validation-loops.md
│   ├── research/                # 11 ecosystem analysis and deep-dive articles
│   │   ├── anatomy-of-a-good-skill.md
│   │   ├── anti-patterns.md
│   │   ├── cursorrules-vs-skills.md
│   │   ├── gstack-deep-dive.md
│   │   ├── host-differences.md
│   │   ├── landscape.md
│   │   ├── openai-skills-analysis.md
│   │   ├── repo-discovery-loop.md
│   │   ├── skill-evolution-2026-05.md
│   │   ├── spec-reference.md
│   │   └── tool-design-evolution.md
│   ├── examples/
│   │   ├── good/                # 8 exemplary skills/workflows with annotations
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
├── evals/                       # Behavioral eval schema and example suite
│   ├── README.md                # Host adapter contract and CI policy
│   └── example.json             # Credential-free ablation example
│
├── raw/                         # Source material (repos gitignored)
│   ├── repos/                   # 147 disposable source clones (local only)
│   │   ├── SOURCES.md           # Human-readable discovery manifest
│   │   ├── SOURCES.lock.json    # Remote revisions + sampled artifact hashes
│   │   └── SAMPLED_ARTIFACTS.json # Exact files that changed authoring decisions
│   └── docs/                    # 13 reference documents saved as markdown
│       ├── agentpatterns-skill-authoring.md
│       ├── agentskills-io-best-practices.md
│       ├── agentskills-io-spec.md
│       ├── anthropic-best-practices.md
│       ├── applied-anthropic-playbook.md
│       ├── dont-ship-skills-without-evals.md
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
│   ├── validate-skill.ts        # Static SKILL.md linter (Bun)
│   ├── lock-sources.ts          # Reproducible repository/artifact provenance
│   └── evaluate-skill.ts        # Checkpointed skill-vs-baseline harness (Bun)
│
├── SKILL_SPEC.md                # Opinionated quality standard for skills
└── README.md                    # You are here
```

---

## Quick Start

**Tell your AI agent to read `SKILL.md` in this repo.** It will ask what you want to do:

- **A) Review and improve an existing skill** -- guided brainstorm review (YC office-hours style) or quick validator report
- **B) Brainstorm and create a new skill** -- interactive 7-phase Skill Maker with forcing questions
- **C) Learn about skill authoring** -- 12-module course, zero to hero
- **D) Extract skills from a big prompt** -- paste a large system prompt or instruction set and break it into modular skills
- **E) Evaluate a skill** -- test routing, outcomes, reliability, ablation, and retirement

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

# Evaluate a skill
Read evals/README.md and evaluate my skill at path/to/my-skill/
```

### Additional tools

**Validate a skill:**

```bash
bun run scripts/validate-skill.ts path/to/your-skill/
```

The validator runs structural checks covering frontmatter (name format, description, trigger clauses), body shape (line count and empty sections), content signals (action verbs, examples, gotchas, possible no-ops, and eval artifacts), and style (AI slop words and path formats).

Static validation does not prove that a skill improves agent behavior.

**Run behavioral evals:**

```bash
bun run scripts/evaluate-skill.ts evals/example.json --report /tmp/example-report.json
# Resume only when evaluator, suite, skill, and adapter fingerprints still match:
bun run scripts/evaluate-skill.ts evals/example.json --report /tmp/example-report.json --resume
bun test scripts/evaluate-skill.test.ts
```

The harness runs positive and negative routing cases under skill-enabled and no-skill conditions, isolates every trial, repeats nondeterministic runs, and gates on routing accuracy, outcome pass rates, and ablation delta. It fsyncs normalized privacy-safe checkpoints, rejects incompatible resume/comparison fingerprints, and writes final reports atomically. Real agents connect through the adapter contract in [`evals/README.md`](evals/README.md).

**Know where the data goes:**

| Data | Durable home |
|---|---|
| External source content | Immutable `raw/` capture plus revision/artifact lock |
| Active instructions | Compact `SKILL.md` |
| Long or historical context | One-hop `references/` with provenance |
| Executable cases | Paired `evals/` definition |
| Resumable eval progress | Privacy-safe checkpoint retained by policy |
| Accepted behavioral evidence | Dated aggregate report with evidence fingerprints |
| Raw trajectories, credentials, disposable workspaces | Never committed; clean after the run |

See [Skill Evidence Lifecycle](wiki/concepts/evidence-lifecycle.md) for the full placement and proof contract.

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

1. Pulls fresh GitHub star rankings and the latest full ranking CSV
2. Starts from top GitHub repos, then scans language rankings and expanded CSV candidates
3. Filters candidates using `scripts/discovery-keywords.txt`
4. Scores candidates by relevance (1-5), prioritizing direct skill/coding-agent signal
5. Inventories paired eval cases, harnesses, deterministic validators, and CI gates instead of sampling `SKILL.md` alone
6. Clones high-signal repos with shallow/partial clones and refreshes existing source repos
7. Locks every manifest repository revision and exact sampled artifact; unresolved evidence fails the update
8. Incrementally updates affected wiki articles, examples, index, glossary, and query logs
9. Logs candidate tables, added repos, skipped repos, eval evidence, and observed patterns to `wiki/queries/monthly-update-YYYY-MM.md`

Source manifest: [raw/repos/SOURCES.md](raw/repos/SOURCES.md)

---

## What the Wiki Covers

### Core Concepts (22 articles)

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
| Skill Evidence Lifecycle | Where research, instructions, archives, eval cases, checkpoints, reports, and operational proof belong |
| Feedback Loops | Refining skills using real runs, traces, and evaluation baselines |
| Naming Conventions | Folder and name field rules, hyphens, reserved tokens to avoid |
| Skill Discovery | Host surfacing, meta-skill bootstraps, description-first routing |
| Skill Evaluations | Positive/negative routing, isolated trials, skill-vs-baseline ablation, regression, retirement |

### Research (11 articles)

- Anatomy of a good skill -- structural checklist
- Anti-patterns catalog -- 14+ mistakes with fixes
- gstack deep dive -- template engine, gen-skill-docs, preamble tiers
- Host differences -- where skills load across 5+ agents
- Landscape analysis -- 147 repos compared
- OpenAI skills analysis -- curated layers, validation scripts
- Repo discovery loop -- search, score, clone, and distill top GitHub repos into better skills
- Skill evolution 2026-05 -- 100-repo findings: skills + agents + memory + MCP
- Spec reference -- agentskills.io distilled
- .cursorrules vs SKILL.md -- always-on vs on-demand
- Tool design evolution -- how Anthropic iterated on AskUserQuestion, TodoWrite, search

### Curated Examples

- 8 good examples with annotations (freeze, verification-before-completion, grill-me micro-skill, repo-discovery-loop, and more)
- 4 bad examples with analysis showing exactly what went wrong

---

## Course Overview

The [course/](course/) directory contains a 12-module curriculum with hands-on labs:

| # | Module | Time | What You Learn |
|---|--------|------|----------------|
| 1 | What Are Skills? | 30 min | Foundation + dissect 3 real skills (micro, standard, anti-pattern) |
| 2 | The SKILL.md Format | 30 min | Spec mastery + build and validate a skeleton from scratch |
| 3 | Writing Descriptions | 40 min | CSO rule + 5 progressive description-writing challenges |
| 4 | Progressive Disclosure | 30 min | Token economics + cut-the-fat and micro-skill writing labs |
| 5 | Patterns That Work | 40 min | 8 patterns + scenario-based pattern matching exercise |
| 6 | Anti-Patterns | 30 min | 14 mistakes + 3 broken skills to find and fix (bug hunt) |
| 7 | Your First Skill | 45 min | 3 guided tracks: beginner (micro), intermediate (standard), advanced (reference-heavy) |
| 8 | Advanced Techniques | 55 min | Instincts, rationalization tables, degrees of freedom, skill-agent-memory-MCP layering |
| 9 | Multi-Host Compatibility | 30 min | Portability audit + OpenClaude model-agnostic insight |
| 10 | Maintaining a Library | 60 min | Full maintenance loop: inventory, validate, source updates, 100-repo sparse expansion |
| 11 | Using the Skill Maker | 30 min | Capstone: guided creation with the Skill Maker + Prompt Decomposer |
| 12 | Evaluating Skills | 60 min | Routing cases, isolated trials, ablation, deterministic grading, retirement |

---

## Source Repositories Analyzed

147 repositories are tracked in [raw/repos/SOURCES.md](raw/repos/SOURCES.md), and all 147 revisions plus six decision-changing sampled artifacts are resolved in [raw/repos/SOURCES.lock.json](raw/repos/SOURCES.lock.json). The corpus now covers:

| Source family | Examples | Key Contribution |
|---------------|----------|------------------|
| First-party skills | `openai/skills`, `anthropics/skills`, `anthropics/claude-plugins-official` | Spec-aligned examples, templates, document skills, official plugin boundaries |
| Coding-agent hosts | `openai/codex`, `google-gemini/gemini-cli`, `anomalyco/opencode`, `cline/cline`, `browser-use/browser-use`, `goose` | How real agents package, load, test, and ship skills |
| Skill libraries | `superpowers`, `addyosmani/agent-skills`, `mattpocock/skills`, `ai-research-skills`, `gstack`, `caveman` | Behavioral loops, validators, rationalization tables, micro-skills, workflow gates |
| Large catalogs | `antigravity-awesome-skills`, `awesome-claude-skills`, `voltagent-awesome-skills`, `awesome-claude-code-subagents` | Breadth, bundle strategy, marketplace/install patterns, duplicate/staleness risks |
| Prompt and rule corpora | `fabric`, `system-prompts`, `awesome-cursorrules`, `karpathy-skills` | Prompt templates, always-on rules, system-prompt research, instruction compression |
| Tool/protocol layers | `mcp-servers`, `github-mcp-server`, `A2A`, `graphify`, `googleworkspace-cli` | MCP/tool-side capabilities, persistent artifacts, agent-to-agent discovery |
| Domain skill packs | `open-design`, `frontend-slides`, `huashu-design`, `guizang-ppt-skill`, `career-ops`, `claude-code-game-studios` | Design, presentation, career, game-studio, and research workflow specialization |

The May 2026 update reviewed 377 available keyword-matching candidates, cloned 26 focused high-signal sources, then added a 100-repo sparse expansion. See [Monthly update 2026-05](wiki/queries/monthly-update-2026-05.md).

---

## Key Discoveries

Patterns we identified that aren't documented elsewhere:

1. **CSO (Claude Search Optimization)** -- Never summarize your skill's workflow in the description. The agent reads the summary and skips the body. Source: superpowers (131K stars).

2. **Nine skill categories** -- Anthropic cataloged hundreds of internal skills into 9 types: Library & API Reference, Product Verification, Data Fetching, Business Process, Code Scaffolding, Code Quality, CI/CD, Runbooks, Infrastructure Ops. The best skills fit cleanly into one. Source: Thariq (@trq212), Anthropic.

3. **Skills are now runtime components** -- The 100-repo expansion showed skills composing with subagents, memory scopes, MCP server scopes, hooks, commands, validators, and orchestration queues. Good authoring now means deciding which layer owns each part of the workflow, not just writing better Markdown.

4. **Delta from baseline** -- Only include what the agent doesn't already know. Instructions it would follow correctly anyway waste tokens and dilute the rules that matter. Source: Thariq (@trq212), Anthropic.

5. **Five implementation patterns** -- Sequential Workflow, Multi-MCP Coordination, Iterative Refinement, Context-Aware Tool Selection, Domain-Specific Intelligence. Each has a distinct shape; choose the one matching your task type. Source: AgentPatterns.ai.

6. **The /gotcha skill** -- Real-time mistake capture: type `/gotcha Claude forgot --profile flightmap` and it auto-files the gotcha to the right skill. Solves the #1 problem: nobody goes back to update their skills. Source: applied Anthropic playbook.

7. **Instinct Model** -- A unit smaller than a skill: one trigger, one action, confidence-weighted, evidence-backed. Instincts evolve into full skills when they accumulate enough evidence. Source: everything-claude-code.

8. **Rationalization Tables** -- Agents talk themselves out of following instructions. Counter this with explicit tables of "excuses vs reality." Source: superpowers.

9. **Micro-skills** -- Some skills are 10 lines. The agent already knows HOW to do things -- it just needs permission and direction. Source: mattpocock/skills.

10. **Compliance Measurement** -- Don't hope your skill works, measure it. Generate behavioral specs, run scenarios, capture tool traces, classify adherence. Source: everything-claude-code.

11. **Negative triggers** -- Prevent over-triggering by adding `Do NOT use for...` to descriptions. Source: AgentPatterns.ai.

12. **Static validity is not behavioral evidence** -- Evaluate natural positive and negative prompts in isolated repeated trials with and without the skill. Retire a capability skill only when the baseline catches up, and keep its eval suite as a regression monitor. Source: Philipp Schmid's "Don't Ship Skills Without Evals" talk and guide.

13. **Source lists are not source evidence** -- Keep ignored clones disposable, but lock every source revision and every exact artifact that changes an authoring decision. Repository and artifact provenance still remain separate from behavioral eval proof.

14. **Evidence needs a lifecycle** -- Active instructions, historical archives, eval definitions, normalized checkpoints, aggregate reports, and operational proof have different homes and claims. Keeping them separate preserves context without turning dated receipts into current behavior.

15. **Harness identity is part of the result** -- Model/CLI metadata and evaluator, suite, skill-directory, and adapter fingerprints must match for resume or regression comparison. A contaminated host shelf is a different experiment, not comparable evidence.

16. **Useful outcomes can still fail routing** -- In an anonymized private-shelf case study, both compact skills produced large positive deltas, but both missed the declared routing gate. Negative controls and repeated trials caught over-triggering that outcome-only smoke tests would hide.

---

### Reference Articles Analyzed

In addition to repos, 13 reference documents are saved in `raw/docs/`:

| Article | Author | Key Contribution |
|---------|--------|-----------------|
| Skills Are the Abstraction | Thariq (@trq212), Anthropic | 9 skill categories, built-in variables, config pattern, composition |
| Building an Agent Is Art Not Science | Thariq (@trq212), Anthropic | AskUserQuestion evolution, TodoWrite->Task, search evolution |
| Your Agent Should Use a File System | Thariq (@trq212), Anthropic | File system as state representation for agents |
| Bash Is All You Need | Thariq (@trq212), Anthropic | Non-coding agents need bash for grounded verification |
| Applied Anthropic Playbook | billkhiz (dev.to) | /gotcha pattern, /preflight sub-files, non-code skills |
| Don't Ship Skills Without Evals | Philipp Schmid, Google DeepMind | Routing tests, isolated trials, ablation, regression, retirement |
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
6. **Evidence lifecycle** -- Source locks, skill/reference placement, fingerprinted checkpoints, and aggregate reports preserve what each claim actually proves
7. **Incremental enhancement** -- Each compilation pass improves existing articles and adds new ones

The wiki is the LLM's compiled knowledge -- not a static document, but a living system that gets smarter with every update cycle.

---

## Companion Projects

### Agent Factory

**[Agent Factory](../agent-factory/)** is Skill Factory's sibling project. Skills are markdown files loaded by agents at runtime. Agents are the autonomous systems that read and execute them. Agent Factory teaches you to build the agent; Skill Factory teaches you to write the skills it reads.

### Factory Showcase

**[Factory Showcase](https://github.com/akijain2000/factory-showcase)** is a testing companion with 20 agents and 20 skills created using both factories, evaluated through a 5-cycle Karpathy autoresearch loop. Contains grading reports, worked examples, and improvement findings that fed back into both factories' validators and documentation.

---

## Contributing

Contributions welcome:

- **Add a source repo**: Clone it into `raw/repos/`, add to `SOURCES.md`, recompile the wiki
- **Write a wiki article**: Follow the patterns in existing concept/research articles
- **Add a curated example**: Good or bad, with annotations explaining why
- **Improve the course**: Each module should be self-contained and hands-on
- **Add eval evidence**: Keep definitions beside the skill, store only sanitized normalized reports, and label structural, behavioral, and operational proof separately
- **Report a gap**: Open an issue if the wiki is missing a pattern you've seen

---

## License

MIT
