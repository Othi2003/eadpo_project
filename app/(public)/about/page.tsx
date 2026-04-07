import { prisma } from "@/lib/prisma"
import AProposClient from "./AboutClient"

export default async function AboutPage() {
  const [apropos, jalons] = await Promise.all([
    prisma.aPropos.findFirst(),
    prisma.jalonHistoire.findMany({ orderBy: { ordre: "asc" } }),
  ])
  return <AProposClient apropos={apropos} jalons={jalons} />
}