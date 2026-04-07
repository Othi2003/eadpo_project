-- AlterTable
ALTER TABLE "structure" ADD COLUMN     "ordre" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "publie" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "objectif_structure" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "structureId" TEXT NOT NULL,

    CONSTRAINT "objectif_structure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_structure" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "structureId" TEXT NOT NULL,

    CONSTRAINT "image_structure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "objectif_structure" ADD CONSTRAINT "objectif_structure_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "structure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_structure" ADD CONSTRAINT "image_structure_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "structure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
