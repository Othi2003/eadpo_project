"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import { modifierAPropos, creerJalon, modifierJalon, supprimerJalon } from "@/lib/actions/about"
import type { APropos, JalonHistoire } from "@prisma/client"

const videJalon = { annee: "", texte: "" }

export default function AProposAdminClient({
  apropos: initialAPropos,
  jalons: initialJalons,
}: {
  apropos: APropos | null
  jalons: JalonHistoire[]
}) {
  const [jalons, setJalons] = useState(initialJalons)
  const [loading, setLoading] = useState(false)

  // ── À Propos ──
  const [formAPropos, setFormAPropos] = useState({
    vision: initialAPropos?.vision ?? "",
    mission: initialAPropos?.mission ?? "",
    valeurs: initialAPropos?.valeurs ?? "",
  })
  const [savedAPropos, setSavedAPropos] = useState(false)

  const soumettreAPropos = async () => {
    setLoading(true)
    await modifierAPropos(formAPropos)
    setLoading(false)
    setSavedAPropos(true)
    setTimeout(() => setSavedAPropos(false), 2000)
  }

  // ── Jalons ──
  const [modalJalon, setModalJalon] = useState<"creer" | "modifier" | null>(null)
  const [jalonActif, setJalonActif] = useState<JalonHistoire | null>(null)
  const [formJalon, setFormJalon] = useState(videJalon)

  const ouvrirCreerJalon = () => { setJalonActif(null); setFormJalon(videJalon); setModalJalon("creer") }
  const ouvrirModifierJalon = (j: JalonHistoire) => {
    setJalonActif(j)
    setFormJalon({ annee: j.annee, texte: j.texte })
    setModalJalon("modifier")
  }

  const soumettreJalon = async () => {
    setLoading(true)
    if (modalJalon === "creer") await creerJalon(formJalon)
    else if (modalJalon === "modifier" && jalonActif) await modifierJalon(jalonActif.id, formJalon)
    setLoading(false)
    setModalJalon(null)
    window.location.reload()
  }

  const suppJalon = async (id: string) => {
    if (!confirm("Supprimer ce jalon ?")) return
    await supprimerJalon(id)
    setJalons(j => j.filter(x => x.id !== id))
  }

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f" }}>À Propos</h1>
        <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Gérer le contenu de la page À Propos</p>
      </div>

      {/* ── Vision / Mission / Valeurs ── */}
      <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e3a5f", marginBottom: "1.5rem" }}>Vision, Mission & Valeurs</h2>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.25rem" }}>
          <ChampTexte label="Vision" value={formAPropos.vision} onChange={v => setFormAPropos(f => ({ ...f, vision: v }))} multiline />
          <ChampTexte label="Mission" value={formAPropos.mission} onChange={v => setFormAPropos(f => ({ ...f, mission: v }))} multiline />
          <ChampTexte label="Valeurs" value={formAPropos.valeurs} onChange={v => setFormAPropos(f => ({ ...f, valeurs: v }))} multiline />
          <button onClick={soumettreAPropos} disabled={loading} style={{ alignSelf: "flex-start" as const, padding: "0.75rem 1.5rem", background: savedAPropos ? "#059669" : "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "background 0.3s" }}>
            {loading ? "Enregistrement..." : savedAPropos ? "✓ Enregistré" : "Enregistrer"}
          </button>
        </div>
      </div>

      {/* ── Histoire / Jalons ── */}
      <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e3a5f" }}>Histoire — Jalons</h2>
            <p style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>{jalons.length} jalon{jalons.length > 1 ? "s" : ""}</p>
          </div>
          <button onClick={ouvrirCreerJalon} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.1rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Plus size={15} /> Ajouter
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
          {jalons.map((j) => (
            <div key={j.id} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem 1.25rem", background: "#f5f9ff", borderRadius: "1rem", border: "1px solid rgba(21,101,192,0.07)" }}>
              <div style={{ background: "linear-gradient(135deg, #1565C0, #1E88E5)", borderRadius: "0.625rem", padding: "0.4rem 0.875rem", flexShrink: 0 }}>
                <p style={{ color: "white", fontWeight: 800, fontSize: "0.85rem" }}>{j.annee}</p>
              </div>
              <p style={{ flex: 1, fontSize: "0.88rem", color: "#374151", lineHeight: 1.6, paddingTop: "0.25rem" }}>{j.texte}</p>
              <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                <button onClick={() => ouvrirModifierJalon(j)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.5rem 0.875rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                  <Pencil size={13} /> Modifier
                </button>
                <button onClick={() => suppJalon(j.id)} style={{ padding: "0.5rem 0.75rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.625rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Jalon */}
      <Modal open={!!modalJalon} onClose={() => setModalJalon(null)} title={modalJalon === "creer" ? "Ajouter un jalon" : "Modifier le jalon"}>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
          <ChampTexte label="Année / Période" value={formJalon.annee} onChange={v => setFormJalon(f => ({ ...f, annee: v }))} placeholder="1980" />
          <ChampTexte label="Description" value={formJalon.texte} onChange={v => setFormJalon(f => ({ ...f, texte: v }))} multiline />
          <button onClick={soumettreJalon} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>
    </div>
  )
}