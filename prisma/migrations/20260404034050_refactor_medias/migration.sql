/*
  Warnings:

  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DossierType" AS ENUM ('CULTE', 'EVENEMENT');

-- CreateEnum
CREATE TYPE "FichierType" AS ENUM ('PHOTO', 'VIDEO');

-- DropTable
DROP TABLE "media";

-- DropEnum
DROP TYPE "MediaType";

-- CreateTable
CREATE TABLE "dossier_media" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "DossierType" NOT NULL DEFAULT 'EVENEMENT',
    "culteId" TEXT,
    "parentId" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dossier_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_fichier" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "FichierType" NOT NULL,
    "nom" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "dossierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_fichier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dossier_media_slug_key" ON "dossier_media"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "dossier_media_culteId_key" ON "dossier_media"("culteId");

-- AddForeignKey
ALTER TABLE "dossier_media" ADD CONSTRAINT "dossier_media_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "dossier_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_fichier" ADD CONSTRAINT "media_fichier_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "dossier_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
