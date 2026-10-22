---
version: alpha
name: GM Bovinos
description: Sistema de design do site institucional da GM Bovinos (gmbovinos.com.br) — compra e venda de gado com base técnica em engorda, manejo e confinamento. Editorial, fotográfico e sóbrio; azul de marca + couro sobre tons de palha.
colors:
  # Tema claro (padrão) — primary e canvas aprovados
  primary: "#1F5FD6"
  primary-hover: "#1A4FB3"
  on-primary: "#FFFFFF"
  secondary: "#0E2350"
  on-secondary: "#F7F3EA"
  tertiary: "#B5832B"
  tertiary-light: "#E6C589"
  tertiary-dark: "#8A6320"
  on-tertiary: "#1A1408"
  canvas: "#F7F3EA"
  surface: "#FFFFFF"
  surface-muted: "#EFE8DA"
  stroke: "#DDD3C0"
  stroke-strong: "#BFB29A"
  text-strong: "#14181F"
  text-base: "#3B4250"
  text-muted: "#6B7280"
  field: "#4F6B3A"
  success: "#2F7D4F"
  warning: "#C98A1A"
  danger: "#B4382F"
  whatsapp: "#01A3A4"
  # Tema escuro (faixas institucionais, hero, rodapé, modo escuro opcional)
  dark-canvas: "#081530"
  dark-surface: "#0E2350"
  dark-surface-raised: "#16305F"
  dark-stroke: "#25407A"
  dark-text-strong: "#F7F3EA"
  dark-text-base: "#D2D8E4"
  dark-text-muted: "#9AA6BD"
  dark-primary: "#6E9BF0"
  dark-tertiary: "#E6C589"
typography:
  # Títulos: Fraunces é default PROVISÓRIO; alternativa Inter Tight (ver Typography)
  display-xl:
    fontFamily: Fraunces
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Fraunces
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.015em
  headline:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.01em
  title:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.24em
  numeric:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.02em
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  pill: 999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  section: 112px
  gutter: 24px
  container: 1240px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
    height: 52px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-accent:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
    height: 52px
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.dark-text-strong}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-base}"
    rounded: "{rounded.md}"
    padding: 32px
  card-dark:
    backgroundColor: "{colors.dark-surface-raised}"
    textColor: "{colors.dark-text-base}"
    rounded: "{rounded.md}"
    padding: 32px
  eyebrow:
    textColor: "{colors.tertiary-dark}"
    typography: "{typography.label}"
  stat:
    textColor: "{colors.text-strong}"
    typography: "{typography.display-lg}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
    height: 48px
  header-solid:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-strong}"
    height: 76px
  footer:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-text-base}"
  whatsapp-fab:
    backgroundColor: "{colors.whatsapp}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    size: 56px
---

# DESIGN.md — GM Bovinos

> Documento-fonte para o Google Stitch gerar o redesign de gmbovinos.com.br (formato DESIGN.md `alpha`: tokens no front matter + seções `##` na ordem da especificação; seções extras ao final). Mantém nome, logo (escudo azul com cabeça de boi sobre globo) e o par **azul institucional + couro** já usado no site, elevando o visual de "site de fazenda" para **casa de negócios pecuários**: editorial, fotográfico, preciso e confiável.

## Overview

**Quem é:** a GM Bovinos, com operação em fazenda em **Varginha-MG**, compra e vende gado com critério técnico — avaliação de lote, alinhamento de preço e acompanhamento da transação. Engorda, manejo, sanidade e o confinamento da Fazenda Paraíso, em Varginha-MG, são a base operacional; o BioFertilizante Conforto (com a IFB Fertilizantes) mostra visão de economia circular.

**Público:** pecuaristas (cria, recria, engorda), compradores e frigoríficos/parceiros comerciais. Decidem por confiança, histórico e clareza — e muitas vezes pelo celular, no campo, com sinal fraco.

**Promessa:** "Negócio de gado com critério técnico e palavra cumprida."

