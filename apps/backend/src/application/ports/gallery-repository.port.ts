import type {
  CreateGalleryItemInput,
  GalleryItem,
  UpdateGalleryItemInput,
} from "@gmbovinos/shared"
import type { Effect } from "effect"
import type { InfraError } from "@/domain/errors/infra-error"

export interface GalleryRepositoryPort {
  readonly list: (opts?: {
    activeOnly?: boolean
  }) => Effect.Effect<GalleryItem[], InfraError, never>
  readonly findById: (id: string) => Effect.Effect<GalleryItem | null, InfraError, never>
  readonly create: (input: CreateGalleryItemInput) => Effect.Effect<GalleryItem, InfraError, never>
  readonly update: (
    id: string,
    input: UpdateGalleryItemInput
  ) => Effect.Effect<GalleryItem, InfraError, never>
  readonly remove: (id: string) => Effect.Effect<void, InfraError, never>
  readonly reorder: (orderedIds: string[]) => Effect.Effect<GalleryItem[], InfraError, never>
}
