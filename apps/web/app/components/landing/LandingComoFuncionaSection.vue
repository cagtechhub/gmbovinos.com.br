<script setup lang="ts">
const defaultEtapas = [
  {
    titulo: 'Intenção e perfil do negócio',
    texto:
      'Entendemos se você compra, vende ou repassa gado, o perfil de lote desejado ou ofertado e o prazo — para direcionar a conversa e evitar perda de tempo.',
  },
  {
    titulo: 'Avaliação técnica do rebanho',
    texto:
      'Análise de condição animal, lote, risco sanitário e documentação: o mesmo olhar técnico da operação de engorda aplicado à decisão de compra ou venda.',
  },
  {
    titulo: 'Proposta e fechamento',
    texto:
      'Precificação alinhada ao mercado, transparência nas condições e acompanhamento da negociação até o acordo.',
  },
  {
    titulo: 'Logística e continuidade',
    texto:
      'Apoio na logística da troca e, quando fizer sentido, continuidade com planejamento de manejo ou engorda após o negócio.',
  },
]

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('como_funciona')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Processo comercial')
const headline = computed(() => payload.value?.headline || 'Como funciona')
const body = computed(
  () =>
    payload.value?.body ||
    'O foco principal é compra e venda de gado com critério técnico e clareza comercial. Engorda e manejo fazem parte da nossa base operacional — usamos esse know-how em cada etapa do negócio.'
)

const etapas = computed(() => {
  const steps = payload.value?.steps
  if (steps?.length) {
    return steps.map((step) => ({
      titulo: step.title,
      texto: step.description,
    }))
  }
  return defaultEtapas
})
</script>

<template>
  <section id="como-funciona" class="py-20 md:py-24" itemscope itemtype="https://schema.org/HowTo">
    <div class="landing-section-inner">
      <header class="mb-12 text-center md:mb-14">
        <p class="section-eyebrow justify-center">{{ eyebrow }}</p>
        <h2 class="section-title mt-4" itemprop="name">
          {{ headline }}
        </h2>
        <p class="section-lead" itemprop="description">
          {{ body }}
        </p>
      </header>

      <ol class="grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
        <li
          v-for="(etapa, index) in etapas"
          :key="etapa.titulo"
          class="step-rail"
          itemprop="step"
          itemscope
          itemtype="https://schema.org/HowToStep"
        >
          <meta itemprop="position" :content="String(index + 1)" />
          <p
            class="text-3xl font-semibold tabular-nums text-primary-700/20"
            aria-hidden="true"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </p>
          <h3 class="mt-1 text-lg font-semibold text-gray-900" itemprop="name">
            {{ etapa.titulo }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600 md:text-[0.95rem]" itemprop="text">
            {{ etapa.texto }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>
