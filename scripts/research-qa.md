# Research Q&A

LLM runbook for answering research questions grounded in the compiled wiki. Equivalent to the "Q&A / Research answers" block in the LLM-KB architecture.

## When to use

When someone asks a question about agent building and you need a wiki-grounded, cited answer rather than general knowledge.

## Procedure

### Step 1: Parse the question

Identify:
- **Topic keywords** (e.g., "circuit breaker", "memory strategy", "HITL gates")
- **Question type**: factual ("what is X?"), comparative ("X vs Y?"), how-to ("how to implement X?"), or analytical ("why does X improve scores?")
- **Scope**: single concept, cross-cutting pattern, or ecosystem comparison

### Step 2: Search the wiki

Read the relevant wiki articles. Search strategy:

1. **Start with INDEX.md** — scan the table of contents for matching sections
2. **Search by keyword** — `bun scripts/search-wiki.ts "<keyword>"` across `wiki/`
3. **Check GLOSSARY.md** — for terminology and cross-references
4. **Scan course modules** — `bun scripts/search-wiki.ts "<keyword>" --path course/`

Collect 2-5 relevant source articles. Note the file paths.

### Step 3: Synthesize the answer

Write a structured answer following this template:

```markdown
## Answer

[1-3 paragraph answer synthesizing information from multiple wiki sources]

## Sources

- [wiki/concepts/article-name.md](wiki/concepts/article-name.md) — [what it contributed]
- [wiki/research/article-name.md](wiki/research/article-name.md) — [what it contributed]
- [course/XX-module-name.md](course/XX-module-name.md) — [what it contributed]

## Confidence

[High / Medium / Low] — based on coverage in wiki sources

## Gaps

[Note any aspects of the question not covered by the wiki]
```

### Step 4: Optionally file the Q&A

If the question reveals a gap or the answer is reusable:

1. Save to `wiki/queries/YYYY-MM-query-slug.md` with the answer
2. If the question reveals a wiki gap, note it for the next `compile-wiki.md` run
3. If the question suggests a new article topic, add to `scripts/health-check.md` suggestions

## Quality checks

- Every factual claim must cite a specific wiki article
- If the wiki does not cover the topic, say so explicitly rather than hallucinating
- Cross-check with GLOSSARY.md for consistent terminology
- Flag contradictions between wiki articles if found
