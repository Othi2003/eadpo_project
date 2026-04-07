import { prisma } from "@/lib/prisma"
import GroupesAdminClient from "./GroupesClient"

export default async function GroupesAdminPage() {
  const groupes = await prisma.groupe.findMany({
    include: {
      objectifs: { orderBy: { ordre: "asc" } },
      images: { orderBy: { ordre: "asc" } },
    },
    orderBy: { ordre: "asc" },
  })
  return <GroupesAdminClient groupes={groupes} />
}