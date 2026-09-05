# Module 8: Advanced Techniques

Patterns from the strongest skills and agent repos in the current source corpus.

## Meta-skills: skills that govern skills

### Skill stocktake

Audit your entire skill library. Use a deterministic script to inventory all skills, then batch them through an LLM for evaluation (Keep/Improve/Retire/Merge). ECC runs ~20 skills per batch to stay within context limits.

### Rules distillation

When a principle appears in 2+ skills, promote it to a shared rule. Script scans all skills for repeated patterns, then an LLM judges which ones are universal enough to extract.

### Compliance measurement

Don't hope your skill works -- measure it. Generate behavioral specs from your SKILL.md, run scenarios at different strictness levels, capture tool traces, and LLM-classify whether the agent actually followed the instructions.

## Composition patterns

### Router plus sibling skills

Large capability families should use a thin router and explicit sibling skills
when the siblings have independently useful triggers, workflows, or eval suites.
There is no portable automatic "sub-skill" loader. The router must name each
sibling, state when to load it, define the fallback when none match, and include
cross-sibling negative routing cases. Keep shared reference material separate
from executable siblings so discovery boundaries stay testable.

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
Reuse an existing result only when its exact inputs remain unchanged; rerun when new edits or uncertainty invalidate it.
```

## Degrees of freedom

Match instruction specificity to task fragility:

- **High freedom** (general direction): "Write clean, tested code"
- **Medium** (pseudocode): "Follow this pattern: validate input, process, return result"
- **Low freedom** (exact script): "Run exactly: `npm test && npm run lint && npm run build`"

Narrow bridge with cliffs = exact instructions. Open field = general direction.

## Built-in variables and config pattern (Claude Code)

Claude Code provides variables for portable file references within skills:

- **`${CLAUDE_SKILL_DIR}`** -- directory of the current skill file. Reference sibling assets without hardcoding paths.
- **`${CLAUDE_PLUGIN_DATA}`** -- stable data directory that survives skill upgrades. Use for persistent state.

The **Setup Config Pattern** stores per-project configuration in `${CLAUDE_PLUGIN_DATA}/config.json`. On first run, if the config is absent, the skill prompts the user via `AskUserQuestion` and saves the answers for future sessions. This avoids hard-coding values like AWS profiles, project keys, or default assignees.

## Tool design evolution: what Anthropic learned

Anthropic iterated through three major tool design changes while building Claude Code, each teaching a lesson for skill authors:

1. **AskUserQuestion**: tried overloading an existing tool, then output format hacking, before landing on a dedicated tool. Lesson: prefer clear, single-purpose steps over multi-purpose instructions.
2. **TodoWrite to Task Tool**: simple todo tracking became constraining as models improved. Replaced with Tasks that support dependencies and multi-agent coordination. Lesson: don't over-specify steps that newer models handle natively.
3. **RAG to Grep to Progressive Disclosure**: search evolved from giving context to the agent, to letting the agent find context itself. Lesson: skills that reference sub-files only when needed mirror how the agent itself works.

For the full story, see [wiki/research/tool-design-evolution.md](../wiki/research/tool-design-evolution.md).

## The "delta from baseline" rule

Write skill instructions as a **delta from baseline model behavior**: only the team conventions, domain-specific rules, and edge cases that the model would otherwise get wrong. Instructions Claude would follow correctly anyway waste tokens and dilute the rules that matter.

Ask yourself for each instruction: "Would the agent get this right without the skill?" If yes, cut it. Source: Thariq (@trq212), Anthropic.

## 2026 pattern: skills, agents, memory, MCP

The 100-repo expansion changed the mental model. A modern skill library is not just a folder of Markdown files. It is usually a small runtime system:

| Layer | Belongs here | Do not put here |
|-------|--------------|-----------------|
| Skill | Stable procedure, decision tree, gotchas, validation contract | Mutable project facts |
| Memory | User/project/local facts that evolve over time | Long workflow instructions |
| MCP | Tool capability and external-system access | Policy or process that belongs in prose |
| Subagent | Execution context, role, tool subset, max turns, preloaded skills | Shared authoring knowledge that many agents need |
| Command | User-facing shortcut or dispatcher | Canonical workflow logic |
| Hook | Safety checks, observation, logging, policy gates | Multi-step reasoning |

Use this split when a workflow starts to feel "big." For example, a browser QA capability might use:

- A `browser-qa` skill for the verification workflow and artifact requirements.
- A browser MCP at project or subagent scope.
- A QA subagent preloaded with the skill and limited to browser/test tools.
- Memory for the app's test accounts and known flaky routes.
- A command such as `/qa` as a convenience wrapper.

The source pattern appears across ECC, GSD, Claude Code best-practice repos, Symphony, Caveman, and Context7. The practical lesson is simple: write skills as reusable procedure, then wire them into the right runtime surface.

## Evidence is another layer

Do not put every observation into `SKILL.md`. Route it by purpose:

| Data | Durable home |
|---|---|
| Current reusable procedure | `SKILL.md` |
| Supporting domain detail | one-hop `references/` |
| Superseded context worth retaining | provenance-hashed archive |
| Natural prompts and graders | eval suite |
| In-progress normalized run records | privacy-safe checkpoint |
| Aggregate behavioral claims | fingerprinted report |
| Raw prompts, traces, secrets, auth homes | temporary storage; redact or delete |

See [Skill Evidence Lifecycle](../wiki/concepts/evidence-lifecycle.md).

## Goal-backward verification

Newer orchestration repos push verification into planning. Before implementation, derive `must_haves` from the goal:

```markdown
## Must-haves
- [ ] User-visible behavior works in the target environment
- [ ] The exact failing case is covered by a test or manual proof
- [ ] The final report includes command output, screenshot, PR link, or artifact path
```

Then hand those must-haves to the executor or verification subagent. This prevents the common failure where the agent finishes the code and only then invents weak proof.

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
| "I just ran it successfully" | Check the inputs: reuse unchanged valid evidence; rerun after relevant changes. |
| "The change is too small to break anything" | Small changes cause big bugs. Verify. |
| "I can see from the code that it works" | Reading is not running. Run the test. |
```

