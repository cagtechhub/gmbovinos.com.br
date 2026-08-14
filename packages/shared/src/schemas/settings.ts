import { z } from 'zod'

export const siteSettingsSchema = z.object({
  id: z.string(),
  siteUrl: z.string().default(''),
  siteName: z.string().default('GM Bovinos'),
  seoLocality: z.string().default('Minas Gerais'),
  noIndex: z.boolean().default(false),
  businessAddress: z.string().default(''),
  businessPhone: z.string().default(''),
  contactEmail: z.string().default(''),
  whatsappNumber: z.string().default(''),
  whatsappMessage: z.string().default(''),
  instagramUrl: z.string().default(''),
  facebookUrl: z.string().default(''),
  founderProfileUrl: z.string().default(''),
  defaultOgImageUrl: z.string().default('/media/photos/02.webp'),
  ga4MeasurementId: z.string().default(''),
  metaPixelId: z.string().default(''),
  mapsEmbedUrl: z.string().default(''),
  geoLatitude: z.string().default('-21.5354594'),
  geoLongitude: z.string().default('-45.4830883'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const updateSiteSettingsSchema = z.object({
  siteUrl: z.string().trim().max(500).optional(),
  siteName: z.string().trim().min(2).max(160).optional(),
  seoLocality: z.string().trim().max(120).optional(),
  noIndex: z.boolean().optional(),
  businessAddress: z.string().trim().max(500).optional(),
  businessPhone: z.string().trim().max(40).optional(),
  contactEmail: z.string().trim().email().or(z.literal('')).optional(),
  whatsappNumber: z.string().trim().max(40).optional(),
  whatsappMessage: z.string().trim().max(500).optional(),
  instagramUrl: z.string().trim().max(500).optional(),
  facebookUrl: z.string().trim().max(500).optional(),
  founderProfileUrl: z.string().trim().max(500).optional(),
  defaultOgImageUrl: z.string().trim().max(1000).optional(),
  ga4MeasurementId: z.string().trim().max(40).optional(),
  metaPixelId: z.string().trim().max(40).optional(),
  mapsEmbedUrl: z.string().trim().max(2000).optional(),
  geoLatitude: z.string().trim().max(40).optional(),
  geoLongitude: z.string().trim().max(40).optional(),
})

export type SiteSettings = z.infer<typeof siteSettingsSchema>
export type UpdateSiteSettingsInput = z.infer<typeof updateSiteSettingsSchema>
