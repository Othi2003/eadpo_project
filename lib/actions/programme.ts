"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function creerProgramme(data: { jour: string; heure: string; titre: string }) {
  const count = await prisma.programme.count()
  await prisma.programme.create({ data: { ...data, ordre: count } })
  revalidatePath("/")
  revalidatePath("/admin/accueil/programme")
}

export async function modifierProgramme(id: string, data: { jour: string; heure: string; titre: string }) {
  await prisma.programme.update({ where: { id }, data })
  revalidatePath("/")
  revalidatePath("/admin/accueil/programme")
}

export async function supprimerProgramme(id: string) {
  await prisma.programme.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/accueil/programme")
}