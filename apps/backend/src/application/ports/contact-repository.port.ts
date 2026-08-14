import type { Contact, CreateContactInput } from "@gmbovinos/shared"
import type { Effect } from "effect"
import type { InfraError } from "@/domain/errors/infra-error"

export interface ContactRepositoryPort {
  readonly create: (input: CreateContactInput) => Effect.Effect<Contact, InfraError, never>
}
