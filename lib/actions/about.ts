"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function modifierAPropos(data: { vision: string; mission: string; valeurs: string }) {
  const existing = await prisma.aPropos.findFirst()
  if (existing) {
    await prisma.aPropos.update({ where: { id: existing.id }, data })
  } else {
    await prisma.aPropos.create({ data })
  }
  revalidatePath("/about")
}

export async function creerJalon(data: { annee: string; texte: string }) {
  const count = await prisma.jalonHistoire.count()
  await prisma.jalonHistoire.create({ data: { ...data, ordre: count } })
  revalidatePath("/about")
}

export async function modifierJalon(id: string, data: { annee: string; texte: string }) {
  await prisma.jalonHistoire.update({ where: { id }, data })
  revalidatePath("/about")
}

export async function supprimerJalon(id: string) {
  await prisma.jalonHistoire.delete({ where: { id } })
  revalidatePath("/about")
}