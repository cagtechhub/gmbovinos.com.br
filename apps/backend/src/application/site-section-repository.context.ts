import { Context } from "effect"
import type { SiteSectionRepositoryPort } from "./ports/site-section-repository.port.js"

export class SiteSectionRepository extends Context.Tag("@gmbovinos/SiteSectionRepository")<
  SiteSectionRepository,
  SiteSectionRepositoryPort
>() {}
