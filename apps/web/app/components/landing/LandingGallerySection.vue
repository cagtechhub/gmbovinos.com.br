<script setup lang="ts">
import type { LandingGalleryItem } from '~/composables/useGallery'

const defaultItems: Array<{
  badge: string
  subBadge?: string
  title: string
  description: string
  src: string
  type: 'image' | 'video'
  spanClass: string
}> = [
  {
    badge: 'Lote Recria Nelore',
    subBadge: 'SUL DE MINAS • 240 CABEÇAS',
    title: 'Homogeneidade e excelente padrão zootécnico',
    description:
      'Animais selecionados a pasto com alto potencial de ganho compensatório para confinamento.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjJn4lBAScF0Fz8aTbCN1N3OTqGyuIg7_tU9CM92H_k_PAoyC4jc-RUjj1GYHgk19g3joM6RNVRjp7x3h7t2m2SEZjk_miEU-Gdwb3aUVSjxqIbOympaegJjPGEv_Edx0_0tNvmoik17flVWSTh6xUAz5aAip9v7zUZdz2xCxjOvw4GG7fxLtHM6JsstRseLIQepIaEWu-X3uMRrPEO3v63E35w3dcBINEOdd6__IMchp3oXiByexZ',
    type: 'image',
    spanClass: 'md:col-span-7 min-h-[380px]',
  },
  {
    badge: 'Confinamento Varginha-MG',
    title: 'Dieta de Alta Densidade Energética',
    description: 'Nutrição assistida por zootecnista com controle rigoroso de sobras de cocho.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4hiL7Z0a3t74_OhV0islvEAe4XeGeVxSMFobKFnZ4_7NI9jrzCRZf0mD99AR8koTPI6yezE1OLicab1eZvWh0ME97CRGbohCHv2cnMbz0bjYwxPZ96dvmqclZg62fUY7jlwUlV9V3szGD1aceJ9aIS_8gZGjJFpJhlXELwKh4b-8emusHHjI6TOiYBa31Wq6_0DvAbfllu-kwGlu0WuGgq4VkdP0B4SWlGamMaH1OhtQvk4EdhNbg',
    type: 'image',
    spanClass: 'md:col-span-5 min-h-[380px]',
  },
  {
    badge: 'Manejo Racional',
    title: 'Currais Anti-estresse e Pesagem Digital',
    description: 'Estrutura que preserva a carcaça e evita hematomas e lesões no gado.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7e32bGehBOqMQMRYuI0Y5niuvivxwQ21qQ9f1dYisUF69lIOjcUmPFoLZczQ1mz_6fd195orgSfY-zBPL_CdmssZJU7IR2IxQeJLVU8PwbJ0XqhbhxQA1DHVWuHT3gTsPjfgy9fVjzS8A_8Tevj_pHUXbTjxPbb6Ty-CPJ3lrnUIUPDAaGLqIAW8MlASPQ4HPqeJQ0wxrYT-Qx5NsYcyyN0vSyPcYMG8NsGxlIiXDG331F8LO6qVD',
    type: 'image',
    spanClass: 'md:col-span-5 min-h-[320px]',
  },
  {
    badge: 'Lotes de Cruzamento Industrial',
    subBadge: 'F1 ANGUS / NELORE',
    title: 'Precocidade e Acabamento Superior',
    description: 'Lotes prontos para atender escalas de frigoríficos com premiação de carcaça.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnOLmSpqTtLU-b802OTHD1HJP8yDndK2DvQyYlulGsvAJVXPUV1RwbAr73BKvRjUMmP0ewHlVQMeuRVwi3EVWW9g-NWMbcXf3Jh87hPVY3WDPNGCOlzMihTaUpTQwPTz-mdZCDpqNCQ-4dQeaBbndTPwWVju9otDjQ19GVqDnFjnYThxbK7KMuVdBLQD1zBw__PF6OSgt3qP1wjWY1fQbvITKgi-0nArPq0a6XQ_kuStCqA72bmPnM',
    type: 'image',
    spanClass: 'md:col-span-7 min-h-[320px]',
  },
]

const { items: apiItems } = useGallery()

const displayedItems = computed(() => {
  if (apiItems.value && apiItems.value.length >= 4) {
    return apiItems.value.slice(0, 4).map((item: LandingGalleryItem, idx: number) => ({
      badge: item.caption || defaultItems[idx]?.badge || 'Manejo GM Bovinos',
      subBadge: defaultItems[idx]?.subBadge,
      title: item.caption || defaultItems[idx]?.title || 'Lote de Gado Selecionado',
      description:
        item.alt ||
        defaultItems[idx]?.description ||
        'Acompanhamento zootécnico e pesagem assistida.',
      src: item.src,
      type: item.type,
      spanClass: defaultItems[idx]?.spanClass || 'md:col-span-6 min-h-[340px]',
    }))
  }
  return defaultItems
})

let lightboxInstance: { destroy: () => void } | null = null

onMounted(async () => {
  if (import.meta.client) {
    try {
      const GLightbox = (await import('glightbox')).default
      lightboxInstance = GLightbox({
        selector: '.glightbox-stitch',
        touchNavigation: true,
        loop: true,
      })
    } catch {
      // Lightbox opcional
    }
  }
})

onUnmounted(() => {
  lightboxInstance?.destroy?.()
})
</script>

<template>
  <section
    id="gallery"
    class="w-full bg-surface-container-high/60 py-space-section-mobile md:py-space-section scroll-mt-20"
  >
    <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin">
      <!-- Section Title Group -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
        <div>
          <div class="flex items-center gap-space-sm mb-space-xs">
            <span class="inline-block w-8 h-[2px] bg-tertiary-dark" />
            <span class="font-label text-label text-tertiary-dark uppercase tracking-[0.24em]">
              Galeria de Lotes & Manejo
            </span>
          </div>
          <h2 class="font-headline text-headline-mobile md:text-headline text-text-strong">
            Padrão racial, aprumos e conformação de carcaça.
          </h2>
        </div>
        <div class="font-badge-mono text-badge-mono text-text-muted">
          LOTES RECENTES E ESTRUTURA EM ATIVIDADE
        </div>
      </div>

      <!-- Mosaic Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <a
          v-for="item in displayedItems"
          :key="item.title"
          :href="item.src"
          class="glightbox-stitch group relative rounded-xl overflow-hidden shadow-md bg-surface border border-stroke flex flex-col justify-end p-space-md cursor-pointer"
          :class="item.spanClass"
          :data-glightbox="`title: ${item.title}; description: ${item.description}`"
        >
          <div
            class="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            :style="{ backgroundImage: `url('${item.src}')` }"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-dark-canvas/90 via-dark-canvas/30 to-transparent"
          />
          <div class="relative z-10 flex flex-col gap-1">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="bg-primary-container text-on-primary font-badge-mono text-[10px] px-2 py-0.5 rounded uppercase font-semibold"
              >
                {{ item.badge }}
              </span>
              <span
                v-if="item.subBadge"
                class="bg-dark-surface-raised/90 text-dark-text-base font-badge-mono text-[10px] px-2 py-0.5 rounded border border-dark-stroke"
              >
                {{ item.subBadge }}
              </span>
            </div>
            <h3 class="font-title text-dark-text-strong text-title font-semibold mt-1">
              {{ item.title }}
            </h3>
            <p class="font-body-sm text-dark-text-muted text-body-sm line-clamp-1">
              {{ item.description }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
