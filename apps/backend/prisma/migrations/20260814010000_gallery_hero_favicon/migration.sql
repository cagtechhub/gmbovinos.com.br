-- AlterTable
ALTER TABLE "gmbovinos"."gallery_items" ADD COLUMN "featured_hero" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "gallery_items_featured_hero_idx" ON "gmbovinos"."gallery_items"("featured_hero");

-- AlterTable
ALTER TABLE "gmbovinos"."site_settings" ADD COLUMN "favicon_url" TEXT NOT NULL DEFAULT '/favicon.png';
