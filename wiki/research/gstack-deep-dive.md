# gstack Deep Dive: How the Skill Factory Works Internally

gstack is a dual system: a **persistent browser runtime** (Bun + Playwright + localhost HTTP) and a **skill document factory** that keeps agent instructions synchronized with code. This article focuses on the **second** layer—templates, generation, routing, and validation—using `ARCHITECTURE.md`, `setup`, `scripts/gen-skill-docs.ts`, and representative `SKILL.md.tmpl` files.

## 1. Source of truth: templates vs committed output

**Problem (from `ARCHITECTURE.md`):** Hand-written `SKILL.md` drifts from CLI flags and commands.

**Solution pipeline:**

```text
SKILL.md.tmpl   →   gen-skill-docs.ts   →   SKILL.md (committed)
```

Templates hold **human judgment** (workflows, QA methodology, tone). Placeholders pull **machine truth** from TypeScript sources at build time.

**Why committed output?** Three reasons enumerated in architecture: (1) hosts read static files at invocation time—**no runtime codegen**; (2) CI can run `gen:skill-docs --dry-run` + `git diff --exit-code`; (3) **git blame** preserves forensic history.

## 2. Template engine mechanics

File: `scripts/gen-skill-docs.ts` (~487 lines).

1. **`discoverTemplates`** (imported) locates `**/*.SKILL.md.tmpl`.  
2. Frontmatter parsed early for:
   - `benefits-from: [skills…]` (cross-skill metadata)
   - `preamble-tier: N` (1–4) controlling preamble depth
   - `name` / `description` (may differ from directory name for external mapping)
3. **Placeholder replacement** via regex `\{\{(\w+(?::[^}]+)?)\}\}`:
   - Simple: `{{PREAMBLE}}`
   - Parameterized: `{{INVOKE_SKILL:name}}` style (split on `:`)
4. **Resolver table** `RESOLVERS` maps token → function; **unknown placeholder fails the build** (explicit error listing leftovers).

### Major placeholders (from `ARCHITECTURE.md` table)

| Token | Source / generator | Purpose |
|-------|--------------------|---------|
| `{{COMMAND_REFERENCE}}` | `browse/src/commands.ts` | Categorized command table |
| `{{SNAPSHOT_FLAGS}}` | `browse/src/snapshot.ts` | Flag docs |
| `{{PREAMBLE}}` | generator | Shared startup bash block |
| `{{BROWSE_SETUP}}` | generator | Binary discovery |
| `{{BASE_BRANCH_DETECT}}` | generator | PR targeting skills |
| `{{QA_METHODOLOGY}}` | shared QA block | `/qa` and `/qa-only` |
| `{{DESIGN_METHODOLOGY}}` | shared design block | design plan + review |
| `{{REVIEW_DASHBOARD}}` | ship pre-flight | Readiness dashboard |
| `{{TEST_BOOTSTRAP}}` | generator | Test harness detection |
| `{{CODEX_PLAN_REVIEW}}` | optional cross-model review | CEO/eng plan skills |
| `{{DESIGN_SETUP}}` | `resolvers/design.ts` | Design binary discovery |
| `{{DESIGN_SHOTGUN_LOOP}}` | `resolvers/design.ts` | Comparison board loop |

**Analysis:** This is closer to **Jekyll-style partials** than to LLM prompts—deterministic, testable, fail-closed.

## 3. Host-specific generation

**Hosts enum:** `'claude' | 'codex' | 'factory'` (`scripts/resolvers/types.ts`).

`HOST_PATHS` defines symbolic roots:

- **Claude:** `~/.claude/skills/gstack`, local `.claude/skills/gstack`, binary and design dist paths  
- **Codex:** `$GSTACK_ROOT`, `.agents/skills/gstack`, `$GSTACK_BIN`, `$GSTACK_BROWSE`, `$GSTACK_DESIGN`  
- **Factory:** same as Codex but `.factory/skills/gstack`

`transformFrontmatter()` behavior:

- **Claude:** strip `sensitive: true` (Factory-only marker)  
- **Codex:** rebuild minimal frontmatter (`name`, multiline `description: |`), **throw if description > 1024 chars**  
- **Factory:** add `user-invocable: true`, optionally `disable-model-invocation: true` when sensitive

`processExternalHost()` additionally:

