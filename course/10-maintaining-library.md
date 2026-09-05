# Module 10: Maintaining a Skill Library

> Capture boundary: a correction is a candidate signal, not automatic authority to write memory or distribute private data. Sanitize it, check recurrence and ownership, and use the user-authorized destination. Shared rules require a host-supported project rule or a packaged direct reference; cross-package relative paths are not portable.

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

1. **Inventory**: List every discovered skill path, owner, line count, last-modified date, and sibling/router relationship
2. **Classify evidence**: Structural PASS, eval defined, executed behavioral PASS, and operational proof are separate columns
3. **Risk-rank migration**: Prioritize high-use, high-risk, overlapping, and oversized skills; do not auto-generate shallow evals just to improve coverage counts
4. **Evaluate each**: Keep / Improve / Retire / Merge
5. **Evaluate retirement candidates**: Run the suite without each capability skill and retire only when the baseline reliably meets its frozen thresholds
6. **Merge or route overlaps**: Merge true duplicates; use explicit sibling routing when workflows need independent activation and evals
7. **Update descriptions**: Keywords and sibling boundaries drift as workflows change

## Health checks

Run the wiki health check periodically:

```
Read scripts/health-check.md and run a health check.
```

This finds: broken links, stale sources, terminology inconsistencies, content quality gaps, and suggests new articles.

## Monthly source updates

The source-update runbook guides discovery from GitHub rankings and targeted
repository searches:

```
Read scripts/update-sources.md and run the monthly update.
```

This pulls fresh rankings, finds new AI coding repos, clones them, and recompiles affected wiki articles.

The important distinction: **source updates are not finished when repos are cloned**. They are finished when the useful pattern has been distilled into `wiki/concepts/`, `wiki/research/`, `wiki/examples/`, or `wiki/queries/`.

The source cache is disposable. Durable claims require the human-readable source
manifest, resolved repository revision lock, and content hashes for every sampled
artifact that changed an authoring decision. Neither source locking nor static
validation proves behavior.

At 100+ repos, clone narrowly and synthesize aggressively:

1. Use sparse/partial clones for large repos.
2. Include host folders and instruction files, not just root README files.
3. Count visible `SKILL.md`, `AGENTS.md`, and `CLAUDE.md` files so the scan has measurable coverage.
4. Read a small set of high-signal files deeply.
5. Write down what changed your authoring behavior.

If the answer to step 5 is "nothing," the source update is collection, not learning.

## Lab: Compare a source refresh

1. Preserve the old lock and current dirty-file list.
2. Check every tracked HEAD, then compare selected package files at frozen SHAs.
3. Identify one changed repository whose sampled skill stayed unchanged.
4. Resolve one removed path from current source files; keep its old receipt.
5. Inspect a candidate's scripts/hooks and license before adopting its procedure.
6. Write the learning into its owning skill and add an eval definition.
7. Report revision-only review, artifact inspection, static checks, and executed
   behavior separately. Use the [September update](../wiki/queries/monthly-update-2026-09.md)
   as a worked example; do not claim all 154 entries were deeply reviewed.

## Rules distillation

When you notice the same principle in 3+ skills, extract it into a shared rule. This keeps individual skills shorter and ensures consistency.

## Version your skills

Track changes that matter:
- Description rewrites (affects activation)
- Workflow changes (affects behavior)
- New gotchas (accumulated knowledge)
- Eval cases and accepted thresholds (affect regression and retirement decisions)
- Complete skill-directory, suite, adapter, evaluator, model, and CLI fingerprints

Keep failed, interrupted, contaminated, and superseded eval results when they
explain a decision, but label them diagnostic-only. Accepted reports must be
comparable and privacy-safe. Never commit raw protected prompts, model outputs,
tool traces, bearer URLs, credentials, or disposable auth homes.

## The end goal

A mature skill library is supported by a repeatable maintenance process:
- Corrections become candidate signals for authorized, sanitized review
- Stocktakes prune dead weight
- Health checks find gaps
- Source updates bring in new patterns
- The meta-skill uses all of this to author better skills each time

You build the system once. It improves when reviewed evidence changes the owning procedure and passes relevant checks.

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

For each skill, record its route/owner and four independent evidence states,
then decide: **Keep**, **Improve**, **Retire**, or **Merge**.

Rules of thumb:
- Haven't used it in 3 months? **Evaluate for retirement**; lack of use alone is not proof
- Two skills that do similar things? **Merge**
- Description missing WHEN trigger? **Improve**
- Body over 500 lines? **Improve** (split)
- Baseline matches a capability skill across isolated repeated trials? **Retire**, but keep the eval suite
- A large skill contains distinct activation boundaries? **Split into explicit siblings**, then add cross-sibling negatives

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
Follow the testing rule: read `rules/always-test.md`.
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

