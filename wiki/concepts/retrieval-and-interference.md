# Skill Retrieval and Interference

## What it is

Skill retrieval selects relevant procedural material from a larger catalog.
Interference occurs when extra, overlapping, or misleading skills change the
agent's behavior. Retrieval relevance and task success are different metrics.

## Why it matters

A skill that helps in isolation may lose its benefit in a crowded shelf. A
retriever can rank the right file first without the agent reading it or completing
the task. Installing an entire catalog is therefore not an evaluation strategy.

## How to do it

1. Keep candidate search metadata small. Read the selected body and required
   assets after checking source identity, license, and applicability.
2. Deduplicate canonical repositories and skill content. Two historical IDs
   redirected to the same repository are not independent supporting sources.
3. Bound the final selection to the task. Allow selecting no skill; do not force
   a weak match just because a search returned results.
4. Measure ranking with appropriate relevance labels, such as Recall@k or MRR.
   Measure actual activation from trusted host telemetry. Measure outcomes with
   independent task checks. Do not substitute one metric for another.
5. First run the existing isolated zero/one-skill ablation. Then, where the real
   host exposes multiple skills, define a separate fixed-shelf experiment with
   distractors and sibling skills held constant across arms.
6. Label multi-skill treatment effects as package or shelf effects. A whole
   library versus no skills cannot identify one individual skill's contribution.

## Good example

SkillCorpus separates retrieval metrics in `match/metrics.py` from agent
evaluation. LangChain's benchmark defines an empty `CONTROL` treatment and a
13-skill `ALL_MAIN_SKILLS` treatment. Their difference can test the package;
additional ablations are needed to credit a particular skill.

## Bad example

Report high search recall as proof the agent completed its task, or compare one
isolated skill against a baseline that silently loads a global skill shelf.

## Sources

- [SkillCorpus ranking metrics](https://github.com/EverMind-AI/SkillCorpus/blob/2e8b8e5bca969a953f66ab14d2e91d8ad3d5a63b/skillcorpus/match/metrics.py)
- [Multi-source retrieval design](https://github.com/EverMind-AI/SkillCorpus/blob/2e8b8e5bca969a953f66ab14d2e91d8ad3d5a63b/docs/plugin-multi-source-retrieval-design.md)
- [Empty control](https://github.com/langchain-ai/skills-benchmarks/blob/9195f8c296f7076152cf5c698d6abd4f84853eb9/treatments/common/control.yaml)
- [Multi-skill treatment](https://github.com/langchain-ai/skills-benchmarks/blob/9195f8c296f7076152cf5c698d6abd4f84853eb9/treatments/common/main_skills.yaml)
- [Benchmark layout and noise skills](https://github.com/langchain-ai/skills-benchmarks/blob/9195f8c296f7076152cf5c698d6abd4f84853eb9/README.md)
- [Skill evaluations](skill-evaluations.md)
