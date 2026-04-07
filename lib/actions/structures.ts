"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ── Structures ──

export async function creerStructure(data: {
  sigle: string; nom: string; description: string; logo: string
  objectifs: string[]; images: string[]
}) {
  const { objectifs, images, ...rest } = data
  const slug = rest.sigle.toLowerCase().replace(/\s+/g, "-")
  await prisma.structure.create({
    data: {
      ...rest, slug,
      objectifs: { create: objectifs.map((contenu, ordre) => ({ contenu, ordre })) },
      images: { create: images.map((url, ordre) => ({ url, ordre })) },
    },
  })
  revalidatePath("/admin/structures")
  revalidatePath("/structures")
}

export async function modifierStructure(id: string, data: {
  sigle: string; nom: string; description: string; logo: string
  objectifs: string[]; images: string[]
}) {
  const { objectifs, images, ...rest } = data
  await prisma.objectifStructure.deleteMany({ where: { structureId: id } })
  await prisma.imageStructure.deleteMany({ where: { structureId: id } })
  await prisma.structure.update({
    where: { id },
    data: {
      ...rest,
      objectifs: { create: objectifs.map((contenu, ordre) => ({ contenu, ordre })) },
      images: { create: images.map((url, ordre) => ({ url, ordre })) },
    },
  })
  revalidatePath("/admin/structures")
  revalidatePath("/structures")
}

export async function supprimerStructure(id: string) {
  await prisma.structure.delete({ where: { id } })
  revalidatePath("/admin/structures")
  revalidatePath("/structures")
}

// ── Membres coordination ──

export async function creerMembre(data: { nom: string; prenom: string; titre: string; photo: string; structureId: string }) {
  await prisma.membreCoordination.create({ data })
  revalidatePath("/admin/structures")
}

export async function modifierMembre(id: string, data: { nom: string; prenom: string; titre: string; photo: string }) {
  await prisma.membreCoordination.update({ where: { id }, data })
  revalidatePath("/admin/structures")
}

export async function supprimerMembre(id: string) {
  await prisma.membreCoordination.delete({ where: { id } })
  revalidatePath("/admin/structures")
}