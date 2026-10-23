<script setup lang="ts">
import type { LandingGalleryItem } from '~/composables/useGallery'

type GalleryDisplayItem = {
  badge: string
  subBadge?: string
  title: string
  description: string
  src: string
  poster?: string
  type: 'image' | 'video'
}

const defaultStitchItems: GalleryDisplayItem[] = [
  {
    badge: 'Lote Recria Nelore',
    subBadge: 'SUL DE MINAS • 240 CABEÇAS',
    title: 'Homogeneidade e excelente padrão zootécnico',
    description:
      'Animais selecionados a pasto com alto potencial de ganho compensatório para confinamento.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjJn4lBAScF0Fz8aTbCN1N3OTqGyuIg7_tU9CM92H_k_PAoyC4jc-RUjj1GYHgk19g3joM6RNVRjp7x3h7t2m2SEZjk_miEU-Gdwb3aUVSjxqIbOympaegJjPGEv_Edx0_0tNvmoik17flVWSTh6xUAz5aAip9v7zUZdz2xCxjOvw4GG7fxLtHM6JsstRseLIQepIaEWu-X3uMRrPEO3v63E35w3dcBINEOdd6__IMchp3oXiByexZ',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjJn4lBAScF0Fz8aTbCN1N3OTqGyuIg7_tU9CM92H_k_PAoyC4jc-RUjj1GYHgk19g3joM6RNVRjp7x3h7t2m2SEZjk_miEU-Gdwb3aUVSjxqIbOympaegJjPGEv_Edx0_0tNvmoik17flVWSTh6xUAz5aAip9v7zUZdz2xCxjOvw4GG7fxLtHM6JsstRseLIQepIaEWu-X3uMRrPEO3v63E35w3dcBINEOdd6__IMchp3oXiByexZ',
    type: 'image',
  },
  {
    badge: 'Confinamento Varginha-MG',
    title: 'Dieta de Alta Densidade Energética',
    description: 'Nutrição assistida por zootecnista com controle rigoroso de sobras de cocho.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4hiL7Z0a3t74_OhV0islvEAe4XeGeVxSMFobKFnZ4_7NI9jrzCRZf0mD99AR8koTPI6yezE1OLicab1eZvWh0ME97CRGbohCHv2cnMbz0bjYwxPZ96dvmqclZg62fUY7jlwUlV9V3szGD1aceJ9aIS_8gZGjJFpJhlXELwKh4b-8emusHHjI6TOiYBa31Wq6_0DvAbfllu-kwGlu0WuGgq4VkdP0B4SWlGamMaH1OhtQvk4EdhNbg',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4hiL7Z0a3t74_OhV0islvEAe4XeGeVxSMFobKFnZ4_7NI9jrzCRZf0mD99AR8koTPI6yezE1OLicab1eZvWh0ME97CRGbohCHv2cnMbz0bjYwxPZ96dvmqclZg62fUY7jlwUlV9V3szGD1aceJ9aIS_8gZGjJFpJhlXELwKh4b-8emusHHjI6TOiYBa31Wq6_0DvAbfllu-kwGlu0WuGgq4VkdP0B4SWlGamMaH1OhtQvk4EdhNbg',
    type: 'image',
  },
  {
    badge: 'Manejo Racional',
    title: 'Currais Anti-estresse e Pesagem Digital',
    description: 'Estrutura que preserva a carcaça e evita hematomas e lesões no gado.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7e32bGehBOqMQMRYuI0Y5niuvivxwQ21qQ9f1dYisUF69lIOjcUmPFoLZczQ1mz_6fd195orgSfY-zBPL_CdmssZJU7IR2IxQeJLVU8PwbJ0XqhbhxQA1DHVWuHT3gTsPjfgy9fVjzS8A_8Tevj_pHUXbTjxPbb6Ty-CPJ3lrnUIUPDAaGLqIAW8MlASPQ4HPqeJQ0wxrYT-Qx5NsYcyyN0vSyPcYMG8NsGxlIiXDG331F8LO6qVD',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC7e32bGehBOqMQMRYuI0Y5niuvivxwQ21qQ9f1dYisUF69lIOjcUmPFoLZczQ1mz_6fd195orgSfY-zBPL_CdmssZJU7IR2IxQeJLVU8PwbJ0XqhbhxQA1DHVWuHT3gTsPjfgy9fVjzS8A_8Tevj_pHUXbTjxPbb6Ty-CPJ3lrnUIUPDAaGLqIAW8MlASPQ4HPqeJQ0wxrYT-Qx5NsYcyyN0vSyPcYMG8NsGxlIiXDG331F8LO6qVD',
    type: 'image',
  },
  {
    badge: 'Lotes de Cruzamento Industrial',
    subBadge: 'F1 ANGUS / NELORE',
    title: 'Precocidade e Acabamento Superior',
    description: 'Lotes prontos para atender escalas de frigoríficos com premiação de carcaça.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnOLmSpqTtLU-b802OTHD1HJP8yDndK2DvQyYlulGsvAJVXPUV1RwbAr73BKvRjUMmP0ewHlVQMeuRVwi3EVWW9g-NWMbcXf3Jh87hPVY3WDPNGCOlzMihTaUpTQwPTz-mdZCDpqNCQ-4dQeaBbndTPwWVju9otDjQ19GVqDnFjnYThxbK7KMuVdBLQD1zBw__PF6OSgt3qP1wjWY1fQbvITKgi-0nArPq0a6XQ_kuStCqA72bmPnM',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnOLmSpqTtLU-b802OTHD1HJP8yDndK2DvQyYlulGsvAJVXPUV1RwbAr73BKvRjUMmP0ewHlVQMeuRVwi3EVWW9g-NWMbcXf3Jh87hPVY3WDPNGCOlzMihTaUpTQwPTz-mdZCDpqNCQ-4dQeaBbndTPwWVju9otDjQ19GVqDnFjnYThxbK7KMuVdBLQD1zBw__PF6OSgt3qP1wjWY1fQbvITKgi-0nArPq0a6XQ_kuStCqA72bmPnM',
    type: 'image',
  },
]

