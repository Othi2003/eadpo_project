import { prisma } from "@/lib/prisma"
import ProgrammeClient from "./ProgrammeClient"

export default async function Programme() {
  const programmes = await prisma.programme.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
  })
  return <ProgrammeClient programmes={programmes} />
}