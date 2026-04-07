import { prisma } from "@/lib/prisma"
import StructuresPageClient from "./StructuresPageClient"

export default async function StructuresPage() {
  const structures = await prisma.structure.findMany({
    where: { publie: true },
    include: {
      images: { orderBy: { ordre: "asc" } },
      objectifs: { orderBy: { ordre: "asc" } },
    },
    orderBy: { ordre: "asc" },
  })
  return <StructuresPageClient structures={structures} />
}