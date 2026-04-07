"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function creerGroupe(data: {
  nom: string; description: string
  objectifs: string[]; images: string[]
}) {
  const { objectifs, images, ...rest } = data
  const slug = `${rest.nom.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${Date.now()}`
  // Double sécurité : filtrer les objectifs vides côté serveur aussi
  const objectifsFiltres = objectifs.filter(o => o.trim() !== "")
  await prisma.groupe.create({
    data: {
      ...rest, slug,
      objectifs: { create: objectifsFiltres.map((contenu, ordre) => ({ contenu, ordre })) },
      images: { create: images.map((url, ordre) => ({ url, ordre })) },
    },
  })
  revalidatePath("/admin/groupes")
  revalidatePath("/groupes")
}

export async function modifierGroupe(id: string, data: {
  nom: string; description: string
  objectifs: string[]; images: string[]
}) {
  const { objectifs, images, ...rest } = data
  const objectifsFiltres = objectifs.filter(o => o.trim() !== "")
  await prisma.objectifGroupe.deleteMany({ where: { groupeId: id } })
  await prisma.imageGroupe.deleteMany({ where: { groupeId: id } })
  await prisma.groupe.update({
    where: { id },
    data: {
      ...rest,
      objectifs: { create: objectifsFiltres.map((contenu, ordre) => ({ contenu, ordre })) },
      images: { create: images.map((url, ordre) => ({ url, ordre })) },
    },
  })
  revalidatePath("/admin/groupes")
  revalidatePath("/groupes")
}

export async function supprimerGroupe(id: string) {
  await prisma.groupe.delete({ where: { id } })
  revalidatePath("/admin/groupes")
  revalidatePath("/groupes")
}