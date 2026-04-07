"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Groupe, ObjectifGroupe, ImageGroupe } from "@prisma/client"

type GroupeComplet = Groupe & { objectifs: ObjectifGroupe[]; images: ImageGroupe[] }

const GroupeCard = ({ g, i }: { g: GroupeComplet; i: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <Link href={`/groupes/${g.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ boxShadow: "0 12px 32px rgba(21,101,192,0.18)", transition: { duration: 0.3 } }}
        style={{
          background: "#dbeafe", borderRadius: "1.25rem", padding: "2rem 1.75rem",
          boxShadow: "0 2px 16px rgba(21,101,192,0.08)",
          borderTop: "4px solid #1565C0", borderBottom: "4px solid #1565C0",
          cursor: "pointer", textAlign: "center",
          display: "flex", flexDirection: "column" as const, alignItems: "center",
          justifyContent: "flex-start", gap: "1rem", height: "100%", minHeight: "220px",
        }}
      >

        {/* Nom */}
        <motion.span
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
          style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#1565C0", lineHeight: 1.2, textAlign: "center", width: "100%" }}
        >
          {g.nom}
        </motion.span>

        {/* Trait séparateur */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 + 0.5 }}
          style={{ width: "60%", height: "1px", background: "linear-gradient(to right, transparent, #1565C0, transparent)", transformOrigin: "center", flexShrink: 0 }}
        />

        {/* Description — flex: 1 pour occuper l'espace restant et aligner le bouton en bas */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 + 0.6 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#374151", lineHeight: 1.4, textAlign: "center", width: "100%", padding: "0 0.5rem", flex: 1 }}
        >
          {g.description
            ? g.description.length > 80
              ? g.description.slice(0, 80) + "..."
              : g.description
            : ""}
        </motion.p>

        {/* Bouton */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 + 0.7 }}
          style={{ marginTop: "0.25rem", background: "#1565C0", color: "white", fontSize: "0.82rem", fontWeight: 700, padding: "0.5rem 1.5rem", borderRadius: "9999px", flexShrink: 0 }}
        >
          En savoir plus
        </motion.div>
      </motion.div>
    </Link>
  )
}

const Carousel = ({ groupes }: { groupes: GroupeComplet[] }) => {
  const [index, setIndex] = useState(0)
  const hasCarousel = groupes.length > 4
  const max = Math.max(0, groupes.length - 4)

  return (
    <div className="hidden lg:block" style={{ position: "relative" }}>
      {/* Boutons carousel — affichés uniquement si plus de 4 éléments */}
      {hasCarousel && (
        <>
          <button
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index === 0}
            style={{ position: "absolute", left: "-3.5rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: index === 0 ? "rgba(21,101,192,0.1)" : "#1565C0", color: index === 0 ? "rgba(21,101,192,0.3)" : "white", border: "none", cursor: index === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => setIndex(i => Math.min(max, i + 1))}
            disabled={index === max}
            style={{ position: "absolute", right: "-3.5rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: index === max ? "rgba(21,101,192,0.1)" : "#1565C0", color: index === max ? "rgba(21,101,192,0.3)" : "white", border: "none", cursor: index === max ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <div style={{ overflow: "hidden" }}>
        <motion.div
          animate={{ x: hasCarousel ? `calc(-${index} * (100% / 4 + 0.375rem))` : "0%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: "1.5rem" }}
        >
          {groupes.map((g, i) => (
            <div 
              key={g.id} 
              style={{ flex: hasCarousel ? "0 0 calc((100% - 4.5rem) / 4)" : "1 1 0px", minWidth: 0 }}
            >
              <GroupeCard g={g} i={i} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicateurs — affichés uniquement si plus de 4 éléments */}
      {hasCarousel && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
          {Array.from({ length: max + 1 }).map((_, idx) => (
            <button key={idx} onClick={() => setIndex(idx)} style={{ width: idx === index ? "28px" : "8px", height: "8px", borderRadius: "9999px", background: idx === index ? "#1565C0" : "rgba(21,101,192,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function GroupesPageClient({ groupes }: { groupes: GroupeComplet[] }) {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0D2B6B 0%, #1565C0 50%, #1E88E5 100%)", padding: "8rem 1.5rem 6rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "-6rem", left: "-6rem", width: "28rem", height: "28rem", borderRadius: "9999px", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-4rem", right: "-4rem", width: "22rem", height: "22rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
            Communauté
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Nos{" "}
            <span style={{ background: "linear-gradient(135deg, #90CAF9, #42A5F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Groupes
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Chorales, équipes de louange et groupes de la PEADPO.
          </motion.p>
        </div>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      <section className="py-24 px-6 lg:px-10" style={{ background: "#ffffff", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="biggrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(21,101,192,0.13)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="white" />
          <rect width="100%" height="100%" fill="url(#biggrid)" />
        </svg>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "140px", background: "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)", pointerEvents: "none", zIndex: 1 }} />

        <div className="max-w-6xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
          {groupes.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9CA3AF" }}>Aucun groupe disponible pour le moment.</p>
          ) : (
            <>
              <div className="flex flex-col gap-6 lg:hidden">
                {groupes.map((g, i) => <GroupeCard key={g.id} g={g} i={i} />)}
              </div>
              <Carousel groupes={groupes} />
            </>
          )}
        </div>
      </section>
    </main>
  )
}