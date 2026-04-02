# Module 7: Your First Skill (Hands-on Lab)

Three guided walkthroughs at different difficulty levels. Pick one or do all three.

---

## Track A: Beginner -- Commit Message Writer (micro-skill)

**Goal**: A 20-line skill that writes conventional commit messages from diffs.

**Time**: 15 minutes

### Step 1: Create the folder

```bash
mkdir -p commit-message-writer
```

### Step 2: Write the SKILL.md

```markdown
---
name: commit-message-writer
description: Generate conventional commit messages from staged git diffs.
  Use when asked to write a commit message, describe changes, or commit
  with a good message.
---

# Commit Message Writer

Generate a conventional commit message from the current staged diff.

## Workflow
1. Run `git diff --cached` to read staged changes
2. Analyze the nature of the changes (feature, fix, refactor, docs, test)
3. Write a commit message following conventional commits format:
   `type(scope): description`
4. Present the message to the user for approval

## Format

```
feat(auth): add OAuth2 login with Google provider
fix(api): handle null response from payment gateway
refactor(db): extract connection pooling into shared module
```

## Gotchas
- If nothing is staged, tell the user to `git add` first
- Scope is optional -- omit it if the change spans multiple areas
- Keep the first line under 72 characters
```

### Step 3: Validate

```bash
bun run scripts/validate-skill.ts commit-message-writer/
```

Expected: 0 errors. Fix anything flagged.

### Step 4: Test it

Copy the folder to your agent's skill directory:

```bash
# For Claude Code
cp -r commit-message-writer ~/.claude/skills/

# For Cursor
cp -r commit-message-writer .cursor/skills/

# For Codex
cp -r commit-message-writer .agents/skills/
```

Stage some changes, then tell your agent: "Write me a commit message for these changes."

Does it activate? Does it use the conventional format? Does it check for staged changes first?

### What you learned

- Micro-skills can be powerful with minimal body
- The agent knows how to write commit messages -- you just standardized the format
- Testing against a real task reveals whether the description triggers correctly

---

## Track B: Intermediate -- Test Fix Loop (standard skill with validation loop)

**Goal**: A 50-line skill that runs tests, fixes failures, and loops until green.

**Time**: 25 minutes

### Step 1: Create the folder

```bash
mkdir -p test-fix-loop
```

### Step 2: Write the SKILL.md

Start with frontmatter:

```markdown
---
name: test-fix-loop
description: Run the test suite, fix failing tests, and re-run until all
  tests pass. Use when asked to fix tests, make tests green, or debug test
  failures.
---
```

Now write the body. Apply these patterns from Module 5:
- **Validation loop** (the core pattern)
- **Default over menu** (pick one test runner)
- **Output format template** (what the final report looks like)
- **Gotchas** (environment-specific facts)

```markdown
# Test Fix Loop

Run the test suite, analyze failures, fix them, and re-run until green.

## Workflow
1. Detect the test runner:
   - If `vitest.config` exists: use `npx vitest run`
   - If `jest.config` exists: use `npx jest`
   - Otherwise: use `npm test`
2. Run the test suite, capture output
3. If all tests pass, report success and stop
4. If tests fail:
   a. Read each failure message
   b. Open the failing test file
   c. Identify the root cause (test bug vs source bug)
   d. Fix the issue in the source code (prefer fixing source over changing tests)
   e. Re-run the test suite
5. Repeat step 4 until all tests pass or **3 iterations** reached
6. If still failing after 3 iterations, report remaining failures to the user

## Output format

```
Test Fix Loop: [PASS/FAIL]
Iterations: 2/3
Fixed: 4 tests across 2 files
Remaining failures: 0

Changes made:
- src/auth.ts:42 -- fixed null check on user.email
- src/api.ts:118 -- added missing await on async call
```

## Gotchas
- Some test suites require a running database; check for `docker-compose.yml` first
- Jest with `--forceExit` can mask async cleanup issues
- If a test fails with "timeout", the issue is often an unresolved promise, not a slow test
- Watch for snapshot tests: `npx jest -u` updates snapshots but may hide real regressions
```

### Step 3: Validate

```bash
bun run scripts/validate-skill.ts test-fix-loop/
```

### Step 4: Test it

Install the skill, then break a test intentionally:

```bash
# Add a typo to a source file that a test covers
# Then tell your agent: "The tests are failing, fix them"
```

Watch the agent's behavior:
- Does it run the correct test runner?
- Does it loop when the first fix doesn't work?
- Does it stop after 3 iterations?
- Does it produce the output format you specified?

### What you learned

