# Repo Discovery for Better Skills - 2026-05-25

## Question

How should Skill Factory capture the method of creating better skills by searching for high-signal repositories?

## Short answer

Treat repo search as an **authoring-time discovery loop**. Before writing or revising an important skill, mine relevant repositories for concrete patterns, score their relevance, clone only high-signal sources, and distill evidence-backed lessons into the wiki. The goal is not a larger corpus by itself; the goal is a better local theory of what makes skills activate, execute, validate, and stay maintainable.

## Workflow captured

1. Start from the top repositories on GitHub: overall star rankings first, then language rankings and curated awesome lists.
2. Filter candidates with skill/agent/LLM/devtool keywords.
3. Score each candidate from 1-5:
   - 5: directly about SKILL.md, agent skills, or skill authoring.
   - 4: AI coding tool, coding assistant, or agent framework.
   - 3: LLM framework, prompt engineering, or developer automation.
   - 2: general devtool, editor plugin, or template collection.
   - 1: tangential AI mention only.
4. Keep repos scoring 3+ and shallow clone them into `raw/repos/`.
5. Update `raw/repos/SOURCES.md` with the source, star count, date, and relevance.
6. Read concrete artifacts: SKILL.md files, prompt folders, validators, scripts, installers, hooks, and examples.
7. Update `wiki/research/landscape.md`, relevant concept articles, `wiki/examples/`, `wiki/INDEX.md`, and `wiki/GLOSSARY.md`.
8. Log the research run in `wiki/queries/` and run link or health checks.

## Why this improves skill quality

Repo discovery protects skill authors from writing from taste alone. A good source corpus reveals recurring solutions across independent systems: description-trigger patterns, installer ergonomics, validation loops, prompt templates, host compatibility tricks, and failure modes. When those lessons are compiled into the wiki, the next skill can be narrower, more searchable, easier to validate, and less dependent on one author's memory.

## Local source files

- `scripts/update-sources.md` -- monthly source discovery instructions and relevance scoring.
- `scripts/discovery-keywords.txt` -- candidate keyword filter.
- `raw/repos/SOURCES.md` -- source manifest and discovery log.
- `wiki/concepts/skill-discovery.md` -- updated with the authoring-time repo discovery loop.
- `wiki/research/landscape.md` -- ecosystem map where newly discovered repos should be synthesized.

## Decision

The repo-search method belongs in `wiki/concepts/skill-discovery.md` because it is the same retrieval problem at a different layer: agents discover skills at runtime, while skill authors discover evidence at authoring time.
