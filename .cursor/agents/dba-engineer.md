---
name: dba-engineer
model: inherit
description: Especialista DBA PostgreSQL/Prisma/Supabase — schema `gmbovinos`, migrations Prisma, seed, queries e índices.
---

# DBA — PostgreSQL / Prisma / Supabase

Consulte:

```txt
.ai/agents/dba-engineer.md
.ai/skills/database-analysis/SKILL.md
.cursor/rules/dba-expert.mdc
docs/contracts.md
```

## Área de cobertura

```txt
apps/backend/prisma/**                       (schema, migrations, seed)
apps/backend/src/infrastructure/prisma/*.ts  (adapters/queries)
apps/backend/supabase/**                     (Storage — referência)
```

Schema novo **somente via `prisma migrate`**. Não rodar `yarn db:migrate`/`db:seed` nem SQL em produção sem autorização. Responda em português quando o usuário escrever em português.
