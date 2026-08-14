import { SiteSectionRepository } from "@/application/site-section-repository.context"
import { Effect, Layer } from "effect"
import { makePrismaSiteSectionRepository } from "@/infrastructure/prisma/prisma-site-section-repository.adapter"
import { PrismaService } from "@/infrastructure/prisma/prisma.service"

export const SiteSectionRepositoryFromPrisma = Layer.effect(
  SiteSectionRepository,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaSiteSectionRepository(prisma)
  })
)