const fallbackGalleryItems: LandingGalleryItem[] = [
  {
    type: 'image',
    src: '/media/photos/01.webp',
    alt: 'Bovinos em manejo de engorda',
    caption: 'Manejo e engorda no campo',
  },
  {
    type: 'image',
    src: '/media/photos/02.webp',
    alt: 'Rebanho em pastagem',
    caption: 'Rebanho em pastagem',
  },
  {
    type: 'video',
    src: '/media/videos/01.mp4',
    poster: '/media/photos/09.webp',
    alt: 'Vídeo do manejo diário',
    caption: 'Manejo diário do rebanho',
  },
  {
    type: 'image',
    src: '/media/photos/03.webp',
    alt: 'Instalações de confinamento',
    caption: 'Instalações de confinamento',
  },
  {
    type: 'image',
    src: '/media/photos/04.webp',
    alt: 'Nutrição e suplementação',
    caption: 'Nutrição e suplementação',
  },
  {
    type: 'video',
    src: '/media/videos/02.mp4',
    poster: '/media/photos/10.webp',
    alt: 'Vídeo de nutrição bovina',
    caption: 'Nutrição e cuidados',
  },
  {
    type: 'image',
    src: '/media/photos/05.webp',
    alt: 'Rebanho em cuidados diários',
    caption: 'Cuidados e bem-estar do rebanho',
  },
  {
    type: 'image',
    src: '/media/photos/06.webp',
    alt: 'Bovinos em área de descanso',
    caption: 'Área de descanso',
  },
  {
    type: 'video',
    src: '/media/videos/03.mp4',
    poster: '/media/photos/11.webp',
    alt: 'Vídeo das instalações',
    caption: 'Visão geral das instalações',
  },
  {
    type: 'image',
    src: '/media/photos/07.webp',
    alt: 'Acompanhamento veterinário',
    caption: 'Acompanhamento veterinário',
  },
  {
    type: 'image',
    src: '/media/photos/08.webp',
    alt: 'Gado em engorda intensiva',
    caption: 'Engorda intensiva',
  },
  {
    type: 'video',
    src: '/media/videos/04.mp4',
    poster: '/media/photos/12.webp',
    alt: 'Vídeo do dia a dia no campo',
    caption: 'Dia a dia no campo',
  },
  {
    type: 'image',
    src: '/media/photos/09.webp',
    alt: 'Paisagem da propriedade',
    caption: 'Paisagem da propriedade',
  },
  {
    type: 'image',
    src: '/media/photos/10.webp',
    alt: 'Bovinos em lote de engorda',
    caption: 'Lote de engorda',
  },
  {
    type: 'video',
    src: '/media/videos/05.mp4',
    poster: '/media/photos/13.webp',
    alt: 'Vídeo de sanidade animal',
    caption: 'Sanidade animal',
  },
  {
    type: 'image',
    src: '/media/photos/11.webp',
    alt: 'Estrutura de manejo',
    caption: 'Estrutura de manejo',
  },
  {
    type: 'image',
    src: '/media/photos/12.webp',
    alt: 'Bovinos em tratamento',
    caption: 'Tratamento e sanidade',
  },
  {
    type: 'video',
    src: '/media/videos/06.mp4',
    poster: '/media/photos/14.webp',
    alt: 'Vídeo de bem-estar animal',
    caption: 'Bem-estar animal',
  },
  {
    type: 'image',
    src: '/media/photos/13.webp',
    alt: 'Operação no campo',
    caption: 'Operação no campo',
  },
  {
    type: 'image',
    src: '/media/photos/14.webp',
    alt: 'Resultado de engorda',
    caption: 'Resultado de engorda',
  },
  {
    type: 'video',
    src: '/media/videos/07.mp4',
    poster: '/media/photos/01.webp',
    alt: 'Vídeo de engorda',
    caption: 'Processo de engorda',
  },
  {
    type: 'video',
    src: '/media/videos/08.mp4',
    poster: '/media/photos/02.webp',
    alt: 'Vídeo de manejo',
    caption: 'Manejo do rebanho',
  },
  {
    type: 'video',
    src: '/media/videos/09.mp4',
    poster: '/media/photos/03.webp',
    alt: 'Vídeo de suplementação',
    caption: 'Suplementação bovina',
  },
  {
    type: 'video',
    src: '/media/videos/10.mp4',
    poster: '/media/photos/04.webp',
    alt: 'Vídeo de confinamento',
    caption: 'Confinamento',
  },
  {
    type: 'video',
    src: '/media/videos/11.mp4',
    poster: '/media/photos/05.webp',
    alt: 'Vídeo de cuidados',
    caption: 'Cuidados com o gado',
  },
  {
    type: 'video',
    src: '/media/videos/12.mp4',
    poster: '/media/photos/06.webp',
    alt: 'Vídeo da propriedade',
    caption: 'A propriedade',
  },
  {
    type: 'video',
    src: '/media/videos/13.mp4',
    poster: '/media/photos/07.webp',
    alt: 'Vídeo de resultados',
    caption: 'Resultados no campo',
  },
]

