<script setup lang="ts">
const config = useRuntimeConfig()
const seoLocality = computed(() => String(config.public.seoLocality || 'Minas Gerais').trim())

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('seo_content')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Rigor & Credibilidade')
const headline = computed(
  () => payload.value?.headline || 'Pecuária orientada por números e compromisso de palavra.'
)
const body = computed(
  () =>
    payload.value?.body ||
    'No campo brasileiro, a rentabilidade do pecuarista é decidida na precisão da compra da reposição e na eficiência da engorda. A GM Bovinos nasceu para superar as incertezas de balança e negociações sem base técnica comprovada.'
)
const secondaryBody = computed(
  () =>
    payload.value?.secondaryBody ||
    'Com sede em Varginha e operação estendida pelas principais bacias produtoras do Sul e Sudoeste de Minas Gerais, atuamos como um parceiro zootécnico estratégico. Quando apresentamos um lote, entregamos histórico, rendimento estimado e liquidez financeira comprovada.'
)
</script>

<template>
  <section
    id="sobre-servico"
    class="w-full bg-surface-container-low py-space-section-mobile md:py-space-section scroll-mt-20"
  >
    <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <!-- Left: Editorial Content (6 Cols Desktop) -->
        <div class="lg:col-span-6 flex flex-col gap-space-md">
          <div class="flex items-center gap-space-sm">
            <span class="inline-block w-8 h-[2px] bg-tertiary-dark" />
            <span class="font-label text-label text-tertiary-dark uppercase tracking-[0.24em]">
              {{ eyebrow }}
            </span>
          </div>
          <h2
            class="font-display-lg text-display-lg-mobile md:text-display-lg text-text-strong font-medium"
          >
            {{ headline }}
          </h2>
          <div
            class="flex flex-col gap-space-sm font-body text-body text-text-base leading-relaxed"
          >
            <p>{{ body }}</p>
            <p>{{ secondaryBody }}</p>
            <p v-if="seoLocality" class="text-sm font-medium text-text-muted">
              Base operacional em Varginha e atendimento em {{ seoLocality }} e região.
            </p>
          </div>

          <!-- Technical Spec Badges Row -->
          <div class="grid grid-cols-3 gap-space-sm pt-space-sm font-badge-mono text-badge-mono">
            <div class="p-3 bg-surface rounded border border-stroke flex flex-col">
              <span class="text-tertiary-dark font-numeric text-title font-semibold">+12</span>
              <span class="text-text-muted uppercase text-[10px] mt-1">Anos de Originação</span>
            </div>
            <div class="p-3 bg-surface rounded border border-stroke flex flex-col">
              <span class="text-primary-container font-numeric text-title font-semibold">100%</span>
              <span class="text-text-muted uppercase text-[10px] mt-1">Pesagem Auditada</span>
            </div>
            <div class="p-3 bg-surface rounded border border-stroke flex flex-col">
              <span class="text-field font-numeric text-title font-semibold">0%</span>
              <span class="text-text-muted uppercase text-[10px] mt-1">Inadimplência</span>
            </div>
          </div>

          <div class="pt-space-xs">
            <a
              class="inline-flex items-center gap-space-xs text-primary font-title font-semibold hover:text-primary-hover"
              href="#cta"
            >
              <span>Agendar visita ao Confinamento Fazenda Paraíso</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- Right: Passe-Partout Framed Photo Asset (6 Cols Desktop) -->
        <div class="lg:col-span-6">
          <div
            class="p-4 md:p-6 bg-surface-muted rounded-xl border border-stroke shadow-[0_8px_32px_rgba(20,24,31,0.08)]"
          >
            <div
              class="relative w-full aspect-[4/3] rounded overflow-hidden border border-stroke bg-surface"
            >
              <img
                class="w-full h-full object-cover"
                alt="Retrato de pecuarista e engenheiro inspecionando currais de manejo na Fazenda Paraíso"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8cTk9RKl065zlVqSgjTuqF90FnTjrwHoW2auvU8ldXH-Jc54-vlwG1J_tivK-JF9NI2n-Rj43wEBPAOJXafAi0X0uxxaoa-DDFsdepDjIrwyP5aRUHwIv9zGMR9dxc__Xng9DzmqCIyVgJIpedETaax9TGtJmNmOJdh4gYT_rzHzkfQLD0pEAmkC1e_iDJFgYf_c6gd5yD67IdbuJsaOXdiHGGO4lwgE2z8NidotW2zCpWAhqHcos"
              />
              <div
                class="absolute bottom-3 left-3 bg-dark-canvas/90 backdrop-blur-md px-3 py-1.5 rounded border border-dark-stroke font-badge-mono text-[10px] text-tertiary-light"
              >
                FAZENDA PARAÍSO • VARGINHA-MG • MANEJO RACIONAL
              </div>
            </div>
            <div
              class="mt-3 flex items-center justify-between text-text-muted font-badge-mono text-[11px]"
            >
              <span>REF: AUDITORIA ZOOTÉCNICA PRESENCIAL</span>
              <span>PADRÃO SUL DE MINAS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
