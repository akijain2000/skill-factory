# Skill Quality Specification

This is the opinionated quality standard for skills authored with the Skill Factory. It incorporates the official agentskills.io spec plus best practices extracted from analyzing 7 top skill repos and Anthropic's official documentation.

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
- No explaining basic concepts (what is a PDF, how HTTP works)
- Use consistent terminology throughout (pick one term, stick with it)
- No time-sensitive information (use "old patterns" sections if needed)
- Provide defaults, not menus (one recommended tool/approach, alternatives as escape hatch)
- Favor procedures over declarations (teach approach, not specific answers)
- Concrete examples over abstract descriptions
- No empty sections after headings
- No contradictory instructions

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

- At least 3 test scenarios before shipping
- Test with real tasks, not synthetic
- Test against the agent's behavior without the skill (baseline)
- If the skill doesn't improve on the baseline, it may not be needed

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
- [ ] Examples included
- [ ] At least 3 test scenarios documented or run
