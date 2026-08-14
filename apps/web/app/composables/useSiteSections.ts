import type { SectionKey, SiteSection } from '@gmbovinos/shared'

export const useSiteSections = () => {
  const apiBase = useApiBase()

  const { data, pending, error, refresh } = useAsyncData(
    'site-sections',
    async () => {
      const items = await $fetch<SiteSection[]>(`${apiBase.value}/sections`)
      return Array.isArray(items) ? items : []
    },
    {
      default: () => [],
      // Evita cachear falha vazia: se a API cair no SSR, o client tenta de novo.
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
        if (Array.isArray(cached) && cached.length === 0) return undefined
        return cached
      },
    }
  )

  const sections = computed(() => data.value ?? [])

  const sectionByKey = (key: SectionKey | string): SiteSection | null =>
    sections.value.find((section) => section.key === key) ?? null

  return {
    sections,
    sectionByKey,
    pending,
    error,
    refresh,
  }
}
