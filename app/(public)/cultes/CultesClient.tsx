"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, Search } from "lucide-react"
import { useState } from "react"
import type { Culte } from "@prisma/client"

const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
const MOIS_COURT = ["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"]

function grouper(cultes: Culte[]) {
  const map: Record<string, Culte[]> = {}
  for (const c of cultes) {
    const d = new Date(c.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!map[key]) map[key] = []
    map[key].push(c)
  }
  return map
}

function estAujourdhui(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const SectionLabel = ({ texte }: { texte: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(21,101,192,0.2))" }} />
    <span style={{
      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
      textTransform: "uppercase" as const, color: "white",
      background: "linear-gradient(135deg, #1565C0, #1E88E5)",
      padding: "0.3rem 1.25rem", borderRadius: "9999px", whiteSpace: "nowrap" as const,
    }}>
      {texte}
    </span>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(21,101,192,0.2))" }} />
  </div>
)

const MoisLabel = ({ texte }: { texte: string }) => (
  <div style={{ marginBottom: "1.25rem" }}>
    <span style={{
      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
      textTransform: "uppercase" as const, color: "#1565C0",
      background: "rgba(21,101,192,0.08)",
      padding: "0.3rem 1rem", borderRadius: "9999px",
    }}>
      {texte}
    </span>
  </div>
)

const CulteItem = ({ culte, i }: { culte: Culte; i: number }) => {
  const d = new Date(culte.date)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/cultes/${culte.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <motion.div
          whileHover="hover"
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr auto",
            alignItems: "center",
            gap: "1.5rem",
            padding: "1.25rem 1.5rem",
            borderRadius: "1.25rem",
            background: "white",
            boxShadow: "0 1px 8px rgba(21,101,192,0.06)",
            border: "1px solid #1565C0",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            variants={{ hover: { scaleY: 1 }, initial: { scaleY: 0 } }}
            initial="initial"
            style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "3px", background: "linear-gradient(to bottom, #1565C0, #42A5F5)", transformOrigin: "top", borderRadius: "0 2px 2px 0" }}
          />
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "0.1rem", paddingLeft: "0.5rem" }}>
            <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1565C0", lineHeight: 1, fontFamily: "'Inter', sans-serif" }}>{d.getDate()}</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{MOIS_COURT[d.getMonth()]}</span>
            <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "#C9D5E8", letterSpacing: "0.05em" }}>{d.getFullYear()}</span>
          </div>
          <div style={{ position: "absolute", left: "116px", top: "20%", bottom: "20%", width: "1px", background: "rgba(21,101,192,0.15)" }} />
          <div>
            <motion.p variants={{ hover: { color: "#1565C0" } }}
              style={{ fontSize: "1rem", fontWeight: 700, color: "#1e3a5f", lineHeight: 1.4, transition: "color 0.2s", fontFamily: "'Inter', sans-serif" }}>
              {culte.titre}
            </motion.p>
          </div>
          <motion.div variants={{ hover: { x: 3, y: -3, opacity: 1, color: "#1565C0" } }}
            style={{ color: "#D1D5DB", transition: "color 0.2s", flexShrink: 0 }}>
            <ArrowUpRight size={20} />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function CultesClient({ cultes }: { cultes: Culte[] }) {
  const [recherche, setRecherche] = useState("")

  const sorted = [...cultes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const dernierCulte = sorted[0] ?? null
  const resteDesCultes = sorted.slice(1)

  const labelDernier = dernierCulte
    ? estAujourdhui(new Date(dernierCulte.date))
      ? "Culte du jour"
      : "Culte du dimanche dernier"
    : ""

  const cultesFiltres = recherche.trim()
    ? resteDesCultes.filter(c => c.titre.toLowerCase().includes(recherche.toLowerCase()))
    : resteDesCultes

  const grouped = grouper(cultesFiltres)

  const keys = Object.keys(grouped).sort((a, b) => {
    const [ay, am] = a.split("-").map(Number)
    const [by, bm] = b.split("-").map(Number)
    if (ay !== by) return by - ay
    return bm - am
  })

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
            Vie de l&apos;Église
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Résumés de{" "}
            <span style={{ background: "linear-gradient(135deg, #90CAF9, #42A5F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Cultes
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7, marginBottom: "2rem" }}>
            Revivez chaque culte dominical à travers les résumés et les moments forts.
          </motion.p>

          {/* Barre de recherche */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            style={{ position: "relative", maxWidth: "480px", margin: "0 auto" }}>
            <Search size={18} color="rgba(255,255,255,0.6)" style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="text"
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              placeholder="Rechercher un culte..."
              style={{
                width: "100%", padding: "0.95rem 1.25rem 0.95rem 3rem",
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "9999px",
                color: "white", fontSize: "0.95rem", outline: "none",
                fontFamily: "'Inter', sans-serif", boxSizing: "border-box" as const,
              }}
            />
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      <section className="py-20 px-6 lg:px-10" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">

          {/* ── Dernier culte ── */}
          {dernierCulte && !recherche && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              style={{ marginBottom: "3.5rem" }}>
              <SectionLabel texte={labelDernier} />
              <CulteItem culte={dernierCulte} i={0} />
            </motion.div>
          )}

          {/* ── Cultes précédents ── */}
          {!recherche && resteDesCultes.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <SectionLabel texte="Cultes précédents" />
            </div>
          )}

          {/* ── Liste par mois ── */}
          {cultesFiltres.length === 0 && recherche ? (
            <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: "1rem" }}>
              Aucun résultat pour &ldquo;{recherche}&rdquo;
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {keys.map(key => {
                const [year, month] = key.split("-").map(Number)
                const cultesDuMois = grouped[key].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

                return (
                  <motion.div key={key} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <MoisLabel texte={`${MOIS[month]} ${year}`} />
                    <div className="cultes-grid">
                      {cultesDuMois.map((culte, i) => (
                        <CulteItem key={culte.id} culte={culte} i={i} />
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .cultes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (max-width: 640px) {
          .cultes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}