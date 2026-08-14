function originFromUrl(value: string | undefined, fallback: string) {
  const raw = (value || fallback).trim()
  try {
    return new URL(raw).origin
  } catch {
    return fallback
  }
}

const publicApiOrigin = originFromUrl(
  process.env.NUXT_PUBLIC_API_BASE || process.env.NUXT_PUBLIC_API_URL,
  'http://localhost:3001'
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /** Estrutura padrão do Nuxt 4: código em `app/`. */
  srcDir: 'app/',
  compatibilityDate: '2026-04-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/eslint', 'nuxt-security', '@nuxt/image'],
  css: ['glightbox/dist/css/glightbox.min.css'],
  build: {
    transpile: ['@gmbovinos/shared'],
  },
  runtimeConfig: {
    /** SSR interno (Docker): NUXT_API_BASE=http://gmbovinos-backend:3001 */
    apiBase: '',
    public: {
      /** URL canônica do site (ex.: https://www.gmbovinos.com.br). Recomendado em produção. */
      siteUrl: '',
      siteName: 'GM Bovinos',
      /** API pública (browser / CSP). NUXT_PUBLIC_API_BASE */
      apiBase: 'http://localhost:3001',
      /** @deprecated Use apiBase / NUXT_PUBLIC_API_BASE */
      apiUrl: 'http://localhost:3001',
      /** Supabase Auth (painel admin). Prefixo NUXT_PUBLIC_. */
      supabaseUrl: '',
      supabaseAnonKey: '',
      /** `true` em preview/staging: meta robots noindex + robots.txt Disallow. */
      noIndex: false,
      /** Local para título, descrição e schema (ex.: Minas Gerais ou Contagem, MG). */
      seoLocality: '',
      /** Endereço postal visível e em LocalBusiness (uma linha). */
      businessAddress: '',
      /** Telefone em formato internacional para `tel:` e schema (ex.: +5531999999999). */
      businessPhone: '',
      /** Caminho da imagem Open Graph (absoluto = siteUrl + path). */
      defaultOgImagePath: '/media/photos/02.webp',
      /** URL da imagem OG (pode vir do CMS; path relativo também atualiza defaultOgImagePath). */
      defaultOgImageUrl: '',
      faviconUrl: '/favicon.png',
      /** DDI + DDD + número, só dígitos (ex.: 5511999999999). Preferência sobre whatsappPhone. */
      whatsappNumber: '',
      /** @deprecated Use whatsappNumber; mantido para compatibilidade com env antigo. */
      whatsappPhone: '',
      whatsappMessage:
        'Olá! Gostaria de falar sobre compra ou venda de gado (e engorda/manejo, se precisar).',
      instagramUrl: '',
      facebookUrl: '',
      /** E-mail público para Schema.org ContactPoint (evitar hardcode no composable). */
      contactEmail: '',
      /** URL opcional do fundador (ex.: LinkedIn) para Organization.founder. */
      founderProfileUrl: '',
      mapsEmbedUrl: '',
      geoLatitude: '',
      geoLongitude: '',
      ga4MeasurementId: '',
      metaPixelId: '',
      googleAdsenseAccount: '',
    },
    private: {
      smtpUsername: '',
      smtpPassword: '',
      smtpPort: '',
      smtpHost: '',
      smtpFromAddress: '',
    },
  },
  pinia: {
    /** Relativo a `srcDir` (app/). */
    storesDirs: ['./stores'],
  },
  app: {
    head: {
      titleTemplate: 'GM Bovinos | %s',
      htmlAttrs: { lang: 'pt-BR' },
    },
  },
  tailwindcss: {
    /** Um único entry: o módulo injeta este arquivo (evita duplicar em `css: []`). */
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: true,
    editorSupport: true,
  },
  /**
   * Cache de assets estáticos (imagens, vídeos, ícones).
   * `public, max-age` = browser cache; `s-maxage` = CDN/proxy cache.
   * `immutable` indica que o conteúdo não muda (evita revalidação).
   */
  routeRules: {
    '/admin/**': {
      robots: false,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    },
    '/media/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable' },
    },
    '/img/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable' },
    },
    '/favicon.png': {
      headers: { 'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable' },
    },
  },
  /** Dev server atrás de túnel (ngrok): evita “Blocked request … host is not allowed”. */
  vite: {
    server: {
      allowedHosts: ['localhost', '.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
    },
  },
  security: {
    enabled: true,
    /**
     * Chaves em camelCase (OptionKey), como no nuxt-security — nomes HTTP fazem
     * `getNameFromKey` retornar undefined e quebram o SSR com setHeader inválido.
     */
    headers: {
      /**
       * COEP (`credentialless` ou `require-corp`) aplica às **navegações de iframe**
       * as mesmas exigências que a recursos: o documento embebido precisa cooperar
       * (COEP/CORP). O embed público do Google Maps não cumpre isso → iframe bloqueado.
       * Este site não usa SharedArrayBuffer / crossOriginIsolated; COEP desligado evita o bloqueio.
       * @see https://developer.chrome.com/blog/coep-credentialless-origin-trial
       */
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://www.googletagmanager.com',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://connect.facebook.net',
          'https://wa.me',
          /** GLightbox / vídeos locais carregam Plyr a partir do CDN. */
          'https://cdn.plyr.io',
        ],
        /**
         * Sem `worker-src`, o fallback é `script-src` e workers `blob:` (ex.: Plyr / decodificação)
         * são bloqueados. `blob:` + `'self'` cobre workers na origem e em URLs blob.
         */
        'worker-src': ["'self'", 'blob:'],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdn.plyr.io',
        ],
        /** `<link rel="stylesheet">` e `@import` externos (CSP3 usa isto quando definido). */
        'style-src-elem': [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdn.plyr.io',
        ],
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https://cdn.plyr.io',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.facebook.com',
          'https://*.facebook.net',
          'https://*.supabase.co',
          /** Google Maps embed (tiles / assets em subdomínios). */
          'https://*.google.com',
          'https://*.gstatic.com',
          'https://*.googleapis.com',
          'https://*.ggpht.com',
          'https://*.googleusercontent.com',
        ],
        /** Reprodutor no lightbox pode usar `blob:` para mídia. */
        'media-src': [
          "'self'",
          'blob:',
          'data:',
          'https://*.supabase.co',
          'https://cdn.plyr.io',
          'http://127.0.0.1:54321',
        ],
        'connect-src': [
          "'self'",
          publicApiOrigin,
          'http://localhost:3001',
          'http://127.0.0.1:3001',
          'ws://localhost:3001',
          'ws://127.0.0.1:3001',
          'https://cdn.plyr.io',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://stats.g.doubleclick.net',
          'https://*.facebook.com',
          'https://*.google.com',
          'https://*.googleapis.com',
          'https://*.gstatic.com',
          'https://*.supabase.co',
          'wss://*.supabase.co',
          'ws://127.0.0.1:54321',
          'http://127.0.0.1:54321',
        ],
        /** Embed do Maps usa iframes aninhados (consent, regiões, etc.). */
        'frame-src': [
          "'self'",
          'https://www.facebook.com',
          'https://www.google.com',
          'https://maps.google.com',
          'https://consent.google.com',
          'https://*.google.com',
          /** Alguns fluxos do Maps carregam subframes em googleapis / gstatic. */
          'https://*.googleapis.com',
          'https://*.gstatic.com',
        ],
        'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com', 'https://cdn.plyr.io'],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        /**
         * Não usar a diretiva CSP `sandbox` no documento inteiro: ela restringe o
         * documento como um iframe sandboxed e quebra embeds complexos (ex.: Google Maps).
         */
        'report-uri': '/csp-report',
      },
      xFrameOptions: 'DENY',
      xContentTypeOptions: 'nosniff',
      xXSSProtection: '1; mode=block',
      referrerPolicy: 'no-referrer',
      permissionsPolicy: {
        camera: [],
        microphone: [],
        /**
         * Lista vazia vira `geolocation=()` e bloqueia o embed do Google Maps.
         * Origens na allowlist devem ir entre aspas no header: `"https://…"`.
         * @see https://www.w3.org/TR/permissions-policy/#serialized-permissions-policy
         */
        geolocation: ['self', '"https://www.google.com"', '"https://maps.google.com"'],
        fullscreen: ['self', '"https://www.google.com"', '"https://maps.google.com"'],
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      xPermittedCrossDomainPolicies: 'none',
      xDownloadOptions: 'noopen',
    },
    corsHandler: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposeHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
  },
})
