# GM Bovinos — Agents e Skills

**Agent** = quem responde pela responsabilidade. **Skill** = como executar uma capacidade.

## Papéis canônicos (`.ai/agents/`)

tech-lead · frontend-engineer · backend-engineer · dba-engineer · devops-engineer · test-engineer · code-reviewer · security-reviewer · impact-analyst · data-leak-auditor

## Agentes locais Cursor (`.cursor/agents/`)

| Agente              | Uso                                                                    |
| ------------------- | ---------------------------------------------------------------------- |
| `frontend-engineer` | Landing/admin Nuxt, componentes, SEO técnico, redesign via `DESIGN.md` |
| `backend-engineer`  | API Express/Effect, auth admin, validação Zod, `packages/shared`       |
| `dba-engineer`      | Prisma schema/migrations, queries, Supabase                            |
| `devops-engineer`   | Docker, Traefik, GitHub Actions, Node runtime                          |
| `qa-engineer`       | Validação (lint, format, build, smoke manual); propõe setup de testes  |
| `reviewer`          | Revisão readonly; aciona impact/security/data-leak/code                |

Orquestração: rule `.cursor/rules/tech-lead.mdc` (delega, não implementa). O antigo playbook `agents/` (orchestrator/frontend/seo) foi incorporado em `tech-lead`, `frontend-engineer` e na rule `seo`.

## Skills

`.ai/skills/{repo-map,new-module,refactoring,build-repair,database-analysis,security-audit,pr-prep,adr,release-notes}/SKILL.md`
