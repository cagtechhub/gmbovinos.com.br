import { z } from 'zod'

export const sectionKeySchema = z.enum([
  'hero',
  'como_funciona',
  'atuacao',
  'seo_content',
  'about',
  'cta',
  'pre_footer',
])

export const sectionPayloadSchema = z
  .object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    body: z.string().optional(),
    chip: z.string().optional(),
    imageUrl: z.string().optional(),
    ctaPrimaryLabel: z.string().optional(),
    ctaPrimaryHref: z.string().optional(),
    ctaSecondaryLabel: z.string().optional(),
    ctaSecondaryHref: z.string().optional(),
    /** Parágrafos longos (ex.: Sobre nós). */
    paragraphs: z.array(z.string()).optional(),
    /** Chips de destaque: "label|value" ou só o valor. */
    highlightChips: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
    pillars: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          points: z.array(z.string()).optional(),
        })
      )
      .optional(),
    chips: z.array(z.string()).optional(),
    bullets: z.array(z.string()).optional(),
    secondaryHeadline: z.string().optional(),
    secondaryBody: z.string().optional(),
    secondaryBullets: z.array(z.string()).optional(),
    audienceHeadline: z.string().optional(),
    audienceBody: z.string().optional(),
    timeline: z
      .array(
        z.object({
          label: z.string(),
          title: z.string().optional(),
          description: z.string(),
        })
      )
      .optional(),
  })
  .passthrough()

export const siteSectionSchema = z.object({
  id: z.string(),
  key: sectionKeySchema,
  title: z.string(),
  payload: sectionPayloadSchema,
  updatedAt: z.coerce.date(),
})

export const updateSiteSectionSchema = z.object({
  title: z.string().trim().min(2).max(160).optional(),
  payload: sectionPayloadSchema.optional(),
})

export type SectionKey = z.infer<typeof sectionKeySchema>
export type SectionPayload = z.infer<typeof sectionPayloadSchema>
export type SiteSection = z.infer<typeof siteSectionSchema>
export type UpdateSiteSectionInput = z.infer<typeof updateSiteSectionSchema>
