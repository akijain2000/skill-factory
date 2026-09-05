# `.cursorrules` vs `SKILL.md`: Formats, Loading, and When to Use Each

> Evidence window: the analysis below describes the captured April 2026 source corpus. Counts, paths, host behavior, and costs are snapshot claims. Use the [September refresh](../queries/monthly-update-2026-09.md) and the target host's current documentation before operational adoption; source revision checks are not behavioral certification.

Cursor (and similar editors) can ingest guidance from **legacy `.cursorrules` files**, **modern Rules**, and **Agent Skills (`SKILL.md`)**. This article contrasts the first and third using `awesome-cursorrules` samples and the agentskills.io-derived spec in Skill Factory docs.

## What `.cursorrules` is (awesome-cursorrules corpus)

The **Awesome Cursor Rules** repo (`PatrickJS/awesome-cursorrules`, ~38,855 stars, 2026-04-02) is an index of **176** `.cursorrules` files under `rules/*/.cursorrules`. README positions `.cursorrules` as **project-specific instructions** to tailor codegen—stack choices, conventions, architectural dogma.

### Structural properties

- **Plain text / markdown-ish**—no required YAML frontmatter, no `name`/`description` contract.  
- Typically opens with a **persona line** (“You are an expert in …”).  
- Uses **long bullet lists** of framework rules (Next.js server actions, Tailwind patterns, testing mandates).  
- **File size varies**; example `nextjs-react-typescript-cursorrules-prompt-file/.cursorrules` is **71 lines** in this clone—moderate compared to some mega-rules.

### Quirks observed

Some entries are **not prose-first**—e.g. `python-fastapi-cursorrules-prompt-file/.cursorrules` (~38 lines) embeds Python list literals inside a `.cursorrules` file. Editors still consume it as text, but this confuses **human maintainers** and breaks naive linters.

**Analysis:** `.cursorrules` optimizes for **fast copying**, not **schema validation**.

## What `SKILL.md` is (agentskills.io baseline)

From `agentskills-io-spec.md` / `mdskills-ai-spec.md`:

- Folder with **`SKILL.md`** + optional assets  
- **YAML frontmatter** requiring `name` and `description`  
- Designed for **progressive disclosure**: metadata always visible; body loads on relevance  
- **Portable** across Claude Code, Cursor, Codex, Gemini CLI, Copilot-class tools (claims vary by release)

## Loading semantics (conceptual)

| Dimension | `.cursorrules` | `SKILL.md` |
|-----------|----------------|------------|
| Discovery | Editor config / project attachment | Skill index / marketplace / folder scan |
| Selectivity | Generally **always-on** for project | **On-demand** activation from description match or user invocation |
| Metadata | None standard | `name`, `description`, optional extended fields |
| Packaging | Single file | Directory (`scripts/`, `references/`, `assets/`) |
| Validation | Community consistency only | Spec + CI possible (name/dir match, length limits) |

**Bridge doc:** `openai-agents-md-spec.md` contrasts **AGENTS.md** (always concatenated, 32 KiB cap) with **skills** (on-demand). `.cursorrules` behaves like an **editor-local AGENTS fragment** more than a skill.

## When to use `.cursorrules`

Use **rules** when guidance should apply to **almost every edit**:

- **Language/framework style** (hooks rules, RORO pattern, Zod usage)  
- **Architecture invariants** (“use services/ for throws”, “minimize `use client`”)  
- **Team consistency** where nuance lives in idioms, not procedures

**awesome-cursorrules example:** The Next.js + TS + Viem + Shadcn file encodes **how each line should look**—a poor fit for selective loading.

## When to use `SKILL.md`

Use **skills** for **procedures with triggers**:

- QA passes, release checklists, security audits, migrations  
- **Tool-running playbooks** (browser, PDF, deploy CLIs)  
- Anything you want **out of context** until the user mentions a task

**Contrast:** gstack’s `browse/SKILL.md.tmpl` is thousands of tokens of **tool DSL**—inappropriate as always-on rules.

## Hybrid strategy (recommended)

1. **Rules / `.cursorrules`:** coding aesthetics + non-negotiable style. Keep **lean**; link out to docs.  
2. **SKILL.md packs:** operational workflows; ensure descriptions contain **user-phrased triggers**.  
3. **AGENTS.md / CLAUDE.md / GEMINI.md:** repo map + “where things live” + safety policies.

Avoid duplicating the same bullets in both rules and skills—**drift** will desynchronize them.

## Migration heuristic

If a `.cursorrules` section starts with **“When the user asks…”**, it is a **skill candidate**. If it starts with **“Always structure components as…”**, keep it in rules.

## Cursor’s evolving rules surface (context for authors)

README text in awesome-cursorrules targets the **classic `.cursorrules` file** at project root. Cursor has since moved toward **Rules** (folder-based, scoped) in many workflows. The analytical distinction in this article still holds:

- **Always-on project norms** → rules-like surfaces  
- **Triggered workflows** → `SKILL.md`

Even when using modern Rules, **avoid duplicating** long procedural sections that belong in skills—Rules excel at **constraints**, Skills excel at **algorithms**.

## Team governance considerations

- **`.cursorrules` PRs** often explode in line count because there is **no schema**—reviewers rely on tribal stack knowledge.  
- **`SKILL.md` PRs** can be linted: frontmatter keys, length limits, directory/name match, link checks for `references/`.  
- For multi-repo orgs, prefer **one canonical skill pack** git submodule or package, and keep `.cursorrules` to **thin imports** (“follow org skill pack X for QA”) to reduce fork drift.

## Evaluation

When unsure which format to use, ask:

1. Should this run **every chat**? → Rules.  
2. Should this run **only when a task appears**? → Skill.  
3. Does this need **bundled scripts/assets**? → Skill directory.  
4. Is this **under 20 lines** of universal style? → Rules.

If two formats must coexist, establish a **single owner**: either Rules link to the canonical skill name, or the skill’s intro points back to Rules for style—never maintain two divergent copies of the same prohibition.

## Sources

- `skill-factory/raw/repos/awesome-cursorrules/README.md` (definition + rationale)  
- `skill-factory/raw/repos/awesome-cursorrules/rules/nextjs-react-typescript-cursorrules-prompt-file/.cursorrules` (71 lines)  
- `skill-factory/raw/repos/awesome-cursorrules/rules/python-fastapi-cursorrules-prompt-file/.cursorrules` (38 lines)  
- `skill-factory/raw/repos/awesome-cursorrules/rules/code-style-consistency-cursorrules-prompt-file/.cursorrules` (additional style-only example in tree)  
- Local count: `find … -name '.cursorrules' | wc -l` → **176**  
- `skill-factory/raw/docs/agentskills-io-spec.md`  
- `skill-factory/raw/docs/mdskills-ai-spec.md`  
- `skill-factory/raw/docs/openai-agents-md-spec.md`  
- GitHub API `stargazers_count` for `PatrickJS/awesome-cursorrules` (2026-04-02)
