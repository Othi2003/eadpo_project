import { prisma } from "@/lib/prisma"
import HeroAdminClient from "./HeroAdminClient"

export default async function HeroAdminPage() {
  const slides = await prisma.slideHero.findMany({ orderBy: { ordre: "asc" } })
  return <HeroAdminClient slides={slides} />
}