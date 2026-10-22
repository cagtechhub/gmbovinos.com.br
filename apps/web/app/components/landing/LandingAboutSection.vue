<script setup lang="ts">
const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('about')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Nossa História & Solidez')
const headline = computed(
  () => payload.value?.headline || 'Raízes no pasto, precisão na mesa de negócios.'
)
</script>

<template>
  <section
    id="sobre-nos"
    class="w-full bg-dark-canvas py-space-section-mobile md:py-space-section text-dark-text-base scroll-mt-20 border-t border-dark-stroke"
  >
    <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
        <!-- Left: Company Identity & Value Proposition (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-space-md">
          <div class="flex items-center gap-space-sm">
            <span class="inline-block w-8 h-[2px] bg-tertiary-light" />
            <span class="font-label text-label text-tertiary-light uppercase tracking-[0.24em]">
              {{ eyebrow }}
            </span>
          </div>
          <h2
            class="font-display-lg text-display-lg-mobile md:text-display-lg text-dark-text-strong font-medium"
          >
            {{ headline }}
          </h2>
          <p class="font-body text-body text-dark-text-muted leading-relaxed">
            A GM Bovinos foi constituída sob a premissa de que a pecuária profissional não tolera
            improvisos. Combinamos o olho clínico forjado no lombo do cavalo com ferramentas
            financeiras e zootécnicas de última geração.
          </p>
          <p class="font-body text-body text-dark-text-muted leading-relaxed">
            Com sede operacional na Fazenda Paraíso em Varginha-MG, construímos uma rede sólida de
            produtores parceiros, frigoríficos de primeira linha e confinamentos estratégicos,
            assegurando fluxo contínuo de animais e liquidez imediata aos pecuaristas.
          </p>
          <div
            class="p-space-md rounded bg-dark-surface-raised border border-dark-stroke flex items-center gap-space-md mt-space-sm"
          >
            <span class="material-symbols-outlined text-[32px] text-tertiary-light"
              >verified_user</span
            >
            <div>
              <span class="font-title text-body text-dark-text-strong font-semibold block">
                Compromisso Ético & Pontualidade
              </span>
              <span class="font-body-sm text-body-sm text-dark-text-muted">
                Honramos cada pesagem, arroba cotada e prazo acordado.
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Technical Timeline with Leather & Monospace Anchors (7 Cols) -->
        <div
          class="lg:col-span-7 flex flex-col gap-space-lg pl-0 lg:pl-space-xl border-l-0 lg:border-l border-dark-stroke"
        >
          <!-- Timeline Item 1 -->
          <div class="relative pl-space-lg border-l-2 border-tertiary-light/40 group">
            <div
              class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-canvas border-2 border-tertiary-light"
            />
            <div class="flex flex-wrap items-center gap-space-sm mb-1">
              <span class="font-numeric text-title font-semibold text-tertiary-light">2012</span>
              <span
                class="font-badge-mono text-badge-mono text-dark-text-muted bg-dark-surface px-2 py-0.5 rounded border border-dark-stroke"
              >
                FUNDAÇÃO NO SUL DE MINAS
              </span>
            </div>
            <h3 class="font-title text-title text-dark-text-strong mb-2">
              Origem na Recria e Engorda Comercial
            </h3>
            <p class="font-body text-body-sm text-dark-text-muted">
              Início das operações focadas na originação criteriosa de bezerros desmamados e
              garrotes no Sul de Minas, estabelecendo padrões rigorosos de pesagem sem desconto
              arbitrário e pagamento à vista.
            </p>
          </div>

          <!-- Timeline Item 2 -->
          <div class="relative pl-space-lg border-l-2 border-tertiary-light/40 group">
            <div
              class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-canvas border-2 border-tertiary-light"
            />
            <div class="flex flex-wrap items-center gap-space-sm mb-1">
              <span class="font-numeric text-title font-semibold text-tertiary-light">2018</span>
              <span
                class="font-badge-mono text-badge-mono text-dark-text-muted bg-dark-surface px-2 py-0.5 rounded border border-dark-stroke"
              >
                INFRAESTRUTURA INTENSIVA
              </span>
            </div>
            <h3 class="font-title text-title text-dark-text-strong mb-2">
              Consolidação do Confinamento na Fazenda Paraíso
            </h3>
            <p class="font-body text-body-sm text-dark-text-muted">
              Implementação da unidade intensiva de confinamento com balança eletrônica, currais de
              manejo racional e fábrica própria de ração em Varginha-MG, elevando a capacidade de
              terminação para escalas de frigoríficos.
            </p>
          </div>

          <!-- Timeline Item 3 -->
          <div class="relative pl-space-lg border-l-2 border-tertiary-light/40 group">
            <div
              class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-canvas border-2 border-tertiary-light"
            />
            <div class="flex flex-wrap items-center gap-space-sm mb-1">
              <span class="font-numeric text-title font-semibold text-tertiary-light">2023</span>
              <span
                class="font-badge-mono text-badge-mono text-field bg-dark-surface px-2 py-0.5 rounded border border-field/40"
              >
                SUSTENTABILIDADE & ESG
              </span>
            </div>
            <h3 class="font-title text-title text-dark-text-strong mb-2">
              Economia Circular & Projeto BioFertilizante Conforto
            </h3>
            <p class="font-body text-body-sm text-dark-text-muted">
              Parceria com a IFB Fertilizantes para o reaproveitamento integral dos resíduos
              orgânicos do confinamento, gerando o BioFertilizante Conforto e neutralizando o
              impacto ambiental da cadeia de terminação.
            </p>
          </div>

          <!-- Timeline Current Status -->
          <div class="relative pl-space-lg border-l-2 border-tertiary-light/20">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-field" />
            <div class="flex items-center gap-space-sm mb-1">
              <span class="font-numeric text-body font-semibold text-field">HOJE</span>
              <span class="font-badge-mono text-badge-mono text-dark-text-strong">
                PLATAFORMA INTEGRADA
              </span>
            </div>
            <p class="font-body text-body-sm text-dark-text-muted">
              Liderança regional em intermediação de gado de corte, com fluxo contínuo de originação
              e atendimento a pecuaristas em todo o Sudeste e Centro-Oeste.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
