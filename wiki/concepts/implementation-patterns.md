# Implementation Patterns

## What it is

Five recurring structural patterns for skill workflows, identified from Anthropic's internal skill library and formalized by [AgentPatterns.ai](https://agentpatterns.ai/tool-engineering/skill-authoring-patterns/). Each pattern has a distinct shape -- choose the one that matches your skill's task type.

## Why it matters

Choosing the right pattern prevents structural mistakes: a sequential workflow that lacks rollback instructions, an iterative loop without an exit condition, or a multi-service workflow that doesn't validate between phases. The pattern gives the skill its skeleton; the domain-specific content fills it in.

## The five patterns

### 1. Sequential Workflow Orchestration

**Use when**: multi-step process in a fixed order.

**Structure**: Step -> tool call -> expected output. Include rollback instructions for each step.

```markdown
## Workflow: Create Issue and Assign to Cycle

1. **Validate input** -- confirm `title` and `teamId` are present; abort if missing
2. **Create issue** -- call `linear_create_issue`; capture returned `issueId`
3. **Assign to active cycle** -- call `linear_get_active_cycle`, then `linear_add_to_cycle`
4. **Confirm** -- return the issue URL and cycle name to the user

**On failure at step 3**: do not delete the issue; report the `issueId` so the user can assign manually.
```

### 2. Multi-MCP Coordination

**Use when**: workflow spans multiple services or MCP servers.

**Structure**: Organize by phase. Validate before proceeding to the next phase. Pass data explicitly between phases.

```markdown
## Workflow

### Phase 1: Gather data
- Call GitHub MCP to get the PR diff
- Call Linear MCP to get the linked issue

### Phase 2: Analyze
- Compare the diff against the issue acceptance criteria
- Check for missing test coverage

### Phase 3: Report
- Post the review as a GitHub PR comment
- Update the Linear issue status
```

### 3. Iterative Refinement

**Use when**: output improves with iteration (linting, code generation, report writing).

**Structure**: Draft -> quality check -> refinement loop with an explicit exit condition.

```markdown
## Workflow

1. Generate initial draft
2. Run quality check (linter, validator, or acceptance criteria)
3. If errors found:
   a. Fix the specific errors identified
   b. Re-run quality check
   c. Repeat until: 0 errors OR 3 iterations reached
4. Present final result with summary of changes made
```

The exit condition is critical -- without it, the agent can loop indefinitely.

### 4. Context-Aware Tool Selection

**Use when**: same outcome can be achieved with different tools depending on context.

**Structure**: Decision tree -- inspect context, select tool, explain choice. Include fallback.

```markdown
## Tool selection

- **If project has Playwright installed**: use Playwright for browser testing
- **If project has Cypress**: use Cypress instead
- **If neither is installed**: use curl + grep for basic HTTP verification
- **Always**: explain which tool was selected and why
```

### 5. Domain-Specific Intelligence

**Use when**: the skill provides specialized knowledge beyond what tool access alone can solve.

**Structure**: Pre-check (domain rules) -> execution -> documentation.

```markdown
## Workflow

1. **Pre-check**: Verify the migration follows our naming convention
   (YYYYMMDD_description.sql) and targets the correct schema
2. **Execute**: Run the migration with --dry-run first, verify output
3. **Document**: Update the schema changelog with the migration details
```

## Choosing a pattern

| Skill category | Likely pattern |
|---------------|---------------|
| Library & API Reference | Domain-Specific Intelligence |
| Product Verification | Iterative Refinement |
| Data Fetching & Analysis | Sequential Workflow |
| Business Process | Sequential Workflow or Multi-MCP |
| Code Scaffolding | Sequential Workflow |
| Code Quality & Review | Context-Aware Tool Selection |
| CI/CD & Deployment | Sequential Workflow with rollback |
| Runbooks | Sequential Workflow |
| Infrastructure Ops | Multi-MCP Coordination |

## Cross-references

- [Skill Categories](skill-categories.md) -- the nine types and which patterns they use
- [Validation Loops](validation-loops.md) -- the iterative refinement pattern in depth
- [Plan, Validate, Execute](plan-validate-execute.md) -- a specific instance of sequential workflow for destructive operations
- [Checklist Workflows](checklist-workflows.md) -- ordered steps with checkable progress
