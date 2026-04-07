"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import UploadButton from "@/components/admin/UploadButton"
import { creerSlide, modifierSlide, supprimerSlide } from "@/lib/actions/hero"
import type { SlideHero } from "@prisma/client"

const videSlide = { image: "", label: "", texte: "", reference: "" }

export default function HeroAdminClient({ slides: initialSlides }: { slides: SlideHero[] }) {
  const [slides, setSlides] = useState(initialSlides)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [modalSlide, setModalSlide] = useState<"creer" | "modifier" | null>(null)
  const [slideActif, setSlideActif] = useState<SlideHero | null>(null)
  const [formSlide, setFormSlide] = useState(videSlide)

  const ouvrirCreerSlide = () => { setSlideActif(null); setFormSlide(videSlide); setError(""); setModalSlide("creer") }
  const ouvrirModifierSlide = (s: SlideHero) => {
    setSlideActif(s)
    setFormSlide({ image: s.image, label: s.label ?? "", texte: s.texte ?? "", reference: s.reference ?? "" })
    setError("")
    setModalSlide("modifier")
  }

  const soumettreSlide = async () => {
    setLoading(true)
    setError("")
    try {
      const data = { image: formSlide.image, label: formSlide.label || undefined, texte: formSlide.texte || undefined, reference: formSlide.reference || undefined }
      if (modalSlide === "creer") await creerSlide(data)
      else if (modalSlide === "modifier" && slideActif) await modifierSlide(slideActif.id, data)
      setModalSlide(null)
      window.location.reload()
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const suppSlide = async (id: string) => {
    if (!confirm("Supprimer ce slide ?")) return
    setLoading(true)
    try {
      await supprimerSlide(id)
      setSlides(s => s.filter(x => x.id !== id))
    } catch (e: any) {
      alert(e.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e3a5f" }}>Hero - Slides</h1>
        <button onClick={ouvrirCreerSlide} disabled={loading} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
          <Plus size={18} /> Ajouter un slide
        </button>
      </div>

      {error && <div style={{ padding: "1rem", background: "#FEE2E2", color: "#DC2626", borderRadius: "0.75rem", marginBottom: "1rem" }}>{error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {slides.map((slide) => (
          <div key={slide.id} style={{ background: "white", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div style={{ position: "relative", height: "180px" }}>
              <Image src={slide.image} alt={slide.label ?? "Slide"} fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: "1rem" }}>
              <p style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: "0.25rem" }}>{slide.label}</p>
              <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>{slide.texte}</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <button onClick={() => ouvrirModifierSlide(slide)} disabled={loading} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.5rem", background: "#F0F6FF", color: "#1565C0", border: "none", borderRadius: "0.5rem", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer" }}>
                  <Pencil size={16} /> Modifier
                </button>
                <button onClick={() => suppSlide(slide.id)} disabled={loading} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.5rem", background: "#FEF2F2", color: "#DC2626", border: "none", borderRadius: "0.5rem", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer" }}>
                  <Trash2 size={16} /> Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalSlide && (
        <Modal open={!!modalSlide} onClose={() => setModalSlide(null)} title={modalSlide === "creer" ? "Nouveau slide" : "Modifier slide"}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ChampTexte label="Image" value={formSlide.image} onChange={(v) => setFormSlide({ ...formSlide, image: v })} />
            <UploadButton onUpload={(url) => setFormSlide({ ...formSlide, image: url })} />
            <ChampTexte label="Label" value={formSlide.label} onChange={(v) => setFormSlide({ ...formSlide, label: v })} />
            <ChampTexte label="Texte" value={formSlide.texte} onChange={(v) => setFormSlide({ ...formSlide, texte: v })} />
            <ChampTexte label="Référence" value={formSlide.reference} onChange={(v) => setFormSlide({ ...formSlide, reference: v })} />
            <button onClick={soumettreSlide} disabled={loading || !formSlide.image} style={{ padding: "0.75rem", background: loading ? "#9CA3AF" : "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}