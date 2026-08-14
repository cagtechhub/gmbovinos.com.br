import type { GalleryItem } from '@gmbovinos/shared'

export type LandingGalleryItem = {
  type: 'image' | 'video'
  src: string
  poster?: string
  alt: string
  caption: string
}

const mapGalleryItem = (item: GalleryItem): LandingGalleryItem | null => {
  if (item.kind !== 'IMAGE' && item.kind !== 'VIDEO') return null

  return {
    type: item.kind === 'VIDEO' ? 'video' : 'image',
    src: item.url,
    poster: item.posterUrl || undefined,
    alt: item.alt,
    caption: item.caption || item.alt,
  }
}

export const useGallery = () => {
  const apiBase = useApiBase()

  const { data, pending, error, refresh } = useAsyncData(
    'site-gallery',
    () => $fetch<GalleryItem[]>(`${apiBase.value}/gallery`),
    {
      default: () => [] as GalleryItem[],
    },
  )

  const items = computed(() => {
    const mapped = (data.value || [])
      .map(mapGalleryItem)
      .filter((item): item is LandingGalleryItem => item !== null)
    return mapped.length > 0 ? mapped : null
  })

  const heroImageUrl = computed(
    () => data.value?.find((item) => item.featuredHero && item.kind === 'IMAGE')?.url || '',
  )

  return {
    items,
    heroImageUrl,
    pending,
    error,
    refresh,
  }
}
