---
name: authoring
description: Draft, review, and improve SKILL.md files using a compiled knowledge base of best practices and anti-patterns. Use when writing a new skill, reviewing an existing one, or debugging why a skill does not trigger.
---

# Skill Authoring

A meta-skill that queries the Skill Factory wiki to help you write better SKILL.md files.

## When to use

- Writing a new skill from scratch (idea or rough draft)
- Reviewing an existing skill for quality
- Improving a skill's description (most common failure point)
- Adapting a skill for a different host (Cursor, Codex, Claude Code)
- Debugging why a skill doesn't trigger

## Workflow

### Step 1: Intake

Accept one of:
- A draft SKILL.md (read the file)
- A plain-English description of what the skill should do
- An existing skill directory to review

If no input provided, ask: "What should this skill do? Describe in 1-2 sentences."

### Step 2: Load the wiki index

Read the wiki index to understand what knowledge is available:

```
cat wiki/INDEX.md
```

This is the master table of contents with one-line summaries. Use it to pick which articles to read next.

### Step 3: Targeted retrieval

Based on the task, read the most relevant wiki articles. Do NOT read all of them. Pick 3-5:

**Always read for any task:**
- `wiki/research/anatomy-of-a-good-skill.md` (the quality checklist)
- `wiki/concepts/description-writing.md` (most common failure point)

**Read if writing from scratch:**
- `wiki/concepts/progressive-disclosure.md`
- `wiki/concepts/naming-conventions.md`
- `wiki/concepts/skill-discovery.md`

**Read if reviewing:**
- `wiki/research/anti-patterns.md`
- `wiki/concepts/token-budget.md`

**Read if the skill has scripts:**
- `wiki/concepts/error-handling-in-scripts.md`
- `wiki/concepts/validation-loops.md`

**Read if multi-host:**
- `wiki/concepts/host-compatibility.md`
- `wiki/research/host-differences.md`

**Read if the skill has complex workflows:**
- `wiki/concepts/checklist-workflows.md`
- `wiki/concepts/plan-validate-execute.md`
- `wiki/concepts/template-patterns.md`

### Step 4: Gap analysis

Compare the draft against the quality spec:

```
cat SKILL_SPEC.md
```

Check each of these (in order of importance):

1. **Description quality** -- Does it have a WHAT verb and a WHEN trigger? Third person? Under 1024 chars? Specific keywords?
2. **Name quality** -- Lowercase, hyphens, matches directory, not vague?
3. **Body length** -- Under 500 lines? If over, should it use progressive disclosure?
4. **Anti-patterns** -- Read `wiki/research/anti-patterns.md` and check against each one
5. **Content necessity** -- Is everything in the body something the agent doesn't already know?
6. **Examples** -- Does it include concrete input/output examples?
7. **Consistency** -- Consistent terminology throughout?
8. **Output format** -- If the skill produces output, is the format specified?

### Step 5: Draft or rewrite

If writing from scratch:
1. Start with the frontmatter (name + description first, get those right)
2. Write a concise overview (2-4 sentences)
3. Write "When to use" triggers (bullet points)
4. Write the main workflow (numbered steps)
5. Add examples (input/output pairs)
6. Check line count -- split to reference files if over 500

If reviewing/improving:
1. List every issue found in Step 4
2. For each issue, show the current text and the proposed fix
3. Apply all fixes
4. Verify the result

### Step 6: Validate

Run the automated validator:

```
bun run scripts/validate-skill.ts <path-to-skill-directory>
```

If it fails, fix the issues and re-run until it passes.

### Step 7: Quality examples

If helpful, read exemplary skills for inspiration:

```
ls wiki/examples/good/
```

Read the one most similar to the skill being authored.

### Step 8: File insights back

If this session produced useful observations about skill authoring (a new anti-pattern, a useful pattern, a host-specific gotcha), file it:

```
echo "# Observation: [TITLE]
Date: $(date +%Y-%m-%d)
Context: [what skill was being authored]

## Finding
[what was discovered]

## Recommendation
[how to apply this in future skills]
" > wiki/queries/observation-$(date +%Y%m%d)-TOPIC.md
```

### Step 9: Output

Deliver:
1. The final SKILL.md (complete, ready to use)
2. A summary of changes made (if reviewing)
3. Validation results (should be passing)

## Key principles (from the wiki)

- **Description is the #1 failure point.** Get the WHAT verb + WHEN trigger right before anything else.
- **Concise beats thorough.** Only include what the agent doesn't already know.
- **Defaults over menus.** Pick one tool/approach, mention alternatives as escape hatch.
- **Procedures over declarations.** Teach approach, not specific answers.
- **Test against real tasks.** A skill that doesn't improve on the baseline isn't needed.
- **Progressive disclosure.** Keep SKILL.md under 500 lines. Split details into reference files.
- **Gotchas are gold.** Environment-specific facts that defy assumptions are the highest-value content.
