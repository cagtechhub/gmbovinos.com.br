# GM Bovinos — Risco e segurança

## Hotspots

- `apps/web/nuxt.config.ts` (`nuxt-security`/CSP com `report-uri /csp-report`) — não relaxar `script-src`/`style-src`/`connect-src`/`frame-src` (Google Maps) sem justificativa.
- `require-admin.ts` e rotas `/admin/*` — authz por JWT + allowlist.
- `POST /contacts` — input público: validar com Zod, sem vazar erro interno; PII de leads (LGPD).
- Uploads (`/admin/gallery/upload*`, `/admin/settings/upload`) — tipo/tamanho validados (multer), bucket Supabase.
- Consentimento + `02.marketing-scripts.client.ts` — GA4/Meta só após consentimento.
- SEO: `useSiteSeoHead` (JSON-LD via `@unhead/schema-org`), `robots.txt`, `sitemap.xml`, `NUXT_PUBLIC_NO_INDEX` — só emitir schema com dados reais; canonical absoluto.
- `docker-compose.yml`, workflow, `deploy.sh` — push em `main` publica.
- Prisma migrations — dados de produção.

## Regras

- Nunca `SERVICE_ROLE_KEY`/secrets em `NUXT_PUBLIC_*` ou bundle client.
- Não logar PII nem tokens.
- Mudança em hotspot → acionar `reviewer` (security/data-leak).

Ver `.ai/standards/general/security.md`, `.ai/agents/security-reviewer.md`, `.ai/agents/data-leak-auditor.md`.
