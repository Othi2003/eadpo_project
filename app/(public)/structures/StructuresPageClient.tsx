"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Structure, ImageStructure, ObjectifStructure } from "@prisma/client"

type StructureAvecImages = Structure & { images: ImageStructure[]; objectifs: ObjectifStructure[] }

const StructureCard = ({ s, i }: { s: StructureAvecImages; i: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <Link href={`/structures/${s.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
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
          justifyContent: "flex-start", gap: "1rem", height: "100%", minHeight: "320px",
        }}
      >
        <div style={{ height: "110px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {s.logo ? (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.3, type: "spring", stiffness: 200, damping: 12 }}
              style={{ width: "100px", height: "100px", borderRadius: "9999px", background: "white", boxShadow: "0 4px 16px rgba(21,101,192,0.15)", overflow: "hidden", position: "relative" }}
            >
              <Image src={s.logo} alt={`Logo ${s.sigle}`} fill className="object-contain p-2" />
            </motion.div>
          ) : (
            <div style={{ width: "100px", height: "100px", borderRadius: "9999px", background: "rgba(21,101,192,0.1)" }} />
          )}
        </div>

        <motion.span
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
          style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#1565C0", lineHeight: 1, textAlign: "center", width: "100%" }}
        >
          {s.sigle}
        </motion.span>

        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 + 0.5 }}
          style={{ width: "60%", height: "1px", background: "linear-gradient(to right, transparent, #1565C0, transparent)", transformOrigin: "center", flexShrink: 0 }}
        />

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 + 0.6 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#374151", lineHeight: 1.4, textAlign: "center", width: "100%", padding: "0 0.5rem", flex: 1 }}
        >
          {s.nom}
        </motion.p>

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

const Carousel = ({ structures }: { structures: StructureAvecImages[] }) => {
  const [index, setIndex] = useState(0)
  const hasCarousel = structures.length > 4
  const max = Math.max(0, structures.length - 4)

  return (
    <div className="hidden lg:block" style={{ position: "relative" }}>
      {hasCarousel && (
        <>
          <button onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0} style={{ position: "absolute", left: "-3.5rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: index === 0 ? "rgba(21,101,192,0.1)" : "#1565C0", color: index === 0 ? "rgba(21,101,192,0.3)" : "white", border: "none", cursor: index === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => setIndex(i => Math.min(max, i + 1))} disabled={index === max} style={{ position: "absolute", right: "-3.5rem", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "9999px", background: index === max ? "rgba(21,101,192,0.1)" : "#1565C0", color: index === max ? "rgba(21,101,192,0.3)" : "white", border: "none", cursor: index === max ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <div style={{ overflow: "hidden" }}>
        <motion.div
          animate={{ x: hasCarousel ? `calc(-${index} * (100% / 4 + 0.375rem))` : "0%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(structures.length, 4)}, 1fr)`, gap: "1rem" }}
        >
          {structures.map((s, i) => (
            <div key={s.id} style={{ minWidth: 0 }}>
              <StructureCard s={s} i={i} />
            </div>
          ))}
        </motion.div>
      </div>

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

export default function StructuresPageClient({ structures }: { structures: StructureAvecImages[] }) {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0D2B6B 0%, #1565C0 50%, #1E88E5 100%)", padding: "8rem 1.5rem 6rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "-6rem", left: "-6rem", width: "28rem", height: "28rem", borderRadius: "9999px", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-4rem", right: "-4rem", width: "22rem", height: "22rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
            Organisation
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Nos{" "}
            <span style={{ background: "linear-gradient(135deg, #90CAF9, #42A5F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Structures
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Cinq départements dynamiques qui forment le cœur vivant de notre église.
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

        {/* max-w-6xl → cards plus larges qu'avec max-w-5xl */}
        <div className="max-w-6xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block", paddingBottom: "0.1em" }}>
              Découvrez chaque structure
            </span>
            <div style={{ marginTop: "6px", height: "3px", width: "80px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto" }} />
          </motion.div>

          <div className="flex flex-col gap-6 lg:hidden">
            {structures.map((s, i) => <StructureCard key={s.id} s={s} i={i} />)}
          </div>

          <Carousel structures={structures} />
        </div>
      </section>
    </main>
  )
}