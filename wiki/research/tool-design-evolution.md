# Tool Design Evolution in Claude Code

How Anthropic iteratively designed the tool surface for Claude Code -- and what it teaches skill authors about matching tools to agent capabilities.

Source: [Thariq (@trq212), "Building an agent is more of an art than a science"](https://x.com/trq212/status/2027463795355095314), February 2026. Additional context from the Claude Agent SDK blog post (September 2025, updated 2026).

## Core principle

> "You want to give it tools that are shaped to its own abilities. But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent."

Designing agent tools is an art, not a science. It depends on the model, the goal, and the environment. There are no rigid rules -- only iteration.

## Case study 1: AskUserQuestion

**Problem**: improve Claude's ability to ask structured questions (elicitation).

**Attempt 1 -- ExitPlanTool parameter**: Added a questions array parameter to the existing ExitPlanTool. This confused Claude because it was simultaneously producing a plan and asking questions about the plan. What if the user's answers conflicted with the plan?

**Attempt 2 -- Output format modification**: Modified Claude's output instructions to produce a custom markdown format with bullet-point questions and bracketed alternatives. Claude could sometimes do this, but it was unreliable -- it would append extra sentences, omit options, or use a different format entirely.

**Attempt 3 -- Dedicated tool (shipped)**: Created a standalone AskUserQuestion tool callable at any point, especially during plan mode. Displayed a modal, blocked the agent loop until answered, ensured structured output with multiple options.

**Why it won**: "Even the best designed tool doesn't work if Claude doesn't understand how to call it." A dedicated tool with clear semantics beat a overloaded existing tool or unreliable format instructions.

**Lesson for skill authors**: when designing a skill workflow, prefer clear, single-purpose steps over complex multi-purpose instructions. The agent needs to understand what you're asking.

## Case study 2: TodoWrite to Task Tool

**Phase 1 -- TodoWrite**: gave Claude a todo list to keep it on track. But Claude frequently forgot items, so system reminders were injected every 5 turns.

**Phase 2 -- Models improved**: Newer models didn't need reminders -- the reminders were constraining them. Claude would rigidly follow the original todo list instead of adapting it. And with better subagent capabilities, the question became: how do subagents coordinate on a shared list?

**Phase 3 -- Task Tool (shipped)**: replaced TodoWrite. Tasks support dependencies, shared updates across subagents, and can be altered or deleted. Todos were about tracking; Tasks are about multi-agent coordination.

**Key insight**: "As model capabilities increase, the tools that your models once needed might now be constraining them. Constantly revisit previous assumptions."

**Lesson for skill authors**: don't over-specify steps that newer models handle natively. Write skills as a delta from baseline model behavior.

## Case study 3: Search interface evolution

**Phase 1 -- RAG**: Vector database for finding codebase context. Powerful and fast but required indexing, was fragile across environments, and gave context to Claude rather than letting it find context.

**Phase 2 -- Grep tool**: Let Claude search the codebase itself. The model became increasingly good at building its own context when given search tools.

**Phase 3 -- Progressive disclosure**: Formalized through Agent Skills. Claude reads skill files that reference other files that reference other files -- nested search across several layers to find exact context.

**Phase 4 -- Guide subagent**: Rather than adding another tool for "how to use Claude Code" documentation, built a subagent that searches docs and returns answers. Added to Claude's action space without adding a tool.

**Lesson for skill authors**: progressive disclosure is how Claude Code itself works. Skills that reference sub-files only when needed mirror the architecture of the agent they run in.

## The agent loop

From the Claude Agent SDK blog: agents operate in a specific feedback loop:

**Gather context -> Take action -> Verify work -> Repeat**

This loop maps directly to skill workflow patterns:
1. **Gather context**: read the skill, load references, check config
2. **Take action**: execute the workflow steps
3. **Verify work**: run validators, check output, confirm results
4. **Repeat**: fix issues and re-verify

## File system as state

Thariq argues that every agent should use a file system. The file system is an elegant way of representing state that an agent can read into context and use to verify its work.

The key insight: "You don't need to remember everything, you just need to know how to find it."

This applies directly to skill design:
- Skills with reference files use the file system for knowledge retrieval
- Skills with config files use the file system for persistent state
- Skills with scripts use the file system for executable procedures

## Cross-references

- [Progressive Disclosure](../concepts/progressive-disclosure.md) -- the three-phase loading model skills use
- [Feedback Loops](../concepts/feedback-loops.md) -- iterating on skills from real usage
- [Skill Discovery](../concepts/skill-discovery.md) -- how agents find and load skills
- [Validation Loops](../concepts/validation-loops.md) -- the verify-fix loop in practice
