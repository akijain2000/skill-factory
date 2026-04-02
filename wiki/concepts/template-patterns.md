# Template Patterns

## What it is

**Template patterns** give the agent a **fixed shape** for outputs—markdown tables, JSON shells, report sections, or code scaffolds—so results are parseable and consistent. They pair with **input/output examples** for skills where format strongly affects quality (reports, APIs, codegen). Outside agentskills.io, CLI prompt libraries such as **Fabric** use the same idea under **`data/patterns/.../system.md`** (named pattern folders with rigid section scaffolds)—portable into SKILL.md if you add frontmatter and discovery text. Fabric often uses a **rigid heading ladder** (e.g. **IDENTITY AND PURPOSE** → **STEPS** → **OUTPUT INSTRUCTIONS** → **INPUT**) so humans and models can scan hundreds of patterns predictably.

## Why it matters

Skill validation research lists **missing output format** as a common mistake: without a template or example, every run invents a different structure. Anthropic lists "template pattern" and "examples pattern" as core reusable patterns. Templates beat prose like "return a structured summary" because they reduce ambiguity.

## How to do it

1. Show the **exact** output skeleton in a fenced code block (headings, bullet labels, placeholders).
2. For long templates, store under `assets/` and **reference the path** (skill-creator: assets for files used in output).
3. Add **one minimal filled example** plus one **edge-case** example when quality is critical.
4. Align template fields with **downstream consumers** (CI, humans, other tools).
5. Avoid contradicting format rules elsewhere in the skill (SkillCheck: JSON vs plain text conflicts).
6. **Template tokens:** Use placeholders such as `{{input}}`, `{{lang_code}}`, or named slots in pattern bodies so one scaffold serves many invocations without copy-paste drift (Fabric-style parameterization).
7. **Explicit output contracts:** State section names, bullet **word limits**, “Markdown only,” forbidden behaviors (e.g. no preamble, no code fences for prose), and required labels—tighter than “return a summary.”

## Good example

The antigravity **skill anatomy** shows reusable patterns: security block template with `<!-- security-allowlist: ... -->`, and recommends an Examples section with concrete code blocks. OpenAI **skill-creator** documents separating `assets/` for templates users copy into deliverables. Fabric patterns illustrate **fixed headings**, **tokenized inputs**, and strict **OUTPUT INSTRUCTIONS**. Sources: `raw/repos/antigravity-awesome-skills/docs/contributors/skill-anatomy.md`, `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`, `raw/repos/fabric/data/patterns/` (representative `system.md` files).

## Bad example

"Produce a QA report with findings and severity." No sections, no table schema, no example—reviewers get inconsistent severity scales and missing repro steps. Fix: define headings (Summary, Issues, Repro, Evidence) and a row template per issue. Cited anti-pattern: mistake #6 in SkillCheck. Source: `raw/docs/skill-validation-7-mistakes.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/skill-validation-7-mistakes.md`
- `raw/repos/antigravity-awesome-skills/docs/contributors/skill-anatomy.md`
- `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`
- `raw/repos/gstack/qa/SKILL.md` (structured workflow and tiered output framing in description)
- `raw/repos/fabric/data/patterns/extract_wisdom/system.md` (section-scaffold template pattern in the wild)
