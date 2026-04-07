"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ── Dossiers ──

export async function creerDossier(data: { nom: string; parentId?: string }) {
  const slug = `${data.nom.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${Date.now()}`
  await prisma.dossierMedia.create({
    data: { nom: data.nom, slug, type: "EVENEMENT", parentId: data.parentId ?? null },
  })
  revalidatePath("/admin/medias")
  revalidatePath("/medias")
}

export async function modifierDossier(id: string, nom: string) {
  await prisma.dossierMedia.update({ where: { id }, data: { nom } })
  revalidatePath("/admin/medias")
  revalidatePath("/medias")
}

export async function supprimerDossier(id: string) {
  await prisma.dossierMedia.delete({ where: { id } })
  revalidatePath("/admin/medias")
  revalidatePath("/medias")
}

// ── Fichiers ──

export async function ajouterFichier(data: { url: string; type: "PHOTO" | "VIDEO"; dossierId: string; nom?: string }) {
  const count = await prisma.mediaFichier.count({ where: { dossierId: data.dossierId } })
  await prisma.mediaFichier.create({ data: { ...data, ordre: count } })
  revalidatePath("/admin/medias")
  revalidatePath("/medias")
}

export async function supprimerFichier(id: string) {
  await prisma.mediaFichier.delete({ where: { id } })
  revalidatePath("/admin/medias")
  revalidatePath("/medias")
}

// ── Sync cultes → dossiers ──

export async function syncDossierCulte(culteId: string, nom: string, images: string[], video?: string) {
  const existing = await prisma.dossierMedia.findFirst({ where: { culteId } })

  if (existing) {
    await prisma.mediaFichier.deleteMany({ where: { dossierId: existing.id } })
    const fichiers = [
      ...images.map((url, i) => ({ url, type: "PHOTO" as const, ordre: i })),
      ...(video ? [{ url: video, type: "VIDEO" as const, ordre: images.length }] : []),
    ]
    await prisma.mediaFichier.createMany({ data: fichiers.map(f => ({ ...f, dossierId: existing.id })) })
  } else {
    const slug = `culte-${culteId}`
    const dossier = await prisma.dossierMedia.create({
      data: { nom, slug, type: "CULTE", culteId },
    })
    const fichiers = [
      ...images.map((url, i) => ({ url, type: "PHOTO" as const, ordre: i })),
      ...(video ? [{ url: video, type: "VIDEO" as const, ordre: images.length }] : []),
    ]
    if (fichiers.length > 0) {
      await prisma.mediaFichier.createMany({ data: fichiers.map(f => ({ ...f, dossierId: dossier.id })) })
    }
  }
  revalidatePath("/admin/medias")
  revalidatePath("/medias")
}