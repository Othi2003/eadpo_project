"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Download, X, Video } from "lucide-react"
import type { Culte, EtapeCulte, CulteImage } from "@prisma/client"

type CulteComplet = Culte & { etapes: EtapeCulte[]; images: CulteImage[] }

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

// ── Carousel Hero ──
const HeroCarousel = ({ images }: { images: CulteImage[] }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={`slide-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <img
            src={images[index].url}
            alt={`slide ${index + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Lightbox ──
const Lightbox = ({ images, index, onClose, onPrev, onNext }: {
  images: CulteImage[]
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

  const handleDownload = async () => {
    const url = images[index].url
    const res = await fetch(url)
    const blob = await res.blob()
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `culte-photo-${index + 1}.jpg`
    a.click()
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      {/* Barre du haut */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", zIndex: 10 }}
        onClick={e => e.stopPropagation()}
      >
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", fontFamily: "'Inter', sans-serif" }}>
          {index + 1} / {images.length}
        </span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handleDownload} style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            <Download size={18} />
          </button>
          <button onClick={onClose} style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Image principale */}
      <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "80vh" }} onClick={e => e.stopPropagation()}>
        <img
          src={images[index].url}
          alt={`Photo ${index + 1}`}
          style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", borderRadius: "0.5rem", display: "block" }}
        />
      </div>

      {/* Bouton précédent */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backdropFilter: "blur(4px)" }}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Bouton suivant */}
      {index < images.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backdropFilter: "blur(4px)" }}
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Miniatures en bas */}
      <div
        style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem", padding: "0.5rem", background: "rgba(0,0,0,0.5)", borderRadius: "1rem", backdropFilter: "blur(4px)", maxWidth: "90vw", overflowX: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => onPrev()}
            style={{ width: "48px", height: "36px", borderRadius: "0.375rem", overflow: "hidden", border: i === index ? "2px solid white" : "2px solid transparent", cursor: "pointer", padding: 0, background: "none", flexShrink: 0, opacity: i === index ? 1 : 0.6, transition: "all 0.2s" }}
          >
            <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function CulteDetail({ culte }: { culte: CulteComplet }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const ouvrirLightbox = (i: number) => setLightboxIndex(i)
  const fermerLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => i !== null && i > 0 ? i - 1 : i)
  const next = () => setLightboxIndex(i => i !== null && i < culte.images.length - 1 ? i + 1 : i)

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero avec carousel ── */}
      <section style={{
          position: "relative", overflow: "hidden", textAlign: "center",
          minHeight: "520px", display: "flex", flexDirection: "column",
          justifyContent: "center", paddingBottom: "80px",
          paddingTop: "80px",
        }}>
        {/* Carousel en arrière-plan */}
        {culte.images.length > 0 ? (
          <HeroCarousel images={culte.images} />
        ) : (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #0D2B6B, #1565C0)" }} />
        )}

        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(13,43,107,0.88) 0%, rgba(21,101,192,0.78) 100%)" }} />
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block", zIndex: 2 }}
          preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>

        <div style={{ position: "relative", zIndex: 3, padding: "7rem 1.5rem 4rem" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            style={{ position: "absolute", top: "2.5rem", left: "1.5rem" }}>
            <Link href="/cultes" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.85)", textDecoration: "none", background: "rgba(255,255,255,0.15)", width: "40px", height: "40px", borderRadius: "9999px", backdropFilter: "blur(4px)" }}>
              <ArrowLeft size={18} />
            </Link>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: "700px", margin: "0 auto" }}>
            {culte.titre}
          </motion.h1>
        </div>
      </section>

      {/* ── Étapes ── */}
      {culte.etapes.length > 0 && (
        <section className="py-16 px-6 lg:px-10" style={{ background: "white" }}>
          <div className="max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#1e3a5f", marginBottom: "2.5rem", textAlign: "center" }}>
              Déroulé du culte
            </motion.h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {culte.etapes.map((e, i) => (
                <motion.div key={e.id}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
                >
                  <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "9999px", background: "linear-gradient(135deg, #1565C0, #1E88E5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.9rem", color: "white" }}>
                    {e.numero}
                  </div>
                  <div style={{ flex: 1, paddingTop: "0.25rem" }}>
                    <h3 style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "1.25rem", marginBottom: "0.5rem" }}>{e.titre}</h3>
                    <p style={{ fontSize: "1.2rem", color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{e.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Vidéo ── */}
      {culte.video && (
        <section className="py-12 px-6 lg:px-10" style={{ background: "#f5f9ff" }}>
          <div className="max-w-3xl mx-auto">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(21,101,192,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Video size={18} color="#1565C0" />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e3a5f" }}>Vidéo du résumé</h2>
            </div>
            <video controls src={culte.video} style={{ width: "100%", borderRadius: "1rem", boxShadow: "0 8px 32px rgba(21,101,192,0.12)" }} />
          </div>
        </section>
      )}

      {/* ── Galerie style Google Photos ── */}
      {culte.images.length > 0 && (
        <section className="py-12 px-6 lg:px-10" style={{ background: culte.video ? "white" : "#f5f9ff" }}>
          <div className="max-w-6xl mx-auto">
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e3a5f", marginBottom: "1.25rem", textAlign: "center" }}>
              Galerie photos
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "4px" }}>
              {culte.images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => ouvrirLightbox(i)}
                  style={{ position: "relative", aspectRatio: "4/3", cursor: "pointer", overflow: "hidden", borderRadius: "4px" }}
                >
                  <img
                    src={img.url}
                    alt={`Photo ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={culte.images}
          index={lightboxIndex}
          onClose={fermerLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}

    </main>
  )
}