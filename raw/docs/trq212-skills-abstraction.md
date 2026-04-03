# Skills Are the Abstraction That All Agents Will Build On

**Source**: [@trq212 (Thariq, Anthropic)](https://x.com/trq212/status/2033949937936085378)
**Date**: March 28, 2026
**Type**: Article / Long-form tweet

---

Skills have become one of the most used extension points in Claude Code. They're flexible, easy to make, and simple to distribute.

But this flexibility also makes it hard to know what works best. What type of skills are worth making? What's the secret to writing a good skill? When do you share them with others?

We've been using skills in Claude Code extensively at Anthropic with hundreds of them in active use. These are the lessons we've learned about using skills to accelerate our development.

## What Are Skills?

A common misconception we hear about skills is that they are "just markdown files", but the most interesting part of skills is that they're not just text files. They're folders that can include scripts, assets, data, etc. that the agent can discover, explore and manipulate.

In Claude Code, skills also have a wide variety of configuration options including registering dynamic hooks.

We've found that some of the most interesting skills in Claude Code use these configuration options and folder structure creatively.

## Types of Skills

After cataloging all of our skills, we noticed they cluster into a few recurring categories. The best skills fit cleanly into one; the more confusing ones straddle several. This isn't a definitive list, but it is a good way to think about if you're missing any inside of your org.

### 1. Library & API Reference

Skills that explain how to correctly use a library, CLI, or SDKs. These could be both for internal libraries or common libraries that Claude Code sometimes has trouble with. These skills often included a folder of reference code snippets and a list of gotchas for Claude to avoid when writing a script.

Examples:
- billing-lib -- your internal billing library: edge cases, footguns, etc.
- internal-platform-cli -- every subcommand of your internal CLI wrapper with examples on when to use them
- frontend-design -- make Claude better at your design system

### 2. Product Verification

Skills that describe how to test or verify that your code is working. These are often paired with an external tool like playwright, tmux, etc. for doing the verification.

Verification skills are extremely useful for ensuring Claude's output is correct. It can be worth having an engineer spend a week just making your verification skills excellent.

### 3. Data Fetching & Analysis

Skills that query internal data sources and summarize results. Connect to monitoring stacks, databases, metrics dashboards.

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

## Key Principles

### Don't State the Obvious

Write skill instructions as a delta from baseline model behavior: only the team conventions, domain-specific rules, and edge cases that the model would otherwise get wrong. Instructions Claude would follow correctly anyway waste tokens and dilute the rules that matter.

### Built-In Variables

- `${CLAUDE_SKILL_DIR}` -- directory of the current skill file. Use to reference sibling assets without hardcoding paths.
- `${CLAUDE_PLUGIN_DATA}` -- stable data directory that survives skill upgrades. Use for persistent state (user preferences, learned conventions).

### Setup Config Pattern

Store initial setup in `config.json` under `${CLAUDE_PLUGIN_DATA}`. If absent on first run, prompt via `AskUserQuestion` before proceeding -- this avoids hard-coding team-specific values.

### Gotchas Are Highest-Signal Content

A `## Gotchas` section is the highest-signal content in any skill -- the cases where Claude would do something plausible but wrong. Build it incrementally from real failures.

### Skill Composition

Skills can reference other skills by name. There is no native dependency management -- if a required skill is absent, the agent must handle that gracefully. Reference skills by their exact `name` field, not by filename.

### Measuring Effectiveness

Track invocation frequency with a `PreToolUse` hook logging skill name and timestamp. Use the log to find under-triggering skills (description needs work), over-triggering skills (description too broad), and popular skills (expand these).
