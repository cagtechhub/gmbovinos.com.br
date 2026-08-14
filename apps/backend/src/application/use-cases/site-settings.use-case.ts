import type { BrandAssetKind, UpdateSiteSettingsInput } from "@gmbovinos/shared"
import { Effect } from "effect"
import { InfraError } from "@/domain/errors/infra-error"
import { ObjectStorage } from "@/application/object-storage.context"
import { SiteSettingsRepository } from "@/application/site-settings-repository.context"

export const getSiteSettings = Effect.gen(function* () {
  const repo = yield* SiteSettingsRepository
  return yield* repo.get()
})

export const updateSiteSettings = (input: UpdateSiteSettingsInput) =>
  Effect.gen(function* () {
    const repo = yield* SiteSettingsRepository
    return yield* repo.update(input)
  })

export const uploadBrandAsset = (
  kind: BrandAssetKind,
  file: { fileName: string; contentType: string; body: Buffer }
) =>
  Effect.gen(function* () {
    const isImage = file.contentType.startsWith("image/")
    if (!isImage) {
      return yield* Effect.fail(new InfraError("Only image files are allowed"))
    }
    if (kind === "og" && file.contentType === "image/svg+xml") {
      return yield* Effect.fail(new InfraError("OG image must be PNG, JPEG or WebP"))
    }

    const repo = yield* SiteSettingsRepository
    const storage = yield* ObjectStorage
    const uploaded = yield* storage.upload({
      folder: "brand",
      fileName: file.fileName,
      contentType: file.contentType,
      body: file.body,
    })

    return yield* repo.update(
      kind === "favicon" ? { faviconUrl: uploaded.url } : { defaultOgImageUrl: uploaded.url }
    )
  })
