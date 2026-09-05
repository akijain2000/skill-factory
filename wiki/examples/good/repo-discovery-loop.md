# Example: repo discovery loop

> Current process (2026-09-05): the [September update](../../queries/monthly-update-2026-09.md) supersedes clone presence as evidence with pinned revisions and exact sampled-artifact hashes. Keep coverage levels explicit.

> Source example: quoted skill content is research material from the attributed snapshot, not current operating authority. Recheck its license, pinned source, and target-host rules before adoption. Structural praise does not mean executed behavioral PASS.

Source: `scripts/update-sources.md`, `scripts/discovery-keywords.txt`, `raw/repos/SOURCES.md`
Rating: Good
Why: This workflow turns top-GitHub-repo search into a repeatable knowledge-compounding loop. It does not tell authors to "browse for inspiration"; it defines candidate sources, relevance scoring, clone/update steps, wiki recompilation, index updates, and validation. That makes external research actionable instead of ornamental.

---

## Annotated pattern

### 1. Search surface is explicit

`scripts/update-sources.md` starts with top GitHub repos: overall star rankings plus TypeScript, Python, Rust, Go, Shell, and JavaScript rankings. `scripts/discovery-keywords.txt` lists the terms used for filtering.

**Why this is good:** the authoring process is reproducible. Another agent can rerun the same search instead of guessing which repos count.

### 2. Relevance has a rubric

The workflow scores candidates from 1-5 and keeps repos scoring 3+. Direct skill repos score highest; general devtools score low unless they teach agent or prompt patterns.

**Why this is good:** it prevents source hoarding. A large corpus is only useful when each source has a reason to exist.

### 3. The manifest captures provenance

`raw/repos/SOURCES.md` records URL, approximate stars, add date, and relevance. The discovery log records what was added, updated, and skipped.

**Why this is good:** future authors can audit why a source entered the corpus and whether the wiki article is based on evidence or vibes.

### 4. Wiki updates are required

The workflow says new repos should update `wiki/research/landscape.md`, relevant concept articles, and examples when they introduce novel patterns.

**Why this is good:** the value is in distillation. Cloned repos do not help future skill authors unless lessons are compiled into the wiki.

### 5. Validation closes the loop

The workflow ends by regenerating indexes, adding glossary terms, logging the update, validating added examples, and running a health check.

**Why this is good:** knowledge-base maintenance has a done condition. The loop is not finished when sources are cloned; it is finished when the wiki can be used safely by the meta-skill.
