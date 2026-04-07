"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import { creerProgramme, modifierProgramme, supprimerProgramme } from "@/lib/actions/programme"
import type { Programme } from "@prisma/client"

const videProgramme = { jour: "", heure: "", titre: "" }

export default function ProgrammeAdminClient({ programmes: initialProgrammes }: { programmes: Programme[] }) {
  const [programmes, setProgrammes] = useState(initialProgrammes)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [modalProgramme, setModalProgramme] = useState<"creer" | "modifier" | null>(null)
  const [programmeActif, setProgrammeActif] = useState<Programme | null>(null)
  const [formProgramme, setFormProgramme] = useState(videProgramme)

  const ouvrirCreerProgramme = () => { setProgrammeActif(null); setFormProgramme(videProgramme); setError(""); setModalProgramme("creer") }
  const ouvrirModifierProgramme = (p: Programme) => {
    setProgrammeActif(p)
    setFormProgramme({ jour: p.jour, heure: p.heure, titre: p.titre })
    setError("")
    setModalProgramme("modifier")
  }

  const soumettresProgramme = async () => {
    setLoading(true)
    setError("")
    try {
      if (modalProgramme === "creer") await creerProgramme(formProgramme)
      else if (modalProgramme === "modifier" && programmeActif) await modifierProgramme(programmeActif.id, formProgramme)
      setModalProgramme(null)
      window.location.reload()
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const suppProgramme = async (id: string) => {
    if (!confirm("Supprimer ce programme ?")) return
    setLoading(true)
    try {
      await supprimerProgramme(id)
      setProgrammes(p => p.filter(x => x.id !== id))
    } catch (e: any) {
      alert(e.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e3a5f" }}>Programme</h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Gérer les activités de la semaine</p>
        </div>
        <button onClick={ouvrirCreerProgramme} disabled={loading} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
          <Plus size={18} /> Ajouter une activité
        </button>
      </div>

      {error && <div style={{ padding: "1rem", background: "#FEE2E2", color: "#DC2626", borderRadius: "0.75rem", marginBottom: "1rem" }}>{error}</div>}

      <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 2px 12px rgba(21,101,192,0.07)", border: "1px solid rgba(21,101,192,0.08)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {programmes.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1rem", background: "#f5f9ff", borderRadius: "1rem", border: "1px solid rgba(21,101,192,0.07)" }}>
              <div style={{ background: "linear-gradient(135deg, #1565C0, #1E88E5)", borderRadius: "0.625rem", padding: "0.5rem 0.875rem", flexShrink: 0 }}>
                <p style={{ color: "white", fontWeight: 800, fontSize: "0.78rem", lineHeight: 1 }}>{p.jour}</p>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.68rem", fontWeight: 500 }}>{p.heure}</p>
              </div>
              <p style={{ flex: 1, fontWeight: 600, color: "#1e3a5f", fontSize: "0.92rem" }}>{p.titre}</p>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button onClick={() => ouvrirModifierProgramme(p)} disabled={loading} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.5rem 0.875rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", fontSize: "0.78rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
                  <Pencil size={13} /> Modifier
                </button>
                <button onClick={() => suppProgramme(p.id)} disabled={loading} style={{ padding: "0.5rem 0.75rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.625rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
          {programmes.length === 0 && (
            <p style={{ textAlign: "center", color: "#9CA3AF", padding: "2rem" }}>Aucune activité pour le moment</p>
          )}
        </div>
      </div>

      {modalProgramme && (
        <Modal open={!!modalProgramme} onClose={() => setModalProgramme(null)} title={modalProgramme === "creer" ? "Nouvelle activité" : "Modifier l'activité"}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ChampTexte label="Jour" value={formProgramme.jour} onChange={(v) => setFormProgramme({ ...formProgramme, jour: v })} placeholder="ex: Dimanche" />
            <ChampTexte label="Heure" value={formProgramme.heure} onChange={(v) => setFormProgramme({ ...formProgramme, heure: v })} placeholder="ex: 09h00" />
            <ChampTexte label="Titre" value={formProgramme.titre} onChange={(v) => setFormProgramme({ ...formProgramme, titre: v })} placeholder="ex: Culte du matin" />
            <button onClick={soumettresProgramme} disabled={loading || !formProgramme.jour || !formProgramme.titre} style={{ padding: "0.75rem", background: loading ? "#9CA3AF" : "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}