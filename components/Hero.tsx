import { prisma } from "@/lib/prisma"
import HeroClient from "./HeroClient"

export default async function Hero() {
  const slides = await prisma.slideHero.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
  })
  return <HeroClient slides={slides} />
}