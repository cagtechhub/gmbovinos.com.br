# GM Bovinos — Stack e validação

| Área      | Stack                                                                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime   | Node `^20.19.0 \|\| >=22.12.0` (`engines`); Docker `node:24-alpine`; ESM                                                                                                   |
| Web       | Nuxt 4, Vue 3.5.32 (pinned via `resolutions`), Pinia 3, Tailwind (`@nuxtjs/tailwindcss`), `@nuxt/image`, `nuxt-security`, `@unhead/schema-org`, glightbox, lucide-vue-next |
| API       | Express 4, Effect 3, Prisma 7 + `@prisma/adapter-pg`, multer, nodemailer, tsx                                                                                              |
| Shared    | Zod, TS (build para `dist/`)                                                                                                                                               |
| Dados     | Supabase Postgres (schema `gmbovinos`), Auth, Storage                                                                                                                      |
| Qualidade | ESLint 9 (`@nuxt/eslint` + `eslint-config-prettier`, só web), Prettier (sem `;`, aspas simples, 100 col, trailing es5)                                                     |

Sem suíte de testes automatizados; validação = `yarn lint` + `yarn format:check` + `yarn build` + smoke manual (`yarn dev`) — ver `.cursor/agents/qa-engineer.md`, que propõe setup (Vitest / @nuxt/test-utils / Playwright) quando pedido. Backend/shared não têm lint próprio: o `tsc` do `yarn build` é o typecheck.

## Comandos

`yarn install` · `yarn dev` · `yarn dev:web` · `yarn dev:backend` · `yarn lint` / `lint:fix` · `yarn format` / `format:check` · `yarn build` · `yarn generate` · `yarn preview` · `yarn db:generate` · `yarn db:migrate` (autorização) · `yarn db:seed` (autorização) · `yarn workspace @gmbovinos/backend db:studio`.

URLs locais: site `http://localhost:3000`, admin `/admin/login`, API `http://localhost:3001`.

## Env

Modelo em `.env.example` (nunca ler `.env*` reais). Web usa prefixo `NUXT_PUBLIC_`; principais: `NUXT_PUBLIC_API_BASE`, `NUXT_API_BASE`, `NUXT_PUBLIC_SUPABASE_URL/ANON_KEY`, `SUPABASE_*`, `DATABASE_URL` (`?schema=gmbovinos`), `DOMAIN`, `API_DOMAIN`, `TRAEFIK_NETWORK`, `ADMIN_ALLOWED_EMAILS`, `SMTP_*`.

Stacks compartilhadas: `.ai/stacks/{nuxt4,vue3,pinia,tailwind,typescript,node,express,effect3,prisma,postgresql,supabase,docker}.md`.
