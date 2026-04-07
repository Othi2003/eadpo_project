import { prisma } from "@/lib/prisma"
import InformationsClient from "./InformationsClient"

export default async function Informations() {
  const informations = await prisma.information.findMany({
    where: { publie: true },
    orderBy: { createdAt: "desc" },
  })
  if (informations.length === 0) return null
  return <InformationsClient informations={informations} />
}