- Validation loops need explicit stop conditions (3 iterations)
- Detecting the test runner (defaults over menus) prevents wrong tool usage
- Output format templates make the result parseable and consistent

---

## Track C: Advanced -- Security Audit (reference-heavy, multi-phase)

**Goal**: A skill with SKILL.md + references/ folder, using plan-validate-execute.

**Time**: 35 minutes

### Step 1: Create the structure

```bash
mkdir -p security-audit/references
```

### Step 2: Write the reference file first

Create `security-audit/references/owasp-checks.md`:

```markdown
# OWASP Top 10 Checks

| Category | What to look for | Severity |
|----------|-----------------|----------|
| Injection | SQL string concatenation, unsanitized user input in queries | Critical |
| Broken Auth | Hardcoded secrets, weak password validation, missing rate limiting | Critical |
| Sensitive Data | API keys in source, unencrypted PII, verbose error messages | High |
| XXE | XML parsing without disabling external entities | High |
| Broken Access | Missing authorization checks, IDOR patterns | Critical |
| Misconfig | Debug mode in production, default credentials, open CORS | Medium |
| XSS | innerHTML without sanitization, dangerouslySetInnerHTML | High |
| Insecure Deserialization | JSON.parse on untrusted input without validation | Medium |
| Known Vulnerabilities | Outdated dependencies with known CVEs | High |
| Logging | Sensitive data in logs, missing audit trail | Medium |
```

### Step 3: Write the SKILL.md

```markdown
---
name: security-audit
description: Audit source code for security vulnerabilities against OWASP
  Top 10 categories. Use when asked to audit security, check for
  vulnerabilities, review security, or run a security scan.
---

# Security Audit

Systematic security review of the codebase against OWASP Top 10.

## Workflow

### Phase 1: Scope
1. Identify the language/framework (Node, Python, Go, etc.)
2. List entry points: API routes, form handlers, CLI commands
3. List data flows: where user input enters and where it's used

### Phase 2: Audit
4. For each entry point, check against OWASP categories
   (load [references/owasp-checks.md](references/owasp-checks.md))
5. For each finding, record: file, line, category, severity, evidence

### Phase 3: Report
6. Present findings grouped by severity (Critical > High > Medium)
7. For each finding, include a suggested fix with a code snippet
8. Ask user which findings to fix now

### Phase 4: Fix (if requested)
9. Apply fixes one at a time
10. After each fix, re-check that the fix doesn't introduce new issues
11. Run the test suite to verify nothing broke

## Output format

```
Security Audit Report
=====================
Project: [name]
Files scanned: [count]
Date: [date]

CRITICAL (fix immediately):
- [SEC-001] SQL Injection in src/api/users.ts:42
  Evidence: `db.query("SELECT * FROM users WHERE id = " + req.params.id)`
  Fix: Use parameterized query: `db.query("SELECT * FROM users WHERE id = $1", [req.params.id])`

HIGH (fix before next release):
- [SEC-002] ...

Summary: 2 critical, 3 high, 1 medium across 15 files
```

## Gotchas
- ORMs can still have injection if using raw query methods (e.g., `sequelize.query()`)
- Environment variables in `.env.example` sometimes contain real secrets accidentally
- Check GitHub Actions workflows for secrets exposure via `echo` or artifact uploads
```

### Step 4: Validate and test

```bash
bun run scripts/validate-skill.ts security-audit/
```

Test by telling your agent: "Run a security audit on this project."

Watch for:
- Does it load the reference file during Phase 2?
- Does it produce the structured report format?
- Does it ask before fixing (Phase 4)?

### What you learned

- Reference files keep SKILL.md lean while providing detailed lookup data
- Multi-phase workflows (scope, audit, report, fix) give the agent clear stages
- Plan-validate-execute protects against applying fixes the user doesn't want

---

## Shipping checklist (all tracks)

Before considering your skill done:

- [ ] Name matches directory name
- [ ] Description has WHAT verb + WHEN trigger
- [ ] Description in third person
- [ ] Description doesn't summarize the workflow (no CSO violation)
- [ ] Body under 500 lines
- [ ] No empty sections
- [ ] No contradictory instructions
- [ ] Output format specified
- [ ] At least one gotcha documented
- [ ] Validator passes with 0 errors
- [ ] Tested against a real task without mentioning the skill by name

## Further reading

- [wiki/research/anatomy-of-a-good-skill.md](../wiki/research/anatomy-of-a-good-skill.md)
- [wiki/examples/good/](../wiki/examples/good/) -- exemplary skills to study

Next: [Module 8: Advanced Techniques](08-advanced-techniques.md)
