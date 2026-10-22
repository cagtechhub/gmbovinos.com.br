<script setup lang="ts">
const config = useRuntimeConfig()
const seoLocality = computed(() => String(config.public.seoLocality || '').trim())

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('hero')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'GM BOVINOS • PECUÁRIA DE CORTE')
const headline = computed(
  () => payload.value?.headline || 'Compra e venda de gado com critério técnico.'
)
const body = computed(
  () =>
    payload.value?.body ||
    'Avaliação rigorosa de lotes, alinhamento transparente de preço e acompanhamento integral da negociação em Minas Gerais e principais praças pecuárias do país.'
)
const chip = computed(() => payload.value?.chip || 'NEGOCIAÇÃO TÉCNICA • TRANSPARÊNCIA COMERCIAL')
const { heroImageUrl } = useGallery()
const heroBackgroundImage = computed(
  () =>
    heroImageUrl.value ||
    payload.value?.imageUrl ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ3eXpHAAmxCHlveaZ688WYKN74OY8bPeSuLRZD8-X5oA6n1sC0lHrlQc9MQamFWQ1PK5EQrclHC3rtOapTIg3ajR23f2GD3fpNpcXHJZnrGJhM09qYhtgHTyo_iRjD0XUS3fNO3JmbcsTt18z3EAT0api9saOcw89zYSUGtKepg3zdKLyIyNAotscdDCEYmk1v4LnBbrmOmBzec2gBg0xd9Ll8pZ6nHaSRn3Lmp6mMHSoUXHlnEOJ'
)
const ctaPrimaryLabel = computed(() => payload.value?.ctaPrimaryLabel || 'Fale com a equipe')
const ctaPrimaryHref = computed(() => payload.value?.ctaPrimaryHref || '#cta')
const ctaSecondaryLabel = computed(() => payload.value?.ctaSecondaryLabel || 'Como funciona')
const ctaSecondaryHref = computed(() => payload.value?.ctaSecondaryHref || '#como-funciona')
</script>

<template>
  <section
    id="hero"
    class="relative w-full overflow-hidden bg-dark-canvas min-h-[760px] md:min-h-[820px] flex flex-col justify-between pt-24 pb-0"
  >
    <!-- Background foto realista e gradientes atmosféricos -->
    <div class="absolute inset-0 z-0">
      <div
        class="w-full h-full bg-cover bg-center transition-transform duration-700"
        :style="{ backgroundImage: `url('${heroBackgroundImage}')` }"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-dark-canvas via-dark-surface/90 to-transparent"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-dark-canvas via-dark-canvas/50 to-transparent"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(#25407A_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none"
      />
    </div>

    <!-- Conteúdo principal do Hero -->
    <div
      class="relative z-10 max-w-[1240px] w-full mx-auto px-margin-mobile md:px-margin pt-12 pb-16"
    >
      <div class="max-w-3xl flex flex-col gap-space-lg">
        <!-- Eyebrow Group com traço couro e micro tag de negociação -->
        <div class="flex flex-wrap items-center gap-space-sm">
          <span class="inline-block w-8 h-[2px] bg-tertiary-fixed-dim shrink-0" />
          <span class="font-label text-label text-tertiary-light tracking-[0.24em] uppercase">
            {{ eyebrow }}
          </span>
          <span
            class="font-badge-mono text-badge-mono text-tertiary-light bg-dark-surface-raised/80 px-2 py-0.5 rounded border border-tertiary-fixed-dim/40 tracking-wider"
          >
            {{ chip }}
          </span>
        </div>

        <!-- Headline em Fraunces -->
        <h1
          class="font-display-xl text-display-xl-mobile md:text-display-xl text-dark-text-strong font-medium tracking-tight"
        >
          {{ headline }}
          <template v-if="seoLocality">
            <span class="block text-2xl font-normal text-tertiary-light/90 md:text-3xl mt-2">
              em {{ seoLocality }}
            </span>
          </template>
        </h1>

        <!-- Subtítulo e proposta de valor -->
        <p class="font-body-lg text-body-lg text-dark-text-base max-w-2xl leading-relaxed">
          {{ body }}
        </p>

        <!-- Ações do Hero -->
        <div class="flex flex-wrap items-center gap-space-md pt-space-xs">
          <a
            :href="ctaPrimaryHref"
            class="inline-flex items-center justify-center h-[52px] px-8 rounded bg-primary-container text-on-primary font-label text-label tracking-[0.18em] uppercase hover:bg-primary-hover transition-all shadow-[0_8px_24px_rgba(31,95,214,0.35)] focus:ring-2 focus:ring-primary-container focus:ring-offset-2 focus:outline-none"
          >
            <span class="mr-2 material-symbols-outlined text-[18px]">handshake</span>
            {{ ctaPrimaryLabel }}
          </a>
          <a
            :href="ctaSecondaryHref"
            class="inline-flex items-center justify-center h-[52px] px-8 rounded bg-dark-surface-raised/60 text-dark-text-strong font-label text-label tracking-[0.18em] uppercase hover:bg-dark-surface-raised transition-all border border-dark-stroke hover:border-tertiary-fixed-dim/60"
          >
            {{ ctaSecondaryLabel }}
          </a>

          <!-- Desk status telemetry badge -->
          <div
            class="hidden sm:flex items-center gap-2 px-3 py-2 rounded bg-dark-surface/80 border border-dark-stroke font-badge-mono text-badge-mono text-dark-text-muted ml-auto"
          >
            <span class="w-2 h-2 rounded-full bg-field animate-pulse" />
            <span>MESA ATIVA: ORIGINAÇÃO MG / SP / GO</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Terminal Spec HUD Strip (Fita inferior de telemetria) -->
    <div
      class="relative z-10 w-full bg-dark-canvas/95 border-t border-dark-stroke backdrop-blur-md"
    >
      <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin py-4">
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 md:divide-x md:divide-dark-stroke/60 font-numeric text-numeric"
        >
          <div class="flex items-center gap-3 md:pr-4">
            <span class="font-badge-mono text-tertiary-light font-bold text-label">[01]</span>
            <div class="flex flex-col">
              <span class="font-label text-[11px] text-dark-text-muted uppercase tracking-[0.18em]">
                Prioridade Comercial
              </span>
              <span class="text-dark-text-strong text-body-sm font-medium">
                Compra e venda ativa de lotes selecionados
              </span>
            </div>
          </div>
          <div class="flex items-center gap-3 md:px-4">
            <span class="font-badge-mono text-tertiary-light font-bold text-label">[02]</span>
            <div class="flex flex-col">
              <span class="font-label text-[11px] text-dark-text-muted uppercase tracking-[0.18em]">
                Base Operacional
              </span>
              <span class="text-dark-text-strong text-body-sm font-medium">
                Confinamento Fazenda Paraíso • Varginha/MG
              </span>
            </div>
          </div>
          <div class="flex items-center gap-3 md:pl-4">
            <span class="font-badge-mono text-tertiary-light font-bold text-label">[03]</span>
            <div class="flex flex-col">
              <span class="font-label text-[11px] text-dark-text-muted uppercase tracking-[0.18em]">
                Compromisso Central
              </span>
              <span class="text-dark-text-strong text-body-sm font-medium">
                Segurança jurídica, liquidez e aferição técnica
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
