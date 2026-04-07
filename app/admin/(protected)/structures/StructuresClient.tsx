"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ChevronDown, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import UploadButton from "@/components/admin/UploadButton"
import {
  creerStructure, modifierStructure, supprimerStructure,
  creerMembre, modifierMembre, supprimerMembre,
} from "@/lib/actions/structures"
import type { Structure, MembreCoordination, ObjectifStructure, ImageStructure } from "@prisma/client"

type StructureComplete = Structure & {
  membres: MembreCoordination[]
  objectifs: ObjectifStructure[]
  images: ImageStructure[]
}

const videStructure = { sigle: "", nom: "", description: "", logo: "", objectifs: [""], images: [] as string[] }
const videMembre = { nom: "", prenom: "", titre: "", photo: "" }

export default function StructuresAdminClient({ structures: initial }: { structures: StructureComplete[] }) {
  const [structures, setStructures] = useState(initial)
  const [ouverte, setOuverte] = useState<string | null>(initial[0]?.id ?? null)
  const [loading, setLoading] = useState(false)

  // Modals structure
  const [modalStructure, setModalStructure] = useState<"creer" | "modifier" | null>(null)
  const [structureActive, setStructureActive] = useState<StructureComplete | null>(null)
  const [formStructure, setFormStructure] = useState(videStructure)

  // Modals membre
  const [modalMembre, setModalMembre] = useState<"creer" | "modifier" | null>(null)
  const [structureMembreId, setStructureMembreId] = useState<string | null>(null)
  const [membreActif, setMembreActif] = useState<MembreCoordination | null>(null)
  const [formMembre, setFormMembre] = useState(videMembre)

  // ── Structure handlers ──
  const ouvrirCreerStructure = () => {
    setStructureActive(null)
    setFormStructure(videStructure)
    setModalStructure("creer")
  }

  const ouvrirModifierStructure = (s: StructureComplete) => {
    setStructureActive(s)
    setFormStructure({
      sigle: s.sigle, nom: s.nom,
      description: s.description ?? "",
      logo: s.logo ?? "",
      objectifs: s.objectifs.map(o => o.contenu).length > 0 ? s.objectifs.map(o => o.contenu) : [""],
      images: s.images.map(i => i.url),
    })
    setModalStructure("modifier")
  }

  const soumettreStructure = async () => {
    setLoading(true)
    if (modalStructure === "creer") await creerStructure(formStructure)
    else if (modalStructure === "modifier" && structureActive) await modifierStructure(structureActive.id, formStructure)
    setLoading(false)
    setModalStructure(null)
    window.location.reload()
  }

  const suppStruct = async (id: string) => {
    if (!confirm("Supprimer cette structure et tous ses membres ?")) return
    await supprimerStructure(id)
    window.location.reload()
  }

  // ── Objectifs handlers ──
  const ajouterObjectif = () => setFormStructure(f => ({ ...f, objectifs: [...f.objectifs, ""] }))
  const modifObjectif = (i: number, val: string) => setFormStructure(f => ({ ...f, objectifs: f.objectifs.map((o, idx) => idx === i ? val : o) }))
  const suppObjectif = (i: number) => setFormStructure(f => ({ ...f, objectifs: f.objectifs.filter((_, idx) => idx !== i) }))

  // ── Images handlers ──
  const ajouterImage = (url: string) => setFormStructure(f => ({ ...f, images: [...f.images, url] }))
  const suppImage = (i: number) => setFormStructure(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))

  // ── Membre handlers ──
  const ouvrirCreerMembre = (structureId: string) => {
    setStructureMembreId(structureId)
    setMembreActif(null)
    setFormMembre(videMembre)
    setModalMembre("creer")
  }

  const ouvrirModifierMembre = (m: MembreCoordination) => {
    setMembreActif(m)
    setFormMembre({ nom: m.nom, prenom: m.prenom, titre: m.titre, photo: m.photo })
    setModalMembre("modifier")
  }

  const soumettresMembre = async () => {
    setLoading(true)
    if (modalMembre === "creer" && structureMembreId) await creerMembre({ ...formMembre, structureId: structureMembreId })
    else if (modalMembre === "modifier" && membreActif) await modifierMembre(membreActif.id, formMembre)
    setLoading(false)
    setModalMembre(null)
    window.location.reload()
  }

  const suppMembre = async (id: string) => {
    if (!confirm("Supprimer ce membre ?")) return
    await supprimerMembre(id)
    window.location.reload()
  }

  return (
    <div>
      {/* En-tête */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f" }}>Structures</h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>{structures.length} structure{structures.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={ouvrirCreerStructure} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          <Plus size={16} /> Nouvelle structure
        </button>
      </div>

      {/* Liste des structures */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {structures.map(s => (
          <div key={s.id} style={{ background: "white", borderRadius: "1.25rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)", overflow: "hidden" }}>

            {/* Header structure */}
            <div style={{ display: "flex", alignItems: "center", padding: "1.25rem 1.5rem", gap: "1rem" }}>
              <button onClick={() => setOuverte(ouverte === s.id ? null : s.id)}
                style={{ flex: 1, display: "flex", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left" as const }}>
                {s.logo && (
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(21,101,192,0.06)", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                    <Image src={s.logo} alt={s.sigle} fill className="object-contain p-1" />
                  </div>
                )}
                <div>
                  <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.95rem" }}>{s.sigle} — {s.nom}</p>
                  <p style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>{s.membres.length} membre{s.membres.length > 1 ? "s" : ""} · {s.objectifs.length} objectif{s.objectifs.length > 1 ? "s" : ""} · {s.images.length} image{s.images.length > 1 ? "s" : ""}</p>
                </div>
                <ChevronDown size={18} color="#9CA3AF" style={{ marginLeft: "auto", transform: ouverte === s.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button onClick={() => ouvrirModifierStructure(s)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.75rem", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
                  <Pencil size={14} /> Modifier
                </button>
                <button onClick={() => suppStruct(s.id)} style={{ padding: "0.6rem 0.875rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Contenu déroulant */}
            {ouverte === s.id && (
              <div style={{ borderTop: "1px solid rgba(21,101,192,0.06)", padding: "1.5rem" }}>

                {/* Images */}
                {s.images.length > 0 && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>Images</p>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {s.images.map((img, i) => (
                        <div key={img.id} style={{ position: "relative", width: "80px", height: "60px", borderRadius: "0.75rem", overflow: "hidden" }}>
                          <Image src={img.url} alt={`Image ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Objectifs */}
                {s.objectifs.length > 0 && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>Objectifs</p>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.4rem" }}>
                      {s.objectifs.map((o, i) => (
                        <div key={o.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span style={{ width: "20px", height: "20px", borderRadius: "9999px", background: "rgba(21,101,192,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800, color: "#1565C0", flexShrink: 0 }}>{i + 1}</span>
                          <p style={{ fontSize: "0.88rem", color: "#374151" }}>{o.contenu}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Membres */}
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>Coordination</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
                    {s.membres.map(m => (
                      <div key={m.id} style={{ background: "#f5f9ff", borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(21,101,192,0.08)" }}>
                        <div style={{ position: "relative", height: "120px" }}>
                          <Image src={m.photo} alt={m.nom} fill className="object-cover object-top" />
                        </div>
                        <div style={{ padding: "0.75rem" }}>
                          <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.85rem" }}>{m.prenom} {m.nom}</p>
                          <p style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{m.titre}</p>
                          <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.6rem" }}>
                            <button onClick={() => ouvrirModifierMembre(m)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", padding: "0.4rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.5rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>
                              <Pencil size={11} /> Modifier
                            </button>
                            <button onClick={() => suppMembre(m.id)} style={{ padding: "0.4rem 0.6rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.5rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => ouvrirCreerMembre(s.id)} style={{ minHeight: "160px", border: "2px dashed rgba(21,101,192,0.2)", borderRadius: "1rem", background: "rgba(21,101,192,0.02)", cursor: "pointer", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "#1565C0" }}>
                      <Plus size={18} />
                      <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Ajouter un membre</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Structure */}
      <Modal open={!!modalStructure} onClose={() => setModalStructure(null)} title={modalStructure === "creer" ? "Nouvelle structure" : "Modifier la structure"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <ChampTexte label="Sigle" value={formStructure.sigle} onChange={v => setFormStructure(f => ({ ...f, sigle: v }))} placeholder="MHEB" />
            <UploadButton value={formStructure.logo} onChange={v => setFormStructure(f => ({ ...f, logo: v }))} label="Logo" />
          </div>
          <ChampTexte label="Nom complet" value={formStructure.nom} onChange={v => setFormStructure(f => ({ ...f, nom: v }))} placeholder="Mouvement des Hommes..." />
          <ChampTexte label="Description" value={formStructure.description} onChange={v => setFormStructure(f => ({ ...f, description: v }))} multiline />

          {/* Objectifs */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>Objectifs</label>
              <button type="button" onClick={ajouterObjectif} style={{ fontSize: "0.78rem", color: "#1565C0", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>+ Ajouter</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.5rem" }}>
              {formStructure.objectifs.map((o, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    value={o}
                    onChange={e => modifObjectif(i, e.target.value)}
                    placeholder={`Objectif ${i + 1}`}
                    style={{ flex: 1, padding: "0.7rem 1rem", border: "1.5px solid #E5E7EB", borderRadius: "0.75rem", fontSize: "0.88rem", outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" as const }}
                    onFocus={e => e.target.style.borderColor = "#1565C0"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                  {formStructure.objectifs.length > 1 && (
                    <button type="button" onClick={() => suppObjectif(i)} style={{ padding: "0.7rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.75rem", cursor: "pointer" }}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
              Images ({formStructure.images.length})
            </label>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "flex-end" }}>
              {formStructure.images.map((url, i) => (
                <div key={i} style={{ position: "relative", width: "80px", height: "60px", borderRadius: "0.75rem", overflow: "hidden", border: "2px solid rgba(21,101,192,0.15)" }}>
                  <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" />
                  <button type="button" onClick={() => suppImage(i)} style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "9999px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <X size={10} color="white" />
                  </button>
                </div>
              ))}
              <UploadButton value="" onChange={ajouterImage} label="" />
            </div>
          </div>

          <button onClick={soumettreStructure} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>

      {/* Modal Membre */}
      <Modal open={!!modalMembre} onClose={() => setModalMembre(null)} title={modalMembre === "creer" ? "Ajouter un membre" : "Modifier le membre"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <ChampTexte label="Prénom" value={formMembre.prenom} onChange={v => setFormMembre(f => ({ ...f, prenom: v }))} />
            <ChampTexte label="Nom" value={formMembre.nom} onChange={v => setFormMembre(f => ({ ...f, nom: v }))} />
          </div>
          <ChampTexte label="Titre / Rôle" value={formMembre.titre} onChange={v => setFormMembre(f => ({ ...f, titre: v }))} placeholder="Président" />
          <UploadButton value={formMembre.photo} onChange={v => setFormMembre(f => ({ ...f, photo: v }))} />
          <button onClick={soumettresMembre} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>
    </div>
  )
}