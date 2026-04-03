# Anti-Pattern Example: task-intelligence

Source: raw/repos/antigravity-awesome-skills/skills/task-intelligence/SKILL.md  
Rating: Bad
Issues:
- **When to Use** lists only obscure phrase matches ("briefing tarefa", "consultar agente paralelo")—easy to miss real tasks; no principled trigger.
- Core promise ("ativa TODOS os agentes relevantes") is not implementable in a generic agent session; it assumes a fictional `agent-orchestrator` layout and Python scripts that are not part of the skill snippet.
- References `references/problem-catalog.md`, `references/time-patterns.md`, `scripts/pre_task_check.py` without bundling them in the excerpted skill—brittle if missing from install.
- Mixes good ideas (task classification, time estimate template) with ecosystem-specific names (007, matematico-tao) that will not exist for most users.
- Generic **Best Practices** / **Common Pitfalls** / **Related Skills** filler dilutes signal.

How to fix:
- Describe a **single** pre-flight checklist the model can run with normal tools (read repo, grep, tests)—no fake orchestrator.
- Ship scripts and references or remove those paths; replace named agents with role prompts the main agent can simulate in one pass.
- One clear YAML trigger: "Use when the user asks for a time estimate and risk brief before a multi-step implementation."

---

**Note**: This skill was originally written in Portuguese. English translations are provided in parentheses after non-English text so all readers can follow the analysis.

---
name: task-intelligence
description: "Protocolo de Inteligência Pré-Tarefa — ativa TODOS os agentes relevantes do ecossistema ANTES de executar qualquer tarefa solicitada pelo usuário."
# (Translation: "Pre-Task Intelligence Protocol -- activates ALL relevant agents in the ecosystem BEFORE executing any task requested by the user.")
risk: none
source: community
date_added: '2026-03-06'
author: renat
tags:
- planning
- pre-task
- risk-analysis
- orchestration
tools:
- claude-code
- antigravity
- cursor
- gemini-cli
- codex-cli
---

# Task Intelligence — Protocolo de Amplificação Pré-Tarefa (Pre-Task Amplification Protocol)

## Overview

Protocolo de Inteligência Pré-Tarefa — ativa TODOS os agentes relevantes do ecossistema ANTES de executar qualquer tarefa solicitada pelo usuário. Enriquece o contexto com análise paralela multi-agente, produz estimativa real de tempo (início→fim), mapeia problemas prováveis e improvável, e formula um plano de execução antecipado com estratégias de contingência. *(English: Pre-Task Intelligence Protocol — activates all relevant ecosystem agents before any user-requested task; enriches context with parallel multi-agent analysis, yields a realistic end-to-end time estimate, maps probable and unlikely issues, and drafts an anticipatory execution plan with contingencies.)*

## When to Use This Skill

- When the user mentions "pre-task briefing" or related topics
- When the user mentions "briefing tarefa" *(task briefing)* or related topics
- When the user mentions "plano execucao tarefa" *(task execution plan)* or related topics
- When the user mentions "antes de executar analise" *(analyze before executing)* or related topics
- When the user mentions "task intelligence" or related topics
- When the user mentions "consultar agentes paralelo" *(consult parallel agents)* or related topics

## Do Not Use This Skill When

- The task is unrelated to task intelligence
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Antes de qualquer execução, este agente realiza um **briefing inteligente completo**: *(Before any execution, this agent runs a complete intelligent briefing:)*

1. **Ativa todos os agentes relevantes em paralelo** — cada um analisa a tarefa pela sua ótica *(Activates all relevant agents in parallel — each analyzes the task from its lens)*
2. **Sintetiza o conhecimento coletivo** em um plano unificado *(Synthesizes collective knowledge into a unified plan)*
3. **Estima tempo real** do início ao fim (com breakdown por etapa) *(Estimates real time from start to finish, with per-step breakdown)*
4. **Mapeia problemas prováveis** e os resolve antecipadamente *(Maps likely problems and resolves them preemptively)*
5. **Define pontos de verificação** para detectar desvios antes que virem bloqueadores *(Defines checkpoints to catch drift before it becomes blocking)*

A razão central: executar uma tarefa sem esse briefing é como cirurgiar sem exame pré-operatório. *(Core rationale: executing a task without this briefing is like operating without a pre-op exam.)*
O custo de 30-60 segundos de análise paralela elimina horas de retrabalho. *(The cost of 30–60 seconds of parallel analysis saves hours of rework.)*

---

## Fase 1 — Classificação Da Tarefa (5-10 Segundos) *(Phase 1 — Task Classification (5–10 seconds))*

Antes de qualquer coisa, classifique a tarefa em uma das categorias: *(First, classify the task into one of the categories:)*

