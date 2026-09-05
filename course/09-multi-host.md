# Module 9: Multi-Host Compatibility

The portable file format reduces packaging friction. It does not establish that
every host discovers the skill or that every model follows it correctly.

## Portable core

```yaml
---
name: my-skill
description: Review release evidence. Use when preparing a release review.
---
```

The current pinned format supports optional license, compatibility, metadata and
experimental allowed-tools fields. Vendor fields, hooks, tool permissions, plugin
state, and UI companion files need host-specific validation. See the [source
manifest](../raw/repos/SOURCES.md) and [host compatibility](../wiki/concepts/host-compatibility.md).

## Verify the target host

1. Identify the actual host/CLI version, model and available tools.
2. Read that version's official installation/discovery documentation. Prefer
   bundled official docs when present. Historical path tables in this course's
   captured sources are examples, not a guarantee about the current runtime.
3. Select the installed skill root from the host's catalog or configuration.
   Atelier's project shelf is `.agents/skills/`. Avoid installing duplicate copies
   into several global roots to work around uncertain discovery.
4. Keep operational references relative to the skill root and document required
   platform capabilities. Do not assume a host interprets another host's hooks.
5. Probe discovery and run a representative task on each supported configuration.
   Record observed differences rather than inferring parity from the shared format.

## Host companion example

The locally inspected Codex skill-creator companion uses an `interface` mapping:

```yaml
interface:
  display_name: "My Skill"
  short_description: "Review release evidence"
```

Put this in `agents/openai.yaml` only for a compatible host. Check its current
schema before adding other fields. Other hosts may ignore companion metadata;
that does not prove the operational behavior is portable.

## Provider shims

A translation shim can map messages and tool calls between provider protocols.
Reading its source does not prove tool parity or successful skill execution across
all advertised models. Test permissions, discovery, tools, and outcomes separately.

## Evaluation lab

Install the same operational package on two supported hosts and try natural
positive and adjacent negative requests. Record exact model/CLI identities and
whether the target file was actually loaded. A single run is diagnostic.

For behavioral acceptance, freeze each model/host treatment and run repeated
skill/no-skill trials with identical fixtures and limits. Use independent empty
host state as well as workspaces; disable ambient skill shelves/plugins/memory
and prove zero/one target exposure. Exclude answers and graders from runtime files.
The included harness creates workspaces; its adapter owns these host guarantees.

Reports from different models, hosts, suites or adapters are separate lineages.
A format check cannot substitute for this runtime work.

## Checkpoint

- Distinguish portable fields from host-specific behavior.
- Verify an installation path rather than guessing from an old table.
- Identify the evidence needed before claiming compatibility.
- Keep static validation, discovery telemetry, outcomes and operational proof separate.

Previous: [Module 8](08-advanced-techniques.md). Next: [Module 10](10-maintaining-library.md).
