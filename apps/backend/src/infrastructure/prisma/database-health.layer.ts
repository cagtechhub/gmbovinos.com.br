import { DatabaseHealth } from "@/application/database-health.context"
import { Effect, Layer } from "effect"
import { makePrismaDatabaseHealth } from "@/infrastructure/prisma/prisma-database-health.adapter"
import { PrismaService } from "@/infrastructure/prisma/prisma.service"

export const DatabaseHealthFromPrisma = Layer.effect(
  DatabaseHealth,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaDatabaseHealth(prisma)
  })
)