### Lab 10E: Run a mini repo-discovery pass (20 min)

Use this lab before writing an important new skill or when you suspect the wiki is missing a pattern.

1. Pick one target skill idea, such as "browser QA", "PR review", "incident debugging", or "customer onboarding".
2. Start from the top GitHub repos for that language or domain, then add GitHub search or an awesome list if needed. Score 5-10 candidates. Favor repos that contain actual `SKILL.md`, prompt folders, validators, hooks, or installer scripts.
3. Score each candidate with the source-update rubric:

| Score | Meaning |
|-------|---------|
| 5 | Directly about SKILL.md, agent skills, or skill authoring |
| 4 | AI coding tool, coding assistant, or agent framework |
| 3 | LLM framework, prompt engineering, or developer automation |
| 2 | General devtool, editor plugin, or template collection |
| 1 | Tangential AI mention only |

4. Keep candidates scoring 3+. For each keeper, read the README plus 2-3 concrete artifacts.
5. Write one output:
   - a concept update if you found a reusable pattern
   - a research update if you learned something about the ecosystem
   - a good/bad example if one artifact is worth annotating
   - a gap report in `wiki/queries/` if the wiki is missing the pattern

Expected output:

```markdown
## Mini discovery result
- Target skill idea:
- Repos searched:
- Kept:
- Skipped:
- Pattern found:
- Wiki file updated or gap filed:
```

Checkpoint: you can explain why each kept source changes how you would write the skill. If a source does not change any decision, cite it lightly or skip it.

### Lab 10F: Run a 100-repo sparse expansion (45 min)

Use this when the ecosystem has moved and a mini pass is too small.

1. Generate at least 100 candidates from a current ranking CSV or search export.
2. Exclude repos already listed in `raw/repos/SOURCES.md`.
3. Sparse clone the selected repos with patterns for:
   - `README*`
   - `**/SKILL.md`
   - `**/AGENTS.md`
   - `**/CLAUDE.md`
   - `.claude/**`, `.codex/**`, `.agents/**`, `.gemini/**`, `.opencode/**`, `.cline/**`, `.cursor/**`
   - `skills/**`, `agents/**`, `commands/**`, `plugins/**`, `docs/**`
4. Count coverage:

```bash
python3 - <<'PY'
from pathlib import Path
base = Path("raw/repos")
repos = [p for p in base.iterdir() if p.is_dir() and p.name != "github-ranking"]
print("repos", len(repos))
print("SKILL.md", sum(1 for r in repos for _ in r.rglob("SKILL.md")))
print("AGENTS.md", sum(1 for r in repos for _ in r.rglob("AGENTS.md")))
print("CLAUDE.md", sum(1 for r in repos for _ in r.rglob("CLAUDE.md")))
PY
```

5. Update four artifacts before calling the update done:
   - `raw/repos/SOURCES.md`
   - `wiki/queries/monthly-update-YYYY-MM.md`
   - at least one `wiki/research/` or `wiki/concepts/` article
   - at least one course module or example if the learning affects how people practice

Expected output:

```markdown
## 100-repo expansion result
- Candidates reviewed:
- Repos cloned:
- Coverage counts:
- Top 5 new patterns:
- Wiki/course files changed:
- Validation commands:
```

---

## Checkpoint

Before moving on to the capstone:
- You've inventoried your skill library
- You've run the validator on all your skills
- You've separated structural, eval-definition, executed-behavior, and operational proof
- You've identified at least one shared rule to extract
- You've run a mini repo-discovery pass or can explain when to run one
- You can run a 100-repo sparse expansion without mistaking cloning for synthesis
- You can identify retirement candidates without deleting their regression evals
- You understand the monthly maintenance rhythm

## What's next

Module 11 teaches you to use the interactive Skill Maker. Module 12 then proves whether the resulting skill improves behavior over the no-skill baseline.

## Further reading

- [wiki/concepts/feedback-loops.md](../wiki/concepts/feedback-loops.md)
- [wiki/concepts/meta-skills.md](../wiki/concepts/meta-skills.md)
- [wiki/research/anatomy-of-a-good-skill.md](../wiki/research/anatomy-of-a-good-skill.md)
- [wiki/research/repo-discovery-loop.md](../wiki/research/repo-discovery-loop.md)
- [wiki/research/skill-evolution-2026-05.md](../wiki/research/skill-evolution-2026-05.md)
- [wiki/examples/good/repo-discovery-loop.md](../wiki/examples/good/repo-discovery-loop.md)
- [SKILL_SPEC.md](../SKILL_SPEC.md) -- the full quality standard

Next: [Module 11: Using the Skill Maker](11-using-skill-maker.md)
