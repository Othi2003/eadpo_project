"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function creerPasteur(data: { nom: string; prenom: string; titre: string; photo: string }) {
  await prisma.pasteur.create({ data })
  revalidatePath("/")
  revalidatePath("/admin/accueil/pasteurs")
}

export async function modifierPasteur(id: string, data: { nom: string; prenom: string; titre: string; photo: string }) {
  await prisma.pasteur.update({ where: { id }, data })
  revalidatePath("/")
  revalidatePath("/admin/accueil/pasteurs")
}

export async function supprimerPasteur(id: string) {
  await prisma.pasteur.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/accueil/pasteurs")
}