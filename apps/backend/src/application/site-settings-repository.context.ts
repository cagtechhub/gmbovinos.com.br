import { Context } from "effect"
import type { SiteSettingsRepositoryPort } from "@/application/ports/site-settings-repository.port"

export class SiteSettingsRepository extends Context.Tag("@gmbovinos/SiteSettingsRepository")<
  SiteSettingsRepository,
  SiteSettingsRepositoryPort
>() {}
