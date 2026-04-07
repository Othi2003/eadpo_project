import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import GroupeDetail from "../components/GroupeDetail"

export default async function GroupePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const groupe = await prisma.groupe.findUnique({
    where: { slug },
    include: {
      objectifs: { orderBy: { ordre: "asc" } },
      images: { orderBy: { ordre: "asc" } },
    },
  })
  if (!groupe) notFound()
  return <GroupeDetail groupe={groupe} />
}