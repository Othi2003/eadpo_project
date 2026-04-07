import { prisma } from "@/lib/prisma"
import InformationsClient from "./InformationsClient"

export default async function InformationsPage() {
  const informations = await prisma.information.findMany({ orderBy: { createdAt: "desc" } })
  return <InformationsClient informations={informations} />
}