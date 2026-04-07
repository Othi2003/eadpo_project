"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import UploadButton from "@/components/admin/UploadButton"
import UploadFichier from "@/components/admin/UploadFichier"
import { creerCulte, modifierCulte, supprimerCulte } from "@/lib/actions/cultes"
import type { Culte, EtapeCulte, CulteImage } from "@prisma/client"

type CulteComplet = Culte & { etapes: EtapeCulte[]; images: CulteImage[] }

function getDimancheRecent(): string {
  const today = new Date()
  const day = today.getDay()
  const diff = day === 0 ? 0 : day
  const dimanche = new Date(today)
  dimanche.setDate(today.getDate() - diff)
  return dimanche.toISOString().split("T")[0]
}

function formatDateFr(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  })
}

const videForm = {
  audio: "",
  video: "",
  etapes: [{ titre: "", description: "" }] as { titre: string; description: string }[],
  images: [] as string[],
}

export default function CultesAdminClient({ cultes: initial }: { cultes: CulteComplet[] }) {
  const [cultes, setCultes] = useState(initial)
  const [modal, setModal] = useState<"creer" | "modifier" | null>(null)
  const [actif, setActif] = useState<CulteComplet | null>(null)
  const [form, setForm] = useState(videForm)
  const [dateSelectionnee, setDateSelectionnee] = useState("")
  const [loading, setLoading] = useState(false)

  const ouvrir = (type: "creer" | "modifier", c?: CulteComplet) => {
    setModal(type)
    if (type === "modifier" && c) {
      setActif(c)
      setDateSelectionnee(new Date(c.date).toISOString().split("T")[0])
      setForm({
        audio: c.audio ?? "",
        video: c.video ?? "",
        etapes: c.etapes.map(e => ({ titre: e.titre, description: e.description })),
        images: c.images.map(i => i.url),
      })
    } else {
      setActif(null)
      setDateSelectionnee(getDimancheRecent())
      setForm(videForm)
    }
  }

  const fermer = () => { setModal(null); setActif(null); setForm(videForm) }

  const soumettre = async () => {
    setLoading(true)
    const titre = `Culte du ${formatDateFr(dateSelectionnee)}`
    const data = {
      titre,
      date: dateSelectionnee,
      audio: form.audio || undefined,
      video: form.video || undefined,
      etapes: form.etapes.filter(e => e.titre.trim() || e.description.trim()),
      images: form.images,
    }
    if (modal === "creer") await creerCulte(data)
    else if (modal === "modifier" && actif) await modifierCulte(actif.id, data)
    setLoading(false)
    fermer()
    window.location.reload()
  }

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer ce culte ?")) return
    await supprimerCulte(id)
    setCultes(c => c.filter(x => x.id !== id))
  }

  const ajouterEtape = () => setForm(f => ({ ...f, etapes: [...f.etapes, { titre: "", description: "" }] }))
  const modifEtape = (i: number, key: "titre" | "description", val: string) =>
    setForm(f => ({ ...f, etapes: f.etapes.map((e, idx) => idx === i ? { ...e, [key]: val } : e) }))
  const suppEtape = (i: number) => setForm(f => ({ ...f, etapes: f.etapes.filter((_, idx) => idx !== i) }))
  const ajouterImage = (url: string) => setForm(f => ({ ...f, images: [...f.images, url] }))
  const suppImage = (i: number) => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f" }}>Cultes</h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>{cultes.length} culte{cultes.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => ouvrir("creer")} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {cultes.map(c => (
          <div key={c.id} style={{ background: "white", borderRadius: "1.25rem", padding: "1.25rem 1.5rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <div style={{ background: "linear-gradient(135deg, #1565C0, #1E88E5)", borderRadius: "0.875rem", padding: "0.75rem 1rem", textAlign: "center", minWidth: "56px" }}>
                <p style={{ color: "white", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>{new Date(c.date).getDate()}</p>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase" as const }}>
                  {new Date(c.date).toLocaleDateString("fr-FR", { month: "short" })}
                </p>
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.95rem" }}>{c.titre}</p>
                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", marginTop: "0.2rem" }}>
                  {c.etapes.length} étape{c.etapes.length > 1 ? "s" : ""}
                  {c.images.length > 0 && ` · ${c.images.length} photo${c.images.length > 1 ? "s" : ""}`}
                  {c.audio && " · Audio"}
                  {c.video && " · Vidéo"}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => ouvrir("modifier", c)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.75rem", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
                <Pencil size={14} /> Modifier
              </button>
              <button onClick={() => supprimer(c.id)} style={{ padding: "0.6rem 0.875rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!modal} onClose={fermer} title={modal === "creer" ? "Ajouter un culte" : "Modifier le culte"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Date en lecture seule */}
          <div style={{ padding: "0.875rem 1rem", background: "#f5f9ff", borderRadius: "0.875rem", border: "1px solid rgba(21,101,192,0.1)" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.05em", textTransform: "uppercase" as const, marginBottom: "0.25rem" }}>Culte du</p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1565C0" }}>{formatDateFr(dateSelectionnee)}</p>
          </div>

          {/* Étapes */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
                Étapes du résumé
              </label>
              <button type="button" onClick={ajouterEtape} style={{ fontSize: "0.78rem", color: "#1565C0", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>+ Ajouter</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {form.etapes.map((e, i) => (
                <div key={i} style={{ background: "#f5f9ff", borderRadius: "1rem", padding: "1rem", border: "1px solid rgba(21,101,192,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "9999px", background: "#1565C0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 800, color: "white", flexShrink: 0 }}>{i + 1}</span>
                    <input
                      value={e.titre}
                      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifEtape(i, "titre", ev.target.value)}
                      placeholder="Titre de l'étape"
                      style={{ flex: 1, padding: "0.6rem 0.875rem", border: "1.5px solid #E5E7EB", borderRadius: "0.625rem", fontSize: "0.88rem", outline: "none", fontFamily: "'Inter', sans-serif", background: "white" }}
                      onFocus={ev => ev.target.style.borderColor = "#1565C0"}
                      onBlur={ev => ev.target.style.borderColor = "#E5E7EB"}
                    />
                    {form.etapes.length > 1 && (
                      <button type="button" onClick={() => suppEtape(i)} style={{ padding: "0.6rem", background: "rgba(239,68,68,0.08)", color: "#DC2626", border: "none", borderRadius: "0.625rem", cursor: "pointer" }}>
                        <X size={13} />
                      </button>
                    )}
                  </div>
                  <textarea
                    value={e.description}
                    onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => modifEtape(i, "description", ev.target.value)}
                    placeholder="Description..."
                    rows={3}
                    style={{ width: "100%", padding: "0.75rem", border: "1.5px solid #E5E7EB", borderRadius: "0.625rem", fontSize: "0.85rem", outline: "none", fontFamily: "'Inter', sans-serif", resize: "vertical", boxSizing: "border-box" as const, background: "white" }}
                    onFocus={ev => ev.target.style.borderColor = "#1565C0"}
                    onBlur={ev => ev.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Galerie images */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
              Galerie photos ({form.images.length})
            </label>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "flex-end" }}>
              {form.images.map((url, i) => (
                <div key={i} style={{ position: "relative", width: "80px", height: "60px", borderRadius: "0.75rem", overflow: "hidden", border: "2px solid rgba(21,101,192,0.15)" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button type="button" onClick={() => suppImage(i)} style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "9999px", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <X size={10} color="white" />
                  </button>
                </div>
              ))}
              <UploadButton value="" onChange={ajouterImage} label="" />
            </div>
          </div>

          {/* Audio */}
          <UploadFichier
            value={form.audio}
            onChange={(v: string) => setForm(f => ({ ...f, audio: v }))}
            label="Enregistrement audio (optionnel)"
            type="audio"
          />

          {/* Vidéo */}
          <UploadFichier
            value={form.video}
            onChange={(v: string) => setForm(f => ({ ...f, video: v }))}
            label="Vidéo du résumé (optionnel)"
            type="video"
          />

          <button onClick={soumettre} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>
    </div>
  )
}