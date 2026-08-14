import type { DatabaseHealthPort } from "@/application/ports/database-health.port"
import { InfraError } from "@/domain/errors/infra-error"
import { Effect } from "effect"
import type { PrismaClient } from "@/infrastructure/prisma/output/client"

export const makePrismaDatabaseHealth = (prisma: PrismaClient): DatabaseHealthPort => ({
  ping: () =>
    Effect.tryPromise({
      try: () => prisma.$queryRaw`SELECT 1`,
      catch: (cause) => new InfraError("Database ping failed", cause),
    }).pipe(Effect.asVoid),
})
