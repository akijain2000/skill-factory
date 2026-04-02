---
name: skill-maker
description: Guide interactive creation of production-quality SKILL.md files through structured questioning and wiki-backed best practices. Use when creating a new skill, brainstorming a skill idea, or asked to make a skill.
---

# Skill Maker

An interactive, opinionated skill creation workflow. Asks forcing questions, challenges assumptions, reframes vague ideas, and produces validated SKILL.md files backed by the Skill Factory knowledge base.

<HARD-GATE>
Do NOT write any SKILL.md content until Phase 4 (DESIGN) is complete and the user has approved the design. Phases 1-3 are diagnostic only.
</HARD-GATE>

## Question format

For every question, follow this structure:

1. **Context**: State what we're building and where we are in the process (1 sentence)
2. **Plain English**: Explain the question so a smart non-engineer could follow
3. **Your recommendation**: `RECOMMENDATION: [letter] because [reason]`
4. **Options**: Lettered choices: `A) ... B) ... C) ...`

Ask one question per message. Wait for the user's answer before proceeding.

## Reframing rules

When the user's answer is vague, push back:

- "Helps with testing" --> "Testing what? Unit tests? E2E? CI failures? Load testing? Each would be a different skill."
- "Makes code better" --> "Better how? Faster? More readable? Fewer bugs? More secure? Each has different patterns."
- "Handles deployment" --> "Deployment where? Vercel? AWS? Docker? Each target has different gotchas."

Never accept a response that covers more than one focused task without flagging it.

## Anti-sycophancy

Do not agree that every idea is a good skill. Challenge when appropriate:

- **Too broad**: "This sounds like 3 skills, not 1. Let's pick the most valuable one and build that first."
- **Unnecessary**: "The agent already knows how to do this without a skill. What specific behavior would it get wrong?"
- **Over-engineered**: "This could be a 10-line micro-skill. The agent just needs permission and direction, not a 500-line manual."

---

## Phase 1: INTAKE

Ask one open question:

> "What task do you want to create a skill for? Describe it in a sentence or two -- what the skill should do and roughly when you'd use it."

Listen for:
- Is this a single focused task or multiple tasks?
- Is this something the agent already does well without a skill?
- Is the scope clear or vague?

If the scope is too broad, reframe before moving to Phase 2:

> "That sounds like it covers [X], [Y], and [Z]. Each would be a separate skill. Which one is the most painful for you right now? Let's start there."

## Phase 2: DIAGNOSE

Five forcing questions, asked one at a time. Skip any that the intake already answered clearly.

### Q1: Who is the user?

> "Who will use this skill? Just you, your team, or anyone in the open-source community? This affects how much context we can assume."

RECOMMENDATION: Pick the narrowest audience first. You can generalize later.

Options:
- A) Just me (can assume my specific tools and conventions)
- B) My team (assume our stack but not personal preferences)
- C) Public / open source (assume nothing, document everything)

### Q2: What task do they repeat?

> "What specific task does the user repeat that this skill automates? Be concrete -- not 'code review' but 'checking PRs for SQL injection and hardcoded secrets.'"

If the answer is still vague, push: "Walk me through the last time you did this manually. What did you do first? Then what?"

### Q3: What goes wrong without the skill?

> "When the agent does this task today without the skill, what does it get wrong? What does it skip? What does it do in the wrong order?"

This reveals the gotchas and the workflow steps that matter most.

### Q4: What does success look like?

> "When this skill runs perfectly, what is the output? Is it a file? A report? A commit? A deployed app? Describe the ideal end state."

This shapes the output format template.

### Q5: What gotchas exist?

> "What environment-specific facts would trip up someone unfamiliar with your setup? Things like: 'the API returns 200 even on errors', 'we use pnpm not npm', 'the CI database has a different schema.'"

These become the gotchas section -- the highest-value content per token.

## Phase 3: REFRAME

After diagnosis, challenge the design before writing anything:

### Scope check

> "Based on what you've told me, here's what I'm hearing: [summary]. Does this feel like one skill or should we split it?"

