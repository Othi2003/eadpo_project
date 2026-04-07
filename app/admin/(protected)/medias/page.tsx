import { prisma } from "@/lib/prisma"
import MediasAdminClient from "./MediasClient"

export default async function MediasAdminPage() {
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
  return <MediasAdminClient dossiers={dossiers} />
}