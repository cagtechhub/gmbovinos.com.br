import { z } from 'zod'

export const mediaKindSchema = z.enum(['IMAGE', 'VIDEO', 'DOCUMENT'])

export const createGalleryItemSchema = z.object({
  kind: mediaKindSchema.default('IMAGE'),
  url: z.string().trim().min(1).max(2000),
  storagePath: z.string().trim().max(1000).default(''),
  posterUrl: z.string().trim().max(2000).optional().nullable(),
  alt: z.string().trim().min(1).max(300),
  caption: z.string().trim().max(500).default(''),
  sortOrder: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export const updateGalleryItemSchema = createGalleryItemSchema.partial()

export const reorderGallerySchema = z.object({
  orderedIds: z.array(z.string()).min(1),
})

export const galleryItemSchema = createGalleryItemSchema.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MediaKind = z.infer<typeof mediaKindSchema>
export type CreateGalleryItemInput = z.infer<typeof createGalleryItemSchema>
export type UpdateGalleryItemInput = z.infer<typeof updateGalleryItemSchema>
export type ReorderGalleryInput = z.infer<typeof reorderGallerySchema>
export type GalleryItem = z.infer<typeof galleryItemSchema>
