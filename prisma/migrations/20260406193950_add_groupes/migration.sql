-- CreateTable
CREATE TABLE "Groupe" (
    "id" TEXT NOT NULL,
    "sigle" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectifGroupe" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "groupeId" TEXT NOT NULL,

    CONSTRAINT "ObjectifGroupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageGroupe" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "groupeId" TEXT NOT NULL,

    CONSTRAINT "ImageGroupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembreGroupe" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "groupeId" TEXT NOT NULL,

    CONSTRAINT "MembreGroupe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Groupe_slug_key" ON "Groupe"("slug");

-- AddForeignKey
ALTER TABLE "ObjectifGroupe" ADD CONSTRAINT "ObjectifGroupe_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGroupe" ADD CONSTRAINT "ImageGroupe_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembreGroupe" ADD CONSTRAINT "MembreGroupe_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
