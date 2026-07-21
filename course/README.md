# Skill Authoring: 0 to Hero

A structured course that takes you from knowing nothing about AI agent skills to authoring and evaluating production-quality SKILL.md files. Each module builds on the last, but every module is self-contained enough to use as a hands-on workshop. Estimated time: 7-8 hours total.

## Prerequisites

- Basic familiarity with Markdown
- Access to an AI coding agent (Claude Code, Cursor, Codex CLI, or similar)
- This repository cloned locally

## Course Map

```
Module 1:  What Are Skills?           (30 min)  -- Foundation + dissect 3 real skills
Module 2:  The SKILL.md Format        (30 min)  -- Spec mastery + build and validate a skeleton
Module 3:  Writing Descriptions       (40 min)  -- The #1 failure point + 5 progressive challenges
Module 4:  Progressive Disclosure     (30 min)  -- Token economics + right-sizing labs
Module 5:  Patterns That Work         (40 min)  -- 8 patterns + scenario-based matching exercise
Module 6:  Anti-Patterns              (30 min)  -- 14 mistakes + 3 broken skills to debug
Module 7:  Your First Skill           (45 min)  -- 3 guided tracks: beginner/intermediate/advanced
Module 8:  Advanced Techniques        (55 min)  -- Meta-skills, composition, skill-agent-memory-MCP layering
Module 9:  Multi-Host Compatibility   (30 min)  -- Ship everywhere + portability audit lab
Module 10: Maintaining a Skill Library (60 min) -- Shelf census, evidence states, source locks, migration
Module 11: Using the Skill Maker      (30 min)  -- Capstone: guided skill creation with the Skill Maker
Module 12: Evaluating Skills          (60 min)  -- Isolated routing, ablation, checkpoints, proof boundaries
```

## How to take this course

Each module is a standalone markdown file. Read them in order. Every module includes:

- **Concepts** with real examples from the current top-repo skill corpus
- **Try It labs** with step-by-step instructions and sample problems
- **Before/after examples** showing broken skills and their fixes
- **Checkpoints** to verify understanding before moving on
- Links to wiki articles for deeper reading

## Four ways to learn

1. **Read-only**: Read the modules, study the examples, answer the checkpoints
2. **Hands-on**: Do every Try It lab, build real skills, run the validator
3. **Guided creation**: Use the [Skill Maker](../skill-maker/SKILL.md) (Module 11) for interactive, AI-guided skill creation
4. **Prompt decomposition**: Use the [Prompt Decomposer](../prompt-decomposer/SKILL.md) to break an existing large prompt into modular skills -- great for learning by refactoring

## Beyond the course

After finishing the 12 modules, the Skill Factory offers four tools you can use anytime:

- **[Skill Maker](../skill-maker/SKILL.md)** -- Interactive 7-phase skill creation with forcing questions and wiki-backed best practices
- **[Prompt Decomposer](../prompt-decomposer/SKILL.md)** -- Paste a big system prompt or instruction set and extract reusable skills from it. Evaluates each section for skill-worthiness, suggests names, and routes approved candidates into the Skill Maker
- **[Authoring Meta-Skill](../authoring/SKILL.md)** -- Wiki-backed review, gap analysis, and rewriting for existing skills
- **[Behavioral Eval Harness](../evals/README.md)** -- Host-neutral isolated trials with skill-versus-baseline gates

To access all of these through a single entry point, tell your agent to read the root [SKILL.md](../SKILL.md) and pick from Routes A through E.

Start with [Module 1: What Are Skills?](01-what-are-skills.md)
