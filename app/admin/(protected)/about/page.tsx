import { prisma } from "@/lib/prisma"
import AProposAdminClient from "./AboutAdminClient"

export default async function AProposAdminPage() {
  const [apropos, jalons] = await Promise.all([
    prisma.aPropos.findFirst(),
    prisma.jalonHistoire.findMany({ orderBy: { ordre: "asc" } }),
  ])
  return <AProposAdminClient apropos={apropos} jalons={jalons} />
}