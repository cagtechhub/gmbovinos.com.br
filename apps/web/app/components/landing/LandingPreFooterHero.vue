<script setup lang="ts">
const config = useRuntimeConfig()

const rawWhatsapp = computed(() =>
  String(config.public.whatsappNumber || config.public.businessPhone || '5535998421200').replace(
    /\D/g,
    ''
  )
)
const whatsappLink = computed(
  () =>
    `https://wa.me/${rawWhatsapp.value}?text=${encodeURIComponent('Olá! Gostaria de falar sobre compra ou venda de gado com a GM Bovinos.')}`
)

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('pre_footer')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Liquidez & Confiança')
const headline = computed(
  () => payload.value?.headline || 'Pronto para negociar com quem entende o valor do seu gado?'
)
const body = computed(
  () =>
    payload.value?.body ||
    'Entre em contato direto com a GM Bovinos. Compramos e vendemos lotes com avaliação técnica presencial e liquidação transparente.'
)
const backgroundImage = computed(
  () =>
    payload.value?.imageUrl ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCRzaw5nv00i8jc2b5u_hZGDcoZhS3MeuwyyOVQxmP2ft0Quq7LQvpiPwJoJJuMxAFqB4xaI4N0ymf4TE2uM7JEKkJ8ekP6dp5WxEr0HWqFsB5J-SNnNYDA5A73cNNio9SsrgjDNuFPAA8H2Bt4b1mXiUzym3EL79dYZ4W3tPB6dQK3mYedl-3-o8ASa331JvBxBOgzhdQ8gWgnq61g0klKd57DTTvDF_2DddoDDVrmcPBktgg_YqJ7'
)
</script>

<template>
  <section
    class="relative w-full py-space-2xl bg-dark-canvas overflow-hidden border-t border-dark-stroke"
    aria-label="Destaque comercial final"
  >
    <!-- Background cinematográfico panorâmico -->
    <div class="absolute inset-0 z-0">
      <div
        class="w-full h-full bg-cover bg-center"
        :style="{ backgroundImage: `url('${backgroundImage}')` }"
      />
      <div class="absolute inset-0 bg-dark-canvas/85" />
      <div
        class="absolute inset-0 bg-gradient-to-r from-dark-canvas via-dark-canvas/75 to-dark-surface/80"
      />
    </div>

    <!-- Conteúdo do Bloco Pré-Rodapé -->
    <div
      class="relative z-10 max-w-[1240px] mx-auto px-margin-mobile md:px-margin flex flex-col md:flex-row items-center justify-between gap-space-xl"
    >
      <div class="max-w-xl flex flex-col gap-space-xs">
        <span class="font-label text-label text-tertiary-light uppercase tracking-[0.24em]">
          {{ eyebrow }}
        </span>
        <h2 class="font-headline text-headline-mobile md:text-headline text-dark-text-strong">
          {{ headline }}
        </h2>
        <p class="font-body text-body-sm text-dark-text-muted">
          {{ body }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-space-md shrink-0 w-full sm:w-auto">
        <a
          class="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-8 rounded bg-whatsapp text-on-primary font-label text-label tracking-[0.18em] uppercase hover:opacity-90 transition-all shadow-[0_8px_24px_rgba(1,163,164,0.35)]"
          :href="whatsappLink"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span class="material-symbols-outlined text-[20px] mr-2">chat</span>
          WhatsApp Comercial
        </a>
        <a
          class="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-8 rounded bg-dark-surface-raised/80 text-dark-text-strong font-label text-label tracking-[0.18em] uppercase border border-dark-stroke hover:border-tertiary-light transition-all"
          href="#cta"
        >
          Cadastrar Lote
        </a>
      </div>
    </div>
  </section>
</template>
