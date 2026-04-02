# Module 8: Advanced Techniques

Patterns from the top 1% of skills across 19 repos.

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

---

## Try It: Advanced pattern exercises

### Lab 8A: Write 3 instincts (10 min)

Think of 3 behaviors you keep correcting your AI agent on. Write each as an instinct:

```yaml
id: [short-kebab-case-id]
trigger: "[when does this apply?]"
confidence: [0.0 to 1.0]
action: [one sentence -- what to do]
evidence: "[what caused you to create this]"
scope: [global | project | language]
```

Example instincts to get you started:

```yaml
id: check-imports-after-rename
trigger: "after renaming a function or variable"
confidence: 0.9
action: Search for all import sites and update them before moving on.
evidence: "Broken imports after rename caused 3 failed builds this month"
scope: global
```

```yaml
id: run-prettier-before-commit
trigger: "before creating a git commit"
confidence: 0.7
action: Run prettier --write on all changed files.
evidence: "CI format check failed on 5 of last 10 PRs"
scope: project
```

When you have 3+ instincts on the same theme (e.g., all about "pre-commit checks"), consider promoting them to a full skill.

### Lab 8B: Add a rationalization table (10 min)

Pick your most important skill (or use the `test-fix-loop` from Module 7). Add a rationalization table for the behaviors the agent is most likely to skip.

Template:

```markdown
## Common rationalizations

| Thought | Reality |
|---------|---------|
| "[excuse the agent makes]" | [why it should follow the skill anyway] |
| "[another excuse]" | [correction] |
| "[yet another]" | [correction] |
```

Real example from superpowers' verification-before-completion:

```markdown
| Thought | Reality |
|---------|---------|
| "I just ran it successfully" | Previous run ≠ current state. Run it again. |
| "The change is too small to break anything" | Small changes cause big bugs. Verify. |
| "I can see from the code that it works" | Reading is not running. Run the test. |
```

### Lab 8C: Choose the right degree of freedom (10 min)

For each scenario, decide: high, medium, or low freedom?

1. **Formatting code before commit** -- Answer: **Low**. Exact command: `npx prettier --write .` There's one right answer.

2. **Writing a README for a new project** -- Answer: **High**. "Write a clear, concise README covering setup, usage, and contributing." The agent knows what a good README looks like.

3. **Running database migrations** -- Answer: **Medium**. "Check for pending migrations, run them in order, verify each succeeded." The exact commands depend on the framework.

4. **Generating a JWT token** -- Answer: **Low**. Specific library, specific algorithm, specific expiration. Wrong choices = security vulnerability.

5. **Refactoring a messy function** -- Answer: **High**. "Improve readability and reduce complexity." The agent's judgment is the point.

Now apply this to a skill you're writing: for each workflow step, label it high/medium/low and adjust the instruction specificity accordingly.

---

## Checkpoint

Before moving on, you should be able to:
- Write an instinct in YAML with all required fields
- Add a rationalization table to prevent agent shortcutting
- Choose the right degree of freedom for each workflow step
- Explain when instincts should be promoted to full skills

## Further reading

- [wiki/concepts/meta-skills.md](../wiki/concepts/meta-skills.md)
- [wiki/concepts/composition-patterns.md](../wiki/concepts/composition-patterns.md)
- [wiki/concepts/instinct-model.md](../wiki/concepts/instinct-model.md)
- [wiki/concepts/anti-rationalization.md](../wiki/concepts/anti-rationalization.md)

Next: [Module 9: Multi-Host Compatibility](09-multi-host.md)
