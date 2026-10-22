<script setup lang="ts">
const config = useRuntimeConfig()
const seoLocality = computed(() => String(config.public.seoLocality || 'Minas Gerais').trim())

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('atuacao')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Atuação Comercial & Operacional')
const headline = computed(
  () => payload.value?.headline || 'Especialização zootécnica nas duas pontas da cadeia pecuária.'
)
</script>

<template>
  <section
    id="atuacao"
    class="w-full bg-dark-surface py-space-section-mobile md:py-space-section text-dark-text-base scroll-mt-20 relative"
  >
    <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin">
      <!-- Top Technical Chips & Section Title -->
      <div class="flex flex-col items-start gap-space-sm mb-space-2xl">
        <div class="flex flex-wrap items-center gap-space-sm">
          <span
            class="font-badge-mono text-badge-mono bg-dark-surface-raised px-3 py-1 rounded text-tertiary-light border border-tertiary-fixed-dim/30"
          >
            [SEGMENTO: RECRIA & ENGORDA]
          </span>
          <span
            class="font-badge-mono text-badge-mono bg-dark-surface-raised px-3 py-1 rounded text-dark-text-muted border border-dark-stroke"
          >
            [BASE: VARGINHA - SUL DE MINAS]
          </span>
          <span
            class="font-badge-mono text-badge-mono bg-dark-surface-raised px-3 py-1 rounded text-primary-fixed-dim border border-dark-stroke"
          >
            [MODALIDADE: SPOT & CONTRATO]
          </span>
        </div>
        <div class="flex items-center gap-space-sm mt-space-xs">
          <span class="inline-block w-8 h-[2px] bg-tertiary-light" />
          <span class="font-label text-label text-tertiary-light uppercase tracking-[0.24em]">
            {{ eyebrow }}
          </span>
        </div>
        <h2
          class="font-headline text-headline-mobile md:text-headline text-dark-text-strong max-w-2xl"
        >
          {{ headline }}
        </h2>
        <p v-if="seoLocality" class="text-sm font-medium text-dark-text-muted">
          Atendemos produtores e frigoríficos em {{ seoLocality }} e todo o Sudeste / Centro-Oeste.
        </p>
      </div>

      <!-- 2 Contrasting Modern Cards with 2px Golden-Leather Top Rule -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
        <!-- CARD 1: Compra e Venda de Gado de Corte -->
        <div
          class="relative bg-dark-surface-raised rounded-xl p-space-xl border-t-2 border-tertiary-light shadow-[0_24px_64px_rgba(8,21,48,0.4)] flex flex-col justify-between"
        >
          <div>
            <div class="flex items-start justify-between gap-space-md mb-space-md">
              <div>
                <span
                  class="font-badge-mono text-badge-mono text-tertiary-light uppercase tracking-wider block mb-1"
                >
                  MESA DE NEGOCIAÇÃO
                </span>
                <h3 class="font-headline text-[24px] text-dark-text-strong">
                  Compra & Venda de Gado de Corte
                </h3>
              </div>
              <div
                class="w-12 h-12 rounded bg-dark-canvas/80 flex items-center justify-center text-tertiary-light border border-dark-stroke shrink-0"
              >
                <span class="material-symbols-outlined text-[24px]">swap_horiz</span>
              </div>
            </div>
            <p class="font-body text-body-sm text-dark-text-muted mb-space-lg leading-relaxed">
              Intermediação e originação contínua de animais de alta performance produtiva.
              Conectamos criadores a terminadores com liquidez garantida, eliminando assimetrias de
              mercado.
            </p>

            <!-- Categorias Negociadas / Specifications Grid -->
            <div
              class="grid grid-cols-2 gap-3 p-space-md rounded bg-dark-canvas/60 border border-dark-stroke font-numeric text-numeric mb-space-lg"
            >
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >Recria Primária</span
                >
                <span class="text-dark-text-strong font-medium">Bezerros(as) desmamados</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >Terminação</span
                >
                <span class="text-dark-text-strong font-medium">Garrotes e Bois Magros</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >Matrizes</span
                >
                <span class="text-dark-text-strong font-medium"
                  >Fêmeas de reposição e descarte</span
                >
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >Genética</span
                >
                <span class="text-dark-text-strong font-medium"
                  >Nelore e Cruzamento Industrial</span
                >
              </div>
            </div>

            <ul class="space-y-space-xs font-body text-body-sm text-dark-text-base mb-space-lg">
              <li class="flex items-center gap-space-xs">
                <span class="material-symbols-outlined text-field text-[18px]">done</span>
                <span>Originação com rigor zootécnico e histórico sanitário checado</span>
              </li>
              <li class="flex items-center gap-space-xs">
                <span class="material-symbols-outlined text-field text-[18px]">done</span>
                <span>Pesagem com desconto de rendimento e tara previamente estipulados</span>
              </li>
              <li class="flex items-center gap-space-xs">
                <span class="material-symbols-outlined text-field text-[18px]">done</span>
                <span>Logística de transporte estruturada para minimizar perda hídrica</span>
              </li>
            </ul>
          </div>
          <a
            class="w-full inline-flex items-center justify-center h-[48px] rounded bg-primary-container text-on-primary font-label text-label tracking-[0.18em] uppercase hover:bg-primary-hover transition-colors"
            href="#cta"
          >
            Cotar Lotes Disponíveis
          </a>
        </div>

        <!-- CARD 2: Engorda e Manejo em Confinamento -->
        <div
          class="relative bg-dark-surface-raised rounded-xl p-space-xl border-t-2 border-tertiary-light shadow-[0_24px_64px_rgba(8,21,48,0.4)] flex flex-col justify-between"
        >
          <div>
            <div class="flex items-start justify-between gap-space-md mb-space-md">
              <div>
                <span
                  class="font-badge-mono text-badge-mono text-tertiary-light uppercase tracking-wider block mb-1"
                >
                  INFRAESTRUTURA INTENSIVA
                </span>
                <h3 class="font-headline text-[24px] text-dark-text-strong">
                  Engorda & Manejo em Confinamento
                </h3>
              </div>
              <div
                class="w-12 h-12 rounded bg-dark-canvas/80 flex items-center justify-center text-tertiary-light border border-dark-stroke shrink-0"
              >
                <span class="material-symbols-outlined text-[24px]">fence</span>
              </div>
            </div>
            <p class="font-body text-body-sm text-dark-text-muted mb-space-lg leading-relaxed">
              Instalações de terminação intensiva na Fazenda Paraíso em Varginha-MG. Gestão
              nutricional de precisão que assegura conversão alimentar superior e acabamento de
              carcaça padrão frigorífico.
            </p>

            <!-- Technical Facility Specs Grid -->
            <div
              class="grid grid-cols-2 gap-3 p-space-md rounded bg-dark-canvas/60 border border-dark-stroke font-numeric text-numeric mb-space-lg"
            >
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >Unidade Matriz</span
                >
                <span class="text-dark-text-strong font-medium">Fazenda Paraíso • Varginha</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >GMD Monitorado</span
                >
                <span class="text-dark-text-strong font-medium">1,45kg a 1,75kg / dia</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >Nutrição</span
                >
                <span class="text-dark-text-strong font-medium">Silagem e grãos balanceados</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-badge-mono text-dark-text-muted uppercase"
                  >Sustentabilidade</span
                >
                <span class="text-dark-text-strong font-medium">Parceria IFB Fertilizantes</span>
              </div>
            </div>

            <ul class="space-y-space-xs font-body text-body-sm text-dark-text-base mb-space-lg">
              <li class="flex items-center gap-space-xs">
                <span class="material-symbols-outlined text-field text-[18px]">done</span>
                <span>Piquetes com drenagem, cochos cobertos e bebedouros limpos diariamente</span>
              </li>
              <li class="flex items-center gap-space-xs">
                <span class="material-symbols-outlined text-field text-[18px]">done</span>
                <span>Protocolo de bem-estar animal com redução contínua de estresse térmico</span>
              </li>
              <li class="flex items-center gap-space-xs">
                <span class="material-symbols-outlined text-field text-[18px]">done</span>
                <span>Destinação ambiental correta de dejetos via BioFertilizante Conforto</span>
              </li>
            </ul>
          </div>
          <a
            class="w-full inline-flex items-center justify-center h-[48px] rounded border border-tertiary-fixed-dim/40 text-tertiary-light font-label text-label tracking-[0.18em] uppercase hover:bg-tertiary-fixed-dim hover:text-dark-canvas transition-all"
            href="#cta"
          >
            Conhecer Estrutura de Confinamento
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
