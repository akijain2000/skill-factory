# Module 12: Evaluating Skills

> Runtime gate (2026-09-05): adapters must return non-empty model and harness identity. The evaluator rejects diagnostic-only metadata and malformed/inconsistent resumed records. It creates a fresh workspace; the adapter must independently establish host isolation. The deterministic example tests harness mechanics only.

A valid `SKILL.md` is a hypothesis. Behavioral evals tell you whether the skill activates correctly, improves outcomes, and still deserves its context cost.

## Four proof levels

Do not collapse these labels:

| Level | What it proves |
|---|---|
| Structural PASS | The files and frontmatter satisfy static rules |
| Eval defined | Cases, graders, thresholds, and arms exist |
| Behavioral PASS | Executed, repeated, isolated trials passed frozen gates |
| Operational proof | The skill performed the claimed workflow in the target environment |

A shelf can be structurally perfect while having almost no executed behavioral
evidence. A report can show a large outcome improvement while still failing the
routing gate. Both distinctions matter.

## Capability and preference skills

Classify the skill before choosing gates:

| Type | Purpose | Lifecycle question |
|---|---|---|
| Capability | Adds knowledge or procedure the model lacks | Has the no-skill baseline caught up? |
| Preference | Protects team-specific policy, style, or workflow | Does the agent still follow the preference? |

Retire a capability skill when the baseline reaches the accepted outcome and reliability thresholds. Keep the eval suite after retirement. Preference skills usually remain because a general model upgrade cannot be expected to preserve local policy.

## Routing and outcomes are separate

A model-triggered skill has two interfaces:

1. **Discovery:** the description should activate for natural relevant requests and stay silent for adjacent requests.
2. **Execution:** once loaded, the skill should improve the task outcome without unacceptable cost or regressions.

A user-invoked skill can spend less evaluation effort on routing because the user selected it explicitly. A consumer-facing agent cannot expect users to know internal skill names, so positive and negative routing cases are mandatory.

## The minimum viable suite

Start with 10–20 cases:

- five natural prompts that should trigger
- five adjacent prompts that should not trigger
- functional cases for the most important outcomes
- edge cases and privacy-safe real failures

Every case needs a stable ID, prompt, `shouldTrigger`, and explicit checks. Grade the final state rather than one exact sequence of model steps.

```json
{
  "id": "publish_docs",
  "prompt": "Prepare these docs for release and prove the links are valid.",
  "shouldTrigger": true,
  "checks": [
    {
      "id": "link_gate",
      "type": "adapter",
      "name": "links_valid"
    }
  ]
}
```

## The ablation protocol

For each case:

1. Create a clean workspace, a disposable host home, and install fixtures.
2. Disable unrelated global/project shelves, plugins, memory, and ambient config.
3. Run the chosen model and harness with zero target skills installed.
4. Create an identical host with exactly the target skill directory installed.
5. Repeat each condition three to six times.
6. Compare routing, outcome pass rate, delta, tokens, latency, and retries where available.

Isolation prevents previous cases, chat history, existing artifacts, or another
copy of the skill from leaking answers. Keep model, host CLI/flags, tools, time
limits, fixtures, adapter, and minimal environment allowlist identical between
arms. Multiple trials turn a lucky run into a reliability distribution.

## Freeze evidence identity before running

Store fingerprints for:

- evaluator implementation and configuration
- suite content and frozen thresholds
- the complete target skill directory, including references and scripts
- adapter command and adapter content
- model/version, host CLI/version, flags, tool policy, and environment policy

Resume and compare only when those identities match. If a model, CLI, adapter,
grader, threshold, or skill reference changes, start a new evidence lineage.

## Checkpoint long runs safely

Append one normalized record after every completed case/arm/trial and `fsync` it.
Resume by stable case, arm, and trial IDs only after fingerprint validation. Write
the final aggregate report atomically. A late timeout must not erase dozens of
valid completed trials.

Committed checkpoints and reports should contain case IDs, booleans, metrics,
grader results, fingerprints, and sanitized error categories. Keep raw prompts,
outputs, traces, credentials, bearer URLs, and disposable auth homes out of Git.
Audit and remove temporary workspace/auth prefixes after success or interruption.

## Choose the cheapest truthful grader

Use checks in this order:

1. compilation, unit tests, or domain validators
2. file existence and content assertions
3. regex or structured-output checks
4. trace assertions for required safety actions
5. rubric-based LLM judging for semantic or aesthetic outcomes

An LLM judge adds variance, latency, and cost. Use typed output and a narrow rubric, and inspect failed trajectories before changing the skill.

## Run the included harness

The repository ships a credential-free example:

```bash
bun test scripts/evaluate-skill.test.ts
bun run scripts/evaluate-skill.ts evals/example.json
```

The harness runs an adapter command in a new temporary directory for every condition and trial. Read [`evals/README.md`](../evals/README.md) for the adapter contract and case schema.

Use a report path plus resume for expensive suites:

```bash
bun run scripts/evaluate-skill.ts evals/my-skill.json \
  --report /tmp/my-skill-report.json \
  --checkpoint /tmp/my-skill-progress.jsonl \
  --resume
```

## Interpret the report

