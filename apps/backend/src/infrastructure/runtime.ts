import { Layer } from "effect"
import { ContactRepository } from "../application/contact-repository.context.js"
import { DatabaseHealth } from "../application/database-health.context.js"
import { GalleryRepository } from "../application/gallery-repository.context.js"
import { LeadRepository } from "../application/lead-repository.context.js"
import { ObjectStorage } from "../application/object-storage.context.js"
import { SiteSectionRepository } from "../application/site-section-repository.context.js"
import { SiteSettingsRepository } from "../application/site-settings-repository.context.js"
import { ContactRepositoryFromPrisma } from "./prisma/contact-repository.layer.js"
import { DatabaseHealthFromPrisma } from "./prisma/database-health.layer.js"
import { GalleryRepositoryFromPrisma } from "./prisma/gallery-repository.layer.js"
import { LeadRepositoryFromPrisma } from "./prisma/lead-repository.layer.js"
import { PrismaLayer } from "./prisma/prisma.service.js"
import { SiteSectionRepositoryFromPrisma } from "./prisma/site-section-repository.layer.js"
import { SiteSettingsRepositoryFromPrisma } from "./prisma/site-settings-repository.layer.js"
import { ObjectStorageFromSupabase } from "./supabase/object-storage.layer.js"

export type AppServices =
  | DatabaseHealth
  | ContactRepository
  | LeadRepository
  | ObjectStorage
  | SiteSettingsRepository
  | SiteSectionRepository
  | GalleryRepository

export const AppRuntimeLayer: Layer.Layer<AppServices, never, never> = Layer.mergeAll(
  DatabaseHealthFromPrisma,
  ContactRepositoryFromPrisma,
  LeadRepositoryFromPrisma,
  ObjectStorageFromSupabase,
  SiteSettingsRepositoryFromPrisma,
  SiteSectionRepositoryFromPrisma,
  GalleryRepositoryFromPrisma
).pipe(Layer.provide(PrismaLayer))