**Tom de voz:** sóbrio, direto, respeitoso; vocabulário do campo sem caricatura ("lote", "arroba", "manejo", "fechamento"). Frases curtas, pt-BR. Sem superlativos vazios.

**Personalidade visual:** concorrentes do segmento costumam usar fotos saturadas, verdes genéricos, fontes pesadas e banners de leilão. A GM se diferencia com **linguagem editorial de agronegócio premium**: fundo palha, serifa elegante nos títulos, muito respiro, fotografia real em tons quentes, fios finos de couro e números em fonte mono como "ficha técnica". Pense em relatório anual de uma trading agrícola, não em panfleto.

Princípios:

1. **Fotografia é a protagonista** — rebanho, pasto, curral, confinamento, pessoas trabalhando. Tratamento quente e levemente dessaturado; nada de banco de imagens.
2. **Azul é a assinatura, couro é o detalhe** — azul em CTAs, links e faixas institucionais; couro em eyebrows, fios e números.
3. **Ritmo claro/escuro** — páginas claras (palha) intercaladas com 1–2 faixas azul-noite.
4. **Precisão de ficha técnica** — rótulos em caixa alta espaçada, numeração `01 —`, dados em mono.
5. **Leve e rápido** — funciona bem em 4G no campo; vídeo só onde agrega.

## Colors

Tokens normativos no front matter. Tema **claro é o padrão**; o tema escuro (`dark-*`) é usado em hero, faixas institucionais (`#atuacao`, `#sobre-nos`), rodapé e no admin opcionalmente.

**Aprovado pelo César (22/10/2026):** `primary` #2563EB → #1F5FD6 e fundo palha `canvas` #F7F3EA substituindo o branco.

### Marca (do logo e do Tailwind atual)

| Token          | Hex       | Origem / uso                                                      |
| -------------- | --------- | ----------------------------------------------------------------- |
| primary        | `#1F5FD6` | Azul do escudo (atual `primary-500 #2563EB`, um tom mais sóbrio)  |
| secondary      | `#0E2350` | "Azul noite" (evolução de `primary-700 #1E3A8A`) — faixas, rodapé |
| tertiary       | `#B5832B` | Couro (`accent-500` atual) — fios, eyebrows, CTA secundário       |
| tertiary-light | `#E6C589` | Couro claro (`accent-300`) — texto de destaque sobre escuro       |
| tertiary-dark  | `#8A6320` | Couro escuro (`accent-600`) — eyebrow sobre claro (contraste AA)  |
| whatsapp       | `#01A3A4` | Teal (`brand-500`) — **exclusivo** do WhatsApp                    |

### Tema claro (padrão)

| Token         | Hex       | Uso                                                 |
| ------------- | --------- | --------------------------------------------------- |
| canvas        | `#F7F3EA` | Fundo "palha"                                       |
| surface       | `#FFFFFF` | Cards, formulário                                   |
| surface-muted | `#EFE8DA` | Faixas de respiro, timeline                         |
| stroke        | `#DDD3C0` | Bordas e fios                                       |
| stroke-strong | `#BFB29A` | Bordas de input, divisores fortes                   |
| text-strong   | `#14181F` | Títulos                                             |
| text-base     | `#3B4250` | Corpo                                               |
| text-muted    | `#6B7280` | Legendas, metadados                                 |
| field         | `#4F6B3A` | Verde-pasto — só em ícones/ilustração, nunca em CTA |

### Tema escuro

| Token               | Hex       | Uso                           |
| ------------------- | --------- | ----------------------------- |
| dark-canvas         | `#081530` | Rodapé, overlay do hero       |
| dark-surface        | `#0E2350` | Faixas institucionais         |
| dark-surface-raised | `#16305F` | Cards sobre faixa escura      |
| dark-stroke         | `#25407A` | Bordas                        |
| dark-text-strong    | `#F7F3EA` | Títulos                       |
| dark-text-base      | `#D2D8E4` | Corpo                         |
| dark-text-muted     | `#9AA6BD` | Legendas                      |
| dark-primary        | `#6E9BF0` | Links sobre escuro            |
| dark-tertiary       | `#E6C589` | Eyebrows/números sobre escuro |

