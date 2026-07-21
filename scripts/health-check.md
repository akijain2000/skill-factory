# Wiki Health Check Instructions

These instructions tell an LLM how to audit the wiki for quality and completeness. Read this file, then follow the steps below.

## Step 1: Index completeness

Read `wiki/INDEX.md`. For every article listed, verify the file exists. For every
`.md` file in `wiki/concepts/`, `wiki/research/`, `wiki/examples/`, and
`wiki/queries/`, verify it appears in INDEX.md or is covered by an explicit
directory-level entry. Count every repository Markdown file and split the total
into immutable `raw/` captures and maintained canonical documentation.

Report:
- Articles listed in INDEX but missing on disk
- Articles on disk but missing from INDEX
- Summaries that are stale (don't match the article's actual content)

## Step 2: Source integrity

First run `bun run scripts/lock-sources.ts`. Report repository and sampled
artifact resolution separately. A stale manifest hash, unresolved HEAD, or
unresolved sampled artifact is a source-integrity failure. Do not infer retained
source content from ignored `raw/repos/<repo>/` clones.

For each article in `wiki/concepts/` and `wiki/research/`, check its `## Sources` section:
- Every source path should point to a real file in `raw/`
- Flag articles with no Sources section
- Flag sources that have been updated since the article was last compiled (check git timestamps or file modification dates)

## Step 3: Cross-reference consistency

Scan all wiki articles for internal links. Verify:
- Every link target exists
- No broken links
- No orphan articles (articles that nothing links to and that don't appear in INDEX)
- Template placeholders inside fenced examples are not real link targets; classify
  them separately instead of reporting them as broken files
- Optional companion-repository links are labeled optional and checked only when
  that repository is present

Verify that `raw/` Markdown captures have no working-tree diff. Source captures
are evidence inputs, not canonical documents to silently rewrite.

## Step 4: Terminology consistency

Check for inconsistent terminology across articles. Common issues:
- "SKILL.md" vs "skill.md" vs "Skill file"
- "frontmatter" vs "front matter" vs "front-matter"
- "progressive disclosure" vs "lazy loading" vs "on-demand loading"
- "description" vs "description field" vs "skill description"

Pick the canonical term (as used in the agentskills.io spec) and flag deviations.

## Step 5: Content quality

For each concept article, check:
- Has a "What it is" section (definition)
- Has a "Why it matters" section (impact)
- Has a "Good example" section (with source attribution)
- Has a "Bad example" section
- Is between 200-400 words (flag if outside range)

For claims that a skill is tested, validated, reliable, or improved, check:
- Does the source prove executed behavior rather than only structural lint?
- Are the model, harness, skill condition, baseline condition, trial count, and grader named when available?
- Are routing accuracy and functional outcomes kept separate?
- Are raw protected trajectories excluded from committed reports?
- Are Structural PASS, eval defined, Behavioral PASS, and operational proof
  represented as separate states?
- Is accepted evidence separated from failed, interrupted, contaminated, or
  superseded diagnostic evidence?
- Do comparable reports fingerprint the evaluator, suite, complete skill
  directory, adapter, model, and host CLI/runtime identity?
- Does isolation cover host home, global/project shelves, plugins, memory, tools,
  and environment policy rather than only a fresh workspace?

For each research article, check:
- Is between 800-1500 words
- Has concrete data (star counts, line counts, specific file paths)
- Has a comparison or analysis (not just description)

## Step 6: Gap analysis

Based on the current wiki content, suggest:
- Concepts mentioned in articles but lacking their own article
- Patterns observed in repos that aren't documented
- Anti-patterns observed in repos that aren't in the anti-patterns article
- Questions a skill author would likely ask that the wiki can't answer
- Skill examples praised without paired behavioral evidence or an explicit "structural only" label
- Large skills that need explicit router/sibling boundaries and cross-sibling negatives
- Historical context embedded in active instructions that should move to a
  provenance-preserving archive

## Step 7: Report

Output a health report as a markdown file in `wiki/queries/health-report-YYYY-MM-DD.md`:

```markdown
# Wiki Health Report - [DATE]

## Summary
- Total articles: X
- Index completeness: X/X
- Broken links: X
- Stale sources: X
- Missing sections: X
- Terminology issues: X
- Quality score: X/10
- Behavioral-evidence claims checked: X
- Unsupported behavioral claims: X
- Raw Markdown files changed: X
- Intentional template/optional link placeholders: X
- Accepted/diagnostic evidence boundary issues: X

## Issues Found
[List each issue with severity: critical/warning/info]

## Suggested New Articles
[List 3-5 article candidates with rationale]

## Suggested Corrections
[List specific fixes with file paths]
```
