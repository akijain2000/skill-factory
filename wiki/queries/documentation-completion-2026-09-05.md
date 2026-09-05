# Documentation Completion Review — 2026-09-05

## Scope and coverage

All 102 repository-owned Markdown files present at intake received full-content
review, including 13 immutable `raw/docs/` captures. Three bounded independent
review passes covered the source/runbook, concept/example, and research/query
sets; the primary pass covered the root skills and course. Ignored upstream
clones and partial snapshots are excluded. Newly authored documentation was also
reviewed. The [per-file coverage ledger](../../raw/datasets/documentation-review-2026-09-05.json)
records original/current hashes and retained-versus-updated dispositions.

This builds on the [September upstream refresh](monthly-update-2026-09.md):
147 prior entries checked (114 advanced, 33 unchanged), seven new sources,
154 current entries representing 153 canonical repos, 190 screened candidates,
and 43 pinned artifacts across 15 source entries. Revision checks are not full
source-body reviews; historical raw captures remain unchanged.

## Corrections applied

- Updated the course, active wiki guidance, inventories and runbooks. Distinguished
  portable format requirements from local lint/style recommendations and one-hop
  disclosure from directory nesting. Replaced unsupported host/model compatibility
  claims with explicit version-specific evidence requirements.
- Reconciled guided-interview approval steps with existing user authority. Dated
  captures and historical examples retain their original observations and source
  authority boundaries. Added the license text matching the repository's existing
  MIT declaration; third-party excerpts retain their own terms.
- Fixed false-green validation: proper YAML parsing, name-directory errors,
  meaningful empty-section detection, empty eval-folder handling, missing/empty
  link roots, and strict source-table parsing. Link CLI claims are scoped to the
  inline target forms it checks.
- Required runtime model/harness identity; reject non-accepted evidence status and
  inconsistent checkpoints. Checkpoints remain trusted local state, not signed
  attestations. The adapter still owns actual host isolation.
- Propagated the principles to 19 Atelier skills. Six oversized activation bodies
  were reduced from 513–732 lines to 87–155 lines with exact original snapshots,
  SHA-256 receipts, and directly routed supporting detail. Existing unrelated
  dirty skills and product work were preserved.
- Atelier report comparison now checks identities, fingerprints, thresholds,
  paired run identities, internal result consistency and recomputed aggregates.
  Its legacy Codex adapter blocks before a model launch by default and cannot
  produce accepted behavioral evidence in diagnostic mode.

## Verification and limits

Factory static skills, focused harness tests, canonical links, manifest/artifact
integrity and raw-capture preservation pass locally. Atelier's 114/114 skills pass
structural validation; no activation body exceeds 500 lines. Remaining style and
eval-definition warnings are visible in its audit, not concealed with filler.

The new development cases are definitions only. No live model, upstream benchmark,
provider, or production workflow was exercised. The legacy Atelier adapter still
needs demonstrated host isolation and known activation telemetry before acceptance;
this refresh quarantines that gap rather than calling it solved. Historical
third-party excerpt licenses/revisions that were not sampled remain unverified for
redistribution/adoption. No remote push or publication was performed.

## Sources

- [Current health receipt](health-report-2026-09-05.md)
- [September synthesis](../research/skill-evolution-2026-09.md)
- [Source refresh dataset](../../raw/datasets/source-refresh-2026-09-05.json)
- [Evaluator contract](../../evals/README.md)
- [Skill quality policy](../../SKILL_SPEC.md)
