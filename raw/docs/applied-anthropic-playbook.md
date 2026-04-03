# I Applied Anthropic's Internal Skills Playbook to My Projects

**Source**: [dev.to/billkhiz](https://dev.to/billkhiz/i-applied-anthropics-internal-skills-playbook-to-my-projects-heres-what-changed-3m4h)
**Date**: 2026
**Type**: Blog post (practical application)

---

@trq212 recently published "Lessons from Building Claude Code: How We Use Skills", Anthropic's internal playbook for how they build and use Skills in Claude Code.

## Key Realization: Skills Are Folders, Not Files

A skill is a folder. It can contain scripts, config files, reference data, templates, anything Claude might need.

Example AWS debugging skill:

```
aws-debug/
  SKILL.md: main instructions
  config.json: which AWS profile to use per project
  references/services.md: maps projects to Lambda functions, log groups, common errors
```

Claude sees the SKILL.md when you say "check the logs." But it only opens references/services.md when it actually needs to look up a specific log group or service mapping.

## The 6 Skills That Changed My Workflow

### 1. /gotcha -- the skill that improves all other skills

Every time Claude makes a mistake, type:

```
/gotcha Claude forgot --profile flightmap
```

And it figures out which skill that belongs to, opens the file, and adds it to the Gotchas section. Quick and simple.

The Gotchas section is the most valuable part of any skill. But the problem is nobody goes back and updates their skills after writing them. /gotcha fixes that.

### 2. /careful -- on-demand production safety

An on-demand hook that blocks destructive commands (rm -rf, DROP TABLE, git push --force, AWS deletes) for the current session only.

### 3. /aws-debug -- a debugging runbook

Walks Claude through a proper investigation: check logs, look for cold start timeouts, missing env vars, permission errors, then write a structured report.

Config.json with AWS profiles so Claude never forgets which --profile flag to use.

### 4. /bookkeeping-verify -- domain-specific verification

Categorize bank transactions for accounting clients into Sage 50 nominal codes. After categorizing, this skill checks: did I miss any? Same payee under different categories? Duplicates? Invalid codes?

A reference file (references/categories.md) with valid categories and common mistakes. Claude reads that file during verification but it's not loaded the rest of the time.

**This is skills going beyond pure software engineering.** If your work has any kind of quality checklist, you can turn it into a skill.

### 5. /explain -- making code accessible

For non-engineers: explain what a piece of code does in plain English using analogies or starting with the big picture before details.

### 6. Enhanced /preflight with progressive disclosure

Pre-commit gates split into sub-files:

```
preflight/
  SKILL.md: the main orchestrator
  checks/
    security.md: detailed security checklist
    frontend.md: accessibility, performance, design
    backend.md: API safety, Lambda gotchas, Python patterns
```

Claude reads the main file and then only pulls in the relevant checks file based on project type.

## Practical Lessons

### Write descriptions for Claude, not for you

Bad: "AWS debugging tool"
Good: "Debug AWS Lambda errors, API Gateway issues, or CloudWatch anomalies. Use when the user reports a Lambda failure, 5xx error, timeout, or says 'check the logs'"

### Wire skills into your project CLAUDE.md

Skills know how. Your project's CLAUDE.md tells when.

### Use config files for stuff that changes per project

If your skill needs something specific (AWS profile, channel name, database), put a config.json in the skill folder.

### Global skills vs project overrides

Reusable skills in ~/.claude/skills/ available everywhere. Some projects also have their own skills in .claude/skills/ that override global ones. 13 global skills and 6 project-level overrides across 4 projects.

### If you're starting from scratch

Start with two skills: **/preflight** and **/gotcha**. Preflight stops you committing broken code. Gotcha captures mistakes so they don't happen twice. Build everything else from there.

Don't try to write a perfect skill on day one. Anthropic's own team says their best skills started as a few lines and one gotcha, and got better over time.
