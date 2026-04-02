# Token Budget

## What it is

**Token budget** thinking treats the context window as a **shared resource**: system prompt, conversation, other skills' metadata, and your SKILL.md all compete. Discovery loads only name+description; activation loads the body; references load on demand—each phase has a different cost envelope (roughly ~100 tokens vs <5000 tokens for SKILL.md per agentskills.io).

## Why it matters

Verbose descriptions waste tokens on **every** session preload. Bloated bodies crowd out the user's actual request and increase latency to wrong conclusions. Anthropic: "Challenge each piece: Does this paragraph justify its token cost?"

## How to do it

1. **Description**: dense keywords and triggers; avoid "The purpose of this skill is to…".
2. **Body**: remove tutorials the model already knows (HTTP 101, "what is a PDF").
3. **Test**: "Would the agent get this wrong without this sentence?" If no, cut (agentskills.io).
4. **Move bulk** to `references/`; for huge files add grep hints (skill-creator).
5. **Avoid duplication** between SKILL.md and references—pick one source of truth.
6. Respect **host limits** (e.g., Codex AGENTS.md merge cap noted in OpenAI docs) when stacking project docs + skills.
7. **Right-size the unit:** Not every behavior needs a long SKILL.md. **Instincts** (YAML: trigger, action, confidence, evidence, scope) are deliberately smaller than skills in everything-claude-code—cheap to load and easy to retire. **Micro-skills** prove the same point: mattpocock’s **grill-me** is only a handful of lines of body after frontmatter yet encodes a clear interview loop (one question at a time, codebase over guessing). Use the smallest artifact that still changes behavior.

## Good example

OpenAI **skill-creator** explicitly instructs: default assumption Codex is smart; prefer concise examples; duplicate information should not live in both SKILL.md and references—keep procedural core inline, detailed schemas in `references/`. Source: `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`.

## Bad example

Repeating the same 40-line API appendix in SKILL.md **and** `references/api.md`, plus a fluffy introduction—triples activation cost without new information. Also: wordy description preamble across 100+ skills. Conversely, inflating a one-line habit into a ten-page skill wastes activation when an instinct or micro-skill would do. Sources: `raw/docs/anthropic-best-practices.md`, `raw/docs/agentskills-io-best-practices.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-spec.md`
- `raw/docs/mdskills-ai-spec.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/docs/openai-agents-md-spec.md`
- `raw/repos/openai-skills/skills/.system/skill-creator/SKILL.md`
- `raw/repos/everything-claude-code/` (instinct YAML layer)
- `raw/repos/mattpocock-skills/grill-me/SKILL.md` (micro-skill example)
