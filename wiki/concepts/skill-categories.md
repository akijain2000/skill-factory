# Skill Categories

## What it is

Anthropic's internal skill library (hundreds of skills in active use) clusters into **nine recurring categories**. The best skills fit cleanly into one; the more confusing ones straddle several. This taxonomy helps authors identify what kind of skill they're writing and whether their organization is missing an important category.

Source: [Thariq (@trq212), "Lessons from Building Claude Code: How We Use Skills"](https://x.com/trq212/status/2033949937936085378), March 2026.

## The nine categories

### 1. Library & API Reference

Skills that explain how to correctly use a library, CLI, or SDK. Often include a folder of reference code snippets and a list of gotchas. Covers both internal libraries and common libraries the agent sometimes misuses.

*Examples: billing-lib (internal edge cases), internal-platform-cli (subcommands with examples), frontend-design (your design system).*

### 2. Product Verification

Skills that describe how to test or verify that code is working. Often paired with an external tool like Playwright, tmux, or a browser automation harness.

Anthropic's recommendation: it can be worth having an engineer spend a week just making your verification skills excellent.

### 3. Data Fetching & Analysis

Skills that query internal data sources and summarize results. Metrics dashboards, database queries, report generation. Connect to monitoring stacks.

### 4. Business Process & Team Automation

Skills that automate recurring cross-team workflows. Incident triage, onboarding sequences, sprint ceremonies.

### 5. Code Scaffolding & Templates

Skills that generate consistent boilerplate for new services or modules. Service stubs, test file structure, PR templates.

### 6. Code Quality & Review

Skills that apply team conventions during review or before commit. Style enforcement, security pattern checks, complexity limits.

### 7. CI/CD & Deployment

Skills that drive pipeline steps and release operations. Build triggering, environment promotion, rollback procedures.

### 8. Runbooks

Skills that encode on-call and operational procedures as executable steps. Database failover, cache flush, alert response.

### 9. Infrastructure Operations

Skills that manage cloud resources and configuration. Scaling operations, secret rotation, environment setup.

## Problem-first vs. tool-first framing

An orthogonal axis to categories: **problem-first** skills define steps for an outcome ("set up a project workspace"), while **tool-first** skills embed expertise for a given tool ("I have Linear MCP connected"). This distinction drives which implementation pattern fits (see [Implementation Patterns](implementation-patterns.md)).

## Skills beyond code

Skills are not limited to software engineering. Any domain with repeatable processes, quality checklists, or specialized knowledge can benefit. Documented real-world examples include bookkeeping verification (categorizing bank transactions into nominal codes), accounting audits, and document compliance checks. If your work has a quality checklist, you can turn it into a skill.

## How to use this taxonomy

1. **When creating a skill**: identify which category it belongs to. If it straddles two or more, consider splitting it.
2. **When auditing a skill library**: check coverage across all nine categories. Missing categories reveal automation gaps.
3. **When reviewing a skill**: verify it fits cleanly into one category and isn't trying to do too much.

## Cross-references

- [Implementation Patterns](implementation-patterns.md) -- which patterns fit each category
- [Anatomy of a Good Skill](../research/anatomy-of-a-good-skill.md) -- structural checklist
- [Token Budget](token-budget.md) -- right-sizing for each category
