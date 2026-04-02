# Best Practices for Skill Creators (agentskills.io)

Source: https://agentskills.io/skill-creation/best-practices.md
Retrieved: 2026-04-02

## Start from Real Expertise

Common pitfall: asking an LLM to generate a skill without domain-specific context. Result: vague, generic procedures ("handle errors appropriately") instead of specific API patterns, edge cases, and project conventions.

### Extract from hands-on tasks
Complete a real task with an agent, providing context and corrections. Then extract the reusable pattern. Note:
- Steps that worked
- Corrections you made
- Input/output formats
- Context you provided

### Synthesize from project artifacts
Good source material: internal docs, runbooks, API specs, code review comments, version control history, real failure cases.

## Refine with Real Execution

Run against real tasks. Read agent execution traces, not just outputs. Common causes of wasted steps:
- Instructions too vague (agent tries multiple approaches)
- Instructions that don't apply (agent follows anyway)
- Too many options without default

## Spending Context Wisely

### Add what the agent lacks, omit what it knows
Focus on: project-specific conventions, domain-specific procedures, non-obvious edge cases, particular tools/APIs.

Don't explain: what a PDF is, how HTTP works, what database migration does.

Test: "Would the agent get this wrong without this instruction?" If no, cut it.

### Design coherent units
Like function scope: encapsulate a coherent unit of work. Too narrow = multiple skills load, risking conflicts. Too broad = hard to activate precisely.

### Aim for moderate detail
Concise stepwise guidance with working examples > exhaustive documentation.

### Progressive disclosure structure
Keep SKILL.md under 500 lines / 5000 tokens. Tell agent WHEN to load each file: "Read references/api-errors.md if the API returns a non-200 status code."

## Calibrating Control

### Match specificity to fragility
- **Give freedom**: multiple valid approaches, tolerates variation
- **Be prescriptive**: fragile operations, consistency critical, specific sequence required

### Provide defaults, not menus
Pick a default. Mention alternatives briefly. Don't present as equal options.

### Favor procedures over declarations
Teach HOW to approach a class of problems, not WHAT to produce for a specific instance.

## Patterns for Effective Instructions

### Gotchas sections
Highest-value content. Environment-specific facts that defy assumptions. Keep in SKILL.md where agent reads them before encountering the situation. Add corrections from real usage.

### Templates for output format
More reliable than prose format descriptions. Short templates inline; long templates in assets/.

### Checklists for multi-step workflows
Helps agent track progress and avoid skipping steps.

### Validation loops
Do work → validate → fix → repeat until passing.

### Plan-validate-execute
For batch/destructive operations: create intermediate plan in structured format, validate against source of truth, then execute.

### Bundling reusable scripts
If agent independently reinvents the same logic across test cases, write a tested script and bundle it.
