# Build Index

LLM runbook for regenerating wiki indexes, backlinks, summaries, and category groupings. Equivalent to the "Indexing / Summaries, links" block in the LLM-KB architecture.

## When to use

After adding or modifying wiki articles, or as part of the monthly update cycle. Run after `compile-wiki.md` and before `health-check.md`.

## Procedure

### Step 1: Scan all wiki articles

Collect every `.md` file under `wiki/`:
- `wiki/concepts/*.md`
- `wiki/research/*.md`
- `wiki/examples/good/*.md`
- `wiki/examples/bad/*.md`
- `wiki/queries/*.md`

For each file, extract:
1. **Title** — first `# heading`
2. **Summary** — first paragraph after the title (or frontmatter `summary:` if present)
3. **Category** — from YAML frontmatter `category:` field, or inferred from directory
4. **Tags** — from YAML frontmatter `tags:` field
5. **Outbound links** — all `[text](path.md)` references to other wiki articles

### Step 2: Rebuild INDEX.md

Regenerate `wiki/INDEX.md` with:

```markdown
# Wiki Index

## By Category

### [Category Name]

| Article | Summary |
|---------|---------|
| [title](path.md) | first-paragraph summary |

### [Next Category]
...

## Statistics

- **Total articles:** N
- **Total words:** ~NNK
- **Last updated:** YYYY-MM-DD
```

Group articles by category. Within each category, sort alphabetically.

### Step 3: Generate BACKLINKS.md

Create `wiki/BACKLINKS.md` — a reverse link index:

```markdown
# Backlinks

Reverse link index: which articles link TO each article.

## [article-name.md]

Linked from:
- [source-1.md](concepts/source-1.md)
- [source-2.md](research/source-2.md)
```

Build by inverting the outbound links collected in Step 1. Articles with zero inbound links are orphans — flag them.

### Step 4: Update GLOSSARY cross-references

For each glossary term in `wiki/GLOSSARY.md`:
1. Find which articles mention that term
2. Add "See also: [article](path)" links where missing
3. Flag any terms defined in the glossary but not used in any article

### Step 5: Output summary

Print a summary report:

```
=== Index Build Complete ===
Articles indexed: N
Categories: N
Backlinks generated: N
Orphan articles: N (list them)
Glossary terms linked: N
Words counted: ~NNK
```

## Quality checks

- Every article must appear in INDEX.md
- Every article should have at least one inbound link (except INDEX.md and GLOSSARY.md)
- Summaries should be 1-2 sentences, not truncated mid-word
- Category names should be consistent (check for near-duplicates like "tools" vs "tool-design")
