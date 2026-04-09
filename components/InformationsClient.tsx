"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { X, ZoomIn } from "lucide-react"
import type { Information } from "@prisma/client"

const MAX_CHARS = 120

export default function InformationsClient({ informations }: { informations: Information[] }) {
  const [selected, setSelected] = useState<Information | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    if (selected || lightbox) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [selected, lightbox])

  return (
    <>
      <section className="py-20 px-6 lg:px-10" style={{ background: "#f0f4f8", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "28rem", height: "28rem", borderRadius: "9999px", background: "radial-gradient(circle, rgba(21,101,192,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, background: "linear-gradient(135deg, #1565C0 0%, #1E88E5 50%, #42A5F5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
              Informations
            </span>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ marginTop: "6px", height: "3px", width: "80px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto", transformOrigin: "left" }} />
            <p className="mt-4 text-gray-500 text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem" }}>
              Annonces et actualités de l&apos;église
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "3rem 2rem" }}>
            {informations.map((info, i) => {
              const isTextShort = !info.contenu || info.contenu.length <= MAX_CHARS
              const showVoirPlus = !!info.image || !isTextShort

              return (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  onClick={() => showVoirPlus ? setSelected(info) : undefined}
                  whileHover={{ y: -6, scale: 1.03 }}
                  style={{
                    background: "white",
                    borderRadius: "1.25rem",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    padding: "1rem",
                    paddingTop: "2rem",
                    cursor: showVoirPlus ? "pointer" : "default",
                    position: "relative",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  {/* Épingle 3D */}
                  <div style={{
                    position: "absolute",
                    top: "-18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "9999px",
                    background: "radial-gradient(circle at 35% 30%, #90CAF9, #1E6FCC 50%, #0D3F8F)",
                    boxShadow: "0 4px 12px rgba(21,101,192,0.6), inset 0 1px 3px rgba(255,255,255,0.5)",
                    border: "3px solid white",
                    zIndex: 2,
                  }} />

                  {/* Couche interne bleue */}
                  <div style={{
                    background: "#dbeafe",
                    borderRadius: "0.85rem",
                    padding: "1rem 1.1rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: "140px",
                  }}>
                    {info.titre && (
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1a2e4a", lineHeight: 1.3, marginBottom: "0.45rem" }}>
                        {info.titre}
                      </h3>
                    )}

                    <div style={{ flex: 1 }}>
                      {info.contenu && (
                        <p style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                          {info.contenu.length > MAX_CHARS ? info.contenu.slice(0, MAX_CHARS) + "..." : info.contenu}
                        </p>
                      )}
                    </div>

                    <div style={{ marginTop: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ fontSize: "0.68rem", color: "#6B89B4", fontWeight: 500 }}>
                        {new Date(info.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      {showVoirPlus && (
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1565C0" }}>
                          Voir plus
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "white",
                borderRadius: "1.5rem",
                width: "100%",
                maxWidth: "560px",
                maxHeight: "90vh",
                boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10, width: "36px", height: "36px", borderRadius: "9999px", background: "rgba(0,0,0,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={16} color="#374151" />
              </button>

              {/* Image cliquable → ouvre la lightbox */}
              {selected.image && (
                <div
                  onClick={() => setLightbox(selected.image!)}
                  style={{ width: "100%", background: "#EBF4FF", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", flexShrink: 0, cursor: "zoom-in", position: "relative" }}
                >
                  <img
                    src={selected.image}
                    alt={selected.titre ?? ""}
                    style={{ maxWidth: "100%", maxHeight: "280px", objectFit: "contain", borderRadius: "0.5rem", display: "block" }}
                  />
                  {/* Icône zoom */}
                  <div style={{ position: "absolute", bottom: "1.25rem", right: "1.25rem", background: "rgba(21,101,192,0.85)", borderRadius: "9999px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                    <ZoomIn size={15} color="white" />
                  </div>
                </div>
              )}

              {/* Texte */}
              <div
                style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem 2rem", scrollbarWidth: "thin", scrollbarColor: "rgba(21,101,192,0.2) transparent" }}
                onWheel={e => e.stopPropagation()}
              >
                <p style={{ fontSize: "0.72rem", color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "0.875rem" }}>
                  Publié le {new Date(selected.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} à {new Date(selected.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </p>
                {selected.titre && (
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1e3a5f", lineHeight: 1.3, marginBottom: "1rem" }}>
                    {selected.titre}
                  </h2>
                )}
                {selected.contenu && (
                  <p style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                    {selected.contenu}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 2000,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem",
              cursor: "zoom-out",
            }}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: "1.25rem", right: "1.25rem", zIndex: 10, width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <X size={18} color="white" />
            </button>

            <motion.img
              src={lightbox}
              alt=""
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "0.75rem",
                cursor: "default",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}