import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import CulteDetail from "../components/CulteDetail"

export default async function CultePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const culte = await prisma.culte.findUnique({
    where: { slug },
    include: {
      etapes: { orderBy: { numero: "asc" } },
      images: { orderBy: { ordre: "asc" } },
    },
  })
  if (!culte) notFound()
  return <CulteDetail culte={culte} />
}