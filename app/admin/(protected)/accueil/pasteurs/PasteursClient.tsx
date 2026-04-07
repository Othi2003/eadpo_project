"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import UploadButton from "@/components/admin/UploadButton"
import { creerPasteur, modifierPasteur, supprimerPasteur } from "@/lib/actions/pasteurs"
import type { Pasteur } from "@prisma/client"

const vide = { nom: "", prenom: "", titre: "", photo: "" }

export default function PasteursClient({ pasteurs: initial }: { pasteurs: Pasteur[] }) {
  const [pasteurs, setPasteurs] = useState(initial)
  const [modal, setModal] = useState<"creer" | "modifier" | null>(null)
  const [actif, setActif] = useState<Pasteur | null>(null)
  const [form, setForm] = useState(vide)
  const [loading, setLoading] = useState(false)

  const ouvrir = (type: "creer" | "modifier", p?: Pasteur) => {
    setModal(type)
    if (type === "modifier" && p) { setActif(p); setForm({ nom: p.nom, prenom: p.prenom, titre: p.titre, photo: p.photo }) }
    else { setActif(null); setForm(vide) }
  }

  const fermer = () => { setModal(null); setActif(null); setForm(vide) }

  const soumettre = async () => {
    setLoading(true)
    if (modal === "creer") await creerPasteur(form)
    else if (modal === "modifier" && actif) await modifierPasteur(actif.id, form)
    setLoading(false)
    fermer()
    window.location.reload()
  }

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer ce pasteur ?")) return
    await supprimerPasteur(id)
    setPasteurs(p => p.filter(x => x.id !== id))
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f" }}>Pasteurs</h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>{pasteurs.length} pasteur{pasteurs.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => ouvrir("creer")} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
        {pasteurs.map(p => (
          <div key={p.id} style={{ background: "white", borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)" }}>
            <div style={{ position: "relative", height: "200px" }}>
              <Image src={p.photo} alt={p.nom} fill className="object-cover object-top" />
            </div>
            <div style={{ padding: "1.25rem" }}>
              <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "1rem" }}>{p.prenom} {p.nom}</p>
              <p style={{ fontSize: "0.82rem", color: "#9CA3AF", marginTop: "0.2rem" }}>{p.titre}</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <button onClick={() => ouvrir("modifier", p)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.6rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.75rem", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
                  <Pencil size={14} /> Modifier
                </button>
                <button onClick={() => supprimer(p.id)} style={{ padding: "0.6rem 0.875rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!modal} onClose={fermer} title={modal === "creer" ? "Ajouter un pasteur" : "Modifier le pasteur"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <ChampTexte label="Prénom" value={form.prenom} onChange={v => setForm(f => ({ ...f, prenom: v }))} placeholder="Jacques" />
            <ChampTexte label="Nom" value={form.nom} onChange={v => setForm(f => ({ ...f, nom: v }))} placeholder="COMPAORE" />
          </div>
          <ChampTexte label="Titre" value={form.titre} onChange={v => setForm(f => ({ ...f, titre: v }))} placeholder="Pasteur Principal" />
          <UploadButton value={form.photo} onChange={v => setForm(f => ({ ...f, photo: v }))} label="Photo" />
          <button onClick={soumettre} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>
    </div>
  )
}