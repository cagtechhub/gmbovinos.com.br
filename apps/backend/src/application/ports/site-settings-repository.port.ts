import type { SiteSettings, UpdateSiteSettingsInput } from "@gmbovinos/shared"
import type { Effect } from "effect"
import type { InfraError } from "@/domain/errors/infra-error"

export interface SiteSettingsRepositoryPort {
  readonly get: () => Effect.Effect<SiteSettings, InfraError, never>
  readonly update: (
    input: UpdateSiteSettingsInput
  ) => Effect.Effect<SiteSettings, InfraError, never>
}
