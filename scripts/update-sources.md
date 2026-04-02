# Monthly Source Update Instructions

Run this monthly to discover new repos, update existing sources, and recompile the wiki. Tell your LLM: "Read scripts/update-sources.md and run the monthly update."

## Step 1: Update the rankings data

```bash
cd raw/repos/github-ranking && git pull
```

## Step 2: Scan rankings for candidates

Read the following ranking files from `raw/repos/github-ranking/Top100/`:

- `Top-100-stars.md` (overall)
- `TypeScript.md`
- `Python.md`
- `Rust.md`
- `Go.md`
- `Shell.md`
- `JavaScript.md`

For each repo in these files, check if its **name** or **description** matches any keyword in `scripts/discovery-keywords.txt` (case-insensitive).

Exclude repos already listed in `raw/repos/SOURCES.md`.

## Step 3: Evaluate candidates

For each candidate that matched, assign a relevance score (1-5):

- **5**: Directly about SKILL.md, agent skills, or skill authoring
- **4**: AI coding tool, coding assistant, or agent framework
- **3**: LLM framework, prompt engineering, or developer automation
- **2**: General devtool, editor plugin, or template collection
- **1**: Tangentially related (mentions AI but isn't about coding agents)

Keep candidates scoring **3 or higher**.

Present the filtered list to the user in a table:

```
| Repo | Stars | Score | Why |
|------|-------|-------|-----|
```

## Step 4: Clone approved repos

For each approved repo, shallow clone:

```bash
git clone --single-branch --depth 1 <url> raw/repos/<repo-name>
```

## Step 5: Update existing repos

For each repo already in `raw/repos/` (except `github-ranking`):

```bash
cd raw/repos/<repo-name> && git pull --depth 1
```

Note any repos with significant changes (new skills added, major refactors).

## Step 6: Update the manifest

Update `raw/repos/SOURCES.md`:
- Add new repos to the table
- Add a discovery log entry for this month:

```markdown
### YYYY-MM-DD
- Added: [list of new repos with star counts]
- Updated: [repos with notable changes]
- Skipped: [candidates that scored < 3, briefly why]
```

## Step 7: Incremental wiki recompile

For each **new** repo added:

1. Read its README.md and 3-5 sample files
2. Update `wiki/research/landscape.md` with a new entry
3. If the repo introduces novel patterns, update relevant concept articles
4. If it contains good/bad skill examples, add to `wiki/examples/`

For **existing** repos with notable changes:
1. Check if any wiki articles reference this repo
2. Update those articles if the referenced content changed

## Step 8: Regenerate indexes

Rewrite `wiki/INDEX.md` with accurate one-line summaries for any new or changed articles.

Add any new terms to `wiki/GLOSSARY.md`.

## Step 9: Log the update

Create `wiki/queries/monthly-update-YYYY-MM.md`:

```markdown
# Monthly Update - [MONTH YEAR]

## New Sources Added
- [repo]: [why it's relevant]

## Existing Sources Updated  
- [repo]: [what changed]

## Wiki Articles Updated
- [article]: [what changed]

## New Articles Suggested
- [topic]: [rationale]

## Stats
- Total repos: X
- Total wiki articles: X
- Total wiki words: X
```

## Step 10: Validate

Run the validator against any skills that were added as examples:

```bash
bun run scripts/validate-skill.ts wiki/examples/good/<new-example>
```

Run a quick health check by reading `scripts/health-check.md` and executing it.
