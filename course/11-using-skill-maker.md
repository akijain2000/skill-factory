# Module 11: Using the Skill Maker (Capstone)

The Skill Maker is a gstack-style interactive workflow that guides you through creating a production-quality skill. It asks forcing questions, challenges your assumptions, and produces a validated SKILL.md backed by the wiki knowledge base.

## How to start

Tell your agent:

```
Read skill-maker/SKILL.md and help me create a skill for [your idea].
```

Or just:

```
Read skill-maker/SKILL.md -- I want to create a new skill.
```

The Skill Maker will ask you questions one at a time. Answer each one before it proceeds.

## What to expect

### Phase 1: Intake (1 question)

The Skill Maker asks what you want to build. Give a rough description -- it doesn't need to be polished.

Example prompt: "I want a skill that reviews our API endpoints for breaking changes before we release a new version."

### Phase 2: Diagnose (up to 5 questions)

Five forcing questions that sharpen the idea:
- **Who uses this?** (just you, your team, or open source?)
- **What exactly do they repeat?** (be specific)
- **What goes wrong today?** (what the agent gets wrong without the skill)
- **What does success look like?** (the output)
- **What gotchas exist?** (environment-specific traps)

The Skill Maker will push back on vague answers. "Helps with API stuff" will get reframed to "What kind of API work? Endpoint design? Error handling? Breaking change detection?"

### Phase 3: Reframe (scope challenge)

The Skill Maker challenges your design:
- Is this one skill or three?
- Does the agent already do this well without a skill?
- Should this be a 10-line micro-skill or a 200-line workflow?

It presents 2-3 scope options with trade-offs and a recommendation. Pick one.

### Phase 4: Design (section-by-section approval)

The Skill Maker drafts each section and asks for approval:
1. Name and description (checks CSO rule, WHAT+WHEN formula)
2. Workflow steps (labels degree of freedom per step)
3. Output format template
4. Gotchas
5. Rationalization table (if the skill has behavioral instructions)

You approve or revise each section before it moves on.

### Phase 5: Write

The Skill Maker generates the complete SKILL.md, loading relevant wiki articles to apply best practices.

### Phase 6: Validate

It runs the automated validator and fixes any issues.

### Phase 7: Test plan

It suggests 3 test prompts: an activation test, a workflow test, and an edge case test.

## Sample session transcript

Here's an abbreviated transcript showing how the Skill Maker works:

---

**You**: Read skill-maker/SKILL.md -- I want to create a skill for reviewing PRs.

**Skill Maker**: What task do you want to create a skill for? Describe it in a sentence or two.

**You**: I want something that reviews pull requests for our team's conventions.

**Skill Maker**: "Team conventions" is broad. What specific conventions? Naming? File structure? Test coverage? Error handling? Security? Each of these could be its own skill. Which one causes the most review comments today?

**You**: Mostly naming -- we have a convention for React components, hooks, and API routes that new developers always get wrong.

**Skill Maker**: Got it. Let me ask a few questions to sharpen this.

**Q1**: Who will use this skill?

RECOMMENDATION: B -- your team shares a codebase, so we can assume your stack.

A) Just me
B) My team (assumes your stack)
C) Public / open source

**You**: B

**Skill Maker**: **Q2**: Walk me through the naming conventions. What are the rules for components, hooks, and routes?

**You**: Components are PascalCase in a file named the same. Hooks start with `use` and live in `hooks/`. API routes are kebab-case under `app/api/`.

**Skill Maker**: **Q3**: When the agent reviews a PR today without this skill, what does it get wrong?

**You**: It doesn't know our conventions. It might flag something as wrong when it follows our pattern, or miss actual violations.

**Skill Maker**: **Q4**: What should the output look like when the review is done?

**You**: A list of violations with file:line references, and a pass/fail verdict.

**Skill Maker**: **Q5**: Any gotchas? Things that look like violations but aren't?

**You**: Yeah, our `utils/` folder uses camelCase functions, which looks inconsistent but is intentional. And test files use `.test.tsx` suffix, not `.spec.tsx`.

**Skill Maker**: Here's what I'm hearing: a skill that reviews PRs for your team's naming conventions (PascalCase components, `use`-prefixed hooks in `hooks/`, kebab-case API routes). Output is a pass/fail verdict with file:line violations. Exceptions: `utils/` uses camelCase (intentional), test files use `.test.tsx`.

This is a clean standard skill -- maybe 60-80 lines. Not a micro-skill (the conventions are team-specific, so the agent genuinely doesn't know them). Not reference-heavy (the rules fit in a short table).

A) Micro: just the naming table and output format (30 lines)
B) Standard: table + review workflow + gotchas (70 lines)
C) Full: add auto-fix capability (150 lines)

RECOMMENDATION: B -- covers the review use case without scope creep into auto-fixing.

**You**: B

**Skill Maker**: *[Proceeds through Phase 4, drafting name, description, workflow, output format, and gotchas section by section, getting approval on each]*

**Skill Maker**: *[Phase 5: Writes the complete SKILL.md]*

**Skill Maker**: *[Phase 6: Runs validator, shows 0 errors]*

**Skill Maker**: Here are 3 prompts to test:
1. "Review this PR" (activation test -- should trigger the skill)
2. "Check if the naming in these changes follows our conventions" (workflow test)
3. "I renamed a hook from `useAuth` to `getAuth` -- is that okay?" (edge case -- should flag the missing `use` prefix)

---

## Tips for good sessions

1. **Be honest about vagueness.** "I'm not sure" is a valid answer -- the Skill Maker will help you figure it out.
2. **Push back on the Skill Maker.** If its recommendation doesn't feel right, say so. It's opinionated but not always right.
3. **Start small.** Pick the micro or standard option. You can always add complexity later.
4. **Test immediately.** Don't polish the skill endlessly. Install it, try the test prompts, and iterate.
5. **Use the fallback.** If you already have a draft or just want it written fast, say "just write it" and the Skill Maker will skip diagnostics.

## Try It: Create a real skill with the Skill Maker

### Capstone lab (30 min)

1. Think of a task you repeat with your AI agent at least once a week
2. Start a session: `Read skill-maker/SKILL.md and help me create a skill for [your task]`
3. Answer the 5 diagnostic questions honestly
4. Approve or revise the design
5. Validate the output
6. Install and test with the suggested prompts
7. Iterate based on what you observe

Congratulations -- you've completed the full course. You can now:
- Write skills from scratch using the spec
- Detect and fix anti-patterns
- Apply advanced patterns (validation loops, rationalization tables, instincts)
- Ship skills across multiple hosts and models
- Use the Skill Maker for guided creation
- Maintain a living skill library

## Further reading

- [skill-maker/SKILL.md](../skill-maker/SKILL.md) -- the full Skill Maker skill
- [authoring/SKILL.md](../authoring/SKILL.md) -- the meta-skill for wiki-backed authoring
- [SKILL_SPEC.md](../SKILL_SPEC.md) -- the quality standard
