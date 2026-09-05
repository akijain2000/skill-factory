# Validation Loops

## What it is

A **validation loop** is an explicit instruction pattern: **do work → validate → fix → repeat** until checks pass. It treats quality as iterative, not one-shot, and pairs naturally with tests, linters, builds, or human-visible artifacts (screenshots, rendered output).

This is different from a **skill evaluation**. A validation loop checks one task execution. A skill eval compares repeated isolated behavior with and without the skill across a case set.

## Why it matters

Anthropic and agentskills.io both cite feedback loops as a high-leverage pattern: without them, agents often declare success after a single attempt. Loops align with how fragile tasks actually fail (wrong assumptions, environment gaps) and reduce shipped defects.

## How to do it

1. Name the **validator** (command, script, checklist, or visual step).
2. Specify **stop conditions** ("repeat until tests pass" or "until build succeeds").
3. On failure, require **root-cause inspection** before retrying (see winui: "inspect the output instead of guessing").
4. For UI or documents, add **render/review** steps (spreadsheet skill: recalculate, render sheets, review layout).
5. Keep the loop **bounded** (max iterations or escalation to the user) to avoid infinite retries.

### Library-scale validation (meta)

For **entire skill libraries**, reuse the ECC-style split: **deterministic inventory** (scripts listing skills, hashes, duplicates) plus fixed stocktake verdicts (Keep / Improve / Retire / Merge). The inventory should retain one record per skill, exact validator identity, line count, warnings, and whether an eval definition is actually versioned. Behavioral assurance requires case suites, no-skill baselines, repeated isolated trials, and deterministic graders where possible. Batched model judgment can help triage, but it is not a substitute for executing the supported agent and harness.

Do not flatten these shelf states into one green count:

1. structural validator PASS
2. versioned eval definition present
3. executed behavioral PASS under a frozen runtime
4. domain-specific operational/production proof

Audit the whole shelf, then prioritize behavioral work by frequency, side
effects, privacy, identity, provider delivery, and failure cost. Auto-generating
empty or shallow eval files only hides the gap.

## Good example

The curated `spreadsheet` skill instructs: recalculate formulas before delivery, render sheets for visual review when tooling exists, and use `openpyxl` awareness that formulas are not evaluated in-library—forcing validation via tooling or explicit review. Source: `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`.

## Bad example

"Implement the feature and ensure it works." No validator, no retry, no command—so the agent may skip tests or assume success. agentskills.io contrasts this with vague procedures like "handle errors appropriately" instead of concrete validate-fix cycles. Source: `raw/docs/agentskills-io-best-practices.md`.

## Three-dimension testing

AgentPatterns.ai formalizes skill testing across three dimensions:

1. **Triggering**: does the skill load on relevant queries and stay silent on adjacent unrelated ones? Start with about five prompts that should trigger and five that should not.
2. **Functional**: does it produce correct outcomes consistently across 3-6 isolated runs?
3. **Performance**: compare tool calls, messages, and tokens **with** vs **without** the skill. An effective skill should reduce all three. If it increases them, the skill is adding overhead without value.

Iterate on a single challenging task until the agent succeeds, then extract the winning approach into the skill. Source: `raw/docs/agentpatterns-skill-authoring.md`.

## Measuring effectiveness at scale

Track invocation frequency with a `PreToolUse` hook that logs skill name and timestamp. Use the log to identify:
- **Under-triggering skills** (description needs work)
- **Over-triggering skills** (description too broad)
- **Popular skills** (expand these, invest in quality)

Source: `raw/docs/trq212-skills-abstraction.md`.

## Troubleshooting table

| Symptom | Common Cause | Fix |
|---------|--------------|-----|
| Skill never triggers | Description too vague or missing triggers | Add specific phrases users would say |
| Triggers on unrelated queries | Description too broad | Add negative triggers; narrow scope |
| Loads but instructions ignored | Instructions too verbose or buried | Put critical instructions first; use numbered lists |
| Slow or degraded responses | Skill content too large | Keep under 5000 tokens; use progressive disclosure |
| Inconsistent results | Ambiguous instructions | Replace vague language with explicit checks |

Source: `raw/docs/agentpatterns-skill-authoring.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/docs/agentpatterns-skill-authoring.md` (three-dimension testing, troubleshooting table)
- `raw/docs/trq212-skills-abstraction.md` (PreToolUse hooks for effectiveness measurement)
- `raw/docs/dont-ship-skills-without-evals.md` (skill evaluation protocol and lifecycle)
- `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`
- `raw/repos/openai-skills/skills/.curated/winui-app/SKILL.md`
- `raw/repos/everything-claude-code/` (skill stocktake, `skill-comply` / compliance measurement patterns)
- `wiki/concepts/evidence-lifecycle.md`
