# Documentation Refresh - 2026-07-21

## Scope

Reviewed all 92 Markdown files present before this refresh:

- 77 maintained canonical files
- 15 immutable `raw/` source captures

The review checked ownership, evidence claims, current-versus-historical data
placement, sibling routing language, host isolation, checkpoint/resume guidance,
source counts, index coverage, terminology, and local links.

## Outcome

- 34 existing canonical files updated
- 43 existing canonical files reviewed with no change required
- 15 raw source captures reviewed as evidence and intentionally left unchanged
- 3 canonical pages added, bringing the repository to 95 Markdown files
- Wiki now contains 55 Markdown files: 22 concepts, 11 research pages, 12
  examples, 8 queries, plus `INDEX.md` and `GLOSSARY.md`

## Existing files updated

### Entrypoints and authoring skills

- `README.md`
- `SKILL.md`
- `SKILL_SPEC.md`
- `authoring/SKILL.md`
- `prompt-decomposer/SKILL.md`
- `skill-maker/SKILL.md`
- `evals/README.md`

### Course

- `course/README.md`
- `course/04-progressive-disclosure.md`
- `course/07-your-first-skill.md`
- `course/08-advanced-techniques.md`
- `course/09-multi-host.md`
- `course/10-maintaining-library.md`
- `course/12-evaluating-skills.md`

### Runbooks

- `scripts/build-index.md`
- `scripts/compile-wiki.md`
- `scripts/health-check.md`
- `scripts/research-qa.md`
- `scripts/update-sources.md`

### Wiki

- `wiki/GLOSSARY.md`
- `wiki/INDEX.md`
- `wiki/concepts/composition-patterns.md`
- `wiki/concepts/description-writing.md`
- `wiki/concepts/error-handling-in-scripts.md`
- `wiki/concepts/feedback-loops.md`
- `wiki/concepts/host-compatibility.md`
- `wiki/concepts/progressive-disclosure.md`
- `wiki/concepts/skill-evaluations.md`
- `wiki/concepts/validation-loops.md`
- `wiki/queries/observation-20260721-eval-checkpointing.md`
- `wiki/queries/observation-20260721-source-provenance-lock.md`
- `wiki/research/anatomy-of-a-good-skill.md`
- `wiki/research/anti-patterns.md`
- `wiki/research/landscape.md`

## Existing canonical files reviewed with no change required

### Course

- `course/01-what-are-skills.md`
- `course/02-skillmd-format.md`
- `course/03-writing-descriptions.md`
- `course/05-patterns-that-work.md`
- `course/06-anti-patterns.md`
- `course/11-using-skill-maker.md`

### Concepts

- `wiki/concepts/anti-rationalization.md`
- `wiki/concepts/checklist-workflows.md`
- `wiki/concepts/degrees-of-freedom.md`
- `wiki/concepts/gotchas-sections.md`
- `wiki/concepts/implementation-patterns.md`
- `wiki/concepts/instinct-model.md`
- `wiki/concepts/meta-skills.md`
- `wiki/concepts/naming-conventions.md`
- `wiki/concepts/plan-validate-execute.md`
- `wiki/concepts/skill-categories.md`
- `wiki/concepts/skill-discovery.md`
- `wiki/concepts/template-patterns.md`
- `wiki/concepts/token-budget.md`

### Examples

- `wiki/examples/bad/task-intelligence.md`
- `wiki/examples/bad/ui-skills.md`
- `wiki/examples/bad/workflow-automation.md`
- `wiki/examples/bad/yann-lecun.md`
- `wiki/examples/good/freeze.md`
- `wiki/examples/good/gh-fix-ci.md`
- `wiki/examples/good/grill-me-micro-skill.md`
- `wiki/examples/good/openai-docs.md`
- `wiki/examples/good/repo-discovery-loop.md`
- `wiki/examples/good/verification-before-completion-superpowers.md`
- `wiki/examples/good/verification-before-completion.md`
- `wiki/examples/good/writing-plans.md`

### Queries and research

