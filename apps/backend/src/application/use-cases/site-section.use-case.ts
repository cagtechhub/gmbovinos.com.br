import type { SectionKey, UpdateSiteSectionInput } from "@gmbovinos/shared"
import { Effect } from "effect"
import { InfraError } from "@/domain/errors/infra-error"
import { SiteSectionRepository } from "@/application/site-section-repository.context"

export const listSections = Effect.gen(function* () {
  const repo = yield* SiteSectionRepository
  return yield* repo.list()
})

export const getSectionByKey = (key: SectionKey) =>
  Effect.gen(function* () {
    const repo = yield* SiteSectionRepository
    const section = yield* repo.findByKey(key)
    if (!section) {
      return yield* Effect.fail(new InfraError("Section not found"))
    }
    return section
  })

export const updateSection = (key: SectionKey, input: UpdateSiteSectionInput) =>
  Effect.gen(function* () {
    const repo = yield* SiteSectionRepository
    const existing = yield* repo.findByKey(key)
    if (!existing) {
      return yield* Effect.fail(new InfraError("Section not found"))
    }
    return yield* repo.update(key, input)
  })
