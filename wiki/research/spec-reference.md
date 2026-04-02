# SKILL.md Spec Reference (agentskills.io distilled)

This note compresses the **Agent Skills** open specification as captured in Skill Factory’s `agentskills-io-spec.md` (mirrored from https://agentskills.io/specification, retrieved 2026-04-02). Use it as a **lint target**, not a substitute for reading host release notes.

## Directory layout

Minimum viable skill:

```text
skill-name/
├── SKILL.md          # required
├── scripts/          # optional
├── references/       # optional
├── assets/           # optional
└── …
```

**Analysis:** Treat optional folders as **latency reservoirs**—anything in `references/` should declare an activation trigger in `SKILL.md` to avoid cold-loading fat.

## SKILL.md structure

1. **YAML frontmatter**  
2. **Markdown body** (instructions)

## Frontmatter fields (base spec)

| Field | Required | Constraints / intent |
|-------|----------|----------------------|
| `name` | Yes | ≤64 chars; lowercase letters, digits, hyphens; no leading/trailing hyphen; no `--`; **must match parent directory name** |
| `description` | Yes | 1–1024 chars; **WHAT + WHEN**; keywords for matching; third person |
| `license` | No | SPDX or pointer to bundled license file |
| `compatibility` | No | ≤500 chars environment notes |
| `metadata` | No | Arbitrary KV map (hosts may define sub-keys) |
| `allowed-tools` | No | Space-delimited experimental pre-approval list |

### Name rules (detail)

- Length 1–64  
- Charset: `[a-z0-9-]`  
- No leading/trailing `-`  
- No consecutive `-`  
- Directory name **equality** is a packager requirement—automation should fail CI if mismatched

### Description rules (detail)

- Must be non-empty string within cap  
- Should include **specific keywords** users/models actually say  
- Third person because it is injected into system prompts

## Progressive disclosure model

Three phases (token budgets are guidance, not kernel-enforced):

1. **Discovery** — ~**100 tokens**: `name` + `description` only  
2. **Activation** — full `SKILL.md` body; recommend **< 5000 tokens**  
3. **Execution** — follow body; load `references/` / `assets/` **as needed**

**Spec guidance:** Keep `SKILL.md` **under 500 lines**; factor out deep detail.

## File references

- Use **relative paths** from skill root  
- Keep **one level deep** from `SKILL.md`  
- Avoid **chains** of references (A→B→C)

## Optional directories (semantics)

- **`scripts/`** — executable helpers; should be self-contained, loud on failure  
- **`references/`** — docs to load on demand; keep focused  
- **`assets/`** — static templates, images, schemas

## Extended fields (Claude Code)

Documented extensions beyond base spec:

| Field | Role |
|-------|------|
| `argument-hint` | Autocomplete hint text |
| `disable-model-invocation` | User-only / blocked auto-run |
| `user-invocable` | Menu visibility control |
| `model` | Model override |
| `context: fork` | Isolated subagent context |
| `agent` | Subagent typing |
| `hooks` | Lifecycle hooks |

**Analysis:** These fields are **portability hazards**. Multi-host packs should treat them as **annotations** to strip or translate (pattern used in gstack’s `transformFrontmatter` for `sensitive:` and hook prose fallbacks).

## Agent ecosystem note

`agentskills-io-spec.md` lists **27+** compatible agents (Claude Code, Cursor, Codex, Gemini CLI, VS Code, Copilot, etc.). Compatibility is **claims-based**—always test on your target host.

## Cross-links

- **AGENTS.md** — project-level, loaded into the instruction chain (OpenAI doc)  
- **MCP** — external tool/protocol surface, orthogonal to SKILL packaging (`mdskills-ai-spec.md`)

## Practical conformance checklist (authoring)

Use this as a **pre-publish** gate independent of host:

1. **Directory/name lockstep** — `skill-name/` matches `name: skill-name`. Automated packaging (npm tarballs, git sparse checkouts) often breaks relative references when this drifts.  
2. **Description stress-test** — Read only the description aloud: does it **force-trigger** on three realistic user requests? If not, add concrete nouns (file types, CLIs, error strings).  
3. **Token budget partition** — Count lines in `SKILL.md`. If `wc -l` approaches **500**, freeze the playbook and move deep tables to `references/`, adding one-line **load triggers** per file.  
4. **Reference hygiene** — List every `references/*.md` link from the body; ensure none point to nested `references/` (spec discourages chains).  
5. **Script contract** — For each `scripts/*` invocation, specify **inputs, outputs, failure modes**. The spec’s “self-contained” adjective implies deterministic behavior, not “run and hope.”  
6. **License surface** — If corporate redistribution matters, populate `license` or bundle `LICENSE` and point to it; some marketplaces require SPDX.

## Spec vs reality: where hosts diverge

The base spec is intentionally **minimal**. In production you will encounter:

- **Extra frontmatter** keys (Codex UI YAML, Factory invocation flags).  
- **Stricter limits** (OpenAI Codex description length enforced in gstack’s generator at **1024** characters).  
- **Tool naming** — Claude-native instructions (“use the Bash tool”) rewritten for Factory in gstack to imperative English.

Treat the spec as **interoperable core**; maintain a **host delta** document per pack you ship.

Finally, remember the **social** purpose of the spec: it is a coordination surface between **human authors**, **packaging tools**, and **host implementations**. When a field is ambiguous, prefer the interpretation that makes **static validation** possible—future you (and your CI job) will thank present you.

## Sources

- `skill-factory/raw/docs/agentskills-io-spec.md`  
- `skill-factory/raw/docs/agentskills-io-best-practices.md` (operational interpretation)  
- `skill-factory/raw/docs/mdskills-ai-spec.md` (SKILL.md + related specs overview)  
- `skill-factory/raw/docs/anthropic-best-practices.md` (Claude-specific authoring discipline)  
- `skill-factory/raw/repos/gstack/scripts/gen-skill-docs.ts` (host-specific frontmatter handling illustrating spec friction in the wild)
