/** Metadados globais: canônico, robots, Open Graph, Twitter e Schema.org. */
export function useSiteSeoHead() {
  const config = useRuntimeConfig()
  const canonicalUrl = useCanonicalUrl()
  const origin = usePublicSiteOrigin()

  const siteName = computed(() => String(config.public.siteName || 'GM Bovinos').trim())
  const locality = computed(() => String(config.public.seoLocality || 'Minas Gerais').trim())
  const noIndex = computed(() => {
    const v = config.public.noIndex as boolean | string | undefined
    if (v === true || v === 'true' || v === '1') return true
    return false
  })

  /** Complementa `app.head.titleTemplate` (`GM Bovinos | %s`). */
  const pageTitle = computed(() => `Compra e venda de gado em ${locality.value}`)

  const socialTitle = computed(() => `${siteName.value} | ${pageTitle.value}`)

  const metaDescription = computed(() => {
    const loc = locality.value
    const core = loc
      ? `Compra e venda de gado em ${loc}, com avaliação de lote e transparência comercial.`
      : 'Compra e venda de gado com avaliação de lote e transparência comercial.'
    const local = ' Base em engorda, manejo e sanidade.'
    const tail = ' Veja a galeria e fale com a equipe.'
    const full = `${core}${local}${tail}`
    return full.length > 160 ? `${full.slice(0, 157)}…` : full
  })

  const resolvePublicAsset = (value: string, fallbackPath: string) => {
    const o = origin.value
    const raw = value.trim()
    if (!raw) return o ? `${o}${fallbackPath}` : fallbackPath
    if (/^https?:\/\//i.test(raw)) return raw
    const path = raw.startsWith('/') ? raw : `/${raw}`
    return o ? `${o}${path}` : path
  }

  const ogImage = computed(() => {
    const cms = String(config.public.defaultOgImageUrl || '').trim()
    const path = String(config.public.defaultOgImagePath || '/media/photos/02.webp').trim()
    return resolvePublicAsset(cms || path, '/media/photos/02.webp')
  })

  const faviconHref = computed(() =>
    resolvePublicAsset(String(config.public.faviconUrl || '').trim(), '/favicon.png'),
  )

  useSeoMeta({
    title: pageTitle,
    description: metaDescription,
    ogSiteName: siteName,
    ogType: 'website',
    ogLocale: 'pt_BR',
    ogTitle: socialTitle,
    ogDescription: metaDescription,
    ogImage,
    ogImageAlt: 'Operação bovina — GM Bovinos, compra e venda de gado',
    ogImageWidth: 1080,
    ogImageHeight: 813,
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: socialTitle,
    twitterDescription: metaDescription,
    twitterImage: ogImage,
    author: siteName,
  })

  /** GA/Meta: preconnect só após consentimento — ver `02.marketing-scripts.client.ts`. */
  const preconnects = computed(() => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
  ])

  const schemaNodes = computed(() => {
    const url = canonicalUrl.value || (origin.value ? `${origin.value}/` : '')
    if (!url) return []

    const addressLine = String(config.public.businessAddress || '').trim()
    const phoneDigits = String(config.public.businessPhone || '')
      .replace(/\D/g, '')
      .trim()
      ? String(config.public.businessPhone || '').replace(/\D/g, '')
      : String(config.public.whatsappNumber || config.public.whatsappPhone || '').replace(/\D/g, '')
    const tel = phoneDigits ? `+${phoneDigits}` : ''
    const contactEmail = String(config.public.contactEmail || '').trim()
    const founderUrl = String(config.public.founderProfileUrl || '').trim()
    const instagram = String(config.public.instagramUrl || '').trim()
    const facebook = String(config.public.facebookUrl || '').trim()
    const sameAs = [instagram, facebook].filter(Boolean)
    const latitude = -21.5354594
    const longitude = -45.4830883

    const contactPoint: Record<string, unknown> = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    }
    if (contactEmail) contactPoint.email = contactEmail
    if (tel) contactPoint.telephone = tel
    const hasContactPoint = Boolean(contactEmail || tel)

    const baseOrigin = (origin.value || '').replace(/\/$/, '') || url.replace(/\/$/, '')

    const organization: Record<string, unknown> = {
      '@type': 'Organization',
      '@id': `${url}#organization`,
      name: siteName.value,
      url,
      description: metaDescription.value,
      logo: `${baseOrigin}/img/logo.png`,
      foundingDate: '2006-01-18',
      founder: {
        '@type': 'Person',
        name: 'Ivo Adriane Guidelli',
        ...(founderUrl ? { url: founderUrl } : {}),
      },
    }
    if (hasContactPoint) organization.contactPoint = contactPoint
    if (sameAs.length) organization.sameAs = sameAs

    const graph: Array<Record<string, unknown>> = [organization]

    const primaryImage = ogImage.value
    const postal =
      addressLine || locality.value
        ? {
            '@type': 'PostalAddress' as const,
            addressCountry: 'BR',
            ...(addressLine ? { streetAddress: addressLine } : {}),
            ...(locality.value ? { addressLocality: locality.value } : {}),
          }
        : null

    graph.push({
      '@type': 'LocalBusiness',
      '@id': `${url}#localbusiness`,
      name: siteName.value,
      url,
      description: metaDescription.value,
      parentOrganization: { '@id': `${url}#organization` },
      priceRange: 'Sob consulta',
      geo: {
        '@type': 'GeoCoordinates',
        latitude,
        longitude,
      },
      openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-12:00'],
      ...(tel ? { telephone: tel } : {}),
      ...(postal ? { address: postal } : {}),
      ...(sameAs.length ? { sameAs } : {}),
      ...(primaryImage ? { image: primaryImage } : {}),
    })

    graph.push({
      '@type': 'WebSite',
      '@id': `${url}#website`,
      url,
      name: siteName.value,
      description: metaDescription.value,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${url}#organization` },
      /** Liga o site à entidade local para rich results / painel de conhecimento. */
      about: { '@id': `${url}#localbusiness` },
      potentialAction: {
        '@type': 'ContactAction',
        target: `${url}#cta`,
        name: 'Falar com a GM Bovinos',
      },
    })

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: url,
        },
      ],
    })

    return graph
  })

  useHead(() => {
    const canon = canonicalUrl.value
    const hreflang =
      canon && !noIndex.value
        ? ([
            { rel: 'alternate' as const, hreflang: 'pt-BR', href: canon },
            { rel: 'alternate' as const, hreflang: 'x-default', href: canon },
          ] as const)
        : ([] as const)

    return {
      meta: [
        {
          name: 'robots',
          content: noIndex.value
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          name: 'google-adsense-account',
          content: config.public.googleAdsenseAccount || '',
        },
      ],
      script: [
        {
          key: 'schema-org-graph',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': schemaNodes.value,
          }),
        },
      ],
      link: [
        ...(canon ? [{ rel: 'canonical' as const, href: canon }] : []),
        ...hreflang,
        ...preconnects.value,
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '252x243',
          href: faviconHref.value,
        },
        {
          rel: 'apple-touch-icon',
          href: faviconHref.value,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        },
      ],
    }
  })
}
