import { prisma } from "@/lib/prisma"
import MessagesClient from "./CultesClient"

export default async function MessagesPage() {
  const cultes = await prisma.culte.findMany({
    orderBy: { date: "desc" },
  })
  return <MessagesClient cultes={cultes} />
}