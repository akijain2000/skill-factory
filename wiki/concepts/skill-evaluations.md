# Skill Evaluations

## What it is

A **skill evaluation** is a repeatable comparison of agent behavior with the
skill enabled and absent. It tests routing—whether a model-triggered skill loads
for relevant prompts and stays silent for adjacent controls—and functional
outcomes using isolated, repeated trials.

## Keep four proof levels separate

| Level | Evidence | Does not prove |
|---|---|---|
| Structural validity | Frontmatter, size, references, examples, static checks | The skill routes or helps |
| Eval definition | Versioned cases/graders/adapter exist | The suite has executed |
| Behavioral result | Frozen repeated skill/no-skill report meets declared gates | Production/provider behavior |
| Operational proof | Domain-specific product, provider, database, or human receipt | Portability to another model/harness |

## Why it matters

SkillsBench found that curated skills improve aggregate performance while some
individual tasks regress, and self-generated skills provide no average benefit.
A single successful demonstration cannot separate skill quality from model
variance. Evals also reveal when a capability skill has become unnecessary as
the baseline model improves.

## Build the suite

1. Define thresholds before editing or running the skill.
2. Start with 10–20 cases: natural positive triggers, adjacent negative
   controls, functional tasks, and sanitized known failures.
3. Run every case with and without the skill. Use the same model, harness,
   prompt, fixtures, tool policy, timeout, and limits.
4. Repeat each arm three to six times in a fresh workspace.
5. Prefer deterministic checks: regex, compilation, tests, file assertions, or
   adapter validators. Use structured LLM judgment only where necessary.
6. Report trigger accuracy, skill outcome pass rate, baseline outcome pass
   rate, delta, overall pass rate, and relevant cost/latency.

Only checked functional cases contribute to outcome rates. Positive and
negative cases both contribute to routing and overall reliability.

## Isolate the host

A fresh task directory is insufficient if the host still loads ambient skills,
plugins, memory, tools, or project rules. A trustworthy adapter should:

- create an empty project/workspace per trial
- use zero installed target skills for baseline and exactly one for skill arm
- pin model and record host/CLI version
- pass a minimal non-secret environment allowlist
- disable unrelated plugins, apps, memories, web, and tools
- fail on skill-context contamination or omitted discovery metadata
- clean disposable workspaces, output files, and copied auth homes

If isolation fails, preserve the checkpoint as diagnostic evidence and exclude
it from aggregate scoring.

## Record comparable provenance

Checkpoint every normalized run and record evaluator, suite, full skill
directory, and adapter command/content SHA-256 fingerprints plus model/runtime
identity. Resume and regression comparison must fail closed on mismatch. A
cross-model or cross-harness score is context, not a valid skill regression.

Committed checkpoints/reports should exclude raw model output, raw traces,
protected prompts, credentials, bearer URLs, and ambient environment values.
Write the final report atomically only after all expected records exist.

## Detect activation honestly

Instrumentation can itself be flaky. A final marker is useful, but an exact
trace read of the target `SKILL.md` may prove activation even when the marker is
missing. Keep the channels separate as numeric telemetry and strip any marker
before outcome grading. Do not infer activation from vague semantic similarity.

## Interpret the result

- **High outcome, low routing:** useful body, unreliable discovery; FAIL the
  routing gate and narrow/strengthen metadata.
- **High absolute outcome, low delta:** baseline already knows the behavior;
  remove no-ops or consider retirement.
- **Good positives, bad negatives:** the description over-triggers; add/narrow
  boundaries and sibling controls.
- **Large variance:** instructions or graders are ambiguous; keep repeated
  trials and investigate case-level failures.

A FAIL is valuable evidence. Keep the report and named failed cases. Do not
weaken thresholds after seeing the score.

Capability skills teach behavior the base model currently lacks; preference
skills protect organization-specific policy or style. Model-triggered
capability skills need both routing and outcome evidence. Explicitly invoked
workflow skills usually need outcome and efficiency evidence more than
discovery tests.

## Good example

An anonymized private-shelf router case study ran two 60-trial suites. Both skills produced
large positive outcome deltas, but both failed the frozen 90% routing gate.
Negative controls exposed cross-domain over-triggering that outcome-only tests
would have missed. The FAIL reports and diagnostics were retained without raw
trajectories.

## Bad example

An author asks an agent to generate `SKILL.md`, runs one prompt that names the
skill explicitly under a host's full global shelf, edits the threshold after
reading the answer, and ships because static lint passes. This bypasses natural
discovery, negative routing, baseline comparison, isolation, variance, and
evidence identity.

## Selection, telemetry, and visibility

Separate development cases, validation used to select a description, and an
untouched final holdout. Anthropic's `run_loop.py` selects the best iteration by
`test_passed`; that named test set is operationally a selection set. The official
authoring guide calls this train/validation. An additional final holdout is the
Skill Factory recommendation for an independent acceptance claim.

A missing or unreadable activation trace is unknown, not proof of non-invocation.
Keep case failure, runtime failure, and unscored evidence explicit rather than
reporting missing metrics as zero. Runtime skill snapshots must exclude hidden
eval answers and grader assets, while preserving required operational files.

For repeated success metrics, publish the estimator and denominator. Comet's
documented `pass^k` uses an all-observed-runs-pass indicator; do not silently
interpret it as a general probability estimate or compare it to another formula.
See [retrieval and interference](retrieval-and-interference.md) before extending
isolated ablation to a multi-skill shelf.

Sources: [description loop](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/skill-creator/scripts/run_loop.py),
[official optimization guide](https://github.com/agentskills/agentskills/blob/69ef37e9424c0a7ea9dd2293b559e43ec8176379/docs/skill-creation/optimizing-descriptions.mdx),
[trusted invocation tests](https://github.com/NVIDIA/SkillEvaluator/blob/73b27dad60d3927e202ea6099ce79bb25053fd2b/tests/test_harbor_negative_control_evidence.py),
[isolation tests](https://github.com/NVIDIA/SkillEvaluator/blob/73b27dad60d3927e202ea6099ce79bb25053fd2b/tests/test_harbor_runtime_skill_isolation.py),
[metric truth tests](https://github.com/NVIDIA/SkillEvaluator/blob/73b27dad60d3927e202ea6099ce79bb25053fd2b/tests/test_harbor_metrics_truth.py),
[Comet metric definitions](https://github.com/rpamis/comet/blob/c1118e19d1fbce87706e4265ece17f50db21377e/eval/README.md).

## Sources

- [Don't Ship Skills Without Evals](../../raw/docs/dont-ship-skills-without-evals.md)
- [Behavioral eval contract](../../evals/README.md)
- [Skill Evidence Lifecycle](evidence-lifecycle.md)
- [Anonymized private-shelf router eval case study](../queries/private-router-eval-case-study-2026-07-21.md)
- [Practical Guide to Evaluating and Testing Agent Skills](https://www.philschmid.de/testing-skills)
- [SkillsBench](https://arxiv.org/abs/2602.12670)