Estados: success `#2F7D4F`, warning `#C98A1A`, danger `#B4382F` (formulário e admin).

Overlay do hero: `linear-gradient(180deg, rgba(8,21,48,.35) 0%, rgba(8,21,48,.55) 55%, rgba(8,21,48,.92) 100%)`.

## Typography

Google Fonts:

> **Fonte de títulos em aberto — o Stitch deve propor e comparar.** O token `fontFamily: Fraunces` em `display-*`/`headline` é **provisório** (default válido para manter o front matter conforme a spec); será substituído pela opção escolhida.

Candidatas para títulos:

- **Opção A — Fraunces** (serifa variável, `opsz` 9–144, pesos 400–600): editorial, sofisticada, "relatório anual".
- **Opção B — all-sans: Inter Tight** (ou Inter, 600, tracking negativo): contemporânea, limpa, coerente com o corpo.

Fixas:

- **Inter** (já usada; 400–700) — corpo, UI, botões, formulários.
- **IBM Plex Mono** (500) — numeração de etapas, dados, anos da linha do tempo.

```text
https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400..700&family=IBM+Plex+Mono:wght@500&display=swap
```

Escala (desktop → mobile): display-xl 72→40px · display-lg 48→32px · headline 32→26px · title 20→18px · body-lg 18→17px · body 16px · label 12px (caixa alta, tracking 0.24em) · numeric 14px.

Opção B: `family=Inter+Tight:wght@500..700`.

Regras: títulos em sentence case (abandonar o caixa-alta espaçado atual do H1); máximo 2 pesos por bloco; linha de texto 60–72 caracteres; `font-variant-numeric: tabular-nums` em números.

## Layout

- Container 1240px, gutter 24px; grid 12 colunas desktop, 4 colunas mobile; margem lateral mobile 20px.
- Base 4px; padding vertical de seção 112px desktop / 72px mobile.
- Assimetria editorial: títulos alinhados à esquerda em coluna 5/12 com texto em 6/12 ao lado (desktop); centralizar só hero e CTA final.
- Fios horizontais de 1px `stroke` separam blocos dentro da seção.

## Elevation & Depth

Profundidade vem de **fotografia + camadas de cor**, não de sombras pesadas.

- `shadow-card`: `0 1px 2px rgba(20,24,31,.06), 0 8px 24px rgba(20,24,31,.06)`.
- `shadow-raised` (hover/form): `0 24px 64px rgba(14,35,80,.14)`.
- Camadas: foto (Ken Burns sutil) → overlay azul-noite → conteúdo → fio couro.
- Tratamento de foto: leve aquecimento (+temperatura), saturação −10%, contraste +5%; grão sutil opcional.
- Sem glassmorphism exagerado; `backdrop-blur` apenas no header sobre o hero.

## Shapes

- Cantos discretos: botões/inputs 4px, cards 8px, mídia 8px; pill só em chips e FAB do WhatsApp.
- **Fio de couro**: linha 1px `tertiary` (32–48px) antes de eyebrows e no topo de cards (`card-accent-top`, 2px).
- Moldura de foto: borda 1px `stroke` + offset de 12px com bloco `surface-muted` atrás (efeito "passe-partout").
- Ícones lineares (Lucide), traço 1.5px, 20–24px.

## Components

