"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useRef, useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { Structure, MembreCoordination, ObjectifStructure, ImageStructure } from "@prisma/client"
import { AnimatePresence } from "motion/react"


type StructureComplete = Structure & {
  membres: MembreCoordination[]
  objectifs: ObjectifStructure[]
  images: ImageStructure[]
}

const SectionTitle = ({ title }: { title: string }) => (
  <motion.div
    className="text-center mb-14"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
      fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, paddingBottom: "0.1em",
      background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text", display: "inline-block",
    }}>
      {title}
    </span>
    <motion.div
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginTop: "6px", height: "3px", width: "70px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto", transformOrigin: "left" }}
    />
  </motion.div>
)

const MembreCard = ({ membre, i }: { membre: { nom: string; role: string; photo: string }; i: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{ borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(21,101,192,0.15)", position: "relative", aspectRatio: "3/4", cursor: "default", maxWidth: "280px", margin: "0 auto", width: "100%" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src={membre.photo} alt={membre.nom} fill className="object-cover object-top" />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", position: "absolute", bottom: "100%", left: 0, pointerEvents: "none" }}
          preserveAspectRatio="none">
          <path d="M0,90 C80,40 160,120 240,70 C300,35 355,65 400,55 L400,180 L0,180 Z" fill="#64B5F6" />
          <path d="M0,110 C80,60 160,140 240,90 C300,55 355,85 400,75 L400,180 L0,180 Z" fill="#1565C0" />
        </svg>
        <div style={{ background: "#1565C0", padding: "1rem 1.25rem 1.25rem" }}>
          <motion.span
            initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.18 + 0.55 }}
            style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginBottom: "0.25rem" }}
          >
            {membre.nom}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.18 + 0.65 }}
            style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}
          >
            {membre.role}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

// Carousel pour les images du hero
const HeroCarousel = ({ images }: { images: ImageStructure[] }) => {
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
          <Image
            src={images[index].url}
            alt={`slide ${index + 1}`}
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function StructureDetail({ structure: s }: { structure: StructureComplete }) {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative", overflow: "hidden", textAlign: "center",
        minHeight: "520px", display: "flex", flexDirection: "column",
        justifyContent: "center", paddingBottom: "80px",
      }}>
        <HeroCarousel images={s.images} />

        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(13,43,107,0.82) 0%, rgba(21,101,192,0.75) 100%)" }} />
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block", zIndex: 2 }}
          preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>

        <div style={{ position: "relative", zIndex: 3, padding: "7rem 1.5rem 4rem" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            style={{ position: "absolute", top: "2.5rem", left: "1.5rem" }}>
            <Link href="/structures" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.85)", textDecoration: "none",
              background: "rgba(255,255,255,0.15)", width: "40px", height: "40px",
              borderRadius: "9999px", backdropFilter: "blur(4px)",
            }}>
              <ArrowLeft size={18} />
            </Link>
          </motion.div>

          {s.logo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              style={{ width: "110px", height: "110px", position: "absolute", top: "2.5rem", right: "2rem", borderRadius: "9999px", background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.2)", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image src={s.logo} alt={`Logo ${s.sigle}`} fill className="object-contain" />
              </div>
            </motion.div>
          )}

          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "block", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#90CAF9", letterSpacing: "0.05em", lineHeight: 1, marginBottom: "0.5rem" }}
          >
            {s.sigle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)", fontWeight: 500, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em", lineHeight: 1.4, maxWidth: "600px", margin: "0 auto" }}
          >
            {s.nom}
          </motion.h1>
        </div>
      </section>

      {/* ── Description ── */}
      {s.description && (
        <section className="py-20 px-6 lg:px-10" style={{ background: "white" }}>
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ fontSize: "1.15rem", color: "#374151", lineHeight: 2, textAlign: "center" }}
            >
              {s.description}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ marginTop: "2rem", height: "2px", width: "80px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto", transformOrigin: "left" }}
            />
          </div>
        </section>
      )}

      {/* ── Objectifs ── */}
      {s.objectifs.length > 0 && (
        <section className="py-20 px-6 lg:px-10" style={{ background: "#f0f6ff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle title="Nos Objectifs" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {s.objectifs.map((obj, i) => (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ background: "white", borderRadius: "1rem", padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                >
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

      {/* ── Coordination ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="La Coordination" />
          {s.membres.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: "0.95rem" }}>
              Aucun membre renseigné pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {s.membres.map((m, i) => (
                <MembreCard
                  key={m.id}
                  membre={{ nom: `${m.prenom} ${m.nom}`, role: m.titre, photo: m.photo }}
                  i={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}