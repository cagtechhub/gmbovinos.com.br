# GM Bovinos — Contratos (API, banco, shared)

## API (`apps/backend/src/presentation/http/create-app.ts`)

- Público: `GET /health`, `GET /settings`, `GET /sections`, `GET /sections/:key`, `GET /gallery`, `POST /contacts`
- Admin (Bearer JWT Supabase + `ADMIN_ALLOWED_EMAILS`, `require-admin.ts`): `/admin/dashboard`, `/admin/leads` (CRUD), `/admin/settings` (+ `upload`), `/admin/sections/:key`, `/admin/gallery` (CRUD, `upload`, `upload-batch`, `reorder`)

Consultar o código antes de citar rota/payload; não inventar.

## Shared (`packages/shared/src`)

Zod: `contact`, `lead`, `settings`, `section`, `gallery`, `health`, reexportados em `index.ts`. Mudança de payload: schema em `shared` → backend valida → web consome. Breaking exige ajustar os dois lados na mesma entrega. `shared` é buildado (`dist/`) no `postinstall`/`build`.

## Banco

- Prisma 7, `schemas = ["gmbovinos"]`; models `Contact`, `Lead`, `SiteSettings`, `SiteSection`, `GalleryItem`; client em `src/infrastructure/prisma/output` (gerado, não editar).
- **Schema novo só via migrations Prisma** em `apps/backend/prisma/migrations/` — nunca SQL manual no Supabase nem `db push` em produção.
- Migrations aditivas quando possível; nunca rodar contra produção sem autorização.
- Seed (`prisma/seed.ts`) define o conteúdo inicial das seções — copy nova da landing passa pelo seed/admin, não hardcode.
