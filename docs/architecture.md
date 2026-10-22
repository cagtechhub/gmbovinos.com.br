# GM Bovinos — Arquitetura

Negócio: compra e venda de gado com operação em fazenda em Varginha-MG.

Monorepo Yarn 1 (`workspaces: apps/*, packages/*`, escopo `@gmbovinos/*`), ESM.

```text
apps/web/              Nuxt 4 (srcDir app/) — landing + painel /admin (SSR)
  app/pages/           index.vue (landing), admin/ (login, dashboard, conteudo, galeria, leads, configuracoes)
  app/components/      landing/ (Landing*), ui/ (drawer, menu), consent/, icons/
  app/composables/     useApiBase, useAdminApi (Bearer), useSiteSections, useGallery, useSiteSeoHead, useSiteSeoUrls, useSupabaseClient
  app/stores/          Pinia: useSiteStore, useConsentStore
  app/plugins/         00.consent-hydrate, 01.site-init, site-settings (GET /settings → runtimeConfig.public), 02.marketing-scripts (pós-consentimento)
  app/constants/       landingNavLinks.ts (âncoras)
  app/middleware/      admin-auth.ts
  server/              Nitro: routes/ (robots, sitemap, ads.txt, csp-report), api/ (health), utils/
  public/              img/ (logo, logo-mono, favicon), media/photos|videos, llms.txt, ai.txt
  tailwind.config.ts   tokens (alinhar com DESIGN.md)
apps/backend/          Express 4 + Effect 3 + Prisma 7 (porta 3001)
  src/main.ts
  src/presentation/http/   create-app.ts (rotas), require-admin.ts (JWT Supabase + ADMIN_ALLOWED_EMAILS)
  src/application/         use-cases/, ports/, *-repository.context.ts (Context.Tag do Effect)
  src/domain/              errors/, media/
  src/infrastructure/      prisma/ (adapters + layers + output gerado), supabase/ (Storage), runtime.ts
  prisma/schema.prisma + migrations/ + seed.ts   schema Postgres `gmbovinos`
  supabase/storage-gallery.sql                    bucket da galeria (referência)
packages/shared/src/   Zod: contact, lead, settings, section, gallery, health (build → dist)
```

## Fluxos

- **Landing SSR**: `site-settings` + `useSiteSections`/`useGallery` → API via `NUXT_API_BASE` (rede Docker) ou `NUXT_PUBLIC_API_BASE` (browser); seções têm **fallback local** se a API falhar.
- **Seções da home** (ordem): header → `#hero` → `#como-funciona` → `#atuacao` → `#sobre-servico` (SEO) → `#gallery` → `#sobre-nos` → `#cta` (mapa + formulário) → pré-rodapé/rodapé + WhatsApp flutuante + banner de consentimento.
- **Lead**: formulário → `POST /contacts` → kanban em `/admin/leads` (SMTP opcional).
- **Admin**: Supabase Auth no browser → Bearer JWT → `/admin/*`.
- **Storage**: Supabase bucket `gallery` (`SUPABASE_STORAGE_BUCKET`).

Backend: casos de uso dependem de _ports_ (Context) e adapters Prisma entram via Layer. Manter o padrão; não criar camadas novas sem necessidade (`.ai/stacks/effect3.md`, `.ai/architecture/karpathy.md`).