If it's multiple skills, propose a split and ask which one to build first.

### Necessity check

> "Would the agent get this right 80%+ of the time without a skill? If so, we should only add the 20% the agent gets wrong -- gotchas and specific workflow steps, not general knowledge."

### Size estimate

Based on the answers, recommend the right size:
- **Micro-skill** (10-50 lines): "The agent already knows how. You're giving it permission and structure."
- **Standard skill** (50-300 lines): "There's a real workflow with steps the agent would get wrong."
- **Reference-heavy** (300-500 lines): "There's a lot of domain knowledge. We'll split into SKILL.md + references/."

Present 2-3 scope options with trade-offs:

> "A) Micro-skill: Just the gotchas and output format (20 lines). Fast to write, low maintenance.
> B) Standard: Full workflow with validation loop (80 lines). Covers the happy path and common failures.
> C) Full: Workflow + reference tables + edge cases (200 lines). Covers everything but costs more context.
> RECOMMENDATION: B -- covers the common case without bloating the context window."

Wait for approval before proceeding.

## Phase 4: DESIGN

Draft the skill structure section by section. Present each for approval.

### 4.1: Name and description

Draft the `name` and `description`. Apply the rules:
- Name: lowercase, hyphens, domain-action pattern, matches folder name
- Description: WHAT verb + specifics + WHEN trigger, third person, under 1024 chars
- NO workflow summary in description (CSO rule)

Present and ask: "Does this name and description feel right?"

### 4.2: Workflow

Draft the numbered workflow steps. For each step, label the degree of freedom:
- **Exact**: agent must run this specific command
- **Guided**: agent follows this approach but uses judgment
- **Open**: agent decides how

Present and ask: "Are these the right steps in the right order? Anything missing?"

### 4.3: Output format

If the skill produces output, draft the template. Show a concrete example.

### 4.4: Gotchas

Draft the gotchas from Q5 answers. Add any that emerged during design.

### 4.5: Anti-rationalization

If the skill has behavioral instructions the agent might skip, draft a rationalization table:

| Thought | Reality |
|---------|---------|
| [excuse] | [correction] |

Ask: "Are there other ways the agent might try to shortcut this?"

## Phase 5: WRITE

Now generate the complete SKILL.md. Before writing:

1. Read `wiki/INDEX.md` to find relevant knowledge
2. Read 2-3 relevant wiki articles (e.g., `wiki/concepts/description-writing.md`, `wiki/concepts/validation-loops.md`)
3. Read `SKILL_SPEC.md` for the quality standard
4. Apply patterns from the wiki to the design

Write the complete file. Include all sections approved in Phase 4.

## Phase 6: VALIDATE

Run the automated validator:

```
bun run scripts/validate-skill.ts <skill-directory>/
```

If errors exist:
1. Show each error
2. Fix it
3. Re-run until 0 errors

If warnings exist:
1. Show each warning
2. Explain whether it matters for this skill
3. Fix if appropriate

## Phase 7: TEST PLAN

Suggest 3 test prompts the user can try to verify the skill works:

1. **Activation test**: A natural-language prompt that should trigger the skill (without mentioning it by name)
2. **Workflow test**: A prompt that exercises the full workflow
3. **Edge case test**: A prompt that tests a gotcha or boundary condition

Example:

> "Try these prompts with the skill installed:
> 1. 'Review this PR for security issues' (should activate the skill)
> 2. 'Do a thorough code review of the changes in this branch' (should follow the full workflow)
> 3. 'Check this PR -- there's an SQL query built with string concatenation' (should catch the specific issue)"

Ask: "Want to test now, or is the skill ready to ship?"

---

## Fallback behaviors

- If the user says "just write it" at any point: skip remaining diagnostic questions, use best judgment, write the skill, validate, and present
- If the user provides a complete draft: skip to Phase 6 (validate) and suggest improvements
- If the user is iterating on an existing skill: skip to Phase 3 (reframe) with the existing skill as input
