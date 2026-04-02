# Skill Authoring Best Practices (Anthropic Official)

Source: https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/best-practices
Retrieved: 2026-04-02

## Core Principles

### Concise is key

The context window is a public good. Your Skill shares it with the system prompt, conversation history, other Skills' metadata, and the actual request.

At startup, only metadata (name and description) is pre-loaded. Claude reads SKILL.md only when relevant. But once loaded, every token competes with everything else.

Default assumption: Claude is already very smart. Only add context Claude doesn't already have. Challenge each piece:
- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

### Set appropriate degrees of freedom

Match specificity to task fragility:

- **High freedom** (text-based): Multiple approaches valid, decisions depend on context
- **Medium freedom** (pseudocode): Preferred pattern exists, some variation acceptable
- **Low freedom** (specific scripts): Operations fragile, consistency critical, specific sequence required

Analogy: Narrow bridge with cliffs = exact instructions. Open field = general direction.

### Test with all models

- Claude Haiku (fast): Does the Skill provide enough guidance?
- Claude Sonnet (balanced): Is the Skill clear and efficient?
- Claude Opus (powerful): Does the Skill avoid over-explaining?

## Skill Structure

### Naming conventions

Use gerund form (verb + -ing): `processing-pdfs`, `analyzing-spreadsheets`, `managing-databases`

Avoid: vague names (`helper`, `utils`), overly generic (`documents`, `data`), reserved words (`anthropic-helper`, `claude-tools`)

### Writing effective descriptions

- Always write in third person (injected into system prompt)
- Be specific and include key terms
- Include both WHAT it does and WHEN to use it
- Each Skill has exactly one description field — it's critical for selection from 100+ skills

### Progressive disclosure patterns

Keep SKILL.md body under 500 lines. Split content into separate files when approaching this limit.

Pattern 1: High-level guide with references
Pattern 2: Domain-specific organization (load only relevant domain)
Pattern 3: Conditional details (basic inline, advanced in separate files)

### Avoid deeply nested references

Keep references one level deep from SKILL.md. Claude may partially read nested files.

### Structure longer files with TOC

For files over 100 lines, include a table of contents at the top.

## Workflows and Feedback Loops

### Use workflows for complex tasks

Break into clear sequential steps. Provide checklists Claude can track.

### Implement feedback loops

Run validator → fix errors → repeat. Greatly improves output quality.

## Content Guidelines

### Avoid time-sensitive information

Use "old patterns" section with `<details>` for deprecated info.

### Use consistent terminology

Pick one term and stick to it throughout. No mixing "API endpoint" / "URL" / "route".

## Common Patterns

1. **Template pattern**: Provide output format templates
2. **Examples pattern**: Input/output pairs for quality-dependent skills
3. **Conditional workflow**: Guide through decision points

## Anti-patterns

- Windows-style paths (use forward slashes)
- Offering too many options (provide a default with escape hatch)
- Assuming tools are installed (be explicit about dependencies)
- Magic constants without justification
- Scripts that punt errors to Claude

## Evaluation and Iteration

### Build evaluations first

1. Identify gaps: Run without Skill, document failures
2. Create evaluations: Three scenarios testing gaps
3. Establish baseline
4. Write minimal instructions
5. Iterate

### Develop iteratively with Claude

Use "Claude A" to write/refine the Skill, "Claude B" to test it on real tasks.

## Checklist

### Core quality
- [ ] Description specific with key terms and triggers
- [ ] Body under 500 lines
- [ ] No time-sensitive info
- [ ] Consistent terminology
- [ ] Concrete examples
- [ ] One-level-deep references
- [ ] Progressive disclosure used

### Code and scripts
- [ ] Scripts solve problems, don't punt
- [ ] Error handling explicit
- [ ] No magic constants
- [ ] Dependencies listed
- [ ] No Windows paths
- [ ] Validation/verification steps
- [ ] Feedback loops included

### Testing
- [ ] At least three evaluations
- [ ] Tested with multiple models
- [ ] Tested with real scenarios
