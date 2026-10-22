# GM Bovinos — Protocolo IA

1. Abrir o documento de `docs/` (ou `DESIGN.md`) indicado pelo `AGENTS.md` **antes** de decidir.
2. Citar fonte (arquivo, rota, schema) ou declarar **desconhecido**.
3. Não inventar endpoints, campos, seções, copy, dados de negócio ou tokens visuais.
4. Dúvida de alto impacto: **parar e perguntar**.
5. Não afirmar que lint/build passou sem executar.
6. Carregar só o contexto necessário (não o `.ai/` inteiro).
7. Responder e escrever conteúdo em pt-BR.

## Antes de codificar

O que muda; onde (web/backend/shared/infra); contrato envolvido (`contracts.md`); risco (`risk.md`); como validar.

## Durante

Mudanças pequenas e cirúrgicas; sem alterações não pedidas; respeitar padrões locais e `DESIGN.md`.

## Depois

`yarn lint` + `yarn format:check` no escopo (e `yarn build` se tocar build/deps/config); revisar diff; reportar riscos e o que não foi validado.

## `.ai/` local

`.ai` é um symlink local (`.ai → ../.ai`, i.e. `~/Workspace/up2tech/.ai`) e **não é versionado** (`.gitignore`). Em outro ambiente, recriar com `ln -s ../.ai .ai` na raiz do repo.

## MCP

`.cursor/mcp.json` configura o MCP do Supabase **somente leitura** via `${env:SUPABASE_PROJECT_REF}` e `${env:SUPABASE_ACCESS_TOKEN}` (personal access token). Nunca colocar valores reais no arquivo.
