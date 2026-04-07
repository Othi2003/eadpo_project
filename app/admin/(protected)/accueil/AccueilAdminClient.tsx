"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import UploadButton from "@/components/admin/UploadButton"
import { creerSlide, modifierSlide, supprimerSlide } from "@/lib/actions/hero"
import { creerProgramme, modifierProgramme, supprimerProgramme } from "@/lib/actions/programme"
import type { SlideHero, Programme } from "@prisma/client"

const videSlide = { image: "", label: "", texte: "", reference: "" }
const videProgramme = { jour: "", heure: "", titre: "" }

export default function AccueilAdminClient({
  slides: initialSlides,
  programmes: initialProgrammes,
}: {
  slides: SlideHero[]
  programmes: Programme[]
}) {
  const [slides, setSlides] = useState(initialSlides)
  const [programmes, setProgrammes] = useState(initialProgrammes)
  const [loading, setLoading] = useState(false)

  // Modals slides
  const [modalSlide, setModalSlide] = useState<"creer" | "modifier" | null>(null)
  const [slideActif, setSlideActif] = useState<SlideHero | null>(null)
  const [formSlide, setFormSlide] = useState(videSlide)

  // Modals programmes
  const [modalProgramme, setModalProgramme] = useState<"creer" | "modifier" | null>(null)
  const [programmeActif, setProgrammeActif] = useState<Programme | null>(null)
  const [formProgramme, setFormProgramme] = useState(videProgramme)

  // ── Slides ──
  const ouvrirCreerSlide = () => { setSlideActif(null); setFormSlide(videSlide); setModalSlide("creer") }
  const ouvrirModifierSlide = (s: SlideHero) => {
    setSlideActif(s)
    setFormSlide({ image: s.image, label: s.label ?? "", texte: s.texte ?? "", reference: s.reference ?? "" })
    setModalSlide("modifier")
  }

  const soumettreSlide = async () => {
    setLoading(true)
    const data = { image: formSlide.image, label: formSlide.label || undefined, texte: formSlide.texte || undefined, reference: formSlide.reference || undefined }
    if (modalSlide === "creer") await creerSlide(data)
    else if (modalSlide === "modifier" && slideActif) await modifierSlide(slideActif.id, data)
    setLoading(false)
    setModalSlide(null)
    window.location.reload()
  }

  const suppSlide = async (id: string) => {
    if (!confirm("Supprimer ce slide ?")) return
    await supprimerSlide(id)
    setSlides(s => s.filter(x => x.id !== id))
  }

  // ── Programmes ──
  const ouvrirCreerProgramme = () => { setProgrammeActif(null); setFormProgramme(videProgramme); setModalProgramme("creer") }
  const ouvrirModifierProgramme = (p: Programme) => {
    setProgrammeActif(p)
    setFormProgramme({ jour: p.jour, heure: p.heure, titre: p.titre })
    setModalProgramme("modifier")
  }

  const soumettresProgramme = async () => {
    setLoading(true)
    if (modalProgramme === "creer") await creerProgramme(formProgramme)
    else if (modalProgramme === "modifier" && programmeActif) await modifierProgramme(programmeActif.id, formProgramme)
    setLoading(false)
    setModalProgramme(null)
    window.location.reload()
  }

  const suppProgramme = async (id: string) => {
    if (!confirm("Supprimer ce programme ?")) return
    await supprimerProgramme(id)
    setProgrammes(p => p.filter(x => x.id !== id))
  }

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f" }}>Page d&apos;accueil</h1>
        <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Gérer le hero et le programme</p>
      </div>

      {/* ── Slides Hero ── */}
      <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e3a5f" }}>Slides Hero</h2>
            <p style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>{slides.length} slide{slides.length > 1 ? "s" : ""}</p>
          </div>
          <button onClick={ouvrirCreerSlide} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.1rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Plus size={15} /> Ajouter
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {slides.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1rem", background: "#f5f9ff", borderRadius: "1rem", border: "1px solid rgba(21,101,192,0.07)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9CA3AF", width: "20px", flexShrink: 0 }}>{i + 1}</span>
              <div style={{ position: "relative", width: "72px", height: "48px", borderRadius: "0.5rem", overflow: "hidden", flexShrink: 0 }}>
                <Image src={s.image} alt={`Slide ${i + 1}`} fill className="object-cover" />
              </div>
              <div style={{ flex: 1 }}>
                {s.label ? (
                  <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.88rem" }}>{s.label}</p>
                ) : (
                  <p style={{ color: "#9CA3AF", fontSize: "0.88rem", fontStyle: "italic" }}>Image seule (pas de texte)</p>
                )}
                {s.texte && <p style={{ fontSize: "0.75rem", color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "400px" }}>{s.texte}</p>}
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button onClick={() => ouvrirModifierSlide(s)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.5rem 0.875rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                  <Pencil size={13} /> Modifier
                </button>
                <button onClick={() => suppSlide(s.id)} style={{ padding: "0.5rem 0.75rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.625rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Programmes ── */}
      <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e3a5f" }}>Programme</h2>
            <p style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>{programmes.length} activité{programmes.length > 1 ? "s" : ""}</p>
          </div>
          <button onClick={ouvrirCreerProgramme} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.1rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Plus size={15} /> Ajouter
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {programmes.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1rem", background: "#f5f9ff", borderRadius: "1rem", border: "1px solid rgba(21,101,192,0.07)" }}>
              <div style={{ background: "linear-gradient(135deg, #1565C0, #1E88E5)", borderRadius: "0.625rem", padding: "0.5rem 0.875rem", flexShrink: 0 }}>
                <p style={{ color: "white", fontWeight: 800, fontSize: "0.78rem", lineHeight: 1 }}>{p.jour}</p>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.68rem", fontWeight: 500 }}>{p.heure}</p>
              </div>
              <p style={{ flex: 1, fontWeight: 600, color: "#1e3a5f", fontSize: "0.92rem" }}>{p.titre}</p>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button onClick={() => ouvrirModifierProgramme(p)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.5rem 0.875rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                  <Pencil size={13} /> Modifier
                </button>
                <button onClick={() => suppProgramme(p.id)} style={{ padding: "0.5rem 0.75rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.625rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Slide */}
      <Modal open={!!modalSlide} onClose={() => setModalSlide(null)} title={modalSlide === "creer" ? "Ajouter un slide" : "Modifier le slide"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <UploadButton value={formSlide.image} onChange={v => setFormSlide(f => ({ ...f, image: v }))} label="Image de fond" />
          <ChampTexte label="Label (optionnel)" value={formSlide.label} onChange={v => setFormSlide(f => ({ ...f, label: v }))} placeholder="Thème de l'année" />
          <ChampTexte label="Texte / Citation (optionnel)" value={formSlide.texte} onChange={v => setFormSlide(f => ({ ...f, texte: v }))} placeholder="Recherchez la paix..." multiline />
          <ChampTexte label="Référence (optionnel)" value={formSlide.reference} onChange={v => setFormSlide(f => ({ ...f, reference: v }))} placeholder="Hébreux 12:14" />
          <button onClick={soumettreSlide} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>

      {/* Modal Programme */}
      <Modal open={!!modalProgramme} onClose={() => setModalProgramme(null)} title={modalProgramme === "creer" ? "Ajouter une activité" : "Modifier l'activité"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ChampTexte label="Jour" value={formProgramme.jour} onChange={v => setFormProgramme(f => ({ ...f, jour: v }))} placeholder="Dimanche" />
          <ChampTexte label="Heure" value={formProgramme.heure} onChange={v => setFormProgramme(f => ({ ...f, heure: v }))} placeholder="7h30" />
          <ChampTexte label="Titre" value={formProgramme.titre} onChange={v => setFormProgramme(f => ({ ...f, titre: v }))} placeholder="Culte" />
          <button onClick={soumettresProgramme} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>
    </div>
  )
}