"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { Folder, ArrowLeft, X, ChevronLeft, ChevronRight, Play, Download } from "lucide-react"
import type { DossierMedia, MediaFichier } from "@prisma/client"

type DossierComplet = DossierMedia & {
  medias: MediaFichier[]
  sousDossiers: (DossierMedia & {
    medias: MediaFichier[]
    sousDossiers: (DossierMedia & { medias: MediaFichier[] })[]
  })[]
}

// ── Lightbox ──
const Lightbox = ({ fichiers, index, onClose, onPrev, onNext }: {
  fichiers: MediaFichier[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, onPrev, onNext])

  const fichier = fichiers[index]

  const handleDownload = async () => {
    const res = await fetch(fichier.url)
    const blob = await res.blob()
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `media-${index + 1}`
    a.click()
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      {/* Barre du haut */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", zIndex: 10 }}
        onClick={e => e.stopPropagation()}>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>{index + 1} / {fichiers.length}</span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {fichier.type === "PHOTO" && (
            <button onClick={handleDownload} style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
              <Download size={18} />
            </button>
          )}
          <button onClick={onClose} style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Média */}
      <div style={{ maxWidth: "90vw", maxHeight: "80vh" }} onClick={e => e.stopPropagation()}>
        {fichier.type === "PHOTO" ? (
          <img src={fichier.url} alt="" style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", borderRadius: "0.5rem", display: "block" }} />
        ) : (
          <video src={fichier.url} controls autoPlay style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: "0.5rem", display: "block" }} />
        )}
      </div>

      {/* Navigation */}
      {index > 0 && (
        <button onClick={e => { e.stopPropagation(); onPrev() }}
          style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backdropFilter: "blur(4px)" }}>
          <ChevronLeft size={24} />
        </button>
      )}
      {index < fichiers.length - 1 && (
        <button onClick={e => { e.stopPropagation(); onNext() }}
          style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backdropFilter: "blur(4px)" }}>
          <ChevronRight size={24} />
        </button>
      )}

      {/* Miniatures */}
      <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.4rem", padding: "0.5rem", background: "rgba(0,0,0,0.5)", borderRadius: "1rem", backdropFilter: "blur(4px)", maxWidth: "90vw", overflowX: "auto" }}
        onClick={e => e.stopPropagation()}>
        {fichiers.map((f, i) => (
          <button key={f.id} onClick={() => { if (i < index) onPrev(); else if (i > index) onNext() }}
            style={{ width: "44px", height: "36px", borderRadius: "0.375rem", overflow: "hidden", border: i === index ? "2px solid white" : "2px solid transparent", cursor: "pointer", padding: 0, background: "rgba(255,255,255,0.1)", flexShrink: 0, opacity: i === index ? 1 : 0.6 }}>
            {f.type === "PHOTO" ? (
              <img src={f.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Play size={14} color="white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Grille de médias ──
const GrilleFichiers = ({ fichiers }: { fichiers: MediaFichier[] }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "4px" }}>
        {fichiers.map((f, i) => (
          <motion.div key={f.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            onClick={() => setLightboxIndex(i)}
            style={{ position: "relative", aspectRatio: "4/3", cursor: "pointer", overflow: "hidden", borderRadius: "4px", background: "#1e3a5f" }}
          >
            {f.type === "PHOTO" ? (
              <img src={f.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <video src={f.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
                  <Play size={32} color="white" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          fichiers={fichiers}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => i !== null && i > 0 ? i - 1 : i)}
          onNext={() => setLightboxIndex(i => i !== null && i < fichiers.length - 1 ? i + 1 : i)}
        />
      )}
    </>
  )
}

// ── Vue dossier ouvert ──
const VueDossier = ({ dossier, onBack }: {
  dossier: DossierComplet | DossierComplet["sousDossiers"][0]
  onBack: () => void
}) => {
  const [sousDossierOuvert, setSousDossierOuvert] = useState<string | null>(null)
  const sousDossiers = "sousDossiers" in dossier ? dossier.sousDossiers : []

  const sdOuvert = sousDossiers.find(sd => sd.id === sousDossierOuvert)

  if (sdOuvert) {
    return (
      <VueDossier
        dossier={sdOuvert as any}
        onBack={() => setSousDossierOuvert(null)}
      />
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "#1565C0", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", marginBottom: "1.5rem", padding: 0 }}>
        <ArrowLeft size={18} /> Retour
      </button>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e3a5f", marginBottom: "1.5rem" }}>{dossier.nom}</h2>

      {/* Sous-dossiers */}
      {sousDossiers.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
            {sousDossiers.map(sd => (
              <motion.button key={sd.id}
                whileHover={{ y: -3 }}
                onClick={() => setSousDossierOuvert(sd.id)}
                style={{ background: "white", border: "1px solid rgba(21,101,192,0.1)", borderRadius: "1rem", padding: "1.25rem 1rem", cursor: "pointer", display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "0.75rem", fontFamily: "'Inter', sans-serif", boxShadow: "0 2px 8px rgba(21,101,192,0.06)" }}>
                <Folder size={36} color="#1565C0" fill="rgba(21,101,192,0.15)" />
                <div>
                  <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.85rem", textAlign: "center" as const }}>{sd.nom}</p>
                  <p style={{ fontSize: "0.7rem", color: "#9CA3AF", textAlign: "center" as const, marginTop: "0.2rem" }}>{sd.medias.length} fichier{sd.medias.length > 1 ? "s" : ""}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Fichiers */}
      {dossier.medias.length > 0 ? (
        <GrilleFichiers fichiers={dossier.medias} />
      ) : (
        <p style={{ textAlign: "center", color: "#9CA3AF", padding: "3rem 0" }}>Aucun fichier dans ce dossier.</p>
      )}
    </div>
  )
}

export default function MediasPublicClient({ dossiers }: { dossiers: DossierComplet[] }) {
  const [dossierOuvert, setDossierOuvert] = useState<DossierComplet | null>(null)

  useEffect(() => {
    if (dossierOuvert) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [dossierOuvert])

  const getThumbnail = (d: DossierComplet) => {
    const photo = d.medias.find(m => m.type === "PHOTO")
    if (photo) return photo.url
    for (const sd of d.sousDossiers) {
      const p = sd.medias.find(m => m.type === "PHOTO")
      if (p) return p.url
    }
    return null
  }

  const getTotalFichiers = (d: DossierComplet) => {
    return d.medias.length + d.sousDossiers.reduce((acc, sd) => acc + sd.medias.length, 0)
  }

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0D2B6B 0%, #1565C0 50%, #1E88E5 100%)",
        padding: "8rem 1.5rem 6rem", position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div style={{ position: "absolute", top: "-6rem", left: "-6rem", width: "28rem", height: "28rem", borderRadius: "9999px", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-4rem", right: "-4rem", width: "22rem", height: "22rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
            Multimédia
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Nos{" "}
            <span style={{ background: "linear-gradient(135deg, #90CAF9, #42A5F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Médias
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Photos et vidéos des cultes et événements de la PEADPO.
          </motion.p>
        </div>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* ── Grille dossiers ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          {dossiers.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9CA3AF" }}>Aucun média disponible pour le moment.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {dossiers.map((d, i) => {
                const thumb = getThumbnail(d)
                const total = getTotalFichiers(d)
                return (
                  <motion.button
                    key={d.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(21,101,192,0.14)" }}
                    onClick={() => setDossierOuvert(d)}
                    style={{
                      background: "white", border: "1px solid rgba(21,101,192,0.1)",
                      borderRadius: "1.25rem", overflow: "hidden",
                      cursor: "pointer", textAlign: "left" as const,
                      boxShadow: "0 2px 12px rgba(21,101,192,0.07)",
                      fontFamily: "'Inter', sans-serif", padding: 0,
                    }}
                  >
                    {/* Miniature */}
                    <div style={{ height: "160px", background: thumb ? "none" : "linear-gradient(135deg, rgba(21,101,192,0.08), rgba(66,165,245,0.08))", position: "relative", overflow: "hidden" }}>
                      {thumb ? (
                        <img src={thumb} alt={d.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Folder size={56} color="#1565C0" fill="rgba(21,101,192,0.15)" />
                        </div>
                      )}
                      {d.type === "CULTE" && (
                        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(124,58,237,0.9)", color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", backdropFilter: "blur(4px)" }}>
                          CULTE
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: "1rem 1.25rem" }}>
                      <p style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.92rem", marginBottom: "0.25rem", lineHeight: 1.3 }}>{d.nom}</p>
                      <p style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
                        {total} fichier{total > 1 ? "s" : ""}
                        {d.sousDossiers.length > 0 && ` · ${d.sousDossiers.length} sous-dossier${d.sousDossiers.length > 1 ? "s" : ""}`}
                      </p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Panel dossier ouvert ── */}
      <AnimatePresence>
        {dossierOuvert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setDossierOuvert(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "absolute", top: 0, right: 0, bottom: 0,
                width: "100%", maxWidth: "900px",
                background: "white", overflowY: "auto",
                padding: "2rem",
                boxShadow: "-8px 0 32px rgba(0,0,0,0.15)",
              }}
              onWheel={e => e.stopPropagation()}
            >
              <VueDossier dossier={dossierOuvert} onBack={() => setDossierOuvert(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}