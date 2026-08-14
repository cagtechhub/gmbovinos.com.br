<script setup lang="ts">
const defaultTimeline = [
  {
    year: 'Início',
    title: 'Origem na recria e engorda',
    text: 'Nascemos com atividades de recria e engorda de bois, construindo experiência prática no campo.',
  },
  {
    year: '2006',
    title: 'Sistema de confinamento',
    text: 'Com o crescimento da demanda, iniciamos o sistema de confinamento da Fazenda Paraíso em Varginha-MG, aumentando produtividade e eficiência operacional.',
  },
  {
    year: '2008',
    title: 'Inovação com BioFertilizante Conforto',
    text: 'Em parceria com a IFB Fertilizantes, criamos o BioFertilizante Conforto para transformar o excesso de esterco animal em insumo de alta qualidade para o solo.',
  },
  {
    year: 'Hoje',
    title: 'Negócios e operação integrada',
    text: 'Atuamos com foco em compra e venda de gado e em relações comerciais duradouras, apoiados por gestão, infraestrutura de confinamento e responsabilidade com parceiros e clientes.',
  },
]

const defaultParagraphs = [
  'A GM Bovinos nasceu na recria e engorda de bois. Em 2006, com o crescimento da demanda, iniciamos o confinamento na Fazenda Paraíso, em Varginha-MG.',
  'O sistema aumentou a produtividade e aproximou indústria, confinamento e parceiros. Desde então, mantemos foco em gestão, tecnologia e rotina de campo bem acompanhada.',
  'Em 2008, em parceria com a IFB Fertilizantes, criamos o BioFertilizante Conforto. A solução aproveita o esterco da propriedade e transforma esse material em insumo para o solo, com foco em sustentabilidade e produtividade.',
  'Hoje, atuamos com compra e venda de gado, avaliação de lote e apoio técnico no campo. O trabalho segue transparente, com respeito ao meio ambiente, colaboradores, parceiros, fornecedores e clientes.',
]

const defaultBody =
  'Hoje a frente comercial é compra e venda de gado, com a mesma seriedade de quem há anos opera engorda, confinamento e integração com indústria e parceiros no campo.'

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('about')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Quem somos')
const headline = computed(() => payload.value?.headline || 'Sobre nós')
const body = computed(() => payload.value?.body || defaultBody)

const paragraphs = computed(() => {
  const fromApi = payload.value?.paragraphs
  return fromApi?.length ? fromApi : defaultParagraphs
})

const timeline = computed(() => {
  const fromApi = payload.value?.timeline
  if (!fromApi?.length) return defaultTimeline

  return fromApi.map((item) => ({
    year: item.label,
    title:
      item.title?.trim() ||
      item.description.split('. ')[0]?.trim().replace(/\.$/, '') ||
      item.label,
    text: item.description,
  }))
})
</script>

<template>
  <section
    id="sobre-nos"
    class="section-band section-band--brand py-20 md:py-24"
  >
    <div class="section-accent-rule" aria-hidden="true" />

    <div class="landing-section-inner px-6 lg:px-10">
      <header class="mb-12 text-center md:mb-14">
        <p class="section-eyebrow section-eyebrow--light justify-center">{{ eyebrow }}</p>
        <h2 class="section-title section-title--light mt-4">{{ headline }}</h2>
        <p class="section-lead section-lead--light">
          {{ body }}
        </p>
      </header>

      <div class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <article class="landing-card card-accent-top">
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="index"
            class="text-sm leading-relaxed text-gray-900 md:text-[0.95rem]"
            :class="{ 'mt-4': index > 0 }"
          >
            {{ paragraph }}
          </p>
        </article>

        <aside class="landing-card card-accent-top">
          <h3 class="text-xl font-semibold tracking-tight text-gray-900">
            Linha do tempo
          </h3>
          <ol class="mt-5 space-y-3">
            <li
              v-for="item in timeline"
              :key="item.year + item.title"
              class="border border-gray-300/80 bg-gray-100/80 px-4 py-3 transition hover:border-accent-400/50"
            >
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
                      {{ item.year }}
                    </p>
                    <p class="text-sm font-semibold text-gray-900">{{ item.title }}</p>
                  </div>
                  <span class="text-gray-600 transition group-open:rotate-180" aria-hidden="true"
                    >⌄</span
                  >
                </summary>
                <p class="mt-2 text-sm leading-relaxed text-gray-900">
                  {{ item.text }}
                </p>
              </details>
            </li>
          </ol>
        </aside>
      </div>
    </div>
  </section>
</template>
