# Feedback Loops (Authoring)

## What it is

A **feedback loop** in skill authoring means iterating with **real runs**: write SKILL.md, execute representative tasks, read traces/outputs, then refine triggers, steps, and gotchas. Anthropic recommends **evaluations first** (baseline without skill, then with) and dual-session testing ("Claude A" authors, "Claude B" executes).

## Why it matters

agentskills.io warns that LLM-generated skills without domain runs become generic checklists. Traces reveal **wrong defaults**, **skipped validations**, and **ambiguous ordering**—things static proofreading misses.

## How to do it

1. **Identify gaps** running tasks without the skill; write three concrete scenarios as mini-evaluations (Anthropic).
2. Add the **smallest** instruction that fixes the gap; re-run the same scenarios.
3. Read **execution traces**, not just final answers—look for retries, wrong tools, ignored sections.
4. Capture new **gotchas** from failures back into SKILL.md the same day.
5. For multi-model hosts, test a **fast** and a **strong** model (Anthropic Haiku vs Opus guidance).
6. Version or changelog meaningful behavior changes so teams know what improved.

## Good example

Anthropic's evaluation workflow: establish baseline → minimal instructions → iterate; plus "Develop iteratively with Claude" using separate author/test roles. agentskills.io: refine from **real execution** and traces. Sources: `raw/docs/anthropic-best-practices.md`, `raw/docs/agentskills-io-best-practices.md`.

## Bad example

One-shot prompt: "Generate a skill for our API," pasted into SKILL.md without running a single import or error case—produces "handle errors appropriately" prose. Source critique: `raw/docs/agentskills-io-best-practices.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/repos/antigravity-awesome-skills/docs/contributors/skill-anatomy.md` (Pro Tips: test with an AI, iterate)
