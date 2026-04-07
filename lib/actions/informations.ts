"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function creerInformation(data: { titre: string; contenu: string; image?: string; publie: boolean }) {
  await prisma.information.create({ data })
  revalidatePath("/")
  revalidatePath("/admin/accueil/informations")
}

export async function modifierInformation(id: string, data: { titre: string; contenu: string; image?: string; publie: boolean }) {
  await prisma.information.update({ where: { id }, data })
  revalidatePath("/")
  revalidatePath("/admin/accueil/informations")
}

export async function supprimerInformation(id: string) {
  await prisma.information.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/accueil/informations")
}