const { items: apiItems } = useGallery()

const allItems = computed<GalleryDisplayItem[]>(() => {
  if (apiItems.value && apiItems.value.length > 4) {
    return apiItems.value.map((item, idx) => ({
      badge:
        item.caption ||
        (item.type === 'video' ? 'Vídeo Operacional' : `Lote ${String(idx + 1).padStart(2, '0')}`),
      subBadge: idx < 4 ? defaultStitchItems[idx]?.subBadge : undefined,
      title: item.caption || `Lote ${String(idx + 1).padStart(2, '0')}`,
      description: item.alt || 'Acompanhamento zootécnico e pesagem assistida.',
      src: item.src,
      poster: item.poster || item.src,
      type: item.type,
    }))
  }

  const stitchMapped = defaultStitchItems.map((item) => ({
    badge: item.badge,
    subBadge: item.subBadge,
    title: item.title,
    description: item.description,
    src: item.src,
    poster: item.src,
    type: item.type,
  }))

  const fallbackMapped = fallbackGalleryItems.map((item, idx) => ({
    badge: item.type === 'video' ? 'Registro em Vídeo' : 'Manejo no Campo',
    subBadge: undefined,
    title: item.caption || `Lote ${String(idx + 5).padStart(2, '0')}`,
    description: item.alt || 'Rotina de nutrição, pesagem e sanidade na Fazenda Paraíso.',
    src: item.src,
    poster: item.poster || item.src,
    type: item.type,
  }))

  return [...stitchMapped, ...fallbackMapped]
})

