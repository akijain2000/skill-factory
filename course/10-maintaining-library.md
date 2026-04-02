# Module 10: Maintaining a Skill Library

Skills are living documents. A skill library that never changes is a dead library.

## The feedback loop

```
Write skill → Test with real tasks → Observe agent behavior
     ^                                        |
     |                                        v
     +---- Fix issues ← Identify problems ←--+
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

## Final exercise

1. Run the validator against all your skills
2. Run a health check on the wiki
3. Use the authoring meta-skill to write one more skill from scratch
4. Verify the full loop works: idea → draft → validate → test → iterate

Congratulations -- you've completed the course. You're now equipped to author, maintain, and evolve production-quality AI agent skills.

## Further reading

- [wiki/concepts/feedback-loops.md](../wiki/concepts/feedback-loops.md)
- [wiki/concepts/meta-skills.md](../wiki/concepts/meta-skills.md)
- [wiki/research/anatomy-of-a-good-skill.md](../wiki/research/anatomy-of-a-good-skill.md)
- [SKILL_SPEC.md](../SKILL_SPEC.md) -- the full quality standard
