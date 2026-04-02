# Module 6: Anti-Patterns

From validating 4000+ skills across 18 repos. Avoid these.

## 1. Missing WHEN trigger in description

The agent doesn't know when to activate your skill.

Fix: Add "Use when...", "Activate when...", or "Use for..." with specific keywords.

## 2. Missing WHAT verb in description

"Helps with PDFs" is a concept. "Extract text from PDFs" is actionable.

Fix: Start with a strong verb (Create, Generate, Extract, Analyze, Review, etc.).

## 3. Vague names

`helper`, `utils`, `stuff`, `manager` tell you nothing.

Fix: Use domain-action pattern: `github-pr-review`, `pdf-text-extract`, `deploy-to-vercel`.

## 4. Empty sections after headings

```markdown
## Overview
## Installation     <-- Overview was empty. Wasted tokens.
```

Fix: Add content or remove the heading.

## 5. Summarizing workflow in description (CSO violation)

The agent reads your summary and skips the body.

Fix: Description says WHEN only. Never summarize the procedure.

## 6. Explaining what the agent already knows

Don't explain what HTTP is, how databases work, or what a PDF is. Only add what the agent doesn't already know.

Test: "Would the agent get this wrong without this instruction?" If no, cut it.

## 7. Contradictory instructions

"Be concise" + "Include comprehensive details" = unpredictable behavior.

Fix: Read your skill end-to-end. Be explicit about conditions. "For simple queries, return one paragraph. For complex analyses, use full sections."

## 8. No output format specified

Without format examples, output is inconsistent every time.

Fix: Include a concrete output template with code blocks.

## 9. AI slop in the body

Words that signal AI-generated filler: "delve", "crucial", "robust", "comprehensive", "nuanced", "furthermore", "moreover", "leverage", "facilitate"

Fix: Use direct, concrete language. "Check the file" not "Leverage the file system to facilitate access."

## 10. Too many options without a default

"You can use npm, yarn, pnpm, or bun..." -- the agent has to choose and might choose wrong.

Fix: Pick a default. "Use pnpm. Fall back to yarn if yarn.lock exists."

## 11. Deeply nested file references

```
See references/advanced/api/v2/edge-cases/timeout-handling.md
```

The agent may not follow chains. Keep references one level deep.

## 12. Scripts that punt errors to the agent

```bash
# Bad: agent has to figure out why it failed
npm run build || echo "Build failed"

# Good: script handles the error with useful output
npm run build || { echo "Build failed. Common causes:"; echo "1. Missing dependencies: run npm install"; echo "2. TypeScript errors: run npx tsc --noEmit"; exit 1; }
```

## 13. Over-long skills without progressive disclosure

800+ lines with everything inline. The agent drowns in context.

Fix: Keep SKILL.md under 500 lines. Move reference material to separate files with conditional load triggers.

## 14. Windows-style backslash paths

`C:\Users\me\project\src` breaks on Mac/Linux.

Fix: Always use forward slashes.

## Exercise

1. Run the validator against 3 of your skills: `bun run scripts/validate-skill.ts <path>`
2. Read wiki/research/anti-patterns.md for the full list with real examples
3. Fix every issue the validator flags

## Further reading

- [wiki/research/anti-patterns.md](../wiki/research/anti-patterns.md)
- [wiki/examples/bad/](../wiki/examples/bad/) -- real anti-pattern examples with analysis

Next: [Module 7: Your First Skill](07-your-first-skill.md)
