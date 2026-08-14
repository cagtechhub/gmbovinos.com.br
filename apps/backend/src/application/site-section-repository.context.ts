import { Context } from "effect"
import type { SiteSectionRepositoryPort } from "@/application/ports/site-section-repository.port"

export class SiteSectionRepository extends Context.Tag("@gmbovinos/SiteSectionRepository")<
  SiteSectionRepository,
  SiteSectionRepositoryPort
>() {}
