# Skill Anti-Patterns: Catalog with Examples and Fixes

This article consolidates documented mistakes from Skill Factory reference docs and recurring issues visible in large corpora (awesome-cursorrules, mega-skill repos). Each item includes a **symptom**, **example**, and **fix**. Targets **14+** patterns as requested.

## A. Discovery and naming (SkillCheck + agentskills.io)

### 1. Missing WHEN in the description
- **Symptom:** Skill never triggers; users must `/`-invoke manually.  
- **Example:** Description: “Utilities for spreadsheets.”  
- **Fix:** “Use when importing CSV into Excel models, validating cell formulas, or generating pivot tables from `*.xlsx`.”

### 2. Missing actionable WHAT (weak verbs)
- **Symptom:** Model treats skill as background reading.  
- **Example:** “A helper for documentation.”  
- **Fix:** “Generate, lint, and publish API docs from OpenAPI; use when `openapi.yaml` changes.”

### 3. Vague or reserved names
- **Symptom:** Collisions and poor sort order in UIs.  
- **Example:** `name: claude-helper` or `ai-utils`.  
- **Fix:** `name: openapi-doc-generator`—avoid reserved tokens (`claude`, `mcp`, `skill`, …).

### 4. Wordy trigger phrasing
- **Symptom:** Burns description budget (Codex **1024-char** cap; gstack `gen-skill-docs.ts` throws if over).  
- **Example:** “This skill should be used in situations where you need to…”  
- **Fix:** “Use when …”

## B. Structure and token economy (Anthropic + agentskills.io)

### 5. Empty sections after headings
- **Symptom:** Noise at activation; looks unfinished.  
- **Example:** `## Troubleshooting` with no bullets.  
- **Fix:** Add content, merge with prior section, or delete the heading.

### 6. Monolithic SKILL.md (>500 lines) without splits
- **Symptom:** Activation loads a novella; competes with user code.  
- **Example:** Entire API manual inlined.  
- **Fix:** Keep playbook in `SKILL.md`; move tables to `references/` with “load when…” gates.

### 7. Deeply nested reference chains
- **Symptom:** Partial reads leave agent with half a procedure.  
- **Example:** `SKILL.md` → `a.md` → `b.md` → `c.md`.  
- **Fix:** One hop from `SKILL.md`; duplicate tiny summaries if needed.

### 8. No table of contents in long bodies
- **Symptom:** Model scroll-pastes wrong subsection.  
- **Example:** 200-line policy blob.  
- **Fix:** TOC with anchor links at top (Anthropic >100 lines guidance).

## C. Instruction quality (SkillCheck + Anthropic)

### 9. No output format specification
- **Symptom:** Inconsistent reports, unusable diffs.  
- **Example:** “Produce a summary.”  
- **Fix:** Provide template: headings, bullet depth, code fence for metrics.

### 10. Contradictory instructions
- **Symptom:** Model satisfies one clause, violates another.  
- **Example:** “Always return JSON” + “Use plain English paragraphs for errors.”  
- **Fix:** Branch: “If tool success → JSON; if user-facing error → plain text.”

### 11. Offering too many equal options
- **Symptom:** Agent thrashes; user gets analysis paralysis.  
- **Example:** Five deployment targets with no recommendation.  
- **Fix:** “Default: Fly.io. Alternate: Render if Docker is banned.”

### 12. Time-sensitive content without quarantine
- **Symptom:** Stale guidance poisons runs after API changes.  
- **Fix:** `<details>` deprecated section or versioned `references/changelog.md`.

## D. Code, paths, and tooling (Anthropic + repo observations)

### 13. Windows-style paths in examples
- **Symptom:** Broken on macOS/Linux sandboxes.  
- **Example:** `C:\repo\file.ts`  
- **Fix:** `repo/file.ts` or `$REPO_ROOT/...`.

### 14. Assuming tools without checks
- **Symptom:** Silent failure in CI sandboxes.  
- **Example:** “Run `gh pr view`” with no auth note.  
- **Fix:** Precheck + user prompt pattern from `gh-address-comments` skill.

### 15. Magic constants without justification
- **Symptom:** Unsafe tuning; hard to audit.  
- **Example:** “Sleep 30s” with no link to SLA.  
- **Fix:** Name the constant, explain tradeoff, offer override.

### 16. Scripts that punt errors to the model
- **Symptom:** Retry storms, hallucinated fixes.  
- **Example:** Python script prints `Error` with no stack or context.  
- **Fix:** Structured stderr, exit codes, and “agent: read lines 12–18 of logfile X.”

## E. Meta and maintenance (observed in large corpora)

### 17. Duplicate near-identical skills (mega repos)
- **Symptom:** Wrong skill variant loads; maintenance debt.  
- **Example:** Two “react-best-practices” with 80% overlap in Antigravity-style trees.  
- **Fix:** Merge; differentiate `name`/`description` sharply; archive stale copy.

### 18. `.cursorrules` posing as structured skills
- **Symptom:** No selective activation; always-on bloat.  
- **Example:** 400-line stack essay in awesome-cursorrules style.  
- **Fix:** Split **persistent style** (rules) vs **task playbooks** (SKILL.md).

### 19. Missing provenance on community imports
- **Symptom:** Trust and licensing ambiguity.  
- **Fix:** Frontmatter `source`, `license`, `date_added` (Antigravity pattern).

### 20. “Read everything” install bundles
- **Symptom:** Thousands of descriptions compete at discovery.  
- **Fix:** Use bundles/installers with **narrow defaults**; prefer role-based packs.

---

## Prioritized remediation pass

1. Rewrite **description** (WHEN + WHAT + keywords).  
2. Add **output template** + one **golden example**.  
3. Split **long reference** material; add **TOC**.  
4. **Delete** empty sections; **resolve** contradictions.  
5. Add **dependency checks** for any shell snippet.

## Measuring anti-pattern debt

Lightweight metrics you can automate in CI:

- **`description` length** vs host cap (1024 for Codex in gstack).  
- **Empty heading scan** — headings followed by another heading with no intervening content.  
- **Reference depth** — fail if `references/` files link to other `references/` files.  
- **Forbidden tokens** in `name:` (reserved words list from SkillCheck).  
- **Windows path regex** — catch `^[A-Za-z]:\\` in examples.

These do not guarantee quality, but they eliminate the **most expensive** classes of activation failures.

## Sources

- `skill-factory/raw/docs/skill-validation-7-mistakes.md`  
- `skill-factory/raw/docs/anthropic-best-practices.md` (anti-patterns + structure)  
- `skill-factory/raw/docs/agentskills-io-best-practices.md`  
- `skill-factory/raw/docs/agentskills-io-spec.md`  
- `skill-factory/raw/repos/gstack/scripts/gen-skill-docs.ts` (Codex description limit enforcement)  
- `skill-factory/raw/repos/openai-skills/skills/.curated/gh-address-comments/SKILL.md`  
- `skill-factory/raw/repos/awesome-cursorrules/rules/python-fastapi-cursorrules-prompt-file/.cursorrules` (unstructured pseudo-code in rules)  
- `skill-factory/raw/repos/antigravity-awesome-skills/plugins/antigravity-bundle-essentials/skills/systematic-debugging/SKILL.md` (metadata pattern)
