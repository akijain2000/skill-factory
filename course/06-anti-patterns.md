# Module 6: Anti-Patterns

From validating 4000+ skills across 19 repos. Avoid these.

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

---

## Try It: Bug Hunt

Three intentionally broken skills. Find and fix every issue in each one.

### Broken Skill 1: "deploy helper"

```markdown
---
name: Deploy Helper
description: A comprehensive tool that assists developers with the deployment
  process by leveraging cloud infrastructure to facilitate seamless production
  releases.
---

## What is Deployment?

Deployment is the process of making your application available to users.
It involves building the code, running tests, and pushing to a server.

## Overview

## Steps

1. You can use Vercel, AWS, GCP, Heroku, Fly.io, Railway, or Render
2. Build the project
3. Deploy it
4. Check if it works
```

Issues to find (at least 8):

1. **Name has uppercase and space** -- should be `deploy-helper`
2. **Name uses "helper"** -- banned vague word. Use `deploy-to-vercel` or `deploying-apps`
3. **No WHAT verb** in description -- "assists" is weak. Use "Deploy"
4. **No WHEN trigger** -- missing "Use when..."
5. **AI slop words** -- "comprehensive", "leveraging", "facilitate", "seamless"
6. **Explains what the agent knows** -- "What is Deployment?" section is unnecessary
7. **Empty "Overview" section** -- heading with no content
8. **Too many options without default** -- step 1 lists 7 platforms with no recommendation
9. **No output format** -- what does a successful deploy look like?
10. **No gotchas** -- every deploy target has quirks

Fixed version:

```markdown
---
name: deploy-to-vercel
description: Deploy applications to Vercel with build verification and smoke
  tests. Use when asked to deploy, ship to production, or push to Vercel.
---

# Deploy to Vercel

Deploy the current project to Vercel, verify the build, and run smoke tests.

## Workflow
1. Run `vercel --prod` to deploy
2. Capture the deployment URL from output
3. Run smoke tests against the URL: `curl -f <url>/api/health`
4. If smoke test fails, run `vercel rollback` and report the error
5. If smoke test passes, report the deployment URL

## Gotchas
- Vercel CLI needs `VERCEL_TOKEN` in environment; check `.env` first
- Monorepos need `--cwd <path>` to target the right package
- First deploy requires `vercel link` to connect the project
```

### Broken Skill 2: "code review"

```markdown
---
name: code-review
description: Review code by first reading all changed files, then categorizing
  issues into security, performance, and style buckets, then scoring each
  file 1-10, then generating a summary report with actionable recommendations
  and a final pass/fail verdict based on weighted scores.
---

# Code Review

Be concise in your review. Provide comprehensive details for every issue found.

## Workflow
1. Read the diff
2. Review for issues
3. Report findings

## References
See references/security/owasp/top10/2024/injection/sql/prevention.md
```

Issues to find (at least 5):

1. **CSO violation** -- description summarizes the entire workflow (read, categorize, score, summarize, verdict). The agent will follow this summary and skip the body.
2. **Contradictory instructions** -- "Be concise" + "comprehensive details" in the same sentence.
3. **Deeply nested reference** -- 7 levels deep. Should be `references/owasp-top10.md`.
4. **Workflow too vague** -- "Review for issues" doesn't specify what to look for.
5. **No output format** -- what does the review report look like?

### Broken Skill 3: "test automation"

```markdown
---
name: test-automation
description: I help you write and run tests for your application.
---

# Test Automation Skill

This skill is designed to help developers write better tests. Testing is
an important part of software development because it helps catch bugs
early and ensures code quality. There are many types of tests including
unit tests, integration tests, end-to-end tests, performance tests,
and smoke tests.

## Unit Testing

Unit tests test individual functions or components in isolation. They
are fast and reliable. Common frameworks include Jest, Vitest, pytest,
and JUnit.

## Integration Testing

Integration tests verify that different parts of the system work
together correctly.

## End-to-End Testing

E2E tests simulate real user interactions with the application.
Popular tools include Playwright, Cypress, and Selenium.

## Running Tests

You can use any of the following:
- `npm test`
- `yarn test`
- `pnpm test`
- `bun test`
- `pytest`
- `cargo test`
- `go test ./...`
```

Issues to find (at least 7):

1. **First person description** -- "I help you" should be third person
2. **No WHAT verb** -- "help" is not actionable
3. **No WHEN trigger** -- missing "Use when..."
4. **Explains what agent knows** -- entire "what is unit/integration/e2e testing" is unnecessary
5. **Too many options without default** -- lists 7 test runners with no recommendation
6. **No workflow** -- lists concepts but never says what to DO
7. **No output format** -- what does the result look like?
8. **No gotchas** -- every test framework has quirks
9. **AI slop language** -- "designed to help developers write better tests"
10. **Over-broad scope** -- this is really 3 skills (unit, integration, e2e)

---

## Checkpoint

Before moving on, you should be able to:
- Spot 5+ issues in any skill within 2 minutes
- Distinguish between errors (must fix) and warnings (should fix)
- Fix a broken description in under 60 seconds
- Explain why CSO violations are the most dangerous anti-pattern

## Further reading

- [wiki/research/anti-patterns.md](../wiki/research/anti-patterns.md)
- [wiki/examples/bad/](../wiki/examples/bad/) -- real anti-pattern examples with analysis

Next: [Module 7: Your First Skill](07-your-first-skill.md)
