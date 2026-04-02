# Module 7: Your First Skill (Hands-on Lab)

Time to build a real skill. We'll use the meta-skill to help.

## Step 1: Pick your skill idea

Choose something you repeat with your AI agent. Examples:
- Reviewing code for your team's conventions
- Setting up a new React component with your preferred patterns
- Running your deploy pipeline
- Triaging GitHub issues with your label system

## Step 2: Describe it in plain English

Write 2-3 sentences about what the skill does and when you'd use it:

> "When I ask my agent to review a pull request, it should check for SQL injection, hardcoded secrets, and our team's naming conventions. It should output a pass/fail verdict with specific file:line references."

## Step 3: Use the authoring meta-skill

Tell your agent:

```
Read authoring/SKILL.md and help me create a new skill for [your idea].
```

The meta-skill will:
1. Read the wiki index
2. Load relevant concept articles
3. Draft the SKILL.md with proper frontmatter, description, and body
4. Validate it with the automated linter

## Step 4: Create the directory

```bash
mkdir -p my-skill-name
```

## Step 5: Write the SKILL.md

Start with frontmatter:

```yaml
---
name: my-skill-name
description: [WHAT verb] [specifics]. Use when [trigger with keywords].
---
```

Then the body:

```markdown
# My Skill Name

[2-4 sentence overview]

## When to use
- [trigger 1]
- [trigger 2]

## Workflow
1. [first step]
2. [second step]
3. [validation step]

## Output format
[template of expected output]

## Gotchas
- [environment-specific fact]
```

## Step 6: Validate

```bash
bun run scripts/validate-skill.ts my-skill-name/
```

Fix every error. Address warnings. Errors must be zero.

## Step 7: Test with a real task

1. Install the skill in your agent's skill directory
2. Ask your agent to do the task WITHOUT mentioning the skill by name
3. Does it activate? If not, your description needs better keywords.
4. Does it follow the full workflow? If not, check for CSO violations.
5. Is the output in the right format? If not, add a template.

## Step 8: Iterate

Based on testing:
- If the skill didn't activate: improve description keywords
- If the agent skipped steps: add a checklist or rationalization table
- If the output was wrong: add an output format template
- If it was too slow: cut unnecessary content

## Checklist before shipping

- [ ] Name matches directory name
- [ ] Description has WHAT verb + WHEN trigger
- [ ] Description in third person
- [ ] Body under 500 lines
- [ ] No empty sections
- [ ] No contradictory instructions
- [ ] Output format specified (if applicable)
- [ ] At least one gotcha documented
- [ ] Validator passes with 0 errors
- [ ] Tested against a real task

## Further reading

- [wiki/research/anatomy-of-a-good-skill.md](../wiki/research/anatomy-of-a-good-skill.md)
- [wiki/examples/good/](../wiki/examples/good/) -- exemplary skills to study

Next: [Module 8: Advanced Techniques](08-advanced-techniques.md)
