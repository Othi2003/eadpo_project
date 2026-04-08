"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Folder, FolderOpen, ChevronRight, ChevronDown, X, Image as ImageIcon, Video } from "lucide-react"
import Modal from "@/components/admin/Modal"
import ChampTexte from "@/components/admin/ChampTexte"
import UploadButton from "@/components/admin/UploadButton"
import UploadFichier from "@/components/admin/UploadFichier"
import { creerDossier, modifierDossier, supprimerDossier, ajouterFichier, supprimerFichier } from "@/lib/actions/medias"
import type { DossierMedia, MediaFichier } from "@prisma/client"

type DossierComplet = DossierMedia & {
  medias: MediaFichier[]
  sousDossiers: (DossierMedia & { medias: MediaFichier[]; sousDossiers: (DossierMedia & { medias: MediaFichier[] })[] })[]
}

export default function MediasAdminClient({ dossiers: initial }: { dossiers: DossierComplet[] }) {
  const [dossiers] = useState(initial)
  const [ouverts, setOuverts] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  // Modal dossier
  const [modalDossier, setModalDossier] = useState<"creer" | "modifier" | "sous-dossier" | null>(null)
  const [dossierActif, setDossierActif] = useState<DossierMedia | null>(null)
  const [nomDossier, setNomDossier] = useState("")
  const [parentId, setParentId] = useState<string | null>(null)

  // Modal fichier
  const [modalFichier, setModalFichier] = useState(false)
  const [dossierFichierId, setDossierFichierId] = useState<string | null>(null)
  const [urlFichier, setUrlFichier] = useState("")
  const [urlsFichiers, setUrlsFichiers] = useState<string[]>([])
  const [typeFichier, setTypeFichier] = useState<"PHOTO" | "VIDEO">("PHOTO")

  const toggleOuvert = (id: string) => {
    setOuverts(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const soumettresDossier = async () => {
    setLoading(true)
    if (modalDossier === "creer" || modalDossier === "sous-dossier") {
      await creerDossier({ nom: nomDossier, parentId: parentId ?? undefined })
    } else if (modalDossier === "modifier" && dossierActif) {
      await modifierDossier(dossierActif.id, nomDossier)
    }
    setLoading(false)
    setModalDossier(null)
    window.location.reload()
  }

  const suppDossier = async (id: string) => {
    if (!confirm("Supprimer ce dossier et tout son contenu ?")) return
    await supprimerDossier(id)
    window.location.reload()
  }

  const ouvrirModalFichier = (dossierId: string, type: "PHOTO" | "VIDEO") => {
    setDossierFichierId(dossierId)
    setTypeFichier(type)
    setUrlFichier("")
    setUrlsFichiers([])
    setModalFichier(true)
  }

  // Pour les photos : on soumet plusieurs URLs d'un coup
  const soumettresFichiers = async () => {
    if (!dossierFichierId) return

    const urls = typeFichier === "PHOTO" ? urlsFichiers : urlFichier ? [urlFichier] : []
    if (urls.length === 0) return

    setLoading(true)
    for (const url of urls) {
      await ajouterFichier({ url, type: typeFichier, dossierId: dossierFichierId })
    }
    setLoading(false)
    setModalFichier(false)
    setUrlFichier("")
    setUrlsFichiers([])
    window.location.reload()
  }

  const suppFichier = async (id: string) => {
    if (!confirm("Supprimer ce fichier ?")) return
    await supprimerFichier(id)
    window.location.reload()
  }

  const DossierRow = ({ d, niveau = 0 }: { d: DossierComplet | DossierComplet["sousDossiers"][0] | DossierComplet["sousDossiers"][0]["sousDossiers"][0]; niveau?: number }) => {
    const ouvert = ouverts.has(d.id)
    const sousDossiers = "sousDossiers" in d ? d.sousDossiers : []
    const totalFichiers = d.medias.length + sousDossiers.reduce((acc, s) => acc + s.medias.length, 0)
    const estCulte = d.type === "CULTE"

    return (
      <div>
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "0.875rem 1.25rem",
          marginLeft: `${niveau * 1.5}rem`,
          background: "white", borderRadius: "1rem",
          border: "1px solid rgba(21,101,192,0.08)",
          boxShadow: "0 1px 6px rgba(21,101,192,0.05)",
          marginBottom: "0.5rem",
        }}>
          <button onClick={() => toggleOuvert(d.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, padding: 0, fontFamily: "'Inter', sans-serif", textAlign: "left" as const }}>
            {ouvert ? <ChevronDown size={16} color="#9CA3AF" /> : <ChevronRight size={16} color="#9CA3AF" />}
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: estCulte ? "rgba(124,58,237,0.08)" : "rgba(21,101,192,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {ouvert ? <FolderOpen size={16} color={estCulte ? "#7C3AED" : "#1565C0"} /> : <Folder size={16} color={estCulte ? "#7C3AED" : "#1565C0"} />}
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.9rem" }}>{d.nom}</p>
              <p style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
                {totalFichiers} fichier{totalFichiers > 1 ? "s" : ""}
                {sousDossiers.length > 0 && ` · ${sousDossiers.length} sous-dossier${sousDossiers.length > 1 ? "s" : ""}`}
                {estCulte && <span style={{ marginLeft: "0.5rem", background: "rgba(124,58,237,0.1)", color: "#7C3AED", padding: "0.1rem 0.4rem", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 700 }}>CULTE</span>}
              </p>
            </div>
          </button>

          {!estCulte && (
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button onClick={() => { setParentId(d.id); setNomDossier(""); setModalDossier("sous-dossier") }}
                style={{ padding: "0.4rem 0.75rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Plus size={12} /> Sous-dossier
              </button>
              <button onClick={() => ouvrirModalFichier(d.id, "PHOTO")}
                style={{ padding: "0.4rem 0.75rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Plus size={12} /> Fichier
              </button>
              <button onClick={() => { setDossierActif(d); setNomDossier(d.nom); setModalDossier("modifier") }}
                style={{ padding: "0.4rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", cursor: "pointer" }}>
                <Pencil size={13} />
              </button>
              <button onClick={() => suppDossier(d.id)}
                style={{ padding: "0.4rem", background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "none", borderRadius: "0.625rem", cursor: "pointer" }}>
                <Trash2 size={13} />
              </button>
            </div>
          )}

          {estCulte && (
            <button onClick={() => ouvrirModalFichier(d.id, "PHOTO")}
              style={{ padding: "0.4rem 0.75rem", background: "rgba(21,101,192,0.06)", color: "#1565C0", border: "none", borderRadius: "0.625rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Plus size={12} /> Fichier
            </button>
          )}
        </div>

        {/* Contenu du dossier */}
        {ouvert && (
          <div style={{ marginLeft: `${(niveau + 1) * 1.5}rem`, marginBottom: "0.5rem" }}>
            {/* Fichiers */}
            {d.medias.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
                {d.medias.map(f => (
                  <div key={f.id} style={{ position: "relative", borderRadius: "0.75rem", overflow: "hidden", background: "#f5f9ff", border: "1px solid rgba(21,101,192,0.08)" }}>
                    {f.type === "PHOTO" ? (
                      <img src={f.url} alt="" style={{ width: "100%", height: "80px", objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(21,101,192,0.05)" }}>
                        <Video size={24} color="#1565C0" />
                      </div>
                    )}
                    <button onClick={() => suppFichier(f.id)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "9999px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <X size={10} color="white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Sous-dossiers */}
            {sousDossiers.map((sd: any) => (
              <DossierRow key={sd.id} d={sd} niveau={niveau + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f" }}>Médias</h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>{dossiers.length} dossier{dossiers.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => { setParentId(null); setNomDossier(""); setModalDossier("creer") }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          <Plus size={16} /> Nouveau dossier
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {dossiers.length === 0 ? (
          <p style={{ textAlign: "center", color: "#9CA3AF", padding: "3rem" }}>Aucun dossier. Créez-en un ou ajoutez des cultes.</p>
        ) : (
          dossiers.map(d => <DossierRow key={d.id} d={d} />)
        )}
      </div>

      {/* Modal dossier */}
      <Modal
        open={!!modalDossier}
        onClose={() => setModalDossier(null)}
        title={modalDossier === "creer" ? "Nouveau dossier" : modalDossier === "sous-dossier" ? "Nouveau sous-dossier" : "Renommer le dossier"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ChampTexte label="Nom du dossier" value={nomDossier} onChange={setNomDossier} placeholder="Ex: Journée des enfants 2025" />
          <button onClick={soumettresDossier} disabled={loading || !nomDossier.trim()}
            style={{ padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </Modal>

      {/* Modal fichier */}
      <Modal open={modalFichier} onClose={() => setModalFichier(false)} title="Ajouter un fichier">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>Type</label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {(["PHOTO", "VIDEO"] as const).map(t => (
                <button key={t} type="button" onClick={() => { setTypeFichier(t); setUrlFichier(""); setUrlsFichiers([]) }}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.25rem", borderRadius: "9999px", border: "1.5px solid", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", background: typeFichier === t ? "#1565C0" : "white", color: typeFichier === t ? "white" : "#6B7280", borderColor: typeFichier === t ? "#1565C0" : "#E5E7EB" }}>
                  {t === "PHOTO" ? <ImageIcon size={14} /> : <Video size={14} />}
                  {t === "PHOTO" ? "Photo" : "Vidéo"}
                </button>
              ))}
            </div>
          </div>

          {typeFichier === "PHOTO" ? (
            <div>
              {/* Aperçu des images sélectionnées */}
              {urlsFichiers.length > 0 && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
                    {urlsFichiers.length} photo{urlsFichiers.length > 1 ? "s" : ""} sélectionnée{urlsFichiers.length > 1 ? "s" : ""}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {urlsFichiers.map((url, i) => (
                      <div key={i} style={{ position: "relative", width: "72px", height: "54px", borderRadius: "0.625rem", overflow: "hidden", border: "2px solid rgba(21,101,192,0.15)" }}>
                        <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <button
                          type="button"
                          onClick={() => setUrlsFichiers(u => u.filter((_, idx) => idx !== i))}
                          style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "9999px", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                        >
                          <X size={9} color="white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <UploadButton
                value=""
                onChange={() => {}}
                onChangeMultiple={urls => setUrlsFichiers(u => [...u, ...urls])}
                label="Images"
                multiple
              />
            </div>
          ) : (
            <UploadFichier value={urlFichier} onChange={setUrlFichier} label="Vidéo" type="video" />
          )}

          <button
            onClick={soumettresFichiers}
            disabled={loading || (typeFichier === "PHOTO" ? urlsFichiers.length === 0 : !urlFichier)}
            style={{
              padding: "0.875rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white",
              border: "none", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.95rem",
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
              opacity: (typeFichier === "PHOTO" ? urlsFichiers.length === 0 : !urlFichier) ? 0.5 : 1,
            }}>
            {loading
              ? "Enregistrement..."
              : typeFichier === "PHOTO" && urlsFichiers.length > 1
                ? `Ajouter ${urlsFichiers.length} photos`
                : "Ajouter"
            }
          </button>
        </div>
      </Modal>
    </div>
  )
}