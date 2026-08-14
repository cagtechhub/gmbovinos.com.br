import type {
  SectionKey,
  SiteSection,
  UpdateSiteSectionInput,
} from "@gmbovinos/shared"
import type { Effect } from "effect"
import type { InfraError } from "@/domain/errors/infra-error"

export interface SiteSectionRepositoryPort {
  readonly list: () => Effect.Effect<SiteSection[], InfraError, never>
  readonly findByKey: (key: SectionKey) => Effect.Effect<SiteSection | null, InfraError, never>
  readonly update: (
    key: SectionKey,
    input: UpdateSiteSectionInput
  ) => Effect.Effect<SiteSection, InfraError, never>
}
