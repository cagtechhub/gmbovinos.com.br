import { SiteSectionRepository } from "../../application/site-section-repository.context.js"
import { Effect, Layer } from "effect"
import { makePrismaSiteSectionRepository } from "./prisma-site-section-repository.adapter.js"
import { PrismaService } from "./prisma.service.js"

export const SiteSectionRepositoryFromPrisma = Layer.effect(
  SiteSectionRepository,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaSiteSectionRepository(prisma)
  })
)
