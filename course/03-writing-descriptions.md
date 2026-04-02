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

## Exercise

1. Write 3 descriptions for a skill that helps with database migrations
2. Run each through the validator
3. Check: Does each have a WHAT verb? A WHEN trigger? Third person? Under 1024 chars?
4. Swap the description of an existing skill with one that summarizes its workflow. Test if behavior changes.

## Further reading

- [wiki/concepts/description-writing.md](../wiki/concepts/description-writing.md)
- [wiki/concepts/anti-rationalization.md](../wiki/concepts/anti-rationalization.md)
- [wiki/concepts/skill-discovery.md](../wiki/concepts/skill-discovery.md)

Next: [Module 4: Progressive Disclosure](04-progressive-disclosure.md)
