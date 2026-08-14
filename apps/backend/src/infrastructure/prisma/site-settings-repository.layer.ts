import { SiteSettingsRepository } from "@/application/site-settings-repository.context"
import { Effect, Layer } from "effect"
import { makePrismaSiteSettingsRepository } from "@/infrastructure/prisma/prisma-site-settings-repository.adapter"
import { PrismaService } from "@/infrastructure/prisma/prisma.service"

export const SiteSettingsRepositoryFromPrisma = Layer.effect(
  SiteSettingsRepository,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaSiteSettingsRepository(prisma)
  })
)