### Lab 8C: Choose the right degree of freedom (10 min)

For each scenario, decide: high, medium, or low freedom?

1. **Formatting code before commit** -- Answer: **Low**. Exact command: the repository's formatter applied only to authorized changed files. Use its existing configuration.

2. **Writing a README for a new project** -- Answer: **High**. "Write a clear, concise README covering setup, usage, and contributing." The agent knows what a good README looks like.

3. **Running database migrations** -- Answer: **Medium**. "Check for pending migrations, run them in order, verify each succeeded." The exact commands depend on the framework.

4. **Generating a JWT token** -- Answer: **Low**. Specific library, specific algorithm, specific expiration. Wrong choices = security vulnerability.

5. **Refactoring a messy function** -- Answer: **High**. "Improve readability and reduce complexity." The agent's judgment is the point.

Now apply this to a skill you're writing: for each workflow step, label it high/medium/low and adjust the instruction specificity accordingly.

### Lab 8D: Place the workflow in the right layer (15 min)

Pick one advanced workflow: browser QA, PR review, incident debugging, customer onboarding, or repo research. Fill this table:

| Layer | What goes there for your workflow |
|-------|-----------------------------------|
| Skill | |
| Memory | |
| MCP | |
| Subagent | |
| Command | |
| Hook | |

Then write one sentence explaining why the core procedure belongs in `SKILL.md` instead of a command or memory note.

### Lab 8E: Write goal-backward must-haves (10 min)

For the same workflow, write three `must_haves` before describing any steps. Each must-have should be testable by a command, screenshot, artifact, issue link, PR check, or explicit user-visible behavior.

---

## Checkpoint

Before moving on, you should be able to:
- Write an instinct in YAML with all required fields
- Add a rationalization table to prevent agent shortcutting
- Choose the right degree of freedom for each workflow step
- Split a workflow across skill, memory, MCP, subagent, command, and hook layers
- Design a router with explicit sibling ownership and negative routing cases
- Place current instructions, references, archives, checkpoints, and reports correctly
- Derive goal-backward must-haves before implementation starts
- Explain when instincts should be promoted to full skills

## Further reading

- [wiki/concepts/meta-skills.md](../wiki/concepts/meta-skills.md)
- [wiki/concepts/composition-patterns.md](../wiki/concepts/composition-patterns.md)
- [wiki/concepts/instinct-model.md](../wiki/concepts/instinct-model.md)
- [wiki/concepts/anti-rationalization.md](../wiki/concepts/anti-rationalization.md)
- [wiki/research/skill-evolution-2026-05.md](../wiki/research/skill-evolution-2026-05.md)

Next: [Module 9: Multi-Host Compatibility](09-multi-host.md)
