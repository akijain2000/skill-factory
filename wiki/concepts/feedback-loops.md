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

## The /gotcha skill: lightweight real-time feedback

The `/gotcha` skill pattern automates the most common feedback loop. When the agent makes a mistake, the user types:

```
/gotcha Claude forgot --profile flightmap
```

The skill identifies which skill the mistake belongs to, opens that file, and appends the gotcha. This is the fastest path from "mistake observed" to "mistake prevented forever." See [Gotchas Sections](gotchas-sections.md) for the full pattern.

## "Don't try to write a perfect skill on day one"

Anthropic's own team reports that their best skills started as a few lines and one gotcha, then got better over time as people kept adding to them. This aligns with the iterative philosophy: ship a minimal skill, use it, capture gotchas, refine triggers, expand as needed. Perfection is the enemy of shipping.

**Recommended starter pair**: `/preflight` (stops you committing broken code) and `/gotcha` (captures mistakes so they don't happen twice). Build everything else from there. Source: `raw/docs/applied-anthropic-playbook.md`.

## Bad example

One-shot prompt: "Generate a skill for our API," pasted into SKILL.md without running a single import or error case—produces "handle errors appropriately" prose. Source critique: `raw/docs/agentskills-io-best-practices.md`.

## Sources

- `raw/docs/anthropic-best-practices.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/docs/applied-anthropic-playbook.md` (/gotcha pattern, iterative improvement, starter pair)
- `raw/repos/antigravity-awesome-skills/docs/contributors/skill-anatomy.md` (Pro Tips: test with an AI, iterate)
