<script setup lang="ts">
import type { LandingGalleryItem } from '~/composables/useGallery'

type MediaType = 'image' | 'video'
type FilterOption = 'all' | MediaType

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

const { items: apiGalleryItems } = useGallery()

const galleryItems = computed<LandingGalleryItem[]>(() => {
  const fromApi = apiGalleryItems.value
  if (fromApi && fromApi.length > 0) return fromApi
  return fallbackGalleryItems
})

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'image', label: 'Imagens' },
  { value: 'video', label: 'Vídeos' },
]

const activeFilter = ref<FilterOption>('all')
const currentPage = ref(1)
const ITEMS_PER_PAGE = 6

const filteredItems = computed(() =>
  activeFilter.value === 'all'
    ? galleryItems.value
    : galleryItems.value.filter((item) => item.type === activeFilter.value)
)

const totalPages = computed(() => Math.ceil(filteredItems.value.length / ITEMS_PER_PAGE))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredItems.value.slice(start, start + ITEMS_PER_PAGE)
})

watch(activeFilter, () => {
  currentPage.value = 1
})

/** Índice do item na lista filtrada (galeria completa no GLightbox, não só a página). */
function slideIndexForItem(item: LandingGalleryItem): number {
  return filteredItems.value.findIndex((i) => i.src === item.src && i.type === item.type)
}

async function openLightbox(slideIndex: number) {
  if (!import.meta.client || slideIndex < 0) return

  const { default: GLightbox } = await import('glightbox')
  const elements = filteredItems.value.map((it) => {
    if (it.type === 'image') {
      return {
        href: it.src,
        type: 'image' as const,
        alt: it.alt,
        description: it.caption,
      }
    }
    return {
      href: it.src,
      type: 'video' as const,
      source: 'local',
      alt: it.alt,
      description: it.caption,
    }
  })

  const lb = GLightbox({
    //@ts-expect-error - GLightbox types might not match perfectly with the custom element shapes
    elements,
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    autofocusVideos: true,
    closeOnOutsideClick: true,
    keyboardNavigation: true,
    plyr: {
      css: 'https://cdn.plyr.io/3.7.8/plyr.css',
      js: 'https://cdn.plyr.io/3.7.8/plyr.js',
      config: {
        ratio: '16:9',
        muted: false,
        hideControls: false,
        resetOnEnd: true,
      },
    },
  })

  lb.on('close', () => {
    lb.destroy()
  })
  lb.openAt(slideIndex)
}

function goToPage(page: number) {
  currentPage.value = page
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const imageCount = computed(() => galleryItems.value.filter((i) => i.type === 'image').length)
const videoCount = computed(() => galleryItems.value.filter((i) => i.type === 'video').length)

function countLabel(filter: FilterOption): string {
  if (filter === 'all') return `${galleryItems.value.length}`
  if (filter === 'image') return `${imageCount.value}`
  return `${videoCount.value}`
}
</script>

<template>
  <section id="gallery" class="section-band section-band--muted py-20 md:py-24">
    <div class="landing-section-inner px-6 lg:px-10">
      <header class="mb-12 w-full text-center md:mb-14">
        <p class="section-eyebrow justify-center">Operação no campo</p>
        <h2 class="section-title mt-4">Galeria</h2>
        <p class="section-lead">
          Imagens e vídeos da operação — a mesma estrutura de campo e confinamento que sustenta
          nossas avaliações e a compra e venda de gado.
        </p>
      </header>

      <!-- Filtros -->
      <nav
        class="mb-10 flex flex-wrap items-center justify-center gap-2"
        aria-label="Filtrar galeria"
      >
        <button
          v-for="option in filterOptions"
          :key="option.value"
          type="button"
          class="inline-flex items-center gap-1.5 border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          :class="
            activeFilter === option.value
              ? 'border-primary-700 bg-primary-700 text-white'
              : 'border-gray-300/90 bg-white/70 text-gray-600 hover:border-accent-400 hover:text-primary-700'
          "
          :aria-pressed="activeFilter === option.value"
          @click="activeFilter = option.value"
        >
          {{ option.label }}
          <span
            class="inline-flex h-5 min-w-[1.25rem] items-center justify-center px-1.5 text-xs font-semibold leading-none"
            :class="
              activeFilter === option.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            "
          >
            {{ countLabel(option.value) }}
          </span>
        </button>
      </nav>

      <!-- Grid de mídia -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
        <figure
          v-for="item in paginatedItems"
          :key="`${item.type}-${item.src}`"
          class="group overflow-hidden rounded-media bg-white shadow-card ring-1 ring-gray-300/60 transition duration-500 hover:-translate-y-1 hover:shadow-soft"
          itemscope
          :itemtype="
            item.type === 'image'
              ? 'https://schema.org/ImageObject'
              : 'https://schema.org/VideoObject'
          "
        >
          <button
            v-if="item.type === 'image'"
            type="button"
            class="relative block w-full overflow-hidden border-0 bg-gray-100 p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            :aria-label="`Abrir em tela cheia: ${item.caption}`"
            @click="openLightbox(slideIndexForItem(item))"
          >
            <nuxt-img
              :src="item.src"
              :alt="item.alt"
              class="h-60 w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
              itemprop="contentUrl"
            />
          </button>

          <div
            v-else
            class="relative cursor-pointer overflow-hidden bg-gray-900"
            role="button"
            tabindex="0"
            :aria-label="`Reproduzir vídeo: ${item.caption}`"
            @click="openLightbox(slideIndexForItem(item))"
            @keydown.enter.prevent="openLightbox(slideIndexForItem(item))"
            @keydown.space.prevent="openLightbox(slideIndexForItem(item))"
          >
            <video
              class="h-60 w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
              :src="item.src"
              :poster="item.poster"
              :aria-label="item.alt"
              muted
              playsinline
              preload="metadata"
              controlslist="nodownload"
              itemprop="contentUrl"
            />
            <div
              class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/35"
              aria-hidden="true"
            >
              <span
                class="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow-md ring-1 ring-accent-400/50"
              >
                <svg
                  class="ml-0.5 h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </span>
            </div>
          </div>

          <figcaption class="mt-2 text-sm text-gray-600 hidden" itemprop="name">
            {{ item.caption }}
          </figcaption>
        </figure>
      </div>

      <!-- Estado vazio -->
      <p v-if="filteredItems.length === 0" class="mt-8 text-center text-gray-500">
        Nenhum item encontrado para este filtro.
      </p>

      <!-- Paginação -->
      <nav
        v-if="totalPages > 1"
        class="mt-10 flex items-center justify-center gap-1"
        aria-label="Paginação da galeria"
      >
        <button
          type="button"
          :disabled="currentPage === 1"
          class="border border-gray-300/90 bg-white/70 px-3 py-2 text-sm font-medium transition-colors hover:border-accent-400 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Página anterior"
          @click="goToPage(currentPage - 1)"
        >
          ←
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="min-w-[2.5rem] border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          :class="
            page === currentPage
              ? 'border-primary-700 bg-primary-700 text-white'
              : 'border-gray-300/90 bg-white/70 text-gray-600 hover:border-accent-400 hover:text-primary-700'
          "
          :aria-current="page === currentPage ? 'page' : undefined"
          :aria-label="`Página ${page}`"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <button
          type="button"
          :disabled="currentPage === totalPages"
          class="border border-gray-300/90 bg-white/70 px-3 py-2 text-sm font-medium transition-colors hover:border-accent-400 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Próxima página"
          @click="goToPage(currentPage + 1)"
        >
          →
        </button>
      </nav>
    </div>
  </section>
</template>
