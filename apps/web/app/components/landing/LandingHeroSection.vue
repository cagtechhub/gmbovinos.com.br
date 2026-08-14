<script setup lang="ts">
const config = useRuntimeConfig()
const seoLocality = computed(() => String(config.public.seoLocality || '').trim())

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('hero')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'GM Bovinos · Pecuária de corte')
const headline = computed(() => payload.value?.headline || 'Compra e venda de gado')
const body = computed(
  () =>
    payload.value?.body ||
    'Avaliação de lote, alinhamento de preço e acompanhamento da transação — com base técnica em engorda, manejo e sanidade para fechar com mais segurança.'
)
const chip = computed(() => payload.value?.chip || 'Negociação técnica · transparência comercial')
const { heroImageUrl } = useGallery()
const heroBackgroundImage = computed(
  () => heroImageUrl.value || payload.value?.imageUrl || '/media/photos/02.webp',
)
const ctaPrimaryLabel = computed(() => payload.value?.ctaPrimaryLabel || 'Ver galeria')
const ctaPrimaryHref = computed(() => payload.value?.ctaPrimaryHref || '#gallery')
const ctaSecondaryLabel = computed(() => payload.value?.ctaSecondaryLabel || 'Como funciona')
const ctaSecondaryHref = computed(() => payload.value?.ctaSecondaryHref || '#como-funciona')

/**
 * Degradês sobre a foto. Base azul institucional (`primary-700`) na parte inferior
 * para fundir com a seção seguinte e reforçar a identidade azul + couro.
 */
const heroImageOverlayGradients = [
  'linear-gradient(to bottom, rgb(0 0 0 / 0.5) 0%, rgb(0 0 0 / 0.12) 36%, transparent 56%)',
  'linear-gradient(to top, rgb(30 58 138 / 0.96) 0%, rgb(30 58 138 / 0.45) 30%, transparent 62%)',
  'radial-gradient(ellipse 100% 70% at 50% 40%, transparent 28%, rgb(0 0 0 / 0.4) 100%)',
].join(', ')
</script>

<template>
  <section
    id="hero"
    class="relative isolate flex min-h-[min(94vh,54rem)] w-screen items-center justify-center overflow-x-clip bg-primary-700 ml-[calc(50%-50vw)]"
  >
    <div
      class="pointer-events-none absolute inset-0 origin-center scale-105 bg-cover bg-center bg-no-repeat photo-warm photo-kenburns motion-reduce:scale-100"
      :style="{ backgroundImage: `url('${heroBackgroundImage}')` }"
      aria-hidden="true"
    />

    <div
      class="pointer-events-none absolute inset-0 top-0"
      :style="{ backgroundImage: heroImageOverlayGradients }"
      aria-hidden="true"
    />

    <div
      class="pointer-events-none absolute bottom-0 left-10 h-28 w-px bg-gradient-to-t from-accent-400 via-accent-400/50 to-transparent md:left-14"
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-10 pb-24 pt-32 text-center md:pt-36 lg:px-14"
    >
      <p class="section-eyebrow section-eyebrow--light mb-7 animate-fade-up">{{ eyebrow }}</p>

      <h1
        class="font-sans text-4xl font-semibold uppercase leading-[1.05] tracking-[0.16em] text-white animate-fade-up reveal-delay-1 md:text-5xl lg:text-6xl"
      >
        {{ headline }}
        <template v-if="seoLocality">
          <span class="mt-2 block text-2xl tracking-[0.12em] text-white/95 md:text-3xl"
            >em {{ seoLocality }}</span
          >
        </template>
      </h1>

      <p
        v-if="seoLocality"
        class="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-300 animate-fade-up reveal-delay-2"
      >
        Negócios e atendimento em {{ seoLocality }}
      </p>

      <p
        class="mt-7 mb-5 max-w-2xl text-base leading-relaxed text-white/90 animate-fade-up reveal-delay-2 md:text-lg"
      >
        {{ body }}
      </p>

      <p
        class="border-b border-accent-400/70 pb-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/95 animate-fade-up reveal-delay-3"
      >
        {{ chip }}
      </p>

      <div class="mt-11 flex flex-wrap items-center justify-center gap-3 animate-fade-up reveal-delay-4">
        <a :href="ctaPrimaryHref" class="btn-landing btn-landing--light">
          {{ ctaPrimaryLabel }}
        </a>
        <a :href="ctaSecondaryHref" class="btn-landing btn-landing--accent">
          {{ ctaSecondaryLabel }}
        </a>
      </div>
    </div>
  </section>
</template>