| Categoria *(Category)* | Exemplos *(Examples)* | Nível de Briefing *(Briefing level)* |
|-----------|---------|-------------------|
| **Simples** *(Simple)* | responder pergunta, explicar conceito, pequena edição *(answer a question, explain a concept, small edit)* | Mínimo (só scan) *(Minimal — scan only)* |
| **Moderada** *(Moderate)* | criar arquivo, modificar skill, instalar dependência *(create file, modify skill, install dependency)* | Normal (scan + match + estimativa) *(Normal — scan + match + estimate)* |
| **Complexa** *(Complex)* | criar skill nova, integração API, arquitetura, refatoração *(new skill, API integration, architecture, refactor)* | Completo (todos os passos abaixo) *(Full — all steps below)* |
| **Crítica** *(Critical)* | ações irreversíveis, deploys, delete, reset, modificar infra *(irreversible actions, deploys, delete, reset, infra changes)* | Máximo + confirmação explícita *(Maximum + explicit confirmation)* |

Para tarefas **Simples**, execute normalmente sem briefing completo. *(For Simple tasks, run normally without full briefing.)*
Para **Moderada**, **Complexa** e **Crítica**, execute o protocolo completo abaixo. *(For Moderate, Complex, and Critical, run the full protocol below.)*

---

## Fase 2 — Scan E Match Paralelo *(Phase 2 — Parallel Scan and Match)*

Execute simultaneamente: *(Run simultaneously:)*

```bash

## Terminal 1 — Atualizar Registry *(Update Registry)*

python agent-orchestrator/scripts/scan_registry.py

## Terminal 2 — Identificar Agentes Relevantes *(Identify Relevant Agents)*

python agent-orchestrator/scripts/match_skills.py "<tarefa do usuário>"  # *(user task)*
```

Se `matched >= 2`, execute orquestração: *(If matched >= 2, run orchestration:)*
```bash
python agent-orchestrator/scripts/orchestrate.py --skills <skill1,skill2,...> --query "<tarefa>"  # *(task)*
```

---

## Fase 3 — Briefing Dos Agentes Especializados *(Phase 3 — Specialized-Agent Briefing)*

Para cada agente relevante identificado no match, faça uma pergunta direcionada: *(For each relevant agent from the match, ask a targeted question:)*

**Padrão de consulta por tipo de agente:** *(Query pattern by agent type:)*

- **007 (Segurança)** *(Security)*: "Esta tarefa tem vetores de ataque, dados expostos, ou ações irreversíveis?" *(Does this task have attack vectors, exposed data, or irreversible actions?)*
- **skill-sentinel (Qualidade)** *(Quality)*: "Existe skill redundante? A skill que será criada/modificada segue os padrões?" *(Is there a redundant skill? Will the skill to create/modify follow standards?)*
- **agent-orchestrator (Orquestração)** *(Orchestration)*: "Quais skills já existem que resolvem parte desta tarefa?" *(Which existing skills already cover part of this task?)*
- **matematico-tao (Complexidade)** *(Complexity)*: "Qual a complexidade computacional? Há otimizações não-óbvias?" *(What is the computational complexity? Any non-obvious optimizations?)*
- **context-guardian (Continuidade)** *(Continuity)*: "Existe contexto de sessões anteriores relevante para esta tarefa?" *(Is there relevant context from prior sessions for this task?)*
- **advogado-especialista/criminal (Legal)**: "Há implicações legais, LGPD, ou riscos regulatórios?" *(Any legal implications, LGPD, or regulatory risks?)*
- **leiloeiro-ia (Leilões)** *(Auctions)*: "Esta tarefa envolve dados ou lógica do domínio de leilões?" *(Does this task involve auction-domain data or logic?)*

Não consulte todos os agentes cegamente — escolha os **3-5 mais relevantes** para a tarefa. *(Do not blindly consult every agent — pick the 3–5 most relevant to the task.)*

---

## Fase 4 — Estimativa De Tempo Real *(Phase 4 — Realistic Time Estimate)*

Construa um breakdown de tempo honesto com base na complexidade real: *(Build an honest time breakdown from real complexity:)*

```
ESTIMATIVA DE TEMPO — [Nome da Tarefa] *(TIME ESTIMATE — [Task name])*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Etapa 1: [nome]          ~X min   [motivo do tempo] *(Step 1: [name] ~X min [time rationale])*
Etapa 2: [nome]          ~X min   [motivo do tempo] *(Step 2: [name] ~X min [time rationale])*
Etapa 3: [nome]          ~X min   [motivo do tempo] *(Step 3: [name] ~X min [time rationale])*
Contingência (problemas) +X min   [buffer para imprevistos típicos] *(Contingency (issues) +X min [buffer for typical surprises])*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL ESTIMADO:          ~X min *(TOTAL ESTIMATE)*
Confiança: Alta/Média/Baixa — [justificativa] *(Confidence: High/Medium/Low — [rationale])*
```

