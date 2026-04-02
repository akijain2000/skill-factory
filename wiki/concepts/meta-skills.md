# Meta-Skills

## What it is

**Meta-skills** are skills **about skills**: they inventory, judge, deduplicate, promote, or **measure** the behavior of the library itself. Examples from recent corpora include **skill stocktake** (deterministic inventory plus chunked subagent evaluation with Keep/Improve/Retire/Merge verdicts), **rules distillation** (promoting text that appears in two or more skills into shared rules via shell inventory + LLM judgment), **compliance measurement** (e.g. `skill-comply`: generated behavioral specs, scenarios at multiple prompt strictness levels, tool traces, LLM-scored compliance), and Fabric’s **create_pattern** meta-pattern that rewrites arbitrary prompts into the project’s standard pattern shape.

## Why it matters

At scale, prose edits alone do not improve reliability—**governance must be operational**. Meta-skills turn “we should clean up skills” into bounded batches, explicit verdicts, and repeatable measurement instead of hope. They embody the **self-maintaining skill library**: the same agent harness that consumes skills also runs procedures to audit and align them.

## How to do it

1. **Deterministic first:** Scripts for inventory, file lists, and diffable facts; reserve LLM passes for judgment in fixed batch sizes (~20 skills).
2. **Explicit verdicts:** Use a small closed set (Keep/Improve/Retire/Merge) so outputs aggregate cleanly.
3. **Measure behavior:** Pair scenarios with traces; classify compliance rather than assuming adherence.
4. **Promote cross-cutting rules:** When two skills encode the same principle, distill once and link.
5. **Close the loop:** Stocktake and compliance feed edits; re-run measurement after changes.

## Good example

ECC combines stocktake, rules distillation, and compliance tooling with hook-driven memory—meta operations are first-class in the repo layout. Fabric’s `create_pattern` shows meta-patterns for **format**, not only task content. Sources: `raw/repos/everything-claude-code/`, `raw/repos/fabric/data/patterns/`.

## Bad example

A single “audit everything” prompt with no chunking or machine-readable output—collapses under large trees and produces unmergeable opinions.

## Sources

- `raw/repos/everything-claude-code/README.md`
- `raw/repos/fabric/README.md`, `raw/repos/fabric/data/patterns/`
- `wiki/concepts/validation-loops.md` (advanced validation patterns)
