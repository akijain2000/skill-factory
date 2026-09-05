# Wiki Health Report — 2026-09-05

## Local validation

| Gate | Result | Evidence |
|---|---|---|
| Skill structure | PASS | `validate-skill.ts` passes for root, authoring, skill-maker, and prompt-decomposer; no warnings |
| Harness regression | PASS | `bun test scripts/*.test.ts`: 17 tests, 74 assertions |
| Internal links | PASS | `bun run scripts/check-links.ts`: all checked wiki/course inline targets exist; separate canonical audit excludes fenced templates and labels optional links |
| Index and orphans | PASS | 62 wiki files; all 60 non-index/glossary articles indexed; zero orphans |
| Source revisions | PASS | 154/154 source entries resolve; 153 unique canonical repositories |
| Sampled artifacts | PASS | 43/43 resolve; local bytes, dataset receipt, and lock hashes agree at the same revision |
| Historical preservation | PASS | All 147 previous HEADs and six prior sampled receipts match the pre-refresh lock |
| Manifest binding | PASS | Final lock SHA-256 matches current `SOURCES.md` |
| Existing raw documents | PASS | Zero changes in the 13 immutable `raw/docs/` captures |
| Whitespace | PASS | `git diff --check` |

The provenance readback checks were performed independently of lock generation:
manifest binding, per-source SHA equality, every file hash, canonical-repository
deduplication, and previous receipts were recomputed from disk and Git.

## Coverage

- 103 repository Markdown files after completion (102 at intake), including 13 immutable raw documents and 90 maintained Markdown files. Ignored source snapshots are excluded from this count.
- Wiki: 24 concepts, 12 research articles, 12 examples, 12 queries, index, glossary.
- 147 previous source entries checked: 114 changed revision, 33 unchanged.
- 43 source files across 15 source entries sampled; the other entries received
  revision checks, not a full content review.
- 190 candidate metadata records screened; seven sources retained after artifact review.
- All newly adopted behavioral claims are labeled as source or definition
  evidence. No upstream benchmark result is presented as reproduced locally.

## Advisory documentation findings

The automated content-shape scan found 14 concept/research pages outside the
runbook's suggested word ranges. This includes existing long concept pages and
the historical landscape. The two new concepts and September research synthesis
meet their suggested ranges. These are editorial guidelines, not failed skill
validators; this refresh does not claim a complete historical prose cleanup.

The four previously missing literal Sources headings are now normalized. Historical examples, counts and profiles retain their observation boundaries; they are not re-certified by this refresh. The full [completion review](documentation-completion-2026-09-05.md) records all document dispositions and the stricter executable checks.

## Not verified

- The 16 new authoring/source-refresh cases are definitions only. No isolated
  live-host adapter ran them, so behavioral improvement is unverified.
- Upstream tests and scanners were read, not executed; no security certification
  or upstream benchmark replication is claimed.
- The existing harness uses Boolean activation. Unknown telemetry must reject
  the run as diagnostic rather than be coerced into a successful negative.
  Multi-skill shelf experiments require a separate declared harness.
- No remote push/publication occurred. The subsequent completion pass propagated knowledge into 19 Atelier skill owners; their local ledger distinguishes structural evidence from unrun behavioral trials.

## Sources

- [Refresh report](monthly-update-2026-09.md)
- [Source and artifact coverage](../../raw/datasets/source-refresh-2026-09-05.json)
- [Locked revisions](../../raw/repos/SOURCES.lock.json)
- [Regression case definitions](../../evals/authoring-refresh-cases.md)
