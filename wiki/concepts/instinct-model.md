# Instinct Model

## What it is

An **instinct** is a behavioral unit **smaller than a skill**: a stored YAML record with a **trigger**, an **action**, a **confidence** score (often 0.0–1.0), **evidence** (why it fires), and **scope** (project vs global). The everything-claude-code (ECC) ecosystem treats instincts as **fast, evolvable hints** that can graduate into full `SKILL.md` packages once they prove stable and reusable.

## Why it matters

Not every lesson deserves a multi-section skill. Instincts capture “when X, prefer Y” with explicit uncertainty. Confidence and scope make pruning and promotion decisions data-shaped instead of narrative. They reduce token load for hosts that can surface small units, and they give library maintainers a **staging lane** before investing in progressive disclosure, scripts, and references.

## How to do it

1. **Start minimal:** One trigger phrase or situation, one prescribed action, one evidence note.
2. **Score honestly:** Low confidence keeps the unit from overriding stronger skills or rules.
3. **Scope deliberately:** Project instincts encode repo-specific lore; global ones need broader review before promotion.
4. **Promote when stable:** Repeated successful use, clear triggers, and need for richer structure → draft a full skill with frontmatter and body.
5. **Retire or merge:** Like skills, instincts should be stocktaken—duplicate or stale instincts get merged or removed.

## Good example

ECC’s instinct layer (YAML files alongside hooks and skills) demonstrates the pattern: machine-readable units that compose with hook-driven session memory. Source: `raw/repos/everything-claude-code/` (instincts and related docs).

## Bad example

A 200-line “instinct” that duplicates a skill body—defeats the purpose. If you need sections, scripts, and examples, use **SKILL.md** instead.

## Sources

- `raw/repos/everything-claude-code/README.md`
- `wiki/concepts/token-budget.md` (right-sizing alongside micro-skills)