**Regras de estimativa honesta:** *(Rules for honest estimation:)*
- Nunca subestime para agradar — o usuário precisa saber o tempo real *(Never underestimate to please — the user needs the real duration)*
- Adicione sempre 20-30% de buffer para problemas típicos *(Always add 20–30% buffer for typical issues)*
- Se a confiança for Baixa, explique por quê e o que aumentaria ela *(If confidence is Low, explain why and what would raise it)*
- Diferencie "tempo de execução do agente" vs "tempo de espera do usuário" *(Distinguish agent execution time vs user wait time)*

---

## Fase 5 — Mapa De Problemas (Antecipação Proativa) *(Phase 5 — Problem Map (Proactive Anticipation))*

Pense em TRÊS camadas de problemas: *(Think in THREE layers of problems:)*

#### Problemas Prováveis (80%+ de chance de acontecer) *(Likely problems — 80%+ chance)*
São os problemas que SEMPRE acontecem. Resolva-os ANTES de começar. *(These are problems that ALWAYS happen. Resolve them BEFORE you start.)*

Exemplos por categoria: *(Examples by category:)*
- **Skills novas** *(New skills)*: YAML inválido → valide com `python -c "import yaml; yaml.safe_load(open('SKILL.md').read())"` antes de instalar *(invalid YAML → validate before install)*
- **APIs externas** *(External APIs)*: chave expirada, rate limit, mudança de endpoint → verifique autenticação primeiro *(expired key, rate limit, endpoint change → verify auth first)*
- **Instalações** *(Installs)*: dependências faltando, versão incompatível → leia requirements.txt antes de executar *(missing deps, incompatible version → read requirements.txt first)*
- **Arquivos** *(Files)*: path não existe, permissão negada, encoding errado → verifique antes de abrir *(path missing, permission denied, wrong encoding → verify before open)*
- **Git/Versionamento** *(Git/versioning)*: branch errada, conflito de merge, uncommitted changes → sempre `git status` antes *(wrong branch, merge conflict, uncommitted changes → always `git status` first)*

#### Problemas Possíveis (30-70% de chance) *(Possible problems — 30–70% chance)*
Problemas que podem acontecer dependendo do estado atual. *(Problems that may occur depending on current state.)*

Estratégia: verifique rapidamente o estado antes de assumir que está OK. *(Strategy: quickly verify state before assuming OK.)*

#### Problemas Improváveis mas Críticos (< 10% mas alto impacto) *(Unlikely but critical — <10% but high impact)*
Ações irreversíveis, perda de dados, exposição de credenciais. *(Irreversible actions, data loss, credential exposure.)*

Estratégia: backup preventivo, confirmação explícita, rollback plan. *(Strategy: preventive backup, explicit confirmation, rollback plan.)*

**Template de mapa de problemas:** *(Problem-map template:)*
```
MAPA DE PROBLEMAS — [Nome da Tarefa] *(PROBLEM MAP — [Task name])*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROVÁVEIS (resolver antes de começar): *(LIKELY — fix before starting:)*
  ⚠ [problema] → [solução preventiva aplicada agora] *(issue → preventive fix applied now)*
  ⚠ [problema] → [solução preventiva aplicada agora]

POSSÍVEIS (monitorar durante execução): *(POSSIBLE — monitor during execution:)*
  ~ [problema] → [sinal de alerta] → [ação se ocorrer] *(issue → warning signal → action if it happens)*

CRÍTICOS (baixa prob, alto impacto): *(CRITICAL — low probability, high impact:)*
  🔴 [risco] → [backup/rollback plan] *(risk → backup/rollback plan)*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Fase 6 — Plano De Execução Enriquecido *(Phase 6 — Enriched Execution Plan)*

Depois de coletar análises dos agentes + estimativas + mapa de problemas, produza: *(After collecting agent analyses + estimates + problem map, produce:)*

```
BRIEFING PRÉ-EXECUÇÃO — [Nome da Tarefa] *(PRE-EXECUTION BRIEFING — [Task name])*
════════════════════════════════════════════
CONTEXTO COLETADO: *(COLLECTED CONTEXT:)*
  • [insight do agente 1] *(insight from agent 1)*
  • [insight do agente 2]
  • [insight do agente 3]

PLANO DE EXECUÇÃO: *(EXECUTION PLAN:)*
  1. [etapa] (~Xmin) — [por quê esta ordem] *(step (~Xmin) — why this order)*
  2. [etapa] (~Xmin) — [dependência da anterior] *(dependency on prior step)*
  3. [etapa] (~Xmin) — [verificação de qualidade] *(quality check)*

