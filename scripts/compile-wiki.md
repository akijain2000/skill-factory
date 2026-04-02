# Compile Wiki Instructions

These instructions tell an LLM how to compile `raw/` into `wiki/`. Read this file, then follow the steps below.

## Prerequisites

- `raw/repos/` contains cloned skill repos
- `raw/docs/` contains saved web articles and specs as .md files

## Compilation Steps

### Step 1: Scan raw/docs/

Read every .md file in `raw/docs/`. These are the authoritative references: official specs, best practices, anti-pattern articles. Extract key concepts, rules, and patterns.

### Step 2: Scan raw/repos/

For each repo in `raw/repos/`, do the following:

1. Read the README.md for high-level understanding
2. Read CONTRIBUTING.md or any anatomy/spec docs if they exist
3. Find and read 5-10 representative SKILL.md files:
   - Prioritize skills with different characteristics (short vs long, simple vs complex, different domains)
   - Note: line count, frontmatter fields used, description quality, structure, use of progressive disclosure, references to other files
4. Note the repo's strengths, weaknesses, and notable patterns

**Repo-specific guidance:**

- `gstack`: Read the template engine (`scripts/gen-skill-docs.ts`), the `SKILL.md.tmpl` files in skill directories, and 3-4 actual generated skills. Note the preamble tier system, host-specific generation, and how it handles progressive disclosure.
- `autoresearch`: Read `program.md` and understand the markdown-as-program paradigm. This is a different approach to agent instructions.
- `openai-skills`: Read the curated skills in `skills/.curated/`. These are OpenAI's blessed examples.
- `anthropic-plugins`: Read skills in `plugins/plugin-dev/skills/`. These are Anthropic's official plugin skill examples.
- `awesome-cursorrules`: Scan the `rules/` directory. Pick 3-5 `.cursorrules` files from different frameworks. Note how rules differ from skills.
- `antigravity-awesome-skills`: Read `docs/contributors/skill-anatomy.md` and `CONTRIBUTING.md`. Sample 3-5 skills from `skills/`.
- `voltagent-awesome-skills`: Read the README for the curation criteria. Sample 3-5 skills from different providers.

### Step 3: Write concept articles

For each core concept below, write an article in `wiki/concepts/`. Each article should follow this structure:

```markdown
# [Concept Name]

## What it is
[2-3 sentence definition]

## Why it matters
[Why this concept is important for skill quality. Concrete impact.]

## How to do it
[Practical guidance. Steps, rules, patterns.]

## Good example
[Real example from the repos, with source attribution]

## Bad example
[Real anti-pattern from the repos or articles, anonymized if needed]

## Sources
- [raw/docs/filename.md](../raw/docs/filename.md)
- [raw/repos/reponame/path/to/file](../raw/repos/reponame/path/to/file)
```

**Concepts to write (one article each):**

1. `description-writing.md` - How to write descriptions that trigger correctly (WHAT verb + WHEN trigger + third person + keywords)
2. `progressive-disclosure.md` - Three-phase loading model, 500-line budget, splitting into reference files
3. `validation-loops.md` - Do work, validate, fix, repeat pattern
4. `plan-validate-execute.md` - For batch/destructive operations: create plan, validate, then execute
5. `gotchas-sections.md` - Environment-specific facts that defy assumptions; highest-value content
6. `template-patterns.md` - Output format templates, input/output examples, conditional workflows
7. `token-budget.md` - Context window economics, what to include vs omit, testing for necessity
8. `host-compatibility.md` - How skills differ across Claude Code, Cursor, Codex, Gemini, Factory
9. `skill-discovery.md` - How agents find and select skills: naming, description, frontmatter
10. `feedback-loops.md` - Iterative development: Claude A writes, Claude B tests, observe, refine
11. `checklist-workflows.md` - Multi-step workflows with explicit checklists for tracking progress
12. `error-handling-in-scripts.md` - Solve, don't punt. Handle errors explicitly in bundled scripts.
13. `naming-conventions.md` - Gerund form, domain-action pattern, words to avoid
14. `degrees-of-freedom.md` - Matching instruction specificity to task fragility

### Step 4: Write research articles

For each research topic below, write an article in `wiki/research/`. Research articles are longer (800-1500 words) and more analytical.

1. `landscape.md` - State of the skill ecosystem. For each repo analyzed: stars, skill count, format, host compatibility, strengths, weaknesses, notable patterns. Include a comparison table.
2. `anatomy-of-a-good-skill.md` - Synthesized from the best skills across all repos. What the top 10% have in common. Concrete checklist.
3. `anti-patterns.md` - All documented anti-patterns (14+) with examples and fixes.
4. `host-differences.md` - Detailed comparison: Claude Code vs Cursor vs Codex vs Gemini vs Factory. Paths, discovery, frontmatter, extended fields, gotchas.
5. `spec-reference.md` - The official SKILL.md spec distilled. Frontmatter fields, naming rules, description rules, progressive disclosure model, token budgets.
6. `gstack-deep-dive.md` - How gstack works internally: template engine, host-specific generation, preamble tiers, skill routing, the review/ship/qa workflow.
7. `openai-skills-analysis.md` - Analysis of OpenAI's curated skills: what they got right, patterns worth copying.
8. `cursorrules-vs-skills.md` - How .cursorrules differ from SKILL.md. When to use each. Can patterns transfer?

### Step 5: Curate examples

Copy 3-5 exemplary skills into `wiki/examples/good/` with annotations explaining what makes them good.
Copy 3-5 anti-pattern skills into `wiki/examples/bad/` with annotations explaining what's wrong.

For each example, add a header comment:
```markdown
# Example: [Skill Name]
Source: [path to original in raw/repos/]
Rating: Good/Bad
Why: [1-2 sentence explanation]

---
[Original SKILL.md content below]
```

### Step 6: Generate INDEX.md

Write `wiki/INDEX.md` with the following structure:
- Last compiled date
- One-line summary per article, organized by category (Concepts, Research, Examples)
- Each line links to the article with a dash-separated summary
- Target: 200-300 lines max so the meta-skill can read it cheaply

### Step 7: Generate GLOSSARY.md

Write `wiki/GLOSSARY.md` with key terms:
- Progressive disclosure, frontmatter, preamble tier, allowed-tools, context fork, description trigger, WHEN clause, WHAT verb, token budget, skill discovery, activation, execution, validation loop, gotchas section, etc.
- Definition + cross-reference to relevant concept article
- Alphabetical order

## Output Rules

- Plain markdown only. No Obsidian syntax, no wiki-links. Standard `[text](path)` links.
- Every article includes a `## Sources` section with paths back to `raw/`
- Articles are standalone (no nested references required to understand)
- Concept articles: 200-400 words. Research articles: 800-1500 words.
- Use consistent terminology throughout (pick one term, stick to it)
- Include real code/config examples from the repos, not made-up ones

## Incremental Compilation

After the initial compile, the wiki grows incrementally:
- New files in `raw/` trigger a targeted recompile of affected articles
- Run `scripts/health-check.md` to find gaps and suggest new articles
- Q&A outputs filed into `wiki/queries/` can be promoted to articles
- Re-run this script to regenerate INDEX.md and GLOSSARY.md after changes
