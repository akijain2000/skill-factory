# Host Differences: Where Skills, Rules, and Project Docs Land

Agent hosts disagree on **where** instructions live, **how** they are merged, and **what limits** apply. This comparison ties the Skill Factory `raw/docs` specs to **gstack’s `setup` + `gen-skill-docs.ts` implementation**, because that repo is one of the few that **generates host-specific trees** from a single template source.

## Conceptual axis: always-on vs on-demand

| Mechanism | Load model | Typical content |
|-----------|------------|-----------------|
| Project doc (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) | Concatenated near session start | Stack, conventions, repo map |
| Skill (`SKILL.md`) | Metadata always visible; body on match | Procedures, checklists, scripts |
| Editor rules (`.cursorrules`, `.cursor/rules`) | Editor injection | Style, patterns, “how we write code” |

The OpenAI **AGENTS.md** guide (`openai-agents-md-spec.md`) is explicit: project docs form an instruction chain with **32 KiB** combined ceiling (`project_doc_max_bytes`). Skills are a **different discovery channel**—on-demand capabilities under `.agents/skills/` (and peers).

## Claude Code

**Locations (common):** `.claude/skills/<skill>/SKILL.md` (project) and `~/.claude/skills/` (user). **CLAUDE.md** carries project-specific operating rules gstack’s README tells users to extend with a “gstack” section listing slash skills and browse policy.

**Extended frontmatter (per `agentskills-io-spec.md`):** `argument-hint`, `disable-model-invocation`, `user-invocable`, `model`, `context: fork` (isolated subagent), `agent`, **`hooks`** (lifecycle interception).

**gstack behavior:** `setup` symlinks each skill directory into the parent skills folder, optionally **prefixing** `gstack-` to avoid collisions (`link_claude_skill_dirs`, `SKILL_PREFIX` interactive prompt in `setup`). Generated **committed** `SKILL.md` files include Claude-native tool names (`Bash`, `Read`, …) and may declare `hooks:` in templates—later stripped or translated per host.

**Analysis:** Claude is the **richest** host for skill metadata; authors can attach **safety hooks** directly. That expressiveness does not port 1:1—hence gstack’s advisory prose path for other hosts.

## Cursor

**Locations:** `.cursor/skills/` or `.agents/skills/` (gstack README: “Skills live in `.agents/skills/` and are discovered automatically” for Codex/Gemini/Cursor class hosts). Cursor also supports **Rules** (modern) alongside legacy **`.cursorrules`**.

**Format:** Same `SKILL.md` + YAML frontmatter as agentskills.io standard.

**Analysis:** Cursor sits in the **middle**: it consumes the open skill format, but users often **duplicate** guidance across Rules and skills. Prefer **skills** for procedural workflows (QA, ship), **rules** for style that should apply to every edit.

## OpenAI Codex CLI

**Project docs:** `AGENTS.md` / `AGENTS.override.md` chain with **32 KiB** cap (OpenAI doc excerpt in `openai-agents-md-spec.md`).

**Skills:** `.agents/skills/<name>/SKILL.md`; discovery from cwd, parents, repo root, user home, system paths (per same doc).

**Invocation:** Explicit user mention vs implicit auto-select from description match.

**gstack codex path:** `gen-skill-docs.ts` **rewrites frontmatter** to `name` + multiline `description` only, **enforces 1024-character** descriptions (throws on exceed), strips Factory-only `sensitive:` on Claude output, and emits **`agents/openai.yaml`** with:

- `interface.display_name`, `short_description` (≤120 chars via `condenseOpenAIShortDescription`), `default_prompt`  
- `policy.allow_implicit_invocation: true`

**Sidecar:** `setup` links `gstack` runtime assets into `.agents/skills/gstack/` (`bin`, `browse`, `review`, `qa`, `ETHOS.md`) so relative paths resolve.

**Analysis:** Codex is **strictest** on description bytes and benefits from **parallel UI metadata**—skills without `openai.yaml` still work but miss polished picker integration.

## Gemini CLI

**Project doc:** `GEMINI.md` analog to `CLAUDE.md` (called out in `openai-agents-md-spec.md` comparison table).

**Skills:** Same **`.agents/skills/`** convention appears in multi-host installers (Antigravity README matrix) and gstack’s “agents” class hosts.

**Analysis:** Treat Gemini like **Codex/Cursor family** for filesystem layout; verify host-specific doc filename so **always-on** guidance is not accidentally empty.

## Factory Droid

**Location:** `.factory/skills/` (gstack README; `HOST_PATHS.factory.localSkillRoot` in `scripts/resolvers/types.ts`).

**gstack transformations (`processExternalHost` / `transformFrontmatter`):**

- Adds `user-invocable: true`  
- If template marks `sensitive: true`, adds **`disable-model-invocation: true`** so Droids cannot auto-fire ship/land/guard-class skills  
- Rewrites prose: “use the Bash tool” → “run this command”, etc., for tool-agnostic wording  
- Does **not** emit `openai.yaml` (config: `generateMetadata: false`)

**Analysis:** Factory optimizes for **governance**—skills are visible but **not always invocable** by the model. Authors should flag sensitive automation explicitly in templates.

## Kiro / OpenCode / AdaL (installer-level)

Antigravity’s README lists paths such as `~/.kiro/skills`, `.agents/skills` for OpenCode, `.adal/skills` for AdaL. These are **filesystem conventions**, not separate skill grammars.

**Analysis:** For cross-host packs, **normalize on SKILL.md** and let installers copy to the right root; avoid hardcoding `~/.claude` paths in bodies—gstack replaces `~/.claude/skills/gstack` with `$GSTACK_ROOT` / `.agents/skills/gstack` / `.factory/skills/gstack` during generation.

## Hooks and `context: fork` (Claude-only class)

Hooks enable **pre-tool** governance (bash/edit/write guards). When absent, gstack **extracts hook matchers** from templates and inserts a **Safety Advisory** block at top of body for external hosts (`extractHookSafetyProse` in `gen-skill-docs.ts`).

**Analysis:** Porting hook-reliant skills requires either **host hooks** or **procedural substitutes** (explicit confirmation steps).

## Summary table

| Host | Primary skill path | Project doc | Notable limits / extras |
|------|-------------------|-------------|-------------------------|
| Claude Code | `.claude/skills/` | `CLAUDE.md` | hooks, model overrides, fork context |
| Cursor | `.cursor/skills/` or `.agents/skills/` | Rules + legacy `.cursorrules` | same SKILL.md core |
| Codex CLI | `.agents/skills/` | `AGENTS.md` chain | **32 KiB** project docs; **1024** desc; `openai.yaml` |
| Gemini CLI | `.agents/skills/` | `GEMINI.md` | same family layout |
| Factory Droid | `.factory/skills/` | (project-specific) | `disable-model-invocation`, tool phrasing rewrites |

## Sources

- `skill-factory/raw/docs/openai-agents-md-spec.md`  
- `skill-factory/raw/docs/agentskills-io-spec.md` (extended Claude fields)  
- `skill-factory/raw/docs/mdskills-ai-spec.md`  
- `skill-factory/raw/repos/gstack/README.md` (install matrix)  
- `skill-factory/raw/repos/gstack/setup` (symlink helpers, `.agents/` generation, Codex runtime root)  
- `skill-factory/raw/repos/gstack/scripts/gen-skill-docs.ts` (transformFrontmatter, processExternalHost, hook prose)  
- `skill-factory/raw/repos/gstack/scripts/resolvers/types.ts` (`HOST_PATHS`)  
- `skill-factory/raw/repos/antigravity-awesome-skills/README.md` (multi-host path table)
