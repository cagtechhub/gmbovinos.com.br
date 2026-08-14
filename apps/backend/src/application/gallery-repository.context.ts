import { Context } from "effect"
import type { GalleryRepositoryPort } from "@/application/ports/gallery-repository.port"

export class GalleryRepository extends Context.Tag("@gmbovinos/GalleryRepository")<
  GalleryRepository,
  GalleryRepositoryPort
>() {}
