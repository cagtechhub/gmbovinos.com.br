import {
  galleryItemSchema,
  type CreateGalleryItemInput,
  type GalleryItem,
  type UpdateGalleryItemInput,
} from "@gmbovinos/shared"
import type { GalleryRepositoryPort } from "../../application/ports/gallery-repository.port.js"
import { InfraError } from "../../domain/errors/infra-error.js"
import { Effect } from "effect"
import type { PrismaClient } from "./output/client.js"

type GalleryRecord = {
  id: string
  kind: GalleryItem["kind"]
  url: string
  storagePath: string
  posterUrl: string | null
  alt: string
  caption: string
  sortOrder: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const mapGalleryItem = (record: GalleryRecord): GalleryItem =>
  galleryItemSchema.parse({
    id: record.id,
    kind: record.kind,
    url: record.url,
    storagePath: record.storagePath,
    posterUrl: record.posterUrl,
    alt: record.alt,
    caption: record.caption,
    sortOrder: record.sortOrder,
    active: record.active,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  })

export const makePrismaGalleryRepository = (prisma: PrismaClient): GalleryRepositoryPort => ({
  list: (opts) =>
    Effect.tryPromise({
      try: () =>
        prisma.galleryItem.findMany({
          where: opts?.activeOnly ? { active: true } : undefined,
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        }),
      catch: (cause) => new InfraError("Failed to list gallery items", cause),
    }).pipe(Effect.map((rows) => rows.map(mapGalleryItem))),

  findById: (id) =>
    Effect.tryPromise({
      try: () => prisma.galleryItem.findUnique({ where: { id } }),
      catch: (cause) => new InfraError("Failed to find gallery item", cause),
    }).pipe(Effect.map((row) => (row ? mapGalleryItem(row) : null))),

  create: (input: CreateGalleryItemInput) =>
    Effect.tryPromise({
      try: () =>
        prisma.galleryItem.create({
          data: {
            kind: input.kind ?? "IMAGE",
            url: input.url,
            storagePath: input.storagePath ?? "",
            posterUrl: input.posterUrl ?? null,
            alt: input.alt,
            caption: input.caption ?? "",
            sortOrder: input.sortOrder ?? 0,
            active: input.active ?? true,
          },
        }),
      catch: (cause) => new InfraError("Failed to create gallery item", cause),
    }).pipe(Effect.map(mapGalleryItem)),

  update: (id, input: UpdateGalleryItemInput) =>
    Effect.tryPromise({
      try: () =>
        prisma.galleryItem.update({
          where: { id },
          data: {
            ...(input.kind !== undefined ? { kind: input.kind } : {}),
            ...(input.url !== undefined ? { url: input.url } : {}),
            ...(input.storagePath !== undefined ? { storagePath: input.storagePath } : {}),
            ...(input.posterUrl !== undefined ? { posterUrl: input.posterUrl } : {}),
            ...(input.alt !== undefined ? { alt: input.alt } : {}),
            ...(input.caption !== undefined ? { caption: input.caption } : {}),
            ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
            ...(input.active !== undefined ? { active: input.active } : {}),
          },
        }),
      catch: (cause) => new InfraError("Failed to update gallery item", cause),
    }).pipe(Effect.map(mapGalleryItem)),

  remove: (id) =>
    Effect.tryPromise({
      try: () => prisma.galleryItem.delete({ where: { id } }),
      catch: (cause) => new InfraError("Failed to delete gallery item", cause),
    }).pipe(Effect.asVoid),

  reorder: (orderedIds) =>
    Effect.tryPromise({
      try: async () => {
        await prisma.$transaction(
          orderedIds.map((id, index) =>
            prisma.galleryItem.update({
              where: { id },
              data: { sortOrder: index },
            })
          )
        )
        return prisma.galleryItem.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        })
      },
      catch: (cause) => new InfraError("Failed to reorder gallery items", cause),
    }).pipe(Effect.map((rows) => rows.map(mapGalleryItem))),
})
