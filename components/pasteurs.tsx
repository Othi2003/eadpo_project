import { prisma } from "@/lib/prisma"
import PasteursClient from "./PasteursClient"

export default async function Pasteurs() {
  const pasteurs = await prisma.pasteur.findMany({ orderBy: { ordre: "asc" } })
  return <PasteursClient pasteurs={pasteurs} />
}