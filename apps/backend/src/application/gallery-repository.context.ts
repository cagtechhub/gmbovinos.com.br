import { Context } from "effect"
import type { GalleryRepositoryPort } from "./ports/gallery-repository.port.js"

export class GalleryRepository extends Context.Tag("@gmbovinos/GalleryRepository")<
  GalleryRepository,
  GalleryRepositoryPort
>() {}
