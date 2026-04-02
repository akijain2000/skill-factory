# Progressive Disclosure

## What it is

Progressive disclosure is a **three-phase loading model** for skills: (1) **Discovery**—only `name` and `description` (~100 tokens); (2) **Activation**—full SKILL.md body when the task matches (keep under ~500 lines / ~5000 tokens recommended); (3) **Execution**—`references/`, `scripts/`, and `assets/` loaded only when needed.

## Why it matters

The context window is shared with history, system prompts, and other skills. Stuffing everything into SKILL.md burns activation tokens and makes the skill harder to maintain. Splitting detail into reference files keeps discovery cheap and lets the agent load **just** the slice relevant to the current subtask.

## How to do it

1. Keep SKILL.md body **under 500 lines**; split as you approach the limit (Anthropic/agentskills.io).
2. Use **one level** of indirection: link from SKILL.md to `references/foo.md`—avoid chains of nested references the agent may only partially read.
3. Tell the agent **when** to read each file (e.g., "Read `references/api-errors.md` if the API returns non-200").
4. For large reference sets, add a **routing index** (table or `_sections.md`) like winui-app's "Read first" map.
5. Put **templates and long examples** in `assets/` or `references/`, not inline, per skill-creator guidance.
6. For files over ~100 lines, add a **table of contents** at the top (Anthropic).

## Good example

`winui-app` keeps a numbered "Required Flow" in SKILL.md, then mandates: "Read `references/_sections.md`, then load only the reference files that match the task," with a table mapping requests to files. Source: `raw/repos/openai-skills/skills/.curated/winui-app/SKILL.md`.

## Bad example

A single SKILL.md with thousands of lines of API docs, checklists, and examples—all loaded on every activation. This violates the spec's activation budget and duplicates what belongs in `references/`. The antigravity anatomy guide explicitly warns against "5000 words of dense technical jargon" in one blob; fix by splitting skills or using progressive disclosure. Source: `raw/repos/antigravity-awesome-skills/docs/contributors/skill-anatomy.md`.

## Sources

- `raw/docs/agentskills-io-spec.md`
- `raw/docs/mdskills-ai-spec.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/repos/openai-skills/skills/.curated/winui-app/SKILL.md`
- `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`
- `raw/repos/antigravity-awesome-skills/docs/contributors/skill-anatomy.md`
