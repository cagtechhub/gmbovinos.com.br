# GM Bovinos — Deploy e infra

- `docker-compose.yml`: `gmbovinos-web` (3000, apex + `www` com 301 → apex) e `gmbovinos-backend` (3001, Host `API_DOMAIN`). Rede Traefik `web` (`TRAEFIK_NETWORK=web`, nunca `host`). Sem `db`, sem `ports:`; Postgres = Supabase.
- SSR: `NUXT_API_BASE=http://gmbovinos-backend:3001` (nunca `http://backend:3001`); browser: `NUXT_PUBLIC_API_BASE=https://${API_DOMAIN}`. Build args `NUXT_PUBLIC_*` no web.
- Dockerfiles: `apps/backend/Dockerfile`, `apps/web/Dockerfile` (`node:24-alpine`; Prisma 7 gera TS → copiar runtime/wasm; web recopia `vue/@vue` incompletos).
- `deploy.sh`: `docker compose up -d --remove-orphans --build`.
- GitHub Actions (`.github/workflows/deploy.yml`): push em `main` (ou dispatch) → SSH (`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`) → `git pull --ff-only` → `deploy.sh`. `APP_DIR` default `/opt/gmbovinos.com.br`.
- Migrations rodam manualmente (`yarn db:migrate`) contra o Supabase — não fazem parte do deploy.
- `gha_deploy*` é chave privada: não ler, não commitar.

Push em `main` = produção. Mudança aqui → atualizar este doc na mesma entrega. Ver `.ai/agents/devops-engineer.md`, `.ai/stacks/docker.md`.
