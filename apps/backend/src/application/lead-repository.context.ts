import { Context } from "effect"
import type { LeadRepositoryPort } from "@/application/ports/lead-repository.port"

export class LeadRepository extends Context.Tag("@gmbovinos/LeadRepository")<
  LeadRepository,
  LeadRepositoryPort
>() {}
