# Repo Discovery Loop: Searching Repos to Write Better Skills

The fastest way to improve a skill library is not to ask an LLM for a generic "best practices" list. It is to start from the **top repositories on GitHub**, study the ones with real agent/skill signal, extract repeated patterns, and compile those patterns back into the local knowledge base. Skill Factory's repo discovery loop turns external repositories into evidence for better SKILL.md authoring.

## The loop

1. **Start with top GitHub repos.** Use overall GitHub star rankings first, then language rankings and curated lists to find agent, skill, prompt, LLM, and developer-automation repos. Skill Factory encodes the search surface in `scripts/update-sources.md` and keyword filters in `scripts/discovery-keywords.txt`.
2. **Score narrowly.** Keep sources that teach skill authoring. The local scoring rubric keeps repos scoring 3+ and prioritizes direct skill repos, AI coding tools, agent frameworks, prompt libraries, and developer automation.
3. **Clone shallowly.** Bring approved repos into `raw/repos/` and record why each belongs in `raw/repos/SOURCES.md`.
4. **Read artifacts, not claims.** Sample README files, actual SKILL.md files, prompt folders, validators, installers, hooks, bundled scripts, and examples.
5. **Distill into durable pages.** Update concept articles for reusable patterns, research articles for ecosystem analysis, examples for concrete good/bad cases, and queries for dated decisions.
6. **Validate the knowledge base.** Regenerate indexes, update glossary terms, run link checks, and log open gaps.

The artifact is not "we found more repos." The artifact is a better answer to: what should the next skill include, omit, split, script, validate, or cite?

## What to look for

Strong source repos usually teach through structure. `openai/skills` shows small, task-shaped skills with clear discovery descriptions. `garrytan/gstack` shows generated SKILL.md files, host transforms, and validation tiers. `obra/superpowers` shows behavioral guardrails and verification-before-completion culture. `danielmiessler/fabric` shows repeatable prompt patterns with rigid output sections. `mattpocock/skills` shows micro-skills that are short because their loops are sharp.

Weak or risky sources are still useful when they reveal anti-patterns: giant undifferentiated prompts, vague descriptions, duplicated skills, stale copied content, and repositories that collect links without executable artifacts.

## Why repo discovery beats prompt-only authoring

Prompt-only authoring tends to produce generic instruction soup: "validate inputs," "handle errors," "be concise," "follow best practices." Repo discovery grounds the author in real distribution mechanisms, real host constraints, real file layouts, and real failure modes. It also helps separate **model knowledge** from **skill-worthy deltas**: if every good repo solves the same problem with a validator, a script, or a gotcha section, that is stronger evidence than one model's suggestion.

## Decision rules

- If a repo contributes a new repeated pattern, update a concept article.
- If a repo changes the ecosystem map, update `wiki/research/landscape.md`.
- If a repo contains an unusually good or bad skill, add an annotated example.
- If a repo only confirms an existing pattern, add it as a source rather than writing a new article.
- If the corpus reveals a missing idea but no article exists yet, file a gap in `wiki/queries/`.

## Maintenance rhythm

Run the full source update monthly, but use the loop opportunistically before important skills. A small targeted pass can be enough: start from the top GitHub repos for the relevant language/domain, score 5-10 candidates, read 2-3 artifacts per keeper, and write one wiki update. That keeps the library fresh without turning every skill into a research project.

## Sources

- `scripts/update-sources.md`
- `scripts/discovery-keywords.txt`
- `raw/repos/SOURCES.md`
- `wiki/concepts/skill-discovery.md`
- `wiki/research/landscape.md`
- `raw/repos/openai-skills/README.md`
- `raw/repos/gstack/README.md`
- `raw/repos/superpowers/README.md`
- `raw/repos/fabric/README.md`
- `raw/repos/mattpocock-skills/write-a-skill/SKILL.md`
