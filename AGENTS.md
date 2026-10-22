# GM Bovinos (`gmbovinos.com.br`) — Instruções do Agente

Site institucional da GM Bovinos (compra e venda de gado; engorda, manejo e confinamento como base técnica; operação em fazenda em Varginha-MG): **monorepo Yarn 1** com landing Nuxt 4 + painel `/admin` (`apps/web`), API Express + Effect + Prisma 7 (`apps/backend`) e schemas Zod compartilhados (`packages/shared`). Banco, Auth e Storage no **Supabase**. Deploy Docker + Traefik via GitHub Actions. Node `^20.19.0 || >=22.12.0` (Docker `node:24-alpine`).

Este arquivo **roteia**. Detalhe técnico está em `docs/`. Padrões compartilhados: `.ai/` (symlink local → `../.ai`; não versionado, não duplicar aqui).

## Fonte de verdade

1. `AGENTS.md` — roteamento e regras duras
2. `docs/` e `DESIGN.md` — conhecimento do projeto (abrir o doc da tarefa)
3. código existente — comportamento implementado
4. `.ai/` — standards/stacks/agents/skills compartilhados (sob demanda)
5. inferência — só se não houver doc/código; declarar premissa

Se o doc necessário não existir: **não invente** — proponha a decisão e mantenha simples.

## Roteamento

| Tarefa                                 | Documento              |
| -------------------------------------- | ---------------------- |
| Protocolo IA / anti-alucinação         | `docs/ai.md`           |
| Arquitetura e estrutura de pastas      | `docs/architecture.md` |
| Stack, comandos e validação            | `docs/stack.md`        |
| Visual, tokens, componentes, redesign  | `DESIGN.md`            |
| API, banco (Prisma/Supabase), `shared` | `docs/contracts.md`    |
| Docker, Traefik, CI/CD, env            | `docs/deploy.md`       |
| Risco, segurança, SEO/consentimento    | `docs/risk.md`         |
| Agents e skills                        | `docs/agents.md`       |
| Git / commits                          | `docs/git.md`          |
| Índice de docs                         | `docs/README.md`       |

Carregar **somente** o documento relevante à tarefa.

## Comandos essenciais

```bash
yarn install              # postinstall: build shared + nuxt prepare
yarn db:generate          # Prisma client (apps/backend)
yarn dev                  # web :3000 + API :3001 (concurrently)
yarn dev:web | yarn dev:backend
yarn lint                 # ESLint (web)
yarn format:check         # Prettier (web)
yarn build                # shared → backend → web
yarn db:migrate           # prisma migrate dev — só com autorização
./deploy.sh               # produção (docker compose) — só com autorização
```

## Regras duras

- Não inventar requisitos, dados de negócio (preço, local, certificações), endpoints, seções ou tokens visuais.
- Frontend/visual segue `DESIGN.md`; token novo → atualizar `DESIGN.md` + `apps/web/tailwind.config.ts` juntos.
- Contrato web↔API mora em `packages/shared` (Zod); não duplicar tipos.
- Schema **só via migrations Prisma** (`apps/backend/prisma/migrations`); não editar o client gerado em `src/infrastructure/prisma/output/`.
- Não enfraquecer CSP/`nuxt-security`. Nunca `SERVICE_ROLE_KEY`/secrets em `NUXT_PUBLIC_*`.
- `TRAEFIK_NETWORK=web` (nunca `host`); compose sem `ports:`; SSR usa `http://gmbovinos-backend:3001`.
- Nunca ler/imprimir `.env*` nem `gha_deploy*` (chave privada na raiz, ignorada pelo git).
- Não criar commit/push/PR, nem rodar migrate/deploy, sem autorização explícita — push em `main` = deploy (`docs/git.md`).
- Dúvida de produto → perguntar ao César, não supor (`.ai/standards/general/product-handoff.md`).
- Não afirmar validação sem executar. Mudança de infra atualiza `docs/deploy.md`/`docs/stack.md` na mesma entrega.

## Fluxo

```text
Entender → abrir doc roteado → web, backend, shared ou infra?
    → impacto em contrato? → menor mudança → yarn lint (+ format:check) → revisar diff
```

Regra central: landing simples, rápida, acessível e com SEO correto; complexidade proporcional ao problema (`.ai/architecture/karpathy.md`).
