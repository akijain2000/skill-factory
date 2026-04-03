# Skill Authoring Patterns: Description to Deployment

**Source**: [AgentPatterns.ai](https://agentpatterns.ai/tool-engineering/skill-authoring-patterns/)
**Date**: 2026
**Type**: Reference article (synthesis of Anthropic practices)

---

Practical patterns for building, testing, and troubleshooting agent skills -- the categories they fall into, how to write descriptions that trigger reliably, implementation patterns, and what to do when things break.

## Description Craft

The `description` field determines whether the agent loads a skill -- it is always present in the system prompt (progressive disclosure), so it must earn its tokens.

Structure: `[What it does] + [When to use it] + [Key capabilities]`. Include trigger phrases users would actually say; missing triggers cause under-triggering.

For over-triggering, add negative triggers:

```yaml
description: Advanced data analysis for CSV files. Use for statistical
  modelling, regression, clustering. Do NOT use for simple data
  exploration (use data-viz skill instead).
```

Debugging approach: ask the agent "When would you use the [skill name] skill?" -- it quotes the description back, revealing what's missing.

## Problem-First vs. Tool-First Framing

Problem-first skills define steps for an outcome ("set up a project workspace"). Tool-first skills embed expertise for a given tool ("I have Linear MCP connected"). This distinction drives which implementation pattern fits.

## Five Implementation Patterns

| Pattern | Use when | Key structure |
|---------|----------|---------------|
| 1. Sequential Workflow Orchestration | Multi-step process in fixed order | Step -> tool call -> expected output; include rollback instructions |
| 2. Multi-MCP Coordination | Workflow spans multiple services | Organize by phase; validate before proceeding; pass data explicitly |
| 3. Iterative Refinement | Output improves with iteration | Draft -> quality check -> refinement loop; explicit exit condition |
| 4. Context-Aware Tool Selection | Same outcome, different tools by context | Decision tree: inspect context -> select tool -> explain choice; include fallback |
| 5. Domain-Specific Intelligence | Specialized knowledge beyond tool access | Pre-check (domain rules) -> execution -> documentation |

## Testing Methodology

Test across three dimensions:
1. **Triggering**: loads on relevant queries, not on unrelated ones
2. **Functional**: produces correct outputs consistently across 3-5 runs
3. **Performance**: compare tool calls, messages, and tokens with vs. without the skill -- an effective skill reduces all three

Iterate on a single challenging task until the agent succeeds, then extract the winning approach into the skill.

## Troubleshooting

| Symptom | Common Cause | Fix |
|---------|--------------|-----|
| Skill never triggers | Description too vague or missing trigger phrases | Add specific phrases users would say; mention relevant file types |
| Skill triggers on unrelated queries | Description too broad | Add negative triggers; narrow scope |
| Skill loads but instructions ignored | Instructions too verbose or buried | Put critical instructions first; use numbered lists; move detail to references/ |
| MCP calls fail | Connection or auth issues | Test MCP independently without the skill first |
| Slow or degraded responses | Skill content too large | Keep SKILL.md under 5000 words; use progressive disclosure via references/ |
| Inconsistent results across sessions | Ambiguous instructions | Replace vague language with explicit checks |

For critical validations, bundle a script -- code is deterministic; language interpretation is not.