TEMPO TOTAL: ~Xmin | CONFIANÇA: Alta/Média/Baixa *(TOTAL TIME | CONFIDENCE: High/Medium/Low)*

PROBLEMAS PRÉ-RESOLVIDOS: *(PRE-RESOLVED ISSUES:)*
  ✅ [problema] → [solução aplicada] *(issue → fix applied)*
  ✅ [problema] → [solução aplicada]

PONTOS DE VERIFICAÇÃO: *(CHECKPOINTS:)*
  [ ] Após etapa 1: verificar [critério de sucesso] *(After step 1: verify [success criterion])*
  [ ] Após etapa 2: verificar [critério de sucesso]
  [ ] Final: validar resultado completo *(Final: validate full result)*

ROLLBACK PLAN (se algo der errado): *(ROLLBACK PLAN if something goes wrong:)*
  → [como desfazer cada etapa crítica] *(how to undo each critical step)*
════════════════════════════════════════════
```

---

## Integração Com O Ecossistema

Este agente **complementa** o agent-orchestrator — não substitui:

- **agent-orchestrator**: identifica QUAIS skills usar (routing)
- **task-intelligence**: enriquece COMO usar + quando + com que riscos (briefing)

Ambos devem ser ativados juntos. O CLAUDE.md já exige o orchestrator — este agente adiciona a camada de inteligência sobre ele.

---

## Quando Não Usar O Briefing Completo

- Perguntas rápidas de 1 linha (responder diretamente é mais eficiente)
- Tarefas de leitura pura (read, grep, glob sem efeitos colaterais)
- Iterações simples dentro de uma tarefa já planejada
- Quando o usuário pede "só responde rápido" / "vibe comigo"

O objetivo não é burocracia — é inteligência a serviço da velocidade real.

---

## Referências

- `references/problem-catalog.md` — Catálogo de problemas típicos por domínio
- `references/time-patterns.md` — Padrões históricos de tempo por tipo de tarefa
- `scripts/pre_task_check.py` — Script de verificação automatizada pré-tarefa

---

## Exemplo De Briefing Completo

**Tarefa do usuário:** "Crie uma skill para integração com Stripe"

```
BRIEFING PRÉ-EXECUÇÃO — Skill: stripe-integration
════════════════════════════════════════════════════

CONTEXTO COLETADO (3 agentes consultados):
  • 007: CRÍTICO — API keys do Stripe NÃO devem ir para SKILL.md ou git.
    Usar variáveis de ambiente (.env). Webhooks precisam validação HMAC-SHA256.
  • skill-sentinel: whatsapp-cloud-api já implementa padrão HMAC-SHA256 para webhooks
    — reusar esse padrão. Skill deve seguir estrutura: config.py + client.py + SKILL.md.
  • agent-orchestrator: 3 skills similares (whatsapp, telegram, instagram) como referência
    de arquitetura. Nenhuma conflita com Stripe.

PLANO DE EXECUÇÃO:
  1. Criar estrutura de diretórios (~2min) — base para os demais arquivos
  2. Escrever SKILL.md com workflow (~5min) — define comportamento do agente
  3. Criar config.py com variáveis de ambiente (~3min) — sem hardcode de keys
  4. Criar stripe_client.py com autenticação (~10min) — métodos principais
  5. Criar webhook_handler.py com HMAC-SHA256 (~5min) — reusar padrão whatsapp
  6. Instalar via skill-installer (~2min) — validação + registro
  7. Gerar ZIP (~1min) — para backup/upload manual

TEMPO TOTAL: ~28min | CONFIANÇA: Alta
(estrutura clara, dependências conhecidas, sem APIs externas incertas)

PROBLEMAS PRÉ-RESOLVIDOS:
  ✅ API key exposta → .env obrigatório, .gitignore configurado
  ✅ YAML inválido → validar antes de instalar
  ✅ Webhook sem autenticação → HMAC-SHA256 incluído no plano

PONTOS DE VERIFICAÇÃO:
  [ ] Após SKILL.md: yaml.safe_load não levanta exceção
  [ ] Após config.py: sem strings hardcoded de credenciais
  [ ] Final: skill-installer valida os 10 checks

ROLLBACK PLAN:
  → Se skill-installer falhar: pasta em /tmp/stripe-skill-backup/
  → Se ZIP corrompido: reconstruir com build_ecosystem.py
════════════════════════════════════════════════════
```

## Best Practices

- Provide clear, specific context about your project and requirements
- Review all suggestions before applying them to production code
- Combine with other complementary skills for comprehensive analysis

## Common Pitfalls

- Using this skill for tasks outside its domain expertise
- Applying recommendations without understanding your specific context
- Not providing enough project context for accurate analysis

## Related Skills

- `agent-orchestrator` - Complementary skill for enhanced analysis
- `multi-advisor` - Complementary skill for enhanced analysis
