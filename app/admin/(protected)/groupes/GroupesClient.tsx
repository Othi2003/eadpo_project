"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ChevronDown, X } from "lucide-react"
import Image from "next/image"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import UploadButton from "@/components/admin/UploadButton"
import { creerGroupe, modifierGroupe, supprimerGroupe } from "@/lib/actions/groupes"
import type { Groupe, ObjectifGroupe, ImageGroupe } from "@prisma/client"

type GroupeComplet = Groupe & { objectifs: ObjectifGroupe[]; images: ImageGroupe[] }

const videGroupe = { nom: "", description: "", objectifs: [] as string[], images: [] as string[] }

export default function GroupesAdminClient({ groupes: initial }: { groupes: GroupeComplet[] }) {
  const [groupes] = useState(initial)
  const [ouvert, setOuvert] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<"creer" | "modifier" | null>(null)
  const [actif, setActif] = useState<GroupeComplet | null>(null)
  const [form, setForm] = useState(videGroupe)

  const ouvrir = (type: "creer" | "modifier", g?: GroupeComplet) => {
    setModal(type)
    if (type === "modifier" && g) {
      setActif(g)
      setForm({
        nom: g.nom,
        description: g.description ?? "",
        objectifs: g.objectifs.map(o => o.contenu),
        images: g.images.map(i => i.url),
      })
    } else {
      setActif(null)
      setForm(videGroupe)
    }
  }

  const soumettre = async () => {
    setLoading(true)
    const payload = { ...form, objectifs: form.objectifs.filter(o => o.trim() !== "") }
    if (modal === "creer") await creerGroupe(payload)
    else if (modal === "modifier" && actif) await modifierGroupe(actif.id, payload)
    setLoading(false)
    setModal(null)
    window.location.reload()
  }

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer ce groupe ?")) return
    await supprimerGroupe(id)
    window.location.reload()
  }

  const ajouterObjectif = () => setForm(f => ({ ...f, objectifs: [...f.objectifs, ""] }))
  const modifObjectif = (i: number, val: string) => setForm(f => ({ ...f, objectifs: f.objectifs.map((o, idx) => idx === i ? val : o) }))
  const suppObjectif = (i: number) => setForm(f => ({ ...f, objectifs: f.objectifs.filter((_, idx) => idx !== i) }))
  const ajouterImages = (urls: string[]) => setForm(f => ({ ...f, images: [...f.images, ...urls] }))
  const suppImage = (i: number) => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f" }}>Groupes</h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>{groupes.length} groupe{groupes.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => ouvrir("creer")} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          <Plus size={16} /> Nouveau groupe
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {groupes.map(g => (
          <div key={g.id} style={{ background: "white", borderRadius: "1.25rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "1.25rem 1.5rem", gap: "1rem" }}>
              <button onClick={() => setOuvert(ouvert === g.id ? null : g.id)}
                style={{ flex: 1, display: "flex", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left" as const }}>
                <div>
                  <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.95rem" }}>{g.nom}</p>
                  <p style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>{g.objectifs.length} objectif{g.objectifs.length > 1 ? "s" : ""} · {g.images.length} image{g.images.length > 1 ? "s" : ""}</p>
                </div>
                <ChevronDown size={18} color="#9CA3AF" style={{ marginLeft: "auto", transform: ouvert === g.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button onClick={() => ouvrir("modifier", g)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.75rem", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
                  <Pencil size={14} /> Modifier
                </button>
                <button onClick={() => supprimer(g.id)} style={{ padding: "0.6rem 0.875rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {ouvert === g.id && (
              <div style={{ borderTop: "1px solid rgba(21,101,192,0.06)", padding: "1.5rem" }}>
                {g.description && (
                  <p style={{ fontSize: "0.88rem", color: "#374151", marginBottom: "1rem", lineHeight: 1.7 }}>{g.description}</p>
                )}
                {g.images.length > 0 && (
                  <div style={{ marginBottom: "1.25rem" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>Images</p>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {g.images.map((img, i) => (
                        <div key={img.id} style={{ position: "relative", width: "80px", height: "60px", borderRadius: "0.75rem", overflow: "hidden" }}>
                          <Image src={img.url} alt={`Image ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {g.objectifs.length > 0 && (
                  <div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>Objectifs</p>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.4rem" }}>
                      {g.objectifs.map((o, i) => (
                        <div key={o.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span style={{ width: "20px", height: "20px", borderRadius: "9999px", background: "rgba(21,101,192,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800, color: "#1565C0", flexShrink: 0 }}>{i + 1}</span>
                          <p style={{ fontSize: "0.88rem", color: "#374151" }}>{o.contenu}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "creer" ? "Nouveau groupe" : "Modifier le groupe"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ChampTexte label="Nom" value={form.nom} onChange={v => setForm(f => ({ ...f, nom: v }))} placeholder="Chorale ASAPH" />
          <ChampTexte label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} multiline />

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
                Objectifs
              </label>
              <button type="button" onClick={ajouterObjectif} style={{ fontSize: "0.78rem", color: "#1565C0", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                + Ajouter
              </button>
            </div>
            {form.objectifs.length === 0 && (
              <p style={{ fontSize: "0.82rem", color: "#9CA3AF", fontStyle: "italic" }}>Aucun objectif — cliquez sur « + Ajouter » pour en créer un.</p>
            )}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.5rem" }}>
              {form.objectifs.map((o, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    value={o}
                    onChange={e => modifObjectif(i, e.target.value)}
                    placeholder={`Objectif ${i + 1}`}
                    style={{ flex: 1, padding: "0.7rem 1rem", border: "1.5px solid #E5E7EB", borderRadius: "0.75rem", fontSize: "0.88rem", outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" as const }}
                    onFocus={e => e.target.style.borderColor = "#1565C0"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                  <button type="button" onClick={() => suppObjectif(i)} style={{ padding: "0.7rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.75rem", cursor: "pointer" }}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
              Images ({form.images.length})
            </label>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "flex-end" }}>
              {form.images.map((url, i) => (
                <div key={i} style={{ position: "relative", width: "80px", height: "60px", borderRadius: "0.75rem", overflow: "hidden", border: "2px solid rgba(21,101,192,0.15)" }}>
                  <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" />
                  <button type="button" onClick={() => suppImage(i)} style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "9999px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <X size={10} color="white" />
                  </button>
                </div>
              ))}
              <UploadButton
                value=""
                onChange={() => {}}
                onChangeMultiple={ajouterImages}
                label=""
                multiple
              />
            </div>
          </div>

          <button onClick={soumettre} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>
    </div>
  )
}