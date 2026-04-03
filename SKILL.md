---
name: skill-factory
description: Navigate the Skill Factory knowledge base. Use when asked to create a skill, review a skill, learn about skills, or improve a SKILL.md file.
---

# Skill Factory

Welcome to Skill Factory -- the LLM knowledge base for authoring production-quality AI agent skills.

## What would you like to do today?

Ask the user:

> **What would you like to do today?**
>
> A) **Review and improve an existing skill** -- "I have a SKILL.md and want to make it better"
>
> B) **Brainstorm and create a new skill** -- "I have an idea (or no idea yet) and want to build a skill"
>
> C) **Learn about skill authoring** -- "I want to take the course or browse the knowledge base"

Wait for the user's answer before proceeding.

---

## Route A: Review and Improve

If the user chose A, ask a follow-up:

> **How would you like to review it?**
>
> A1) **Guided brainstorm review** -- "Walk me through it like a YC office hours session. Challenge my assumptions and help me rethink the skill."
>
> A2) **Quick report** -- "Just run the validator, do a gap analysis, and give me a report with fixes."

### Route A1: Guided Brainstorm Review

A YC/CEO office-hours-style deep review of an existing skill.

#### Step 1: Read the skill

Ask: "What's the path to your SKILL.md?" Then read the file and its directory contents.

#### Step 2: Five forcing questions

Ask one at a time. Wait for the answer before asking the next. For each, give a recommendation.

**Q1: Problem**
> "What problem does this skill actually solve? Walk me through the last time you used it."

Listen for: is the skill solving a real, recurring problem? Or is it aspirational?

**Q2: Necessity**
> "If I removed this skill entirely, what would the agent get wrong?"

RECOMMENDATION: If the answer is "not much," the skill might not be needed. Only include what the agent wouldn't do correctly on its own (the "delta from baseline" rule).

**Q3: Scope**
> "Who is the narrowest audience that would use this? Just you, your team, or anyone?"

RECOMMENDATION: Pick the narrowest audience first. You can generalize later.

**Q4: Description quality**
> "Let's look at your description. Does it have a WHAT verb and a WHEN trigger? Does it pass the CSO test -- if the agent only read this description and skipped the body, would it still do the right thing?"

Read `wiki/concepts/description-writing.md` for the full rules.

**Q5: Right-sizing**
> "What's the single highest-value section in this skill? If you had to cut it to half the length, what would you keep and what would you drop?"

RECOMMENDATION: Skills that try to cover everything end up covering nothing well. Focus on the 20% the agent gets wrong.

#### Step 3: Challenge

After all five questions, push back:

- **Scope**: "This sounds like it covers [X] and [Y]. Should those be separate skills?"
- **Necessity**: "Would the agent get this right 80%+ of the time without the skill? If so, we should focus only on the gotchas and the specific steps it gets wrong."
- **Size**: Based on complexity, recommend Micro (10-50 lines), Standard (50-300 lines), or Reference-heavy (300-500 lines with sub-files).

#### Step 4: Validate

Run the automated validator:

```
bun run scripts/validate-skill.ts <skill-directory>/
```

Show errors and warnings. For each, propose a concrete fix with before/after text.

#### Step 5: Rewrite

Load knowledge from the wiki:
1. Read `wiki/INDEX.md`
2. Read `wiki/research/anatomy-of-a-good-skill.md`
3. Read `wiki/concepts/description-writing.md`
4. Read 1-2 more relevant articles based on the skill type

Apply the findings: rewrite the description, tighten the body, add missing gotchas, fix structural issues. Present the rewritten skill for approval.

#### Anti-sycophancy

Do not agree that every skill is good. Challenge when appropriate:
- **Too broad**: "This sounds like 3 skills, not 1."
- **Unnecessary**: "The agent already knows how to do this. What specifically does it get wrong?"
- **Over-engineered**: "This could be a 10-line micro-skill."

### Route A2: Quick Report

For a faster, non-interactive review:

1. Read `authoring/SKILL.md` and follow its workflow
2. The authoring skill will load the wiki, run gap analysis, validate, and produce a report

Tell the user:

> "I'll run the authoring meta-skill to analyze your skill. Give me the path to your SKILL.md."

Then: `Read authoring/SKILL.md and review <user's skill path>.`

---

## Route B: Brainstorm and Create

If the user chose B:

1. Read `skill-maker/SKILL.md` and follow its 7-phase flow
2. The Skill Maker will ask diagnostic questions, challenge scope, design the skill section by section, write it, validate it, and suggest test prompts

If the user says "I don't have an idea yet," start with broader brainstorming:

> "Let's figure out what skill would help you most. Think about:
>
> - What task do you repeat most often with your AI agent?
> - Where does the agent keep getting things wrong?
> - What environment-specific knowledge does it always forget?
>
> Describe your biggest pain point and we'll shape it into a skill."

Once the idea is clear, proceed to the Skill Maker flow.

Tell the user:

> "Let's build this skill step by step."

Then: Read `skill-maker/SKILL.md` and follow its phases.

---

## Route C: Learn

If the user chose C:

> "The Skill Factory course has 11 modules that take you from zero to hero in skill authoring. Total time: about 5-6 hours.
>
> **Quick orientation:**
> - Modules 1-4: Foundations (what skills are, the format, descriptions, token economics)
> - Modules 5-6: Patterns and anti-patterns from 19 top repos
> - Module 7: Build your first skill (3 guided tracks: beginner, intermediate, advanced)
> - Modules 8-10: Advanced techniques, multi-host compatibility, library maintenance
> - Module 11: Capstone -- build a skill with the interactive Skill Maker
>
> Start with Module 1: read `course/01-what-are-skills.md`.
>
> Or if you want the full course map: read `course/README.md`."

If the user wants to browse the knowledge base instead of taking the course:

> "The wiki has 30+ articles organized by topic. Start with `wiki/INDEX.md` to see everything available."

---

## Fallback behaviors

- If the user skips the A/B/C question and directly asks to review a skill, go to Route A
- If the user directly asks to create or brainstorm a skill, go to Route B
- If the user asks about skill authoring concepts, point to the wiki and relevant course modules
- If the user provides a SKILL.md file without context, ask: "Would you like me to review this skill, or are you using it as a starting point for a new one?"
