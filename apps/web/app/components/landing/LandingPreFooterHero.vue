<script setup lang="ts">
const config = useRuntimeConfig()

const instagramUrl = computed(() => String(config.public.instagramUrl || '').trim())
const facebookUrl = computed(() => String(config.public.facebookUrl || '').trim())
const displaySocialLinks = computed(() => instagramUrl.value || facebookUrl.value)

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('pre_footer')?.payload)

const chip = computed(() => payload.value?.chip || payload.value?.eyebrow || 'GM Bovinos')
const headline = computed(() => payload.value?.headline || 'Compra e venda de gado')
const body = computed(
  () =>
    payload.value?.body ||
    'Negócios com avaliação técnica e transparência — sustentados por décadas de experiência em engorda, manejo e operação no campo.'
)
const backgroundImage = computed(() => payload.value?.imageUrl || '/media/photos/07.webp')
</script>

<template>
  <section class="relative isolate w-full overflow-hidden" aria-label="Destaque institucional">
    <!-- Camada de fundo levemente maior que a viewport (efeito próximo ao “motion layer” 110%). -->
    <div
      class="pointer-events-none absolute inset-y-0 left-1/2 w-[110%] max-w-none -translate-x-1/2 bg-cover bg-center bg-no-repeat photo-warm"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
    />

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-700/90 via-primary-700/45 to-black/25"
      aria-hidden="true"
    />

    <div class="section-accent-rule" aria-hidden="true" />

    <div
      class="relative z-10 mx-auto flex min-h-[min(85vh,52rem)] w-full max-w-4xl flex-col items-center justify-center gap-8 px-6 py-20 text-center text-white md:min-h-[min(78vh,48rem)] md:py-24"
    >
      <div class="flex flex-col items-center gap-3">
        <p
          class="section-eyebrow section-eyebrow--light mb-2 justify-center border-0 bg-transparent px-0 py-0 tracking-[0.24em]"
        >
          {{ chip }}
        </p>
        <h2
          class="font-sans text-4xl font-semibold uppercase tracking-[0.14em] md:text-5xl lg:text-6xl"
        >
          {{ headline }}
        </h2>
        <p class="max-w-xl text-base text-white/85 md:text-lg">
          {{ body }}
        </p>
      </div>

      <!-- <a
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center rounded-none border-2 border-white px-10 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-gray-900"
        @click.prevent="store.openWhatsApp('pre_footer_hero')"
      >
        Fale conosco
      </a> -->

      <div
        v-if="(instagramUrl || facebookUrl) && displaySocialLinks"
        class="flex flex-wrap items-center justify-center gap-3"
        aria-label="Redes sociais"
      >
        <a
          v-if="instagramUrl"
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="Acessar Instagram da GM Bovinos"
          class="btn-landing btn-landing--light !min-w-0 gap-2 px-5 py-2.5"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
            <path
              d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.5h-8.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5Zm-4.25 3.75A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25Zm0 1.5A3.25 3.25 0 1 0 15.25 12 3.25 3.25 0 0 0 12 8.75Zm5.2-2.12a1.12 1.12 0 1 1-1.12 1.12 1.12 1.12 0 0 1 1.12-1.12Z"
            />
          </svg>
          Instagram
        </a>

        <a
          v-if="facebookUrl"
          :href="facebookUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="Acessar Facebook da GM Bovinos"
          class="btn-landing btn-landing--light !min-w-0 gap-2 px-5 py-2.5"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
            <path
              d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.54-4.7 1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.5 0-1.96.94-1.96 1.9v2.28h3.34l-.53 3.49h-2.81V24C19.61 23.1 24 18.1 24 12.07Z"
            />
          </svg>
          Facebook
        </a>
      </div>
    </div>
  </section>
</template>
