"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { syncDossierCulte } from "./medias"

export async function creerCulte(data: {
  titre: string
  date: string
  video?: string
  etapes: { titre: string; description: string }[]
  images: string[]
}) {
  const { etapes, images, date, ...rest } = data
  const slug = `culte-${date}`

  const culte = await prisma.culte.create({
    data: {
      ...rest,
      slug,
      date: new Date(date),
      etapes: { create: etapes.map((e, i) => ({ ...e, numero: i + 1 })) },
      images: { create: images.map((url, ordre) => ({ url, ordre })) },
    },
  })

  await syncDossierCulte(culte.id, culte.titre, images, rest.video)

  revalidatePath("/admin/cultes")
  revalidatePath("/cultes")
}

export async function modifierCulte(id: string, data: {
  titre: string
  date: string
  video?: string
  etapes: { titre: string; description: string }[]
  images: string[]
}) {
  const { etapes, images, date, ...rest } = data

  await prisma.etapeCulte.deleteMany({ where: { culteId: id } })
  await prisma.culteImage.deleteMany({ where: { culteId: id } })

  const culte = await prisma.culte.update({
    where: { id },
    data: {
      ...rest,
      date: new Date(date),
      etapes: { create: etapes.map((e, i) => ({ ...e, numero: i + 1 })) },
      images: { create: images.map((url, ordre) => ({ url, ordre })) },
    },
  })

  await syncDossierCulte(id, culte.titre, images, rest.video)

  revalidatePath("/admin/cultes")
  revalidatePath("/cultes")
}

export async function supprimerCulte(id: string) {
  await prisma.culte.delete({ where: { id } })
  revalidatePath("/admin/cultes")
  revalidatePath("/cultes")
}