The report separates:

- **Trigger accuracy:** correct activation and non-activation in the skill arm
- **Skill outcome pass rate:** deterministic or adapter checks with the skill
- **Baseline outcome pass rate:** the same checks without the skill
- **Outcome delta:** skill outcome minus baseline outcome
- **Skill overall pass rate:** routing and outcomes combined

A high skill pass rate with zero or negative delta means the skill may be unnecessary. A positive delta with weak routing means the body helps when loaded but the description is unreliable. Do not lower a frozen gate or rewrite the harness merely to turn that result green.

Activation telemetry should distinguish a discovery marker from evidence that
the runtime read the exact target `SKILL.md`. Remove evaluation-only markers
before outcome grading so instrumentation cannot help the answer.

The [anonymized private-shelf router case study](../wiki/queries/private-router-eval-case-study-2026-07-21.md)
shows both failure modes: strong skill-versus-baseline outcome deltas, but final
FAIL results because natural routing missed the accepted threshold. Generic
safety cases also passed in the baseline, proving why outcome delta matters.

## Accepted and diagnostic evidence

Retain failed, interrupted, contaminated, and superseded runs when they explain
what happened. Label them diagnostic-only. They must never replace the accepted
comparable report. This lets the library learn from harness failures without
laundering those failures into a behavioral claim.

## Change and retirement policy

Run the suite when the description, body, references, adapter, model, or harness changes. Add sanitized real failures as regression cases. Do not merge statistically meaningful regressions merely because one new example passes.

Freeze gates before seeing results. Change a gate only through a documented new
evaluation version with a reason unrelated to making a specific run pass.

When a capability baseline catches up:

1. verify across every supported model-harness pair
2. remove the skill from active discovery
3. retain the eval suite
4. continue running the baseline as a regression monitor
5. reintroduce or redesign the skill if performance falls

## Try It: Eval one real skill

### Lab 12A: Write routing cases (15 min)

Pick one frequently used model-triggered skill. Write five prompts that should trigger and five that should not. Do not mention the skill name in the prompts.

Checkpoint: each negative prompt is plausibly adjacent to the skill, not obviously random.

### Lab 12B: Define outcomes (15 min)

For three positive cases, write checks for usable output, instruction fidelity, and efficiency. Prefer deterministic checks. If you need an LLM judge, write the rubric before running it.

Checkpoint: the check still passes when the agent takes a different valid route.

### Lab 12C: Build an adapter (20 min)

Copy `evals/example.json`, replace its cases, and implement an adapter that runs your actual host. The baseline arm must omit the skill while keeping model, prompt, fixtures, limits, and tools constant.

Checkpoint: the adapter returns `triggered`, `output`, optional `trace`, named
`checks`, and metrics as JSON, while the evaluator persists only the normalized,
privacy-safe fields needed for aggregation.

### Lab 12D: Run ablation (15 min plus model time)

Run at least three trials per condition. Inspect failures rather than optimizing only the aggregate score.

```bash
bun run scripts/evaluate-skill.ts evals/my-skill.json \
  --report /tmp/my-skill-report.json \
  --checkpoint /tmp/my-skill-progress.jsonl \
  --resume
```

Checkpoint: you can say whether the problem is routing, functional behavior, variance, or an already-strong baseline.

### Lab 12E: Remove a no-op (10 min)

Delete one generic instruction such as "write high-quality code" and rerun the suite. If behavior does not degrade, keep it deleted. If it does, replace the phrase with an observable directive and check.

## Lab 12F: Challenge the evidence boundary

Use [the refresh case pack](../evals/authoring-refresh-cases.md). Reserve cases
that the author never uses to select a description. Simulate unreadable
activation telemetry: the negative-control result must remain unknown. Check
that graders and answers are absent from the agent-visible skill snapshot.

Then define a separate shelf experiment with a fixed distractor set. Explain why
13 skills versus no skills estimates a package effect, and why retrieval Recall@k
is not task success. State whether the experiment was defined or executed.

## Checkpoint

Before shipping a skill, you can now answer:

- What measurable failure does the skill fix?
- Does it trigger on positive prompts and stay silent on negative prompts?
- Does it beat the no-skill baseline across repeated isolated trials?
- Can you prove the baseline saw zero copies and the skill arm exactly one copy?
- Do all compared records share the required fingerprints and frozen gates?
- Which evidence is deterministic and which depends on an LLM judge?
- Which retained runs are accepted evidence and which are diagnostic-only?
- What threshold would justify retiring the skill?

## Further reading

- [Skill Evaluations](../wiki/concepts/skill-evaluations.md)
- [Feedback Loops](../wiki/concepts/feedback-loops.md)
- [Validation Loops](../wiki/concepts/validation-loops.md)
- [Behavioral eval harness](../evals/README.md)
- [Skill Evidence Lifecycle](../wiki/concepts/evidence-lifecycle.md)
- [Anonymized private-shelf router eval case study](../wiki/queries/private-router-eval-case-study-2026-07-21.md)
- [Don't Ship Skills Without Evals source note](../raw/docs/dont-ship-skills-without-evals.md)

Previous: [Module 11: Using the Skill Maker](11-using-skill-maker.md)
