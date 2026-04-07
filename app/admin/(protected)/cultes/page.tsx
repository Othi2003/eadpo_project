import { prisma } from "@/lib/prisma"
import CultesAdminClient from "./CultesClient"

export default async function CultesAdminPage() {
  const cultes = await prisma.culte.findMany({
    include: {
      etapes: { orderBy: { numero: "asc" } },
      images: { orderBy: { ordre: "asc" } },
    },
    orderBy: { date: "desc" },
  })
  return <CultesAdminClient cultes={cultes} />
}