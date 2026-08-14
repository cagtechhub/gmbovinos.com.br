import { GalleryRepository } from "@/application/gallery-repository.context"
import { Effect, Layer } from "effect"
import { makePrismaGalleryRepository } from "@/infrastructure/prisma/prisma-gallery-repository.adapter"
import { PrismaService } from "@/infrastructure/prisma/prisma.service"

export const GalleryRepositoryFromPrisma = Layer.effect(
  GalleryRepository,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaGalleryRepository(prisma)
  })
)
