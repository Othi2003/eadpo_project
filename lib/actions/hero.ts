"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function modifierImageSlide1(image: string) {
  // Le premier slide (ordre 0) — on modifie uniquement l'image
  const slide = await prisma.slideHero.findFirst({ where: { ordre: 0 } })
  if (slide) {
    await prisma.slideHero.update({
      where: { id: slide.id },
      data: { image, label: null, texte: null, reference: null },
    })
  } else {
    await prisma.slideHero.create({
      data: { image, ordre: 0, label: null, texte: null, reference: null },
    })
  }
  revalidatePath("/")
}

export async function creerSlide(data: { image: string; label?: string; texte?: string; reference?: string }) {
  const count = await prisma.slideHero.count()
  await prisma.slideHero.create({ data: { ...data, ordre: count } })
  revalidatePath("/")
}

export async function modifierSlide(id: string, data: { image: string; label?: string; texte?: string; reference?: string }) {
  await prisma.slideHero.update({ where: { id }, data })
  revalidatePath("/")
}

export async function supprimerSlide(id: string) {
  await prisma.slideHero.delete({ where: { id } })
  revalidatePath("/")
}