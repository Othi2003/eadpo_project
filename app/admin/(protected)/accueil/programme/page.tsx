import { prisma } from "@/lib/prisma"
import ProgrammeAdminClient from "./ProgrammeAdminClient"

export default async function ProgrammeAdminPage() {
  const programmes = await prisma.programme.findMany({ orderBy: { ordre: "asc" } })
  return <ProgrammeAdminClient programmes={programmes} />
}