# The 7 Most Common SKILL.md Mistakes

Source: https://olgasafonova.substack.com/p/i-validated-100-claude-code-skills
Author: Olga Safonova (SkillCheck creator)
Retrieved: 2026-04-02

Validated 100+ real-world Claude Code skills against the agentskills.io specification.

## Mistake 1: Missing the WHEN trigger in descriptions

Skills describe what they do but not WHEN Claude should activate them. Without trigger phrases, Claude doesn't know when the skill is relevant.

Trigger phrases that work: "Use when...", "Triggers on...", "Activate when...", "Use for...", "Applies to..."

## Mistake 2: Missing the WHAT verb

Descriptions explain the domain but don't state the action. "Generation" is a concept; "Generate" is actionable.

Strong verbs: Create, Generate, Build, Convert, Transform, Extract, Analyze, Validate, Process, Search, Find, Fetch

Weak alternatives: "A tool for...", "Handles...", "Helps with..."

## Mistake 3: Vague or generic names

Single-word or overly generic names that don't convey purpose.

Reserved words to avoid: skill, skills, claude, anthropic, mcp, tool, tools, agent, ai, assistant, bot

Vague terms to avoid: helper, utils, misc, stuff, manager, handler

Good pattern: [domain]-[action] or [action]-[object]
Examples: github-pr-reviewer, weekly-report-generator, code-quality-checker

## Mistake 4: Empty sections after headings

Creating structure without content. Wastes tokens and suggests incomplete documentation.

Fix: Add content, remove heading, or merge with next section.

## Mistake 5: Wordy trigger phrases

Unnecessarily verbose descriptions waste tokens across thousands of activations.

Common bloat: "This skill should be used when" -> "Use when". "The purpose of this skill is to" -> just state what it does.

## Mistake 6: No output format specification

Skills that produce output but don't define the format. Without examples, output is inconsistent.

Fix: Include concrete examples with code blocks showing expected output format.

## Mistake 7: Contradictory instructions

Instructions that simultaneously require and forbid the same thing. Claude follows one and violates the other.

Common patterns: "Be concise" + "Include comprehensive details". "Always use JSON" + "Return plain text for simple queries".

Fix: Be explicit about conditions. Read end-to-end looking for conflicts.

## What Well-Crafted Skills Have

1. Clear activation triggers (3 specific trigger phrases)
2. Structured workflows (numbered steps, clear sequence)
3. Concrete examples (real input/output pairs)
4. Troubleshooting sections
5. Anti-slop writing style (no hedge stacking, no filler, just facts)
