import { prisma } from "@/lib/prisma"
import StructuresAdminClient from "./StructuresClient"

export default async function StructuresAdminPage() {
  const structures = await prisma.structure.findMany({
    include: {
      membres: { orderBy: { ordre: "asc" } },
      objectifs: { orderBy: { ordre: "asc" } },
      images: { orderBy: { ordre: "asc" } },
    },
    orderBy: { ordre: "asc" },
  })
  return <StructuresAdminClient structures={structures} />
}