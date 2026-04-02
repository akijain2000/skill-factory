# OpenAI Skills Repository: Curated Patterns Worth Copying

The `openai/skills` repo (https://github.com/openai/skills, ~16,033 stars on 2026-04-02) is a **reference implementation** for Codex-flavored Agent Skills: a thin **`.system`** layer shipped with the product, a **`.curated`** gallery for `$skill-installer`, and documentation that doubles as **pedagogy**. This analysis samples the **tree** and **five skills** to extract reusable authoring patterns.

## Repository structure (local snapshot)

Under `skills/` this workspace contains **45** `SKILL.md` files:

- **`skills/.system/`** — foundational tools (`skill-installer`, `skill-creator`, `openai-docs`)  
- **`skills/.curated/`** — deploy integrations (Vercel, Netlify, Cloudflare, Render), creative tooling (`imagegen`, `pdf`, `slides`), developer workflows (`gh-address-comments`, `gh-fix-ci`), design (`figma*` family), security reviews, etc.

README positions **`.system`** as auto-installed in current Codex; curated/experimental paths are pulled via **`$skill-installer`**. (An `.experimental/` directory is referenced in README but not present in this shallow snapshot—authors should not assume it exists in every checkout.)

## What OpenAI got right

### 1. Meta-skills as lint for the rest

`skills/.system/skill-creator/SKILL.md` (~369 lines total file) encodes **OpenAI’s product philosophy** in executable guidance: concise context, degrees of freedom, anatomy diagrams, bundling rules, and **`agents/openai.yaml`** requirements. It effectively acts as a **style guide the agent can apply to itself**.

**Copy this pattern:** Any large org should ship a **`skill-creator`** (or `skill-linter`) meta-skill, not only static docs.

### 2. UI metadata separation

The meta-skill mandates **`agents/openai.yaml`** with `display_name`, `short_description`, `default_prompt`, aligning CLI UX with SKILL bodies. This matches gstack’s Codex generator, which condenses descriptions to **120 chars** for `short_description`.

**Lesson:** If your host exposes pickers/chips, **treat UI fields as first-class**, not optional.

### 3. Curated skills are tight vertical slices

`gh-address-comments/SKILL.md` (~26 lines) is exemplary:

- Frontmatter encodes **tooling** (`gh`), **scope** (current branch PR), **auth precondition**  
- Body is **three numbered phases** with a single bundled script reference  
- **Sandbox escalation** called out explicitly (`sandbox_permissions=require_escalated`)

**Pattern:** **Preconditions first**, minimal narrative, deterministic steps.

### 4. Domain skills blend workflows + environment contracts

`pdf/SKILL.md` demonstrates **dependency honesty**:

- When to prefer **visual** verification (`pdftoppm`) vs text extraction libraries  
- **Per-OS install snippets** (brew vs apt)  
- **Temp/output conventions** (`tmp/pdfs/`, `output/pdf/`)  
- **Quality bar** spelled out (alignment, typography, chart sharpness)

**Pattern:** Treat the skill as a **runbook + packaging manifest** for semi-reliable toolchains.

### 5. System docs skill bridges live documentation

`skills/.system/openai-docs/SKILL.md` (referenced in user tooling) signals OpenAI’s intent: skills are not only repo-local—they **route agents to fresh external truth** (developer portal) with citation discipline.

## Patterns worth copying

1. **`metadata.short-description`** alongside long `description` for dual-length UX needs.  
2. **Explicit auth + sandbox** stanzas for network CLIs.  
3. **Numbered phases** with at most one decision point per section.  
4. **Bundled script** only when it **reduces** repeated codegen (`fetch_comments.py`).  
5. **Quality expectations** tail section—anchors evaluation (“what good looks like”).  
6. **Clear “When to use”** header inside body even when description already says WHEN—reduces ambiguity after partial loads.

## Gaps and risks

- **Dependency variance:** PDF skill assumes package managers; CI sandboxes may still fail—authors need **graceful degradation** messaging (the skill partially does this).  
- **Curated breadth:** Many skills assume cloud accounts (deploy targets). Descriptions must gate activation tightly to avoid wrong skill pickup.  
- **Experimental channel:** README references paths not always vendored—document **fallback** install via GitHub URL.

## Comparative read: OpenAI vs Anthropic-first styles

OpenAI curated skills tend to be **short, CLI-integrated, and outcome-measurable** (ship fix, render PDF, open PR). Anthropic plugin skills (e.g. MCP builder) trend **longer, interrogative, reference-heavy**. Neither is universally better—**match depth to failure cost**.

## Extra curated example: Playwright CLI skill

`skills/.curated/playwright/SKILL.md` (~148 lines total) reinforces OpenAI’s **CLI-first** doctrine:

- **Narrow scope guard:** “CLI-first automation” with explicit **non-pivot** to `@playwright/test` unless asked—prevents accidental test-suite refactors.  
- **Hard prerequisite gate:** `command -v npx` check before any command poetry; copies **verbatim** install instructions if missing—reduces half-broken sandboxes.  
- **Environment bootstrapping:** Exports `CODEX_HOME` and `PWCLI` wrapper path so skills remain **relocatable** with Codex’s home layout.

This pattern—**precondition shell snippet → exported helper path → worked examples**—is reusable for any “CLI in a box” skill bundling a wrapper script under `scripts/`.

## Packaging implications for Skill Factory consumers

If you mirror OpenAI’s layout:

- Keep **`.system`** skills immutable or vendor-pinned; they define installer behavior.  
- Treat **`.curated`** as **templates**—fork, rename `name`, rewrite `description` triggers for your org’s vocabulary.  
- When adding skills, run a **description duplication check** against existing ones to reduce accidental implicit collisions (two deploy skills with overlapping triggers).

For internal mirrors, record the **upstream commit SHA** in your vendor notes so drift between `.system` and `.curated` guidance is auditable when Codex updates ship.

Treat curated skills as **versioned products**: bump an internal changelog when you fork, especially if CLI flags or wrapper paths differ from upstream.

## Sources

- `skill-factory/raw/repos/openai-skills/README.md`  
- `skill-factory/raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`  
- `skill-factory/raw/repos/openai-skills/skills/.curated/gh-address-comments/SKILL.md`  
- `skill-factory/raw/repos/openai-skills/skills/.curated/pdf/SKILL.md`  
- `skill-factory/raw/repos/openai-skills/skills/.curated/playwright/SKILL.md` (~148 lines; CLI-first pattern)  
- Local count: `find skill-factory/raw/repos/openai-skills -name 'SKILL.md' | wc -l` → **45**  
- `skill-factory/raw/docs/openai-agents-md-spec.md` (Codex discovery context)  
- GitHub API `stargazers_count` for `openai/skills` (2026-04-02)
