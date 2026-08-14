import {
  sectionKeySchema,
  sectionPayloadSchema,
  siteSectionSchema,
  type SectionKey,
  type SiteSection,
  type UpdateSiteSectionInput,
} from "@gmbovinos/shared"
import type { SiteSectionRepositoryPort } from "@/application/ports/site-section-repository.port"
import { InfraError } from "@/domain/errors/infra-error"
import { Effect } from "effect"
import type { Prisma, PrismaClient } from "@/infrastructure/prisma/output/client"

const mapSection = (record: {
  id: string
  key: string
  title: string
  payload: unknown
  updatedAt: Date
}): SiteSection =>
  siteSectionSchema.parse({
    id: record.id,
    key: sectionKeySchema.parse(record.key),
    title: record.title,
    payload: sectionPayloadSchema.parse(record.payload ?? {}),
    updatedAt: record.updatedAt,
  })

const toInputJson = (
  value: NonNullable<UpdateSiteSectionInput["payload"]>
): Prisma.InputJsonValue => JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue

export const makePrismaSiteSectionRepository = (
  prisma: PrismaClient
): SiteSectionRepositoryPort => ({
  list: () =>
    Effect.tryPromise({
      try: () => prisma.siteSection.findMany({ orderBy: { key: "asc" } }),
      catch: (cause) => new InfraError("Failed to list site sections", cause),
    }).pipe(Effect.map((rows) => rows.map(mapSection))),

  findByKey: (key: SectionKey) =>
    Effect.tryPromise({
      try: () => prisma.siteSection.findUnique({ where: { key } }),
      catch: (cause) => new InfraError("Failed to find site section", cause),
    }).pipe(Effect.map((row) => (row ? mapSection(row) : null))),

  update: (key: SectionKey, input: UpdateSiteSectionInput) =>
    Effect.tryPromise({
      try: () =>
        prisma.siteSection.update({
          where: { key },
          data: {
            ...(input.title !== undefined ? { title: input.title } : {}),
            ...(input.payload !== undefined ? { payload: toInputJson(input.payload) } : {}),
          },
        }),
      catch: (cause) => new InfraError("Failed to update site section", cause),
    }).pipe(Effect.map(mapSection)),
})
