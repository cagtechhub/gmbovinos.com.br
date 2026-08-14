# AGENTS.md — GM Bovinos (`gmbovinos-monorepo`)

Orientação para humanos e agentes de IA que trabalham neste repositório.

## Propósito

Site institucional / landing da **GM Bovinos** (compra e venda de gado, engorda e cuidados), em português (pt-BR), com painel admin CMS, leads e SEO.

## Stack (monorepo Yarn)

| Área | Tecnologia |
| ----------- | ----------------------------------- |
| Workspaces | Yarn Classic (`apps/*`, `packages/*`) |
| Site + Admin | Nuxt **4** (`apps/web` → `@gmbovinos/web`) |
| API | Express + Effect + Prisma 7 (`apps/backend` → `@gmbovinos/backend`) |
| Shared | Zod schemas (`packages/shared` → `@gmbovinos/shared`) |
| Auth / Storage | Supabase Auth + Storage |
| DB | PostgreSQL (schema `gmbovinos`) |
| UI | Vue **3**, Pinia, Tailwind |
| Qualidade | ESLint 9 + Prettier (no web) |

**Node.js:** `^20.19.0 || >=22.12.0`. ESM (`"type": "module"`).

## Estrutura

```
apps/
  web/                 # Landing + /admin (mesmo Nuxt)
  backend/             # API CMS / leads
packages/
  shared/              # Schemas Zod compartilhados
docker-compose.yml     # produção: Traefik + web + API (Postgres = Supabase)
```

### `apps/web`

- `app/pages/` — home + `admin/*`
- `app/components/landing/` — blocos da landing (conteúdo via API com fallback local)
- `app/layouts/default.vue` / `admin.vue`
- `app/plugins/site-settings.ts` — merge `GET /settings` em `runtimeConfig.public`
- `app/composables/useAdminApi.ts`, `useSiteSections.ts`, `useGallery.ts`
- `server/` — health, sitemap, robots, ads.txt, CSP report

### `apps/backend`

- Prisma: `Contact`, `Lead`, `SiteSettings`, `SiteSection`, `GalleryItem`
- Público: `/settings`, `/sections`, `/gallery`, `POST /contacts`
- Admin (JWT Supabase): `/admin/dashboard`, leads, settings, sections, gallery
- Seed: `yarn db:seed` (conteúdo inicial da landing + galeria estática)

## Comandos (raiz)

| Objetivo | Comando |
| --------------- | -------------------- |
| Dev (web + API) | `yarn dev` |
| Só web | `yarn dev:web` |
| Só API | `yarn dev:backend` |
| Build | `yarn build` |
| Lint | `yarn lint` |
| Prisma generate | `yarn db:generate` |
| Migrate | `yarn db:migrate` |
| Seed | `yarn db:seed` |

Após `yarn install`, `postinstall` builda `@gmbovinos/shared` e roda `nuxt prepare` no web.

## Variáveis de ambiente

Ver [`.env.example`](.env.example). Prefixo **`NUXT_PUBLIC_`** para o web.

Principais:

| Chave | Uso |
| ----- | --- |
| `NUXT_PUBLIC_API_BASE` | Base da API no browser (ex.: `http://localhost:3001` / `https://api.gmbovinos.com.br`) |
| `NUXT_API_BASE` | SSR interno no Docker (`http://gmbovinos-backend:3001`) |
| `NUXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` | Login admin |
| `SUPABASE_*` + `SERVICE_ROLE_KEY` | Auth JWT (API) + upload Storage |
| `DATABASE_URL` | Postgres (Supabase em produção) com `?schema=gmbovinos` |
| `DOMAIN` / `API_DOMAIN` | Hosts Traefik (site e API) |
| `TRAEFIK_NETWORK` | Rede bridge do Traefik (`web`, nunca `host`) |
| `ADMIN_ALLOWED_EMAILS` | CSV opcional de e-mails admin |
| `SMTP_*` | Notificação opcional ao criar contato |

## Domínio CMS / Admin

| Rota admin | Função |
| ---------- | ------ |
| `/admin/login` | Supabase password |
| `/admin` | Dashboard |
| `/admin/conteudo` | Seções da landing |
| `/admin/galeria` | Upload / reorder |
| `/admin/leads` | Kanban (mesmo modelo Gutierres) |
| `/admin/configuracoes` | SEO, WhatsApp, redes, analytics, maps |

Identidade visual: tokens `primary` (azul) + `accent` (couro) em `apps/web/tailwind.config.ts`. Admin usa header `primary-700`.

## Checklist antes de concluir

1. `yarn lint`
2. `yarn build`
3. Com DB: `yarn db:migrate` + `yarn db:seed`
4. Landing / a11y: semântica e contraste

## Playbook de agentes

Prompts em `agents/`:

- `orchestrator-agent.md`
- `frontend-agent.md`
- `seo-agent.md`
