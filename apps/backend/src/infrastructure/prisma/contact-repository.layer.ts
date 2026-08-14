import { ContactRepository } from "@/application/contact-repository.context"
import { Effect, Layer } from "effect"
import { makePrismaContactRepository } from "@/infrastructure/prisma/prisma-contact-repository.adapter"
import { PrismaService } from "@/infrastructure/prisma/prisma.service"

export const ContactRepositoryFromPrisma = Layer.effect(
  ContactRepository,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaContactRepository(prisma)
  })
)
