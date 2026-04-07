-- CreateTable
CREATE TABLE "jalon_histoire" (
    "id" TEXT NOT NULL,
    "annee" TEXT NOT NULL,
    "texte" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jalon_histoire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "a_propos" (
    "id" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "valeurs" TEXT NOT NULL,

    CONSTRAINT "a_propos_pkey" PRIMARY KEY ("id")
);
