# Module 8: Advanced Techniques

Patterns from the top 1% of skills across 18 repos.

## Meta-skills: skills that govern skills

### Skill stocktake

Audit your entire skill library. Use a deterministic script to inventory all skills, then batch them through an LLM for evaluation (Keep/Improve/Retire/Merge). ECC runs ~20 skills per batch to stay within context limits.

### Rules distillation

When a principle appears in 2+ skills, promote it to a shared rule. Script scans all skills for repeated patterns, then an LLM judges which ones are universal enough to extract.

### Compliance measurement

Don't hope your skill works -- measure it. Generate behavioral specs from your SKILL.md, run scenarios at different strictness levels, capture tool traces, and LLM-classify whether the agent actually followed the instructions.

## Composition patterns

### Subagent choreography (superpowers)

For complex tasks, dispatch a fresh subagent per subtask:
- Controller keeps coordination context
- Each subagent gets exactly the context it needs (controller pastes, no file reads)
- Two-stage review: spec compliance first, then code quality
- Status enums: DONE, BLOCKED, NEEDS_HELP

### Runtime stacking (Fabric)

Separate concerns into layers assembled at runtime:
- **Strategy**: how to think (e.g., chain-of-thought)
- **Context**: background knowledge
- **Pattern**: the specific task procedure
- **Input**: the user's content

Each layer is a separate file. Combined at runtime, not embedded.

### Template tokens

Parameterize skills with placeholders instead of duplicating:

```markdown
Translate the input to {{lang_code}}.
```

One skill handles all languages.

## The instinct model

A unit smaller than a skill, discovered by ECC:

```yaml
id: grep-before-edit
trigger: "when about to edit a file"
confidence: 0.8
action: Search for all usages of the symbol before changing it.
evidence: "User corrected blind edit 3 times in January sessions"
scope: global
```

Properties:
- **Atomic**: one trigger, one action
- **Confidence-weighted**: 0.3 = tentative, 0.9 = near certain
- **Evidence-backed**: tracks what created it
- **Evolvable**: clusters of related instincts become full skills

## Anti-rationalization engineering

The agent will talk itself out of following your instructions. Prevent this with:

**Rationalization tables:**

| Thought | Reality |
|---------|---------|
| "This is too simple" | Simple things become complex. Use the skill. |
| "I already know how" | Knowing the concept is not using the skill. |

**XML guard tags:**

```markdown
<EXTREMELY-IMPORTANT>
If a skill applies, you MUST use it. This is not optional.
</EXTREMELY-IMPORTANT>
```

**The Iron Law** (verification-before-completion):

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
If you haven't run the command in this message, you cannot claim it passes.
```

## Degrees of freedom

Match instruction specificity to task fragility:

- **High freedom** (general direction): "Write clean, tested code"
- **Medium** (pseudocode): "Follow this pattern: validate input, process, return result"
- **Low freedom** (exact script): "Run exactly: `npm test && npm run lint && npm run build`"

Narrow bridge with cliffs = exact instructions. Open field = general direction.

## Exercise

1. Look at your skill library. Are there principles repeated across 3+ skills? Extract them.
2. Write one instinct for a behavior you keep correcting your agent on.
3. Add a rationalization table to your most important skill.

## Further reading

- [wiki/concepts/meta-skills.md](../wiki/concepts/meta-skills.md)
- [wiki/concepts/composition-patterns.md](../wiki/concepts/composition-patterns.md)
- [wiki/concepts/instinct-model.md](../wiki/concepts/instinct-model.md)
- [wiki/concepts/anti-rationalization.md](../wiki/concepts/anti-rationalization.md)

Next: [Module 9: Multi-Host Compatibility](09-multi-host.md)
