import { Context } from "effect"
import type { ContactRepositoryPort } from "@/application/ports/contact-repository.port"

export class ContactRepository extends Context.Tag("@gmbovinos/ContactRepository")<
  ContactRepository,
  ContactRepositoryPort
>() {}
