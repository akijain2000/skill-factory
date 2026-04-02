# Error Handling in Scripts

## What it is

Bundled **scripts** should **solve** problems deterministically: validate inputs, surface clear errors, and exit with meaningful status. Anthropic explicitly warns against scripts that **punt** errors back to the model with no diagnosis—wasting tokens and inviting hallucinated fixes.

## Why it matters

agentskills.io says scripts in `scripts/` should be **self-contained** with helpful errors and edge cases. The checklist anti-pattern "scripts solve problems, don't punt" matches how CI-friendly tooling should behave. Good errors reduce retry loops; bad ones force the agent to guess.

## How to do it

1. Check prerequisites up front (`command -v`, file exists) with **actionable messages**.
2. Use **non-zero exits** on failure; avoid swallowing exceptions silently.
3. Print **structured output** when downstream steps parse JSON/logs.
4. Document **sandbox/network** needs next to commands that require them (see vercel-deploy).
5. Prefer **small tested scripts** over repeating fragile one-liners across tasks (agentskills.io bundling pattern).
6. No **magic constants** without comment or named variables (Anthropic).

## Good example

`quick_validate.py` fails fast with specific reasons: missing SKILL.md, invalid YAML, unexpected frontmatter keys, naming rule violations—machine-readable strings suitable for fixing. Source: `raw/repos/openai-skills/skills/.system/skill-creator/scripts/quick_validate.py`.

## Bad example

`deploy.sh` that runs `curl` with no timeout, ignores exit codes, and echoes "Something went wrong"—forcing the model to redo networking blindly. Contrasts with vercel-deploy's timeout guidance and explicit fallback path. Sources: `raw/docs/anthropic-best-practices.md`, `raw/repos/openai-skills/skills/.curated/vercel-deploy/SKILL.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-spec.md`
- `raw/repos/openai-skills/skills/.system/skill-creator/scripts/quick_validate.py`
- `raw/repos/openai-skills/skills/.curated/vercel-deploy/SKILL.md`
