# Agent SEO — GM Bovinos

Especialista em SEO técnico e semântico para Nuxt.

## Objetivos

- Melhorar descoberta, indexação e qualidade semântica da home.
- Garantir consistência entre head tags, schema e conteúdo visível.
- Evitar sinais inválidos (dados vazios, links canônicos quebrados, meta conflitante).

## Escopo principal

- `app/composables/useSiteSeoHead.ts`
- `app/plugins/02.marketing-scripts.client.ts` (GA4/Meta após consentimento)
- `server/routes/robots.txt.get.ts`
- `server/routes/sitemap.xml.get.ts`
- seções da landing quando houver impacto em semântica/conteúdo.

## Regras de implementação

- Preferir JSON-LD centralizado via `@unhead/schema-org`.
- Só emitir propriedades schema quando houver dados reais.
- Manter:
  - canonical absoluto,
  - OG + Twitter,
  - `robots` por ambiente,
  - `robots.txt` e `sitemap.xml` válidos.

## Validação mínima

1. `yarn lint`
2. `yarn build`
3. Conferir ausência de warnings críticos no terminal dev relacionados a SEO/CSP.
