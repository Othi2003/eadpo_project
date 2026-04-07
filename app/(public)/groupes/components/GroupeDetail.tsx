"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "motion/react"
import { useRef, useState, useEffect } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import type { Groupe, ObjectifGroupe, ImageGroupe } from "@prisma/client"

type GroupeComplet = Groupe & { objectifs: ObjectifGroupe[]; images: ImageGroupe[] }

const HeroCarousel = ({ images }: { images: ImageGroupe[] }) => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => setIndex(i => (i + 1) % images.length), 6000)
    return () => clearInterval(timer)
  }, [images.length])
  if (images.length === 0) return null
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <AnimatePresence mode="sync">
        <motion.div key={`slide-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }} style={{ position: "absolute", inset: 0 }}>
          <Image src={images[index].url} alt={`slide ${index + 1}`} fill className="object-cover object-center" priority />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function GroupeDetail({ groupe: g }: { groupe: GroupeComplet }) {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{
        position: "relative", overflow: "hidden", textAlign: "center",
        minHeight: "520px", display: "flex", flexDirection: "column",
        justifyContent: "center", paddingBottom: "80px", paddingTop: "80px",
      }}>
        {g.images.length > 0 ? <HeroCarousel images={g.images} /> : <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #0D2B6B, #1565C0)" }} />}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(13,43,107,0.82) 0%, rgba(21,101,192,0.75) 100%)" }} />
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block", zIndex: 2 }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
        <div style={{ position: "relative", zIndex: 3, padding: "4rem 1.5rem 4rem" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            style={{ position: "absolute", top: "2.5rem", left: "1.5rem" }}>
            <Link href="/groupes" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.85)", textDecoration: "none", background: "rgba(255,255,255,0.15)", width: "40px", height: "40px", borderRadius: "9999px", backdropFilter: "blur(4px)" }}>
              <ArrowLeft size={18} />
            </Link>
          </motion.div>
          {g.logo && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              style={{ width: "100px", height: "100px", position: "absolute", top: "2.5rem", right: "2rem", borderRadius: "9999px", background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.2)", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image src={g.logo} alt={g.nom} fill className="object-contain" />
              </div>
            </motion.div>
          )}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {g.nom}
          </motion.h1>
        </div>
      </section>

      {g.description && (
        <section className="py-20 px-6 lg:px-10" style={{ background: "white" }}>
          <div className="max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ fontSize: "1.15rem", color: "#374151", lineHeight: 2, textAlign: "center" }}>
              {g.description}
            </motion.p>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ marginTop: "2rem", height: "2px", width: "80px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto", transformOrigin: "left" }} />
          </div>
        </section>
      )}

      {g.objectifs.length > 0 && (
        <section className="py-20 px-6 lg:px-10" style={{ background: "#f0f6ff" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
                Nos Objectifs
              </span>
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
                style={{ marginTop: "6px", height: "3px", width: "70px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto", transformOrigin: "left" }} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {g.objectifs.map((obj, i) => (
                <motion.div key={obj.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ background: "white", borderRadius: "1rem", padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                  <div style={{ minWidth: "28px", height: "28px", borderRadius: "9999px", background: "rgba(21,101,192,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, color: "#1565C0", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.6 }}>{obj.contenu}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}