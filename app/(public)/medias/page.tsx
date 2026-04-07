import { prisma } from "@/lib/prisma"
import MediasPublicClient from "./MediasClient"

export default async function MediasPage() {
  const dossiers = await prisma.dossierMedia.findMany({
    where: { parentId: null },
    include: {
      medias: { orderBy: { ordre: "asc" } },
      sousDossiers: {
        include: {
          medias: { orderBy: { ordre: "asc" } },
          sousDossiers: {
            include: { medias: { orderBy: { ordre: "asc" } } },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
  return <MediasPublicClient dossiers={dossiers} />
}