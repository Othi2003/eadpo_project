import { prisma } from "@/lib/prisma"
import GroupesPageClient from "./GroupesPageClient"

export default async function GroupesPage() {
  const groupes = await prisma.groupe.findMany({
    where: { publie: true },
    include: {
      objectifs: { orderBy: { ordre: "asc" } },
      images: { orderBy: { ordre: "asc" } },
    },
    orderBy: { ordre: "asc" },
  })
  return <GroupesPageClient groupes={groupes} />
}