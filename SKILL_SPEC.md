# Skill Quality Specification

This is the opinionated quality standard for skills authored with the Skill Factory. It incorporates the official agentskills.io spec plus patterns extracted from 147 tracked repositories, 13 reference documents, and behavioral skill-evaluation research.

## Frontmatter (Required)

### `name`
- Lowercase letters, numbers, hyphens only
- Max 64 characters
- Must match parent directory name
- No consecutive hyphens, no leading/trailing hyphens
- Use gerund form (`processing-pdfs`) or domain-action (`github-pr-review`)
- Avoid: `helper`, `utils`, `misc`, `stuff`, `manager`, `handler`, `tool`, `tools`, `agent`, `ai`, `assistant`, `bot`, `skill`, `claude`, `anthropic`

### `description`
- Max 1024 characters
- Third person voice (injected into system prompt)
- Must contain an action verb (WHAT): Create, Generate, Build, Convert, Transform, Extract, Analyze, Validate, Process, Search, Find, Fetch
- Must contain a trigger clause (WHEN): "Use when...", "Triggers on...", "Activate when...", "Use for..."
- Include specific keywords users would actually type
- No vague phrases: "Helps with...", "A tool for...", "Handles..."

## Body (SKILL.md content after frontmatter)

### Size limits
- Target: under 500 lines / 5000 tokens
- Warning: over 500 lines
- Error: over 800 lines
- If content exceeds 500 lines, split into reference files using progressive disclosure

### Structure (recommended sections)
1. Title (H1)
2. Overview (2-4 sentences)
3. When to use this skill (bullet points)
4. How it works (numbered steps or workflow)
5. Examples (concrete input/output pairs)
6. References to additional files (if needed)

### Progressive disclosure
- Keep core instructions in SKILL.md
- Move detailed reference material to `references/`, `scripts/`, or `assets/`
- Tell the agent WHEN to load each file (not just "see file X")
- Max one level of file references from SKILL.md (no nesting)
- Reference files over 100 lines should have a TOC

### Content rules
- Only include what the agent doesn't already know
- Remove no-op instructions whose deletion does not change measured behavior (for example, generic requests for "high-quality" or "readable" work)
- No explaining basic concepts (what is a PDF, how HTTP works)
- Use consistent terminology throughout (pick one term, stick with it)
- No time-sensitive information (use "old patterns" sections if needed)
- Provide defaults, not menus (one recommended tool/approach, alternatives as escape hatch)
- Favor procedures over declarations (teach approach, not specific answers)
- Concrete examples over abstract descriptions
- Use directives for required behavior, not passive recommendations the agent must interpret
- No empty sections after headings
- No contradictory instructions

### Degrees of freedom
- Put fully deterministic procedures in scripts and let the skill state when and why to run them
- Use exact instructions for fragile safety or policy gates
- Use goals and constraints when multiple execution paths can produce a valid outcome
- Evaluate final outcomes rather than requiring one exact agent trajectory

### Patterns to include (when applicable)
- Gotchas section for environment-specific facts
- Output format templates
- Validation loops (do, validate, fix, repeat)
- Checklists for multi-step workflows
- Plan-validate-execute for destructive operations

### Writing style
- Direct and concrete
- No AI slop: avoid "delve", "crucial", "robust", "comprehensive", "nuanced", "furthermore", "moreover", "leverage", "facilitate"
- No hedge stacking ("potentially", "may", "might" piled up)
- No filler phrases ("It is important to note that", "In order to")
- Short paragraphs, clear sentences

## Scripts (if included)

- Self-contained or clearly document dependencies
- Handle errors explicitly (solve, don't punt to the agent)
- No magic constants (document why values were chosen)
- Include helpful error messages
- List required packages in SKILL.md
- Forward slashes only (no Windows paths)
- Verify packages are available before use

## Evaluation

Static validation and behavioral evaluation are separate gates. A skill is not behaviorally validated because this document's structural checks pass.

- Start with 10-20 cases: positive routing, adjacent negative routing, functional outcomes, and edge cases
- Use privacy-safe real tasks and production failures when available; synthetic cases may fill explicit coverage gaps
- Run every functional case with the skill and without it using the same model, harness, prompt, fixtures, tools, and limits
- Isolate every run in a clean workspace with zero or one target skill, a minimal environment, and no unrelated host shelf/plugins/tools; repeat each condition 3-6 times
- Prefer deterministic checks (tests, compilation, files, regex, domain scripts); use a structured LLM judge only when necessary
- Track trigger accuracy, skill outcome pass rate, baseline outcome pass rate, outcome delta, and cost/latency when relevant
- Test each supported model-harness pair separately
- Freeze evaluator, suite, complete skill-directory, and adapter fingerprints plus model/CLI identity; fail resume/comparison closed on mismatch
- Checkpoint normalized records after every trial and write final reports atomically
- Exclude raw output, traces, protected prompts, credentials, bearer URLs, and ambient environment values from committed evidence
- Gate changes on non-regression and add sanitized real failures as regression cases
- Keep failed, interrupted, contaminated, and superseded evidence with explicit accepted-vs-diagnostic boundaries; never tune thresholds after reading results
- Retire a capability skill when the no-skill baseline reliably reaches the accepted thresholds; keep the eval suite after retirement
- Protect preference skills against workflow or policy drift even when the base model is capable

Run the included harness through an adapter for the target host:

```bash
bun run scripts/evaluate-skill.ts evals/<suite>.json
```

## Validation Checklist

### Must pass (errors)
- [ ] `name` field present and valid format
- [ ] `description` field present and non-empty
- [ ] `name` matches parent directory name
- [ ] Body under 800 lines
- [ ] No Windows-style backslash paths
- [ ] No empty sections after headings
- [ ] No contradictory instructions

### Should pass (warnings)
- [ ] Body under 500 lines
- [ ] Description contains action verb
- [ ] Description contains trigger clause ("Use when...")
- [ ] Description in third person
- [ ] No banned vague words in name
- [ ] No banned AI slop words in body
- [ ] File references max one level deep
- [ ] Examples or code blocks included
- [ ] Gotchas/caveats section present (environment-specific facts)
- [ ] Behavioral eval suite contains positive and negative routing cases
- [ ] Skill-versus-baseline ablation ran in isolated repeated trials
- [ ] Outcome and reliability thresholds pass for supported model-harness pairs
- [ ] Eval evidence is labeled separately from static validator results
- [ ] Eval definition presence is labeled separately from an executed behavioral PASS
- [ ] Runtime metadata and all four fingerprints are retained for comparison
- [ ] Checkpoints/reports contain normalized evidence only and disposable auth/workspaces are cleaned
- [ ] Operational/production proof is not inferred from behavioral PASS

## Supplementary Quality Assessment

For skills paired with agents, the **CLASSic framework** (Cost, Latency, Accuracy, Stability, Security) can evaluate operational readiness of the skill-agent combination. A skill may pass all structural checks but pair poorly with an agent that has no cost awareness. See the [Agent Factory wiki](../agent-factory/wiki/research/classic-framework.md) for details.
