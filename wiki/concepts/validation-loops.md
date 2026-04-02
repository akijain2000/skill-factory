# Validation Loops

## What it is

A **validation loop** is an explicit instruction pattern: **do work → validate → fix → repeat** until checks pass. It treats quality as iterative, not one-shot, and pairs naturally with tests, linters, builds, or human-visible artifacts (screenshots, rendered output).

## Why it matters

Anthropic and agentskills.io both cite feedback loops as a high-leverage pattern: without them, agents often declare success after a single attempt. Loops align with how fragile tasks actually fail (wrong assumptions, environment gaps) and reduce shipped defects.

## How to do it

1. Name the **validator** (command, script, checklist, or visual step).
2. Specify **stop conditions** ("repeat until tests pass" or "until build succeeds").
3. On failure, require **root-cause inspection** before retrying (see winui: "inspect the output instead of guessing").
4. For UI or documents, add **render/review** steps (spreadsheet skill: recalculate, render sheets, review layout).
5. Keep the loop **bounded** (max iterations or escalation to the user) to avoid infinite retries.

### Library-scale validation (meta)

For **entire skill libraries**, reuse the ECC-style split: **deterministic inventory** (scripts listing skills, hashes, duplicates) plus **batched model judgment** (e.g. ~20 skills per pass) with fixed verdicts—**skill stocktake** (Keep / Improve / Retire / Merge). For **behavioral** assurance, **compliance measurement** (e.g. `skill-comply`): auto-generate behavioral specs from skills, run scenarios at several **prompt strictness** levels, capture **tool traces**, and **LLM-classify** adherence—measurement instead of hope. These extend the same validate→fix→re-run mindset from single tasks to corpus health.

## Good example

The curated `spreadsheet` skill instructs: recalculate formulas before delivery, render sheets for visual review when tooling exists, and use `openpyxl` awareness that formulas are not evaluated in-library—forcing validation via tooling or explicit review. Source: `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`.

## Bad example

"Implement the feature and ensure it works." No validator, no retry, no command—so the agent may skip tests or assume success. agentskills.io contrasts this with vague procedures like "handle errors appropriately" instead of concrete validate-fix cycles. Source: `raw/docs/agentskills-io-best-practices.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/repos/openai-skills/skills/.curated/spreadsheet/SKILL.md`
- `raw/repos/openai-skills/skills/.curated/winui-app/SKILL.md`
- `raw/repos/everything-claude-code/` (skill stocktake, `skill-comply` / compliance measurement patterns)
