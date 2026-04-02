# Module 10: Maintaining a Skill Library

Skills are living documents. A skill library that never changes is a dead library.

## The feedback loop

```
Write skill --> Test with real tasks --> Observe agent behavior
     ^                                          |
     |                                          v
     +---- Fix issues <-- Identify problems <---+
```

Every session where you correct your agent is data. File those corrections back into your skills.

## Iterative development

Use the "Claude A / Claude B" pattern:
- **Claude A**: Writes or refines the skill
- **Claude B**: Tests it on real tasks (fresh session, no prior context)

Observe Claude B's traces, not just outputs. Where did it deviate? Where did it waste steps?

## Periodic stocktake

Monthly, audit your skill library:

1. **Inventory**: List all skills with line counts and last-modified dates
2. **Evaluate each**: Keep / Improve / Retire / Merge
3. **Retire stale skills**: If you haven't used it in 3 months, archive it
4. **Merge overlapping skills**: If two skills do similar things, combine them
5. **Update descriptions**: Keywords drift as your workflow changes

## Health checks

Run the wiki health check periodically:

```
Read scripts/health-check.md and run a health check.
```

This finds: broken links, stale sources, terminology inconsistencies, content quality gaps, and suggests new articles.

## Monthly source updates

The knowledge base auto-discovers new skill repos from GitHub rankings:

```
Read scripts/update-sources.md and run the monthly update.
```

This pulls fresh rankings, finds new AI coding repos, clones them, and recompiles affected wiki articles.

## Rules distillation

When you notice the same principle in 3+ skills, extract it into a shared rule. This keeps individual skills shorter and ensures consistency.

## Version your skills

Track changes that matter:
- Description rewrites (affects activation)
- Workflow changes (affects behavior)
- New gotchas (accumulated knowledge)

## The end goal

A mature skill library is self-maintaining:
- Instincts capture corrections automatically
- Stocktakes prune dead weight
- Health checks find gaps
- Source updates bring in new patterns
- The meta-skill uses all of this to author better skills each time

You build the system once. It gets smarter with every session.

---

## Try It: Run the full maintenance loop

### Lab 10A: Inventory your skills (10 min)

Run this command to inventory all skills you have installed:

```bash
find ~/.claude/skills ~/.cursor/skills .agents/skills .cursor/skills -name "SKILL.md" 2>/dev/null | while read f; do
  dir=$(dirname "$f")
  name=$(basename "$dir")
  lines=$(wc -l < "$f" | tr -d ' ')
  echo "$name ($lines lines) -- $dir"
done | sort
```

For each skill, decide: **Keep**, **Improve**, **Retire**, or **Merge**.

Rules of thumb:
- Haven't used it in 3 months? **Retire**
- Two skills that do similar things? **Merge**
- Description missing WHEN trigger? **Improve**
- Body over 500 lines? **Improve** (split)

### Lab 10B: Run the validator on everything (5 min)

Validate all your skills at once:

```bash
find ~/.claude/skills -name "SKILL.md" 2>/dev/null | while read f; do
  dir=$(dirname "$f")
  echo "=== $(basename $dir) ==="
  bun run scripts/validate-skill.ts "$dir/" 2>&1
  echo
done
```

Count total errors and warnings. Set a goal: zero errors by end of week.

### Lab 10C: Extract a shared rule (15 min)

Look at 3+ of your skills. Is there a principle repeated across them? Examples:
- "Always run tests after making changes"
- "Ask for approval before destructive operations"
- "Use pnpm as default package manager"

If you find one, extract it into a shared rule file and reference it from each skill:

Create `rules/always-test.md`:

```markdown
After any code change, run the test suite before proceeding.
If tests fail, fix the issue before moving to the next step.
```

Then in each skill that needs this rule:

```markdown
## After making changes
Follow the testing rule: read [rules/always-test.md](../rules/always-test.md)
```

### Lab 10D: The full loop (20 min)

Use the skill-maker to create one more skill from scratch:

```
Read skill-maker/SKILL.md and help me create a skill for [your idea].
```

After the skill-maker guides you through creation:
1. Validate the output
2. Install it on your agent
3. Test it against a real task
4. Note what worked and what didn't
5. Iterate: fix the description, add a gotcha, adjust the workflow

This is the loop you'll run for the rest of your skill authoring career.

---

## Checkpoint

Before moving on to the capstone:
- You've inventoried your skill library
- You've run the validator on all your skills
- You've identified at least one shared rule to extract
- You understand the monthly maintenance rhythm

## What's next

Module 11 teaches you to use the interactive Skill Maker -- a gstack-style guided workflow that asks the right questions, challenges your assumptions, and produces validated skills.

## Further reading

- [wiki/concepts/feedback-loops.md](../wiki/concepts/feedback-loops.md)
- [wiki/concepts/meta-skills.md](../wiki/concepts/meta-skills.md)
- [wiki/research/anatomy-of-a-good-skill.md](../wiki/research/anatomy-of-a-good-skill.md)
- [SKILL_SPEC.md](../SKILL_SPEC.md) -- the full quality standard

Next: [Module 11: Using the Skill Maker](11-using-skill-maker.md)
