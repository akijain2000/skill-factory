# Plan, Validate, Execute

## What it is

**Plan–validate–execute** is a safety pattern for **batch or destructive** work: produce an intermediate **plan** in a structured format, **validate** it against a source of truth (repo state, user intent, policy), then **execute** only after confirmation. It prevents irreversible mistakes when scale or blast radius is high.

## Why it matters

agentskills.io recommends this pattern explicitly for batch/destructive operations. Shipping workflows (merge, push, migrations, bulk edits) go wrong when the agent acts immediately on a partial understanding. A visible plan gives the user—or automated checks—a chance to catch ordering errors, wrong branches, or missing steps.

## How to do it

1. Define the **plan artifact** (numbered steps, file list, diff summary, or checklist).
2. State **what validates** the plan (diff against `main`, test run dry-run, user approval).
3. Forbid execution until validation passes; keep **execute** steps separate in the doc.
4. For destructive CLI, mirror **careful** skills: confirm scope, then run minimal commands.
5. Log or echo **branch/repo context** before acting (gstack preamble pattern) so validation has signals.

## Good example

The gstack `ship` skill description encodes a **sequenced** ship workflow (merge base, tests, review diff, VERSION, CHANGELOG, commit, push, PR) and the skill body culture emphasizes not pushing blindly—structuring work as ordered phases. Source: `raw/repos/gstack/ship/SKILL.md` (workflow framing in frontmatter and instructions).

## Bad example

"Delete all unused files in the repo" with immediate `find … -delete` and no inventory or user validation—no plan artifact, no second pass. agentskills.io cites plan-validate-execute specifically to avoid this class of failure. Source: `raw/docs/agentskills-io-best-practices.md`.

## Sources

- `raw/docs/agentskills-io-best-practices.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/repos/gstack/ship/SKILL.md`
