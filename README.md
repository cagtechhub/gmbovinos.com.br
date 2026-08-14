# GM Bovinos

Monorepo Yarn: site Nuxt (`apps/web`) + API Express/Prisma (`apps/backend`) + schemas Zod (`packages/shared`).

## Desenvolvimento

```bash
cp .env.example .env
# Preencha Supabase + DATABASE_URL (Postgres local ou pooler do Supabase)

yarn install
yarn db:generate
yarn db:migrate
yarn db:seed
yarn dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  
- API: http://localhost:3001  

## Scripts

| Comando | Descrição |
| ------- | --------- |
| `yarn dev` | Web + API |
| `yarn build` | shared → backend → web |
| `yarn lint` | ESLint no web |
| `yarn db:migrate` | Migrations Prisma |
| `yarn db:seed` | Conteúdo inicial |

## Docker + Traefik (produção)

Na OS Up2tech: Traefik na rede bridge `web`, Postgres do **Supabase** (sem serviço `db`, sem `ports` no host).

Pré-requisitos:

1. DNS de `DOMAIN` e `API_DOMAIN` apontando para a VPS
2. `docker network create web` (se ainda não existir)
3. `.env` **só na VPS** (copie de `.env.example`, valores `https://` reais)
4. `yarn db:migrate` (ou `yarn db:push`) **uma vez** contra o Supabase

```bash
# Na VPS, em /opt/gmbovinos.com.br
cp .env.example .env
# Edite DOMAIN, API_DOMAIN, DATABASE_URL, NUXT_PUBLIC_*, SUPABASE_*, Traefik
chmod +x ./deploy.sh
./deploy.sh
```

| Item | Valor |
| ---- | ----- |
| Site | `https://${DOMAIN}` (container `gmbovinos-web`) |
| API | `https://${API_DOMAIN}` (container `gmbovinos-backend`) |
| SSR → API | `NUXT_API_BASE=http://gmbovinos-backend:3001` |
| Browser → API | `NUXT_PUBLIC_API_BASE=https://${API_DOMAIN}` |

Não use `http://backend:3001` nem `TRAEFIK_NETWORK=host`.

Deploy via GitHub Actions (push em `main`): secrets `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`; vars opcionais `DOMAIN` e `APP_DIR` (default `/opt/gmbovinos.com.br`).