const INITIAL_COUNT = 4
const BATCH_SIZE = 4
const visibleCount = ref(INITIAL_COUNT)

const displayedItems = computed(() => {
  return allItems.value.slice(0, visibleCount.value)
})

const hasMore = computed(() => {
  return visibleCount.value < allItems.value.length
})

function getItemSpanClass(index: number, total: number): string {
  if (index === total - 1 && total % 2 !== 0) {
    return 'md:col-span-12 min-h-[340px]'
  }
  const row = Math.floor(index / 2)
  const isFirstInRow = index % 2 === 0
  if (row % 2 === 0) {
    return isFirstInRow ? 'md:col-span-7 min-h-[380px]' : 'md:col-span-5 min-h-[380px]'
  } else {
    return isFirstInRow ? 'md:col-span-5 min-h-[320px]' : 'md:col-span-7 min-h-[320px]'
  }
}

let lightboxInstance: { destroy: () => void } | null = null

const initLightbox = async () => {
  if (!import.meta.client) return
  try {
    lightboxInstance?.destroy()
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

const loadMore = async () => {
  visibleCount.value = Math.min(visibleCount.value + BATCH_SIZE, allItems.value.length)
  await nextTick()
  initLightbox()
}

onMounted(() => {
  initLightbox()
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
          v-for="(item, index) in displayedItems"
          :key="item.src + index"
          :href="item.src"
          class="glightbox-stitch group relative rounded-xl overflow-hidden shadow-card bg-surface border border-stroke flex flex-col justify-end p-space-md cursor-pointer hover:-translate-y-1 hover:shadow-raised transition-all duration-300"
          :class="getItemSpanClass(index, displayedItems.length)"
          :data-glightbox="`title: ${item.title}; description: ${item.description}`"
          :data-type="item.type === 'video' ? 'video' : 'image'"
        >
          <!-- Background image/thumbnail -->
          <div
            class="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            :style="{ backgroundImage: `url('${item.poster || item.src}')` }"
          />

          <!-- Dual gradient scrim -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-dark-canvas/90 via-dark-canvas/30 to-transparent"
          />

          <!-- Play button para vídeos -->
          <div
            v-if="item.type === 'video'"
            class="pointer-events-none absolute inset-0 flex items-center justify-center z-10"
          >
            <span
              class="flex h-14 w-14 items-center justify-center rounded-full bg-dark-canvas/80 text-on-secondary shadow-lg border border-tertiary-light/60 group-hover:scale-110 group-hover:bg-primary-container transition-all duration-300"
            >
              <span class="material-symbols-outlined text-[28px] ml-0.5">play_arrow</span>
            </span>
          </div>

          <!-- Metadata overlay -->
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

      <!-- Botão Carregar Mais Mídias -->
      <div v-if="hasMore" class="mt-space-xl flex flex-col items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded bg-surface border border-stroke-strong text-text-strong font-label text-label tracking-[0.18em] uppercase shadow-card hover:bg-surface-muted hover:border-tertiary-dark hover:shadow-raised hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2"
          @click="loadMore"
        >
          <span>Carregar mais mídias</span>
          <span class="material-symbols-outlined text-[20px]">expand_more</span>
        </button>
        <span class="font-badge-mono text-[11px] text-text-muted">
          Exibindo {{ displayedItems.length }} de {{ allItems.length }} mídias
        </span>
      </div>
    </div>
  </section>
</template>
