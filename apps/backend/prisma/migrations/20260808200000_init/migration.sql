-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "gmbovinos";

-- CreateEnum
CREATE TYPE "gmbovinos"."lead_channel" AS ENUM ('WEBSITE', 'ADSENSE', 'WHATSAPP', 'INSTAGRAM', 'FACEBOOK', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "gmbovinos"."lead_status" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST');

-- CreateEnum
CREATE TYPE "gmbovinos"."media_kind" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateTable
CREATE TABLE "gmbovinos"."contacts" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gmbovinos"."leads" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "notes" TEXT,
    "channel" "gmbovinos"."lead_channel" NOT NULL DEFAULT 'WEBSITE',
    "status" "gmbovinos"."lead_status" NOT NULL DEFAULT 'NEW',
    "contact_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gmbovinos"."site_settings" (
    "id" TEXT NOT NULL,
    "site_url" TEXT NOT NULL DEFAULT '',
    "site_name" TEXT NOT NULL DEFAULT 'GM Bovinos',
    "seo_locality" TEXT NOT NULL DEFAULT 'Minas Gerais',
    "no_index" BOOLEAN NOT NULL DEFAULT false,
    "business_address" TEXT NOT NULL DEFAULT '',
    "business_phone" TEXT NOT NULL DEFAULT '',
    "contact_email" TEXT NOT NULL DEFAULT '',
    "whatsapp_number" TEXT NOT NULL DEFAULT '',
    "whatsapp_message" TEXT NOT NULL DEFAULT '',
    "instagram_url" TEXT NOT NULL DEFAULT '',
    "facebook_url" TEXT NOT NULL DEFAULT '',
    "founder_profile_url" TEXT NOT NULL DEFAULT '',
    "default_og_image_url" TEXT NOT NULL DEFAULT '/media/photos/02.webp',
    "ga4_measurement_id" TEXT NOT NULL DEFAULT '',
    "meta_pixel_id" TEXT NOT NULL DEFAULT '',
    "maps_embed_url" TEXT NOT NULL DEFAULT '',
    "geo_latitude" TEXT NOT NULL DEFAULT '-21.5354594',
    "geo_longitude" TEXT NOT NULL DEFAULT '-45.4830883',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gmbovinos"."site_sections" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gmbovinos"."gallery_items" (
    "id" TEXT NOT NULL,
    "kind" "gmbovinos"."media_kind" NOT NULL DEFAULT 'IMAGE',
    "url" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL DEFAULT '',
    "poster_url" TEXT,
    "alt" TEXT NOT NULL,
    "caption" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contacts_email_idx" ON "gmbovinos"."contacts"("email");

-- CreateIndex
CREATE INDEX "leads_channel_idx" ON "gmbovinos"."leads"("channel");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "gmbovinos"."leads"("status");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "gmbovinos"."leads"("email");

-- CreateIndex
CREATE INDEX "leads_created_at_idx" ON "gmbovinos"."leads"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "site_sections_key_key" ON "gmbovinos"."site_sections"("key");

-- CreateIndex
CREATE INDEX "gallery_items_active_idx" ON "gmbovinos"."gallery_items"("active");

-- CreateIndex
CREATE INDEX "gallery_items_sort_order_idx" ON "gmbovinos"."gallery_items"("sort_order");

-- AddForeignKey
ALTER TABLE "gmbovinos"."leads" ADD CONSTRAINT "leads_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "gmbovinos"."contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
