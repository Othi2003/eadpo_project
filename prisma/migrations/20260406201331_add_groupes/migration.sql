/*
  Warnings:

  - You are about to drop the `Groupe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageGroupe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MembreGroupe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ObjectifGroupe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageGroupe" DROP CONSTRAINT "ImageGroupe_groupeId_fkey";

-- DropForeignKey
ALTER TABLE "MembreGroupe" DROP CONSTRAINT "MembreGroupe_groupeId_fkey";

-- DropForeignKey
ALTER TABLE "ObjectifGroupe" DROP CONSTRAINT "ObjectifGroupe_groupeId_fkey";

-- DropTable
DROP TABLE "Groupe";

-- DropTable
DROP TABLE "ImageGroupe";

-- DropTable
DROP TABLE "MembreGroupe";

-- DropTable
DROP TABLE "ObjectifGroupe";

-- CreateTable
CREATE TABLE "groupe" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "publie" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectif_groupe" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "groupeId" TEXT NOT NULL,

    CONSTRAINT "objectif_groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_groupe" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "groupeId" TEXT NOT NULL,

    CONSTRAINT "image_groupe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groupe_slug_key" ON "groupe"("slug");

-- AddForeignKey
ALTER TABLE "objectif_groupe" ADD CONSTRAINT "objectif_groupe_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_groupe" ADD CONSTRAINT "image_groupe_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
