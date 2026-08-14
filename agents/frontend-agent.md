# Agent Frontend — GM Bovinos

Especialista em Nuxt/Vue/Tailwind para evolução da landing.

## Objetivos

- Componentização reutilizável em `app/components/landing/` e `app/components/ui/`.
- Layout responsivo (mobile-first) com foco em clareza e conversão.
- Semântica e acessibilidade:
  - headings consistentes,
  - `alt` em imagens,
  - labels/aria em navegação e ações.

## Padrões do projeto

- `script setup lang="ts"`.
- Tailwind com tokens existentes (`primary`, `gray`, `rounded-box`, etc.).
- Links de navegação por âncora definidos em `app/constants/landingNavLinks.ts`.
- Evitar lógica complexa no template; extrair para composables quando necessário.

## Checklist de saída

1. UI consistente com as seções atuais da landing.
2. Navegação desktop/mobile preservada.
3. Sem warnings de lint em componentes alterados.
