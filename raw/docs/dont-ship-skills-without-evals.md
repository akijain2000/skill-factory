# Don't Ship Skills Without Evals

## Source

- Talk: [Don't Ship Skills Without Evals — Philipp Schmid, Google DeepMind](https://www.youtube.com/watch?v=0vphxNt4wyk)
- Written guide: [Practical Guide to Evaluating and Testing Agent Skills](https://www.philschmid.de/testing-skills), published 2026-03-04
- Supporting benchmark: [SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks](https://arxiv.org/abs/2602.12670)
- Captured: 2026-07-21 from the user-supplied talk transcript and the public sources above
- User-supplied transcript receipt: 24,849 bytes; SHA-256 `b92fd6d102cbdc5fc49fde4392fa5a03798c1355173566c9366a026fdd427621`

## Source boundary

This note paraphrases the talk and written guide. It does not reproduce the
copyrighted transcript in the repository; the receipt above makes the exact
input identifiable while this file preserves the durable distillation.
Numerical benchmark claims come from SkillsBench or Schmid's guide and should
be rechecked against those sources before reuse. Advice about user-invoked
skills and removing no-op instructions appears in the talk transcript but is
not central to the written guide.

## Core claim

A structurally valid `SKILL.md` is not evidence that the skill helps. Agent behavior is nondeterministic, descriptions may under-trigger or over-trigger, and AI-generated skills can add irrelevant or harmful context. Treat a skill as executable product behavior: define measurable outcomes, compare against the agent without the skill, and keep the evaluation beside the skill throughout its lifecycle.

SkillsBench supports the concern. It evaluates tasks under no-skill, curated-skill, and self-generated-skill conditions. Curated skills improve aggregate performance, but some individual tasks regress and self-generated skills do not improve performance on average. The decision is therefore not "are skills useful?" but "does this skill help this task on this model and harness?"

## Taxonomies that change evaluation design

### Capability and preference skills

- **Capability skill:** supplies knowledge or procedure the base model cannot perform consistently. Re-run its evals as models improve. If the no-skill baseline catches up reliably, retire the skill and retain the eval as a regression monitor.
- **Preference skill:** encodes team-specific style, policy, or workflow. Foundation models are unlikely to absorb the preference, so its eval protects fidelity across model and harness upgrades.

### Model-triggered and user-invoked skills

- **Model-triggered skill:** the agent decides whether to load it from discovery metadata. Evaluate positive and negative routing in addition to task outcomes.
- **User-invoked skill:** the user or a deterministic workflow selects it explicitly. Routing is less important; outcome, instruction fidelity, and efficiency dominate.
- Consumer-facing agents usually cannot rely on users naming internal skills. Their descriptions and negative controls need stronger evaluation than developer workflows with explicit invocation.

## Authoring implications

1. Write descriptions as precise routing directives: what the skill covers, when it should activate, and when it must stay silent.
2. Write directives rather than passive facts. The agent should not need to infer that a recommendation is mandatory.
3. Keep `SKILL.md` lean and layer detailed variants into references. The description is paid on discovery and the body is paid on activation.
4. Remove no-op instructions such as generic requests for readable or high-quality work. Keep only instructions whose removal changes measured behavior.
5. Match degrees of freedom to the task. If every step is deterministic, put it in a script and let the skill explain when and why to run it.
6. Grade outcomes, not a single preferred path. Unexpected tool order is acceptable when the final state and safety constraints are correct.

## Minimum useful eval suite

Start with 10–20 prompts rather than waiting for a large benchmark:

- roughly five natural prompts that should trigger the skill
- roughly five adjacent or unrelated prompts that should not trigger it
- functional and edge cases with outcome-specific checks
- real user or production traces when privacy and consent permit their use

Each case should record:

- stable ID and user prompt
- whether the skill should trigger
- optional fixture files and startup requirements
- deterministic expected checks when possible
- qualitative rubric only when deterministic checks cannot express the outcome

## Execution protocol

1. Run both conditions: skill enabled and skill absent.
2. Use a clean workspace for each case and trial. Do not allow chat history, prior outputs, or neighboring cases to leak answers.
3. Run three to six trials per case because a single pass is not reliability evidence.
4. Capture the final output and useful trace evidence, including skill activation, commands, artifacts, tokens, retries, latency, and exit state when available.
5. Prefer deterministic checks: regex, file existence/content, compilation, tests, or domain scripts.
6. Use an LLM judge only for semantic or aesthetic criteria. Require structured output and a written rubric.
7. Test every supported model-harness combination that materially changes discovery, tools, or context loading.

## Release and retirement gates

- Run evals whenever the skill, its description, its references, the adapter, model, or harness changes.
- Do not merge a change that creates a statistically meaningful regression against the accepted baseline.
- Add every real failure as a regression case after removing sensitive data.
- Track routing accuracy, outcome pass rate, skill-versus-baseline delta, and cost/latency where relevant.
- Keep retired-skill evals. A future model or harness regression may justify reintroducing the skill.

## What static validation can and cannot prove

Static validation can prove frontmatter shape, size limits, link integrity, and the presence of test artifacts. It cannot prove that the skill triggers correctly, improves the outcome, remains reliable across trials, or deserves to stay installed. Those claims require executed behavioral evals.