- Rewrites path strings from Claude defaults to host-relative paths  
- Inserts **hook safety advisory** prose when templates declare `hooks:` but target host lacks hook execution  
- Generates **`agents/openai.yaml`** for Codex (not Factory) using condensed short description (120-char heuristic)

**Skill routing / naming:** `externalSkillName()` prefixes `gstack-` unless already present or root meta-skill.

## 4. Preamble tiers

`{{PREAMBLE}}` encodes shared session policy as a **single bash command** block. According to `ARCHITECTURE.md`, it covers:

1. **Update check** (`gstack-update-check`)  
2. **Session tracking** — ELI16 mode when ≥3 concurrent sessions (re-ground questions)  
3. **Operational self-improvement** — JSONL learnings per project  
4. **`AskUserQuestion` format** — consistent multiple-choice UX  
5. **Search Before Building** — layered knowledge search philosophy (`ETHOS.md`)

`preamble-tier` in templates (example: `browse/SKILL.md.tmpl` line 3 `preamble-tier: 1`, `qa/SKILL.md.tmpl` `preamble-tier: 4`) throttles how much of that block ships—**heavy governance** attaches to high-risk skills (QA fixes code; browse is tool-first).

## 5. Setup script: where generation meets the filesystem

`setup` (~686 lines) responsibilities sampled:

- Require **Bun**; build `browse/dist/browse` when stale  
- Always run **`bun run gen:skill-docs --host codex`** when agents docs must exist (`.agents/skills` not committed)  
- On Factory installs, `gen:skill-docs --host factory`  
- **`link_claude_skill_dirs`** — symlink each skill into parent skills directory respecting `SKILL_PREFIX`  
- **`link_codex_skill_dirs`** — symlink from `.agents/skills/gstack-*` to target skills root; skip `gstack` sidecar directory to avoid loops  
- **`create_agents_sidecar`** — link `bin`, `browse`, `review`, `qa`, `ETHOS.md` into `.agents/skills/gstack/` for runtime resolution  
- **`create_codex_runtime_root`** — prevent duplicate discovery of source vs generated skills under `~/.codex/skills`

**Analysis:** gstack treats **path topology** as part of the UX contract—skills reference assets via stable relative paths; setup repairs the graph after clone.

## 6. Validation loops

### Tier 1 — Static (fast)

- Parse `$B` invocations in `SKILL.md` against command registry (`ARCHITECTURE.md`: runs on every `bun test`)  
- Unresolved `{{PLACEHOLDER}}` errors at codegen time

### Tier 2 — E2E (expensive)

Spawn `claude -p` sessions via `test/helpers/session-runner.ts`; full NDJSON transcript capture; **~$3.85** cited for full skill sweep.

### Tier 3 — LLM-as-judge (moderate cost)

Sonnet scores clarity/completeness/actionability (~$0.15 cited).

**Philosophy:** “Catch 95% free; spend models on judgment.”

## 7. Representative templates

- **`browse/SKILL.md.tmpl`** — frontmatter with `allowed-tools`, multi-pattern QA cookbook, `{{BROWSE_SETUP}}`, command examples using `$B` DSL.  
- **`qa/SKILL.md.tmpl`** — `allowed-tools` includes write-capable tools, `{{BASE_BRANCH_DETECT}}`, parameter table, dirty working tree **hard stop**, browse binary discovery, tiered severity policy.

**Pattern:** combine **machine-generated** tables (commands, flags) with **human-authored** playbooks (what good QA looks like).

## 8. Takeaways for Skill Factory authors

1. **Treat skills as compiled artifacts** when they reference a CLI—generate docs from code or accept drift.  
2. **Encode host deltas in one place** (gstack’s `transformFrontmatter` + path rewrite), not duplicated SKILL bodies.  
3. **Use tiers** to avoid paying preamble tokens on lightweight tools.  
4. **Validate progressively**—static first, LLM last.

## Sources

- `skill-factory/raw/repos/gstack/ARCHITECTURE.md` (browser + template system + eval tiers)  
- `skill-factory/raw/repos/gstack/scripts/gen-skill-docs.ts`  
- `skill-factory/raw/repos/gstack/scripts/resolvers/types.ts`  
- `skill-factory/raw/repos/gstack/setup`  
- `skill-factory/raw/repos/gstack/browse/SKILL.md.tmpl`  
- `skill-factory/raw/repos/gstack/qa/SKILL.md.tmpl`  
- `skill-factory/raw/docs/agentskills-io-spec.md` (baseline SKILL semantics for comparison)
