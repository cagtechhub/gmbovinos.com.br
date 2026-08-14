<script setup lang="ts">
const config = useRuntimeConfig()
const seoLocality = computed(() => String(config.public.seoLocality || 'Minas Gerais').trim())

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('seo_content')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Padrão de atendimento')
const headline = computed(
  () => payload.value?.headline || 'Compra e venda de gado com critério técnico'
)
const body = computed(
  () =>
    payload.value?.body ||
    'Negociamos gado com avaliação de lote, alinhamento de preço e acompanhamento da transação. Engorda, nutrição e sanidade entram como suporte técnico — para quem compra ou vende e para quem também contrata manejo no campo.'
)

const primaryCardHeadline = computed(
  () => payload.value?.secondaryHeadline || 'Como conduzimos o negócio'
)
const primaryCardBody = computed(
  () =>
    payload.value?.secondaryBody ||
    'Começamos pela conversa objetiva (comprar, vender ou repassar), seguimos com visita ou análise do rebanho e fechamos com proposta clara e logística alinhada. O mesmo rigor de quem opera engorda no dia a dia reduz surpresa na hora de assinar o negócio.'
)
const primaryBullets = computed(
  () =>
    payload.value?.bullets || [
      'Avaliação de condição animal e de lote antes da proposta.',
      'Transparência em preço, prazo e responsabilidades de cada parte.',
      'Acompanhamento até a conclusão da troca e suporte pós-negócio quando necessário.',
    ]
)

const secondaryCardHeadline = computed(
  () => payload.value?.audienceHeadline?.trim() || 'Para quem é indicado'
)
const secondaryCardBody = computed(() => {
  if (payload.value?.audienceBody?.trim()) return payload.value.audienceBody
  const bullets = payload.value?.secondaryBullets
  if (bullets?.length) return bullets.join(' ')
  return 'Produtores e parceiros que querem comprar ou vender gado com interlocutor presente; quem busca avaliação técnica antes de fechar; e quem, além do negócio, precisa de planejamento de engorda ou manejo contínuo na fazenda.'
})
</script>

<template>
  <section id="sobre-servico" class="py-20 md:py-24">
    <div class="landing-section-inner">
      <header class="mb-12 text-center md:mb-14">
        <p class="section-eyebrow justify-center">{{ eyebrow }}</p>
        <h2 class="section-title mt-4">
          {{ headline }}
        </h2>
        <p class="section-lead">
          {{ body }}
          <template v-if="seoLocality"> Atendemos em {{ seoLocality }} e região.</template>
        </p>
      </header>

      <div class="grid gap-6 md:grid-cols-2">
        <article class="landing-card card-accent-top">
          <h3 class="text-lg font-semibold text-gray-900">{{ primaryCardHeadline }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-gray-600">
            {{ primaryCardBody }}
          </p>
          <ul class="mt-5 list-disc space-y-2.5 pl-5 text-sm text-gray-600">
            <li v-for="bullet in primaryBullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </article>

        <article class="landing-card card-accent-top">
          <h3 class="text-lg font-semibold text-gray-900">{{ secondaryCardHeadline }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-gray-600">
            {{ secondaryCardBody }}
          </p>
          <nav
            class="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm"
            aria-label="Navegação de seções da landing"
          >
            <a
              href="#gallery"
              class="font-medium text-primary-500 underline-offset-4 transition hover:text-primary-700 hover:underline"
              >Ver galeria</a
            >
            <a
              href="#como-funciona"
              class="font-medium text-primary-500 underline-offset-4 transition hover:text-primary-700 hover:underline"
              >Entender processo</a
            >
            <a
              href="#atuacao"
              class="font-medium text-primary-500 underline-offset-4 transition hover:text-primary-700 hover:underline"
              >Ver atuação</a
            >
            <a
              href="#cta"
              class="font-medium text-primary-500 underline-offset-4 transition hover:text-primary-700 hover:underline"
              >Falar com a equipe</a
            >
          </nav>
        </article>
      </div>
    </div>
  </section>
</template>
