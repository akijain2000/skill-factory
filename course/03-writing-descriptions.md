# Module 3: Writing Descriptions

The description is the #1 failure point in skill authoring. Get this wrong and your skill never activates.

## Why descriptions matter

The description is **the only thing the agent sees** when deciding which skill to load. At startup, the agent reads all installed skill descriptions and picks the relevant one based on the user's request. Your description competes with every other installed skill for attention.

## The formula

A good description has three parts:

```
[WHAT verb] + [what it does specifically] + [WHEN trigger with keywords]
```

### Good

```yaml
description: Review pull requests for SQL safety, trust boundary violations, and structural issues. Use when asked to review a PR, check a diff, or do a pre-landing review.
```

- WHAT: "Review"
- Specifics: "SQL safety, trust boundary violations, structural issues"
- WHEN: "Use when asked to review a PR, check a diff, or do a pre-landing review"

### Bad

```yaml
description: Helps with code review stuff.
```

- No action verb
- No specifics
- No trigger keywords

## The CSO rule (most important lesson)

This was discovered through testing by the superpowers project (131K stars):

**Never summarize the skill's workflow in the description.**

When a description says "Reviews code with a two-stage process: first spec compliance, then quality," the agent reads that summary and follows it -- **skipping the full skill body entirely**. A two-stage review was reduced to one stage because the short description was "good enough."

The fix: description says WHEN to use, never WHAT the workflow is.

```yaml
# BAD -- summarizes workflow, agent will skip body
description: Execute implementation plans by dispatching subagents with two-stage review between tasks, first checking spec compliance then code quality.

# GOOD -- says when to use, forces agent to read the body
description: Use when executing implementation plans with independent tasks in the current session.
```

## Strong action verbs

Create, Generate, Build, Convert, Transform, Extract, Analyze, Validate, Process, Search, Find, Fetch, Review, Test, Deploy, Debug, Investigate, Monitor, Configure

## Weak words to avoid

"Helps with...", "A tool for...", "Handles...", "Provides support for...", "Assists with..."

## Trigger phrases

"Use when...", "Activate when...", "Use for...", "Triggers on...", "Applies to..."

## Third person voice

Descriptions are injected into the system prompt alongside other skills. Write in third person:

```yaml
# Good (third person)
description: Extracts text from PDF files. Use when working with PDFs.

# Bad (first/second person)
description: I help you extract text from PDF files.
```

---

## Try It: Description Writing Challenges

Five scenarios, progressively harder. Write the description for each, then check against the solution.

### Challenge 1: Deploy pipeline (beginner)

> You need a skill that deploys your Next.js app to Vercel, runs smoke tests, and rolls back on failure.

Write the description. Then check:
- Does it have a WHAT verb?
- Does it have a WHEN trigger?
- Is it third person?
- Does it include keywords a user would type? ("deploy", "vercel", "ship", "push to production")

Sample solution:

```yaml
description: Deploy Next.js applications to Vercel with smoke tests and automatic rollback on failure. Use when asked to deploy, ship to production, or push to Vercel.
```

### Challenge 2: Test runner (intermediate)

> A skill that runs the project's test suite, parses failures, fixes them in the source code, and re-runs until all tests pass or 3 attempts are exhausted.

Write the description. Watch out for CSO violations -- don't describe the loop mechanism.

Sample solution:

```yaml
description: Run tests and fix failures iteratively until the suite passes. Use when asked to fix failing tests, make tests pass, or debug test failures.
```

NOT this (CSO violation):

```yaml
description: Run tests, parse failures, fix source code, and re-run in a loop up to 3 times until all tests pass or attempts are exhausted.
```

### Challenge 3: PR reviewer (intermediate)

> A skill that reviews GitHub PRs for SQL injection, hardcoded secrets, race conditions, and your team's naming conventions defined in CONTRIBUTING.md.

Write the description. Include enough keywords that it triggers on natural language requests.

Sample solution:

```yaml
description: Review GitHub pull requests for security vulnerabilities, race conditions, and project-specific naming conventions. Use when asked to review a PR, check a diff, do a code review, or run a pre-merge review.
```

### Challenge 4: Doc generator (advanced)

> A skill that reads your TypeScript codebase, generates API documentation in Markdown, creates a table of contents, and publishes to a `docs/` folder. It should only run on exported functions and classes.

The trap: you'll want to describe the filtering logic. Don't.

Sample solution:

```yaml
description: Generate API documentation from TypeScript source code into Markdown files. Use when asked to generate docs, update API docs, or document the codebase.
```

### Challenge 5: CSO violation detector (advanced)

Read these 4 descriptions. Identify which ones violate the CSO rule (summarize workflow in description, causing the agent to skip the body):

A:
```yaml
description: Analyze database schema and suggest indexes based on query patterns. Use when optimizing database performance or asked about slow queries.
```

B:
```yaml
description: Debug issues by first reproducing the bug, then bisecting commits to find the cause, then writing a regression test, then fixing the code. Use when debugging.
```

C:
```yaml
description: Convert design tokens from Figma JSON exports to CSS custom properties. Use when syncing design system changes or processing Figma exports.
```

D:
```yaml
description: Ship code by running tests, reviewing the diff for SQL safety and trust boundary violations, bumping the version, updating CHANGELOG, committing, pushing, and creating a PR. Use when ready to ship.
```

Answers:
- **A**: Clean. States WHAT (analyze + suggest) and WHEN. No workflow summary.
- **B**: CSO violation. Describes the entire 4-step workflow. The agent will follow this summary and skip the body. Fix: "Investigate and fix bugs through systematic root cause analysis. Use when debugging issues, fixing bugs, or asked why something is broken."
- **C**: Clean. States WHAT (convert) and WHEN. No workflow summary.
- **D**: CSO violation. Lists 7 workflow steps. The agent has "enough" to work with and won't read the body. Fix: "Ship code changes with tests, review, and a pull request. Use when asked to ship, deploy, push to main, or create a PR."

---

## Try It: Rewrite bad descriptions

Take these real-world bad descriptions and rewrite them:

1. `description: A comprehensive tool for managing database operations.`

   Fix: `description: Run database migrations, seed data, and validate schema integrity. Use when managing database changes or asked to migrate the database.`

2. `description: I help you write better tests for your React components.`

   Fix: `description: Generate unit and integration tests for React components with Testing Library. Use when asked to write tests, add test coverage, or test a component.`

3. `description: This skill handles the deployment process including CI/CD pipeline management, environment configuration, Docker container orchestration, and monitoring setup across multiple cloud providers.`

   Fix: This is actually 4 skills, not 1. Split into `deploy-to-cloud`, `configure-environments`, `docker-orchestration`, and `monitoring-setup`. Each gets its own focused description.

---

## Checkpoint

Before moving on, you should be able to:
- Write a description with WHAT verb + WHEN trigger in under 60 seconds
- Detect CSO violations (workflow summaries in descriptions)
- Explain why third person voice matters
- Split an overly broad description into multiple focused skills

## Further reading

- [wiki/concepts/description-writing.md](../wiki/concepts/description-writing.md)
- [wiki/concepts/anti-rationalization.md](../wiki/concepts/anti-rationalization.md)
- [wiki/concepts/skill-discovery.md](../wiki/concepts/skill-discovery.md)

Next: [Module 4: Progressive Disclosure](04-progressive-disclosure.md)
