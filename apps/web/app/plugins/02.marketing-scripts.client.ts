import { useConsentStore } from '~/stores/useConsentStore'

type MarketingHeadScript = {
  key: string
  src?: string
  type?: string
  async?: boolean
  defer?: boolean
  tagPosition?: 'bodyClose'
  innerHTML?: string
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const consent = useConsentStore()

  const ga4MeasurementId = computed(() => String(config.public.ga4MeasurementId || '').trim())
  const metaPixelId = computed(() => String(config.public.metaPixelId || '').trim())

  const loadScripts = computed(
    () =>
      consent.marketingAllowed &&
      Boolean(ga4MeasurementId.value || metaPixelId.value)
  )

  useHead(() => {
    if (!loadScripts.value) {
      return {}
    }

    const scripts: MarketingHeadScript[] = []

    if (ga4MeasurementId.value) {
      const id = ga4MeasurementId.value
      scripts.push({
        key: 'ga4-gtag-src',
        src: `https://www.googletagmanager.com/gtag/js?id=${id}`,
        async: true,
        defer: true,
        tagPosition: 'bodyClose' as const,
      })
      scripts.push({
        key: 'ga4-inline',
        type: 'text/javascript',
        tagPosition: 'bodyClose' as const,
        innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('js',new Date());gtag('config','${id}');`,
      })
    }

    if (metaPixelId.value) {
      const id = metaPixelId.value
      scripts.push({
        key: 'meta-pixel',
        type: 'text/javascript',
        tagPosition: 'bodyClose' as const,
        innerHTML: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`,
      })
    }

    return { script: scripts }
  })

  const router = useRouter()
  router.afterEach((to) => {
    if (!loadScripts.value || !import.meta.client) {
      return
    }
    nextTick(() => {
      const w = window as Window & {
        gtag?: (...args: unknown[]) => void
        fbq?: (...args: unknown[]) => void
      }
      const gaId = ga4MeasurementId.value
      if (gaId && typeof w.gtag === 'function') {
        w.gtag('config', gaId, { page_path: to.fullPath })
      }
      if (metaPixelId.value && typeof w.fbq === 'function') {
        w.fbq('track', 'PageView')
      }
    })
  })
})
