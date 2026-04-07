"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function creerSlide(data: { image: string; label?: string; texte?: string; reference?: string }) {
  const count = await prisma.slideHero.count()
  await prisma.slideHero.create({ data: { ...data, ordre: count } })
  revalidatePath("/")
  revalidatePath("/admin/accueil")
}

export async function modifierSlide(id: string, data: { image: string; label?: string; texte?: string; reference?: string }) {
  await prisma.slideHero.update({ where: { id }, data })
  revalidatePath("/")
  revalidatePath("/admin/accueil")
}

export async function supprimerSlide(id: string) {
  await prisma.slideHero.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/accueil")
}