# Observation: Operational skill drift is a control-plane vulnerability

Date: 2026-07-23
Context: Retrospective and skill repair for a production SMS/agent harness

## Finding

An operational skill can become more dangerous than an ordinary stale document.
The application had replaced IP-based callback authority, false-success
acknowledgement, direct provider calls, blind retry assumptions, and
single-message DLR correlation with a strict, durable, multipart-aware control
plane. The corresponding skill still instructed future agents to use the old
patterns.

Static validity could not detect the defect: the frontmatter and Markdown were
well formed. The problem was semantic drift between current source/runtime
authority and a plausible old runbook.

## Recommendation

Treat operational skills as executable control-plane context:

1. Name current source/wiki/runbook owners in `Read First`.
2. State that source outranks the skill and require contradiction repair in the
   same closeout.
3. Keep active procedures in `SKILL.md` and move dated incidents/receipts into
   references.
4. Add negative behavioral cases for retired unsafe advice, not only positive
   “happy path” cases.
5. Run a source-to-skill contradiction sweep after authority, authentication,
   idempotency, acknowledgement, retry, privacy, provider, or release changes.
6. Report structural validation, behavioral evaluation, and operational proof
   as separate evidence.

High-risk examples to search for include secrets in URLs, IP-as-auth, raw
payload logging, acknowledge-before-durable-commit, provider acceptance called
delivery, blind retry after ambiguous effects, and old environment variables
described as current authority.

## Evidence status

The repaired skills passed structural validation and gained privacy-safe
behavioral case definitions. A real isolated skill-versus-baseline adapter was
not available, so behavioral validation remains blocked rather than inferred
from the static pass.
