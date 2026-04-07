import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StructureDetail from "../components/StructureDetail"

export default async function StructurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const structure = await prisma.structure.findUnique({
    where: { slug },
    include: {
      membres: { orderBy: { ordre: "asc" } },
      objectifs: { orderBy: { ordre: "asc" } },
      images: { orderBy: { ordre: "asc" } },
    },
  })

  if (!structure) notFound()
  return <StructureDetail structure={structure} />
}