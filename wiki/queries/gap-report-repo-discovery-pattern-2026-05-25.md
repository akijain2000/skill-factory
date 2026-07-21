# Gap Report - Repo Discovery Pattern - 2026-05-25

## Gap

Skill Factory had the source-update mechanism in `scripts/update-sources.md`, but the wiki did not yet teach repo discovery as a reusable **skill-authoring pattern**. The method existed operationally, but it was not fully represented as course material, a research article, or a curated example.

## Why it matters

Without a documented repo discovery pattern, authors may:

- write skills from generic LLM advice instead of repo evidence
- clone sources without distilling them into concepts/examples
- miss the difference between source collection and knowledge-base improvement
- fail to preserve skipped-candidate reasoning

## Resolution in this pass

- Added `wiki/research/repo-discovery-loop.md`.
- Added `wiki/examples/good/repo-discovery-loop.md`.
- Updated `wiki/concepts/skill-discovery.md` earlier to include authoring-time discovery.
- Updated Module 10 with a hands-on repo discovery lab.
- Added index and glossary entries.

## Remaining opportunity

The next monthly ingestion should run the full `scripts/update-sources.md` workflow against fresh rankings and produce a real `wiki/queries/monthly-update-YYYY-MM.md` entry with candidate tables, skipped candidates, and article deltas.
