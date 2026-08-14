import type {
  CreateGalleryItemInput,
  UpdateGalleryItemInput,
} from "@gmbovinos/shared"
import { Effect } from "effect"
import { InfraError } from "../../domain/errors/infra-error.js"
import { resolveMediaKind } from "../../domain/media/media-kind.js"
import { GalleryRepository } from "../gallery-repository.context.js"
import { ObjectStorage } from "../object-storage.context.js"

export const listGallery = (opts?: { activeOnly?: boolean }) =>
  Effect.gen(function* () {
    const repo = yield* GalleryRepository
    return yield* repo.list(opts)
  })

export const getGalleryItem = (id: string) =>
  Effect.gen(function* () {
    const repo = yield* GalleryRepository
    const item = yield* repo.findById(id)
    if (!item) {
      return yield* Effect.fail(new InfraError("Gallery item not found"))
    }
    return item
  })

export const createGalleryItem = (input: CreateGalleryItemInput) =>
  Effect.gen(function* () {
    const repo = yield* GalleryRepository
    return yield* repo.create(input)
  })

export const updateGalleryItem = (id: string, input: UpdateGalleryItemInput) =>
  Effect.gen(function* () {
    const repo = yield* GalleryRepository
    const existing = yield* repo.findById(id)
    if (!existing) {
      return yield* Effect.fail(new InfraError("Gallery item not found"))
    }
    return yield* repo.update(id, input)
  })

export const deleteGalleryItem = (id: string) =>
  Effect.gen(function* () {
    const repo = yield* GalleryRepository
    const storage = yield* ObjectStorage
    const existing = yield* repo.findById(id)
    if (!existing) {
      return yield* Effect.fail(new InfraError("Gallery item not found"))
    }
    if (existing.storagePath) {
      yield* storage.remove(existing.storagePath)
    }
    yield* repo.remove(id)
  })

export const reorderGallery = (orderedIds: string[]) =>
  Effect.gen(function* () {
    const repo = yield* GalleryRepository
    return yield* repo.reorder(orderedIds)
  })

export const uploadGalleryItem = (
  file: { fileName: string; contentType: string; body: Buffer },
  meta: { alt: string; caption?: string }
) =>
  Effect.gen(function* () {
    const kind = resolveMediaKind(file.contentType, file.fileName)
    if (!kind) {
      return yield* Effect.fail(new InfraError("Unsupported file type"))
    }

    const repo = yield* GalleryRepository
    const storage = yield* ObjectStorage
    const existing = yield* repo.list()
    const nextOrder = existing.reduce((max, item) => Math.max(max, item.sortOrder), -1) + 1

    const uploaded = yield* storage.upload({
      folder: "gallery",
      fileName: file.fileName,
      contentType: file.contentType,
      body: file.body,
    })

    return yield* repo.create({
      kind,
      url: uploaded.url,
      storagePath: uploaded.storagePath,
      alt: meta.alt,
      caption: meta.caption ?? "",
      sortOrder: nextOrder,
      active: true,
    })
  })
