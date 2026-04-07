/*
  Warnings:

  - You are about to drop the column `chantre` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the column `chantre_photo` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the column `interprete` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the column `interprete_photo` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the column `predicateur` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the column `predicateur_photo` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the column `verset` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the column `versetRef` on the `culte` table. All the data in the column will be lost.
  - You are about to drop the `prestation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "prestation" DROP CONSTRAINT "prestation_culteId_fkey";

-- AlterTable
ALTER TABLE "culte" DROP COLUMN "chantre",
DROP COLUMN "chantre_photo",
DROP COLUMN "interprete",
DROP COLUMN "interprete_photo",
DROP COLUMN "predicateur",
DROP COLUMN "predicateur_photo",
DROP COLUMN "verset",
DROP COLUMN "versetRef",
ADD COLUMN     "audio" TEXT,
ADD COLUMN     "video" TEXT;

-- DropTable
DROP TABLE "prestation";

-- CreateTable
CREATE TABLE "etape_culte" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "culteId" TEXT NOT NULL,

    CONSTRAINT "etape_culte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "etape_culte" ADD CONSTRAINT "etape_culte_culteId_fkey" FOREIGN KEY ("culteId") REFERENCES "culte"("id") ON DELETE CASCADE ON UPDATE CASCADE;
