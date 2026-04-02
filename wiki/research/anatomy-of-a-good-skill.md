# Anatomy of a Good Skill: What the Top Decile Share

“Top 10%” is not a GitHub star metric—it is behavioral. Across gstack, OpenAI’s curated catalog, Anthropic’s plugin skills, and high-signal entries in large aggregators (e.g. Antigravity’s `systematic-debugging`), the skills that reliably activate, execute, and **exit cleanly** converge on a small set of structural properties. This checklist synthesizes those patterns for Skill Factory authors.

## 1. Activation: description as a routing function

Strong skills treat the YAML `description` as the **only** reliable hook at discovery time (~100-token class budget in the agentskills.io model).

- [ ] **Third-person, specific voice** (injected into system context per Anthropic guidance).  
- [ ] **WHAT + WHEN** in one scan: action verbs + trigger phrases (“Use when…”, “Use for…”).  
- [ ] **3+ concrete triggers** where appropriate (OpenAI `skill-creator` and SkillCheck research both emphasize this).  
- [ ] **Keywords** a user would actually type: product names, CLIs, file types, failure modes.  
- [ ] **No menu of equals** in the description itself—save alternatives for the body.

*Evidence:* `gstack/browse/SKILL.md.tmpl` lines 5–11 pack latency claims, use cases, and quoted user phrases; `openai-skills/.../gh-address-comments/SKILL.md` states tool (`gh`), scope (current branch PR), and auth precondition in the first paragraph of metadata + body.

## 2. Body: one job, staged depth

- [ ] **Single coherent mission**—if two missions compete, split skills (agentskills.io “coherent units”).  
- [ ] **Under ~500 lines** in `SKILL.md`; spill to `references/` with explicit load instructions.  
- [ ] **Progressive disclosure**: tell the agent *when* to open which file (“Read X if API returns non-200”).  
- [ ] **One-level references**—avoid chains A→B→C (Anthropic anti-pattern).  
- [ ] **TOC** when body exceeds ~100 lines.

## 3. Procedure: degrees of freedom match fragility

- [ ] Classify steps as **high / medium / low freedom** (text vs pseudocode vs script) per task risk.  
- [ ] **Default path first**, escape hatches second (agentskills.io: defaults, not menus).  
- [ ] **Numbered workflows** for sequences longer than three steps.  
- [ ] **Checklists** the agent can tick mentally for multi-phase work (QA, ship, audit).  
- [ ] **Plan → validate → execute** for destructive or batch operations.

*Evidence:* `build-mcp-server` phases gate scaffolding on discovery questions; gstack `/qa` documents tier defaults and clean-tree gates before fixes.

## 4. I/O: formats are data, not vibes

- [ ] **Concrete output templates** (tables, JSON shapes, report sections).  
- [ ] **Example blocks** showing expected stdout or file layout (SkillCheck mistake #6).  
- [ ] **Explicit file paths** and temp dir conventions where artifacts matter (`pdf` skill: `tmp/pdfs/`, `output/pdf/`).  
- [ ] **Logging schema** when state accumulates across runs (autoresearch-style TSV).

## 5. Environment: dependencies as contracts

- [ ] **List tools** (CLIs, packages) with install commands per OS where possible.  
- [ ] **No assumed globals** without check steps (“run `gh auth status` first”).  
- [ ] **Forward slashes** in paths (Anthropic anti-pattern: Windows-style paths).  
- [ ] **Scripts** do real work—errors surfaced with actionable text, not “let the model figure it out.”

## 6. Safety and governance

- [ ] **Stop conditions** when repo state is unsafe (gstack `/qa` dirty working tree → AskUserQuestion).  
- [ ] **Auth and sandbox** notes for network tools (OpenAI `gh-address-comments`: escalated permissions).  
- [ ] **Sensitive operations** flagged for hosts that support `disable-model-invocation` / user-only flows (Factory pattern in gstack README).  
- [ ] **No contradictory rules**—audit for “be concise” vs “be comprehensive” without conditions (SkillCheck #7).

## 7. Quality loops

- [ ] **Validation loop** embedded: generate → verify → fix → repeat (agentskills.io).  
- [ ] **Troubleshooting** section or “if this, then that” for common failures.  
- [ ] **Evaluations**: at least three real scenarios suggested in Anthropic checklist—authors should sketch before shipping.

## 8. Metadata hygiene

- [ ] `name` matches directory; lowercase hyphenated; avoids reserved tokens (`claude`, `mcp`, `skill`, … per SkillCheck).  
- [ ] Optional **`metadata.short-description`** when host UI benefits (OpenAI pattern).  
- [ ] **Version** or **date** when behavior drifts often (Anthropic plugin skills).  
- [ ] **Provenance** fields when aggregating community skills (Antigravity `source`, `date_added`).

## 9. Writing style

- [ ] **Anti-slop**: short sentences, no hedge stacking, no filler cataloging of obvious facts.  
- [ ] **Consistent vocabulary**—one term per concept (Anthropic: don’t mix endpoint/URL/route without reason).  
- [ ] **Imperative headings** that tell the agent what to do next.

## 10. Bundled assets (when justified)

- [ ] `scripts/` for deterministic or repetitive logic.  
- [ ] `references/` for API tables, long policy text, or legal templates.  
- [ ] `assets/` for schemas, icons, static templates.  
- [ ] Each asset **referenced** from SKILL.md with a clear trigger.

---

### Quick self-score

Rate your skill 0–2 on each block (Activation, Body, Procedure, I/O, Environment, Safety, Loops, Metadata, Style, Assets). **16+** usually correlates with “always loads the right chunk”; **12–15** is salvageable with tighter description + examples; **below 12** is likely to misfire or waste tokens.

## Sources

- `skill-factory/raw/docs/skill-validation-7-mistakes.md`  
- `skill-factory/raw/docs/anthropic-best-practices.md`  
- `skill-factory/raw/docs/agentskills-io-best-practices.md`  
- `skill-factory/raw/docs/agentskills-io-spec.md`  
- `skill-factory/raw/repos/gstack/browse/SKILL.md.tmpl`, `gstack/qa/SKILL.md.tmpl`  
- `skill-factory/raw/repos/openai-skills/skills/.curated/gh-address-comments/SKILL.md`, `skills/.system/skill-creator/SKILL.md`  
- `skill-factory/raw/repos/anthropic-plugins/plugins/mcp-server-dev/skills/build-mcp-server/SKILL.md`  
- `skill-factory/raw/repos/openai-skills/skills/.curated/pdf/SKILL.md`  
- `skill-factory/raw/repos/antigravity-awesome-skills/plugins/antigravity-bundle-essentials/skills/systematic-debugging/SKILL.md`  
- `skill-factory/raw/repos/autoresearch/program.md` (output/logging discipline)
