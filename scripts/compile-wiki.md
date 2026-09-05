# Compile Wiki Instructions

These instructions tell an LLM how to compile `raw/` into `wiki/`. Read this file, then follow the steps below.

## Prerequisites

- `raw/repos/` contains disposable ignored clones or pinned file snapshots, with revisions and sampled artifacts recorded in the source lock
- `raw/docs/` contains saved web articles and specs as .md files

## Compilation Steps

### Step 1: Scan raw/docs/

Read every .md file in `raw/docs/`. Classify authority: official specifications, vendor recommendations, and secondary articles have different evidentiary weight. Extract key concepts, rules, and patterns.

Treat `raw/` as immutable evidence. Do not "clean up" or rewrite a capture while
compiling. Put interpretation in the canonical wiki and preserve a link back to
the exact source or its locked sampled-artifact receipt.

### Step 2: Scan raw/repos/

For each repo in `raw/repos/`, do the following:

1. Read the README.md for high-level understanding
2. Read CONTRIBUTING.md or any anatomy/spec docs if they exist
3. Find and read 5-10 representative SKILL.md files:
   - Prioritize skills with different characteristics (short vs long, simple vs complex, different domains)
   - Note: line count, frontmatter fields used, description quality, structure, use of progressive disclosure, references to other files
4. Search for eval cases, trigger tests, graders, adapters, trace schemas, and CI workflows paired with the sampled skills
   - Distinguish structural lint from executed behavioral evidence
   - Note whether cases include positive and negative routing
   - Note skill-enabled and no-skill conditions, isolation, trial count, model, harness, and grader
5. Note the repo's strengths, weaknesses, and notable patterns

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
- [raw/docs/filename.md](../../raw/docs/filename.md)
- [raw/repos/reponame/path/to/file](../../raw/repos/reponame/path/to/file)
```

### Step 4: Reconcile the existing inventory

Inventory every current concept, research, example, and query page against
`wiki/INDEX.md`. Preserve existing owners and dated evidence; update an existing
page before adding a new one. Add a concept only when the new learning has no
suitable owner. Record a read/review disposition for every in-scope document.

Do not use a fixed historical article list as a regeneration template. Current
coverage includes evidence lifecycle, supply-chain inspection, retrieval and
interference, and the latest dated source synthesis. Missing content must be
reported explicitly rather than silently omitted from the regenerated index.

### Step 5: Curate examples

Inspect redistribution terms before adding examples. Prefer a short attributed excerpt plus original analysis and a pinned source link. Copy a full file only when its license permits; retain the license, attribution, revision, and a clear source-excerpt boundary. Preserve existing historical specimens.

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
- Never call a skill behaviorally validated from static lint alone; state the evidence condition and grader
- Keep Structural PASS, eval defined, Behavioral PASS, and operational proof separate
- Treat a clean workspace as only one part of isolation; control the host home,
  other skill shelves/plugins/memory/tools, environment, model, and CLI
- Keep current instructions, supporting references, provenance archives, eval
  definitions, checkpoints, reports, and operational receipts in their proper layers

## Incremental Compilation

After the initial compile, the wiki grows incrementally:
- New files in `raw/` trigger a targeted recompile of affected articles
- New skill-eval research updates `skill-evaluations.md`, relevant course material, and the source-evidence labels in landscape/examples
- Run `scripts/health-check.md` to find gaps and suggest new articles
- Q&A outputs filed into `wiki/queries/` can be promoted to articles
- Failed or contaminated evals can be retained as diagnostic case studies but
  cannot replace the accepted comparable report
- Re-run this script to regenerate INDEX.md and GLOSSARY.md after changes