- **Header** — overlay transparente sobre o hero (logo versão mono clara, links `dark-text-strong`); após 100px de rolagem vira sólido `canvas` com borda inferior `stroke`, logo colorido. Links: Como funciona · Atuação · Galeria · Sobre nós; CTA "Contato" (button-primary). Mobile: drawer lateral `dark-surface` em tela cheia.
- **Hero** — foto/vídeo full-bleed 92vh, overlay azul-noite, conteúdo alinhado à esquerda (coluna 7/12): eyebrow "GM Bovinos · Pecuária de corte", H1 display-xl (fonte de títulos conforme opção escolhida) "Compra e venda de gado", subtítulo body-lg, chip com fio couro "Negociação técnica · transparência comercial", CTAs "Fale com a equipe" (primary) + "Como funciona" (ghost). Rodapé do hero: faixa com 3 dados em mono (Prioridade / Base técnica / Foco).
- **Etapas (Como funciona)** — lista numerada `01 —` em IBM Plex Mono couro, título Inter 600, texto; linha vertical de 1px conectando etapas (desktop 2 colunas).
- **Pilares (Atuação)** — faixa `dark-surface`; 3 chips de destaque como "ficha técnica"; 2 cards `card` claros com ícone em círculo de fio couro e lista de pontos com marcador couro.
- **Bloco SEO (Sobre o serviço)** — texto editorial em duas colunas com foto emoldurada.
- **Galeria** — grid editorial (1 grande + 4 menores, mosaico), fotos e vídeos com ícone de play; lightbox escuro.
- **Sobre nós** — parágrafos à esquerda; **linha do tempo** à direita com anos em mono couro, itens expansíveis (Origem na recria e engorda → Sistema de confinamento → BioFertilizante Conforto).
- **CTA / Contato** — duas colunas: formulário (card branco, inputs 48px, labels visíveis, botão primary largura total) e mapa com moldura; texto "Retornamos em poucas horas".
- **Pré-rodapé** — foto full-bleed com headline "Compra e venda de gado" e CTA.
- **Rodapé** — `dark-canvas`, logo mono, contatos, redes, links legais, crédito.
- **WhatsApp flutuante** — FAB 56px teal, canto inferior direito, com tooltip no desktop.
- **Banner de consentimento** — barra inferior `surface` com borda `stroke`, botões "Aceitar" (primary) e "Recusar" (ghost) de mesmo peso.
- **Admin** — mesma tipografia Inter; sidebar `dark-surface`; conteúdo `canvas`; cards `card`.

## Do's and Don'ts

**Faça:** fotografia real do rebanho e da equipe; muito respiro; azul para ação, couro para detalhe; números como dado (mono); copy curta e concreta.

**Não faça:** verde-limão/“agro genérico”; texturas de madeira/couro literais; fontes western ou rústicas; gradientes neon; ícones de boi cartunescos; inventar números (cabeças, hectares, anos) ou selos/certificações; usar o teal fora do WhatsApp; caixa-alta em parágrafos.

## Motion

- Duração 200ms (UI), 600ms (reveal); easing `cubic-bezier(.2,.7,.2,1)`.
- Reveal: fade + translateY 16px ao entrar na viewport, stagger 80ms.
- Hero: Ken Burns lento (scale 1.05 → 1.0 em 20s).
- Header: transição de cor/fundo 250ms.
- Cards: hover sobe 2px + `shadow-raised` + fio couro estende.
- `prefers-reduced-motion`: desligar Ken Burns, reveals e smooth scroll.

## Acessibilidade

