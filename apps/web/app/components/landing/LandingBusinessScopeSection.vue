<script setup lang="ts">
const config = useRuntimeConfig()
const seoLocality = computed(() => String(config.public.seoLocality || 'Minas Gerais').trim())

const defaultPillars = [
  {
    title: 'Compra e venda de gado',
    description:
      'Negociação de lote com análise de condição animal, precificação alinhada ao mercado e acompanhamento da transação — prioridade na operação da GM Bovinos.',
    points: [
      'Avaliação técnica para compra ou venda com mais segurança',
      'Transparência nas condições e no processo comercial',
      'Parcerias de longo prazo com produtores e frigoríficos',
    ],
  },
  {
    title: 'Engorda e serviços técnicos no campo',
    description:
      'Quando o produtor contrata manejo ou engorda, oferecemos planejamento nutricional, protocolos sanitários e acompanhamento contínuo — a mesma base que sustenta nossas avaliações comerciais.',
    points: [
      'Plano técnico por fase do rebanho',
      'Rotina operacional orientada por indicadores',
      'Suporte para decisões no manejo e na performance do lote',
    ],
  },
]

const defaultHighlightChips = [
  { label: 'Prioridade', value: 'Compra e venda de gado' },
  { label: 'Base técnica', value: 'Engorda e manejo' },
  { label: 'Foco', value: 'Negócio seguro e claro' },
]

const defaultBody =
  'A GM Bovinos tem como foco principal a compra e venda de gado, com avaliação de lote e acompanhamento comercial de ponta a ponta. A operação de engorda, manejo e sanidade é a base técnica que sustenta negócios mais seguros e previsíveis para produtores e parceiros.'

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('atuacao')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Atuação institucional')
const headline = computed(() => payload.value?.headline || 'Atuação da GM Bovinos')
const body = computed(() => payload.value?.body || defaultBody)

const highlightChips = computed(() => {
  const fromApi = payload.value?.highlightChips
  if (fromApi?.length) return fromApi
  const chips = payload.value?.chips
  if (chips?.length) {
    return chips.map((chip, index) => ({
      label: defaultHighlightChips[index]?.label || `Destaque ${index + 1}`,
      value: chip,
    }))
  }
  return defaultHighlightChips
})

const pillars = computed(() => {
  const fromApi = payload.value?.pillars
  if (fromApi?.length) {
    return fromApi.map((pillar, index) => ({
      title: pillar.title,
      description: pillar.description,
      points: pillar.points?.length ? pillar.points : (defaultPillars[index]?.points ?? []),
    }))
  }
  return defaultPillars
})
</script>

<template>
  <section
    id="atuacao"
    class="section-band section-band--brand py-20 shadow-none md:py-24"
  >
    <div class="section-accent-rule" aria-hidden="true" />

    <div class="landing-section-inner px-6 lg:px-10">
      <header class="mb-12 text-center md:mb-14">
        <p class="section-eyebrow section-eyebrow--light justify-center">{{ eyebrow }}</p>
        <h2 class="section-title section-title--light mt-4">{{ headline }}</h2>
        <p class="section-lead section-lead--light">
          {{ body }}
          <span v-if="seoLocality" class="font-semibold text-white">
            Atendemos em {{ seoLocality }} e região.</span
          >
        </p>
      </header>

      <div class="mb-10 grid gap-3 sm:grid-cols-3">
        <article
          v-for="chip in highlightChips"
          :key="chip.label + chip.value"
          class="border border-white/10 bg-white/[0.04] px-4 py-5 text-center backdrop-blur-sm"
        >
          <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent-300">
            {{ chip.label }}
          </p>
          <p class="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
            {{ chip.value }}
          </p>
        </article>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="pillar in pillars"
          :key="pillar.title"
          class="landing-card card-accent-top"
        >
          <div class="mb-4 flex items-center gap-3">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10 text-primary-700 ring-1 ring-accent-400/40"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path d="M4 12h16M12 4v16" />
              </svg>
            </span>
            <h3 class="text-lg font-semibold text-gray-900">{{ pillar.title }}</h3>
          </div>

          <p class="text-sm leading-relaxed text-gray-600">
            {{ pillar.description }}
          </p>

          <ul v-if="pillar.points.length" class="mt-5 space-y-2.5 text-sm text-gray-900">
            <li v-for="point in pillar.points" :key="point" class="flex items-start gap-2.5">
              <span
                class="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500"
                aria-hidden="true"
              />
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
