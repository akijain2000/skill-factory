# Gotchas Sections

## What it is

**Gotchas** are environment-specific facts that violate default model assumptions—shell differences, sandbox networking, tools that do not evaluate formulas, packaging models, or auth flows. A dedicated section (or inline "Environment rules") captures corrections from real runs so the next activation does not repeat the same mistake.

## Why it matters

agentskills.io calls gotchas **highest-value content**: they are cheap in tokens but prevent expensive wrong paths. Without them, the agent "knows" generic best practices but not **your** stack's sharp edges (e.g., OpenAI deploy sandbox requiring escalation only for the deploy command, not for `command -v`).

## How to do it

1. Collect failures from **real traces** (wrong CLI flags, missing credentials, zsh vs bash).
2. Prefer **imperative fixes** ("Do not escalate the install check") over vague warnings.
3. Keep gotchas **near the top** of the flow if they gate the whole task (winui: verify machine before claiming success).
4. Separate **facts** from **policy** ("preview by default" vs "LibreOffice not installed").
5. Refresh when the platform changes; mark time-sensitive notes or move deprecated patterns to a collapsed section (Anthropic).

## Good example

`vercel-deploy` documents: check CLI with `command -v` **without** escalated permissions; use a **10 minute** timeout for `vercel deploy`; only use `--prod` if the user explicitly asks; if auth fails, fall back to `scripts/deploy.sh` with explicit paths. Source: `raw/repos/openai-skills/skills/.curated/vercel-deploy/SKILL.md`.

## Bad example

"Be careful with deployment." No sandbox note, no timeout, no preview-vs-prod rule—so the agent may hammer production or fail silently on network policy. Contrast with explicit gotchas above. Generic pitfall: empty "Common Pitfalls" headings with no solutions (SkillCheck mistake #4). Source: `raw/docs/skill-validation-7-mistakes.md`.

## Sources

- `raw/docs/agentskills-io-best-practices.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/repos/openai-skills/skills/.curated/vercel-deploy/SKILL.md`
- `raw/repos/openai-skills/skills/.curated/winui-app/SKILL.md`
- `raw/docs/skill-validation-7-mistakes.md`
