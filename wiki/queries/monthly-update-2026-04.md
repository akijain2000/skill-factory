# Monthly wiki update — April 2026

## What was added

- **Landscape:** Ten new repository profiles appended to [research/landscape.md](../research/landscape.md) (superpowers, everything-claude-code, mcp-servers, mattpocock-skills, system-prompts, fabric, goose, A2A, awesome-claude-skills, openai-codex), plus a second comparison table and an expanded analytical takeaway. The article now covers **seventeen** corpus repos (seven original + ten new).
- **Host compatibility:** New subsection **MCP and A2A (adjacent to SKILL hosts)** in [concepts/host-compatibility.md](../concepts/host-compatibility.md) with pointers to reference servers, registry, A2A’s role vs MCP, and Codex/goose as agent products.
- **Template patterns:** One paragraph and source tying **Fabric** `system.md` pattern folders to the same “fixed output shape” idea as SKILL templates in [concepts/template-patterns.md](../concepts/template-patterns.md).
- **Skill discovery:** Note on **bootstrap meta-skills** (e.g. superpowers `using-superpowers`) in [concepts/skill-discovery.md](../concepts/skill-discovery.md).
- **Index:** [INDEX.md](../INDEX.md) updated for the new query entry and landscape summary.

## What we learned

- **Layers:** Skills (SKILL.md) sit alongside **MCP** (tool servers), **A2A** (agent-to-agent RPC), **CLI prompt libraries** (Fabric patterns), **system prompt archives** (research-only), and **full harness packs** (everything-claude-code) that combine plugins, hooks, rules, and hundreds of skills.
- **Distribution:** Beyond marketplaces, **`npx skills@latest add org/repo/skill`** (mattpocock) and **raw INSTALL.md fetch** (superpowers for Codex/OpenCode) are recurring install patterns.
- **Governance:** Superpowers’ **instruction priority** (user `CLAUDE.md` / `AGENTS.md` over skills over default prompt) is a clear template for conflict resolution in multi-pack setups.
- **Scale:** awesome-claude-skills’ clone carries a **large** bundled `SKILL.md` tree (800+ files)—useful locally but noisy for naive counting; treat README curation vs vendored skills separately.

## Suggested new articles (backlog)

- **Short research note:** “MCP vs skills vs subagents” — one page diagramming where behavior should live (reference `mcp-servers` + landscape).
- **Short research note:** “A2A and skills” — when to expose capability via Agent Card / remote agent vs local SKILL.md (reference `A2A` roadmap `QuerySkill()`).
- **Concept stub:** “Bootstrap and meta-skills” — expanding the skill-discovery bullet into a full pattern (gates, costs, subagent guards like `SUBAGENT-STOP`).
- **Example curation:** Optional excerpts in `wiki/examples/good/` from **mattpocock** `write-a-skill` or **superpowers** `using-superpowers` (redacted to fair-use size) if we want side-by-side with OpenAI skill-creator.

## Stats (approximate)

| Metric | Value |
|--------|------:|
| Top-level repos under `skill-factory/raw/repos/` | 19 |
| Repos profiled in `landscape.md` | 17 |
| Concept articles (`wiki/concepts/*.md`) | 14 |
| Research articles (`wiki/research/*.md`) | 8 |
| Total `*.md` files under `skill-factory/wiki/` | 33 |
| New repos in this batch | 10 |

*Star counts in landscape entries use approximate 2026-04 snapshots from the ingestion brief; re-query GitHub for exact `stargazers_count` when publishing.*

## Sources for this log

- READMEs and samples listed in `landscape.md` **Sources** section (2026-04-02 refresh).
- Local `find … -name SKILL.md | wc -l` per repo during update.
