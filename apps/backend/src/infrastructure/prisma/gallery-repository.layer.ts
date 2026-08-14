import { GalleryRepository } from "../../application/gallery-repository.context.js"
import { Effect, Layer } from "effect"
import { makePrismaGalleryRepository } from "./prisma-gallery-repository.adapter.js"
import { PrismaService } from "./prisma.service.js"

export const GalleryRepositoryFromPrisma = Layer.effect(
  GalleryRepository,
  Effect.gen(function* () {
    const prisma = yield* PrismaService
    return makePrismaGalleryRepository(prisma)
  })
)
