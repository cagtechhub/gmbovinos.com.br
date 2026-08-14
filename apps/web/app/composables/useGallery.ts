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
    async () => {
      const items = await $fetch<GalleryItem[]>(`${apiBase.value}/gallery`)
      const mapped = (items || [])
        .map(mapGalleryItem)
        .filter((item): item is LandingGalleryItem => item !== null)
      return mapped.length > 0 ? mapped : null
    },
    {
      default: () => null,
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
        if (cached === null) return undefined
        return cached
      },
    }
  )

  return {
    items: data,
    pending,
    error,
    refresh,
  }
}
