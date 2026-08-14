import { getRequestURL } from 'h3'

function noIndexFlag(config: { public?: Record<string, unknown> }) {
  const v = config.public?.noIndex
  return v === true || v === 'true' || v === '1'
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const noIndex = noIndexFlag(config as { public?: Record<string, unknown> })
  const configured = String(config.public?.siteUrl || '')
    .trim()
    .replace(/\/$/, '')
  const origin = configured || getRequestURL(event).origin

  const lines = ['User-Agent: *']
  if (noIndex) {
    lines.push('Disallow: /')
  } else {
    lines.push('Allow: /')
    lines.push('')
    lines.push(`Sitemap: ${origin}/sitemap.xml`)
  }

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return lines.join('\n')
})
