import { LeadRepository } from "@/application/lead-repository.context"
import { Effect, Layer } from "effect"
import { makePrismaLeadRepository } from "@/infrastructure/prisma/prisma-lead-repository.adapter"
import { PrismaService } from "@/infrastructure/prisma/prisma.service"

export const LeadRepositoryFromPrisma = Layer.effect(
  LeadRepository,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaLeadRepository(prisma)
  })
)
