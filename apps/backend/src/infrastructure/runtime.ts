import { Layer } from "effect"
import { ContactRepository } from "@/application/contact-repository.context"
import { DatabaseHealth } from "@/application/database-health.context"
import { GalleryRepository } from "@/application/gallery-repository.context"
import { LeadRepository } from "@/application/lead-repository.context"
import { ObjectStorage } from "@/application/object-storage.context"
import { SiteSectionRepository } from "@/application/site-section-repository.context"
import { SiteSettingsRepository } from "@/application/site-settings-repository.context"
import { ContactRepositoryFromPrisma } from "@/infrastructure/prisma/contact-repository.layer"
import { DatabaseHealthFromPrisma } from "@/infrastructure/prisma/database-health.layer"
import { GalleryRepositoryFromPrisma } from "@/infrastructure/prisma/gallery-repository.layer"
import { LeadRepositoryFromPrisma } from "@/infrastructure/prisma/lead-repository.layer"
import { PrismaLayer } from "@/infrastructure/prisma/prisma.service"
import { SiteSectionRepositoryFromPrisma } from "@/infrastructure/prisma/site-section-repository.layer"
import { SiteSettingsRepositoryFromPrisma } from "@/infrastructure/prisma/site-settings-repository.layer"
import { ObjectStorageFromSupabase } from "@/infrastructure/supabase/object-storage.layer"

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