- Contraste AA: `text-base` sobre `canvas` ≥ 7:1; eyebrow sobre claro usa `tertiary-dark`; sobre escuro `tertiary-light`. Nunca texto `tertiary` (#B5832B) pequeno sobre branco.
- Foco visível: anel 2px `primary` + offset 2px (sobre escuro: `dark-tertiary`).
- Alvos de toque ≥ 44px; formulário com `label` visível, erros textuais com `danger`.
- Imagens com `alt` descritivo; vídeos sem áudio automático, com controle de pausa.
- Hierarquia: um H1 (hero); H2 por seção; landmarks `header`/`main`/`footer`/`nav`.
- Âncoras com `scroll-margin-top` ≥ header.

## Estrutura da página

Home (`/`), ordem e âncoras atuais preservadas:

1. Header (overlay → sólido)
2. `#hero` — Compra e venda de gado
3. `#como-funciona` — Processo comercial (etapas numeradas)
4. `#atuacao` — Atuação da GM Bovinos (faixa escura, chips + pilares "Compra e venda de gado" e "Engorda e serviços técnicos no campo")
5. `#sobre-servico` — Compra e venda de gado com critério técnico (conteúdo SEO)
6. `#gallery` — Galeria (fotos e vídeos)
7. `#sobre-nos` — Sobre nós + linha do tempo (faixa escura)
8. `#cta` — "Quer comprar, vender ou tirar dúvidas?" (formulário + mapa)
9. Pré-rodapé com foto + rodapé
10. Flutuantes: WhatsApp, banner de consentimento

Copy vem do CMS (`/admin/conteudo`); os textos citados aqui são os do seed atual.

## Prompts para o Google Stitch

### Desktop (home)

```text
Design a desktop landing page (1440px) for "GM Bovinos", a Brazilian cattle trading company (compra e venda de gado) with technical backing in feedlot fattening and herd management. All copy in Brazilian Portuguese. Use the attached DESIGN.md tokens strictly.
Style: editorial premium agribusiness — warm straw background #F7F3EA, deep night blue #0E2350 bands, brand blue #1F5FD6 for actions, leather/gold #B5832B thin rules and eyebrows. Inter body; for headlines, generate two variants side by side — (A) Fraunces serif, editorial, and (B) all-sans Inter Tight 600 with tight tracking — and recommend one, IBM Plex Mono for numbers. Real warm cattle/pasture photography, generous whitespace, 4–8px corners, no neon, no rustic textures.
Sections in order: transparent header over hero (logo: blue shield with bull head over globe; links Como funciona, Atuação, Galeria, Sobre nós; button Contato) → full-bleed photo hero, left-aligned, H1 "Compra e venda de gado", eyebrow "GM Bovinos · Pecuária de corte", chip "Negociação técnica · transparência comercial", buttons "Fale com a equipe" and "Como funciona", bottom strip with 3 mono facts (Prioridade: Compra e venda de gado / Base técnica: Engorda e manejo / Foco: Negócio seguro e claro) → "Como funciona" numbered steps 01–04 → dark band "Atuação da GM Bovinos" with two cards → editorial SEO text with framed photo → mosaic gallery with photos and videos → dark band "Sobre nós" with timeline (Origem na recria e engorda, Sistema de confinamento, BioFertilizante Conforto) → contact section with form (Nome, Email, Assunto, Descrição) and framed map → photo pre-footer → dark footer. Floating teal WhatsApp button bottom-right.
```

### Mobile

```text
Same GM Bovinos design system, mobile 390px. Header with logo and menu icon opening a full-screen night-blue drawer. Hero 88vh with photo, H1 40px in the chosen headline font (show both A Fraunces and B Inter Tight if not decided), stacked full-width buttons. Steps as a vertical numbered list with a thin connecting line. Cards stacked, 20px side margins, 72px section padding. Gallery as 2-column mosaic. Timeline as accordion. Form before map, inputs 48px, sticky-safe WhatsApp FAB that does not cover the submit button. Keep AA contrast and 44px tap targets.
```

### Refinamentos

```text
1. Make the hero calmer: reduce overlay text to H1 + one sentence, increase photo presence, keep CTAs.
2. Replace any generic stock imagery with placeholders labeled "foto real: rebanho / curral / confinamento / equipe".
3. Apply leather 1px rules before every eyebrow and as a 2px top border on cards; remove extra shadows.
4. Generate a dark variant of the "Atuação" and "Sobre nós" bands using dark-* tokens; check contrast.
5. Design the admin (sidebar night blue, content on straw background) for: dashboard, leads kanban, gallery upload/reorder, content editor, settings.
6. Compare headline fonts A (Fraunces) vs B (Inter Tight) on hero, section titles and stats; recommend one with rationale.
7. Do not invent numbers, certifications or prices — use the copy provided.
```