- `wiki/queries/gap-report-repo-discovery-pattern-2026-05-25.md`
- `wiki/queries/monthly-update-2026-04.md`
- `wiki/queries/monthly-update-2026-05.md`
- `wiki/queries/repo-discovery-for-better-skills-2026-05-25.md`
- `wiki/research/cursorrules-vs-skills.md`
- `wiki/research/gstack-deep-dive.md`
- `wiki/research/host-differences.md`
- `wiki/research/openai-skills-analysis.md`
- `wiki/research/repo-discovery-loop.md`
- `wiki/research/skill-evolution-2026-05.md`
- `wiki/research/spec-reference.md`
- `wiki/research/tool-design-evolution.md`

## Raw source captures preserved unchanged

- `raw/datasets/SOURCES.md`
- `raw/docs/agentpatterns-skill-authoring.md`
- `raw/docs/agentskills-io-best-practices.md`
- `raw/docs/agentskills-io-spec.md`
- `raw/docs/anthropic-best-practices.md`
- `raw/docs/applied-anthropic-playbook.md`
- `raw/docs/dont-ship-skills-without-evals.md`
- `raw/docs/mdskills-ai-spec.md`
- `raw/docs/openai-agents-md-spec.md`
- `raw/docs/skill-validation-7-mistakes.md`
- `raw/docs/trq212-art-not-science.md`
- `raw/docs/trq212-bash-all-you-need.md`
- `raw/docs/trq212-file-system-state.md`
- `raw/docs/trq212-skills-abstraction.md`
- `raw/repos/SOURCES.md`

These files retain source wording and historical counts. Current interpretation
belongs in the wiki, and exact repository/sample provenance belongs in the
generated source lock and sampled-artifact manifest.

## New canonical pages

- `wiki/concepts/evidence-lifecycle.md` defines where skill knowledge and eval
  data go, how privacy and provenance are preserved, and which evidence can
  support which claim.
- `wiki/queries/private-router-eval-case-study-2026-07-21.md` records the
  anonymized private-shelf router-eval findings, including strong outcome
  deltas that still failed routing gates.
- This page records the complete documentation review boundary.

## New learnings propagated

1. Structural validation, an eval definition, executed Behavioral PASS, and
   operational proof are four different states.
2. A fresh workspace alone is not isolation. The host home, ambient shelves,
   plugins, memory, tools, environment, model, and CLI must be controlled.
3. The baseline sees zero target skills; the skill arm sees exactly one complete
   target skill directory.
4. Long evals checkpoint and sync every normalized run, validate fingerprints
   on resume, and write aggregate reports atomically.
5. Comparable evidence fingerprints the evaluator, suite, complete skill
   directory, adapter command/content, model, and host runtime identity.
6. Failed, interrupted, contaminated, and superseded runs are retained as
   diagnostic evidence, never substituted for the accepted report.
7. Raw prompts, outputs, protected traces, bearer URLs, credentials, and
   disposable auth homes are excluded from committed evidence.
8. Large skill families use explicit router/sibling maps and cross-sibling
   negative cases; there is no portable automatic sub-skill loader.
9. Historical context is preserved in provenance-backed archives rather than
   deleted or forced into every active prompt.
10. Strong outcomes do not excuse weak routing, and generic baseline success is
    evidence that skill delta—not absolute score alone—matters.

## Link classification

The repository link checker validates real links under `wiki/` and `course/`.
Path-shaped values inside fenced templates in the runbooks are examples, not
targets. The root README's `../agent-factory/` path is explicitly optional and
is checked only when the companion repository exists.

## Validation contract

The refresh is accepted only when:

- all real internal links pass
- all 92 pre-existing Markdown files appear in this review ledger
- no `raw/` Markdown file changed
- README and INDEX counts match the filesystem
- source lock resolves every repository and sampled artifact
- evaluator tests and Factory-owned skill validators complete
- `git diff --check` reports no whitespace errors

## Related pages

- [Skill Evidence Lifecycle](../concepts/evidence-lifecycle.md)
- [Skill Evaluations](../concepts/skill-evaluations.md)
- [Anonymized private-shelf router eval case study](private-router-eval-case-study-2026-07-21.md)
