# Skill Supply Chain

## What it is

A skill supply chain includes its source repository, license, instruction files,
scripts, references, hooks, installer, and the host that grants those components
access. Reviewing only `SKILL.md` leaves executable dependencies unexamined.

## Why it matters

A valid manifest is not a security decision. A changed script can alter a skill
whose Markdown is byte-identical. A scanner can finish while leaving large,
malformed, nested, or unsupported artifacts uninspected.

## How to do it

1. Record the canonical repository, immutable revision, selected paths, and
   applicable upstream licenses before adapting a source. An aggregator's code
   license does not automatically cover every collected skill.
2. Read external instructions as research data. Do not execute setup commands,
   hooks, or bundled scripts merely because their README requests it.
3. Inventory the whole selected bundle, including hidden host configuration,
   referenced scripts, nested archives, and symlinks. Resolve paths within the
   intended root; reject traversal or links that escape it.
4. Keep repository revision, sampled-file hashes, and complete skill-package
   fingerprint separate. Each answers a different update question.
5. Review scanner coverage as well as findings. Missing tools or uninspected
   relevant files mean incomplete evidence, even if the reported issue count is
   zero. Record a named manual review or leave that gate open.
6. Keep static safety, runtime isolation, and behavioral improvement separate.
   Tool metadata describes capabilities; the host and user control permission.

## Good example

Vercel's root-level lock regression changes only a supporting script and expects
a different installed hash. NVIDIA SkillSpector's bundle tests inspect hooks and
execution surfaces; its documented incomplete-analysis gate prevents a partial
scan from certifying installation safety. These are inspected definitions, not
tests executed by this refresh.

## Bad example

Copy a popular repository's `SKILL.md`, ignore its hooks and license, and call it
safe because a linter passed. Another failure is treating a skipped scanner as
zero findings.

## Sources

- [Vercel root-package regression](https://github.com/vercel-labs/skills/blob/435076e78988e1e6ec40d00b0b1d76bdbbc5419a/tests/root-level-lock-hash.test.ts)
- [Traversal regression](https://github.com/vercel-labs/skills/blob/435076e78988e1e6ec40d00b0b1d76bdbbc5419a/tests/subpath-traversal.test.ts)
- [SkillSpector analysis bounds](https://github.com/NVIDIA/SkillSpector/blob/7805bb94843d91cb9937f57264ca52642164499b/docs/ANALYSIS_RESOURCE_BOUNDS.md)
- [Bundled execution-surface tests](https://github.com/NVIDIA/SkillSpector/blob/7805bb94843d91cb9937f57264ca52642164499b/tests/test_bundled_execution_surface_acceptance.py)
- [Corpus license governance](https://github.com/EverMind-AI/SkillCorpus/blob/2e8b8e5bca969a953f66ab14d2e91d8ad3d5a63b/docs/licence-and-governance.md)
- [Revision and artifact receipts](../../raw/repos/SOURCES.lock.json)
