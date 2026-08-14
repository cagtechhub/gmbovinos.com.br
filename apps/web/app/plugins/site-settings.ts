import type { SiteSettings } from '@gmbovinos/shared'

export default defineNuxtPlugin({
  name: 'site-settings',
  enforce: 'pre',
  async setup() {
    const config = useRuntimeConfig()
    const baseUrl = resolveApiBase()

    try {
      const settings = await $fetch<SiteSettings>(`${baseUrl}/settings`)
      const publicConfig = config.public as Record<string, unknown>

      const merge = (key: string, value: unknown) => {
        if (value === undefined || value === null) return
        if (typeof value === 'string' && value.trim() === '') return
        publicConfig[key] = value
      }

      merge('siteUrl', settings.siteUrl)
      merge('siteName', settings.siteName)
      merge('seoLocality', settings.seoLocality)
      if (typeof settings.noIndex === 'boolean') publicConfig.noIndex = settings.noIndex
      merge('businessAddress', settings.businessAddress)
      merge('businessPhone', settings.businessPhone)
      merge('contactEmail', settings.contactEmail)
      merge('whatsappNumber', settings.whatsappNumber)
      merge('whatsappMessage', settings.whatsappMessage)
      merge('instagramUrl', settings.instagramUrl)
      merge('facebookUrl', settings.facebookUrl)
      merge('founderProfileUrl', settings.founderProfileUrl)
      merge('defaultOgImageUrl', settings.defaultOgImageUrl)
      merge('faviconUrl', settings.faviconUrl)
      merge('ga4MeasurementId', settings.ga4MeasurementId)
      merge('metaPixelId', settings.metaPixelId)
      merge('mapsEmbedUrl', settings.mapsEmbedUrl)
      merge('geoLatitude', settings.geoLatitude)
      merge('geoLongitude', settings.geoLongitude)

      const og = String(settings.defaultOgImageUrl || '').trim()
      if (og) {
        publicConfig.defaultOgImageUrl = og
        if (og.startsWith('/')) {
          publicConfig.defaultOgImagePath = og
        }
      }
    } catch {
      // env/runtimeConfig continues as fallback
    }
  },
})
