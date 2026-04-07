"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import type { APropos, JalonHistoire } from "@prisma/client"

const SectionTitle = ({ label, title }: { label: string; title: string }) => (
  <motion.div
    className="mb-12 text-center"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
    <span style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#1565C0", marginBottom: "0.5rem" }}>
      {label}
    </span>
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2,
      background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text", display: "inline-block",
    }}>
      {title}
    </span>
    <div style={{ marginTop: "8px", height: "3px", width: "60px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto" }} />
  </motion.div>
)

export default function AProposClient({
  apropos,
  jalons,
}: {
  apropos: APropos | null
  jalons: JalonHistoire[]
}) {
  const histoireRef = useRef(null)
  const histoireInView = useInView(histoireRef, { once: true, margin: "-80px" })

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0D2B6B 0%, #1565C0 50%, #1E88E5 100%)",
        padding: "8rem 1.5rem 6rem",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div style={{ position: "absolute", top: "-6rem", left: "-6rem", width: "28rem", height: "28rem", borderRadius: "9999px", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-4rem", right: "-4rem", width: "22rem", height: "22rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
            Qui sommes-nous ?
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            <span style={{ background: "linear-gradient(135deg, #90CAF9, #42A5F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              À Propos{" "}
            </span>
            de la PEADPO
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Une communauté enracinée dans la foi, unie par l&apos;amour, et engagée à servir Dieu et le prochain.
          </motion.p>
        </div>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* ── Histoire ── */}
      {jalons.length > 0 && (
        <section ref={histoireRef} className="py-24 px-6 lg:px-10" style={{ background: "white" }}>
          <div className="max-w-4xl mx-auto">
            <SectionTitle label="Notre parcours" title="Histoire de l'Église" />
            <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>

              {/* Ligne verticale centrale */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={histoireInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  position: "absolute", left: "50%", top: 0, bottom: 0,
                  width: "2px",
                  background: "linear-gradient(to bottom, #1565C0, #42A5F5, transparent)",
                  transform: "translateX(-50%)", transformOrigin: "top",
                }}
              />

              {jalons.map((j, i) => (
                <motion.div
                  key={j.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={histoireInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex",
                    justifyContent: i % 2 === 0 ? "flex-end" : "flex-start",
                    paddingRight: i % 2 === 0 ? "calc(50% + 2rem)" : "0",
                    paddingLeft: i % 2 === 0 ? "0" : "calc(50% + 2rem)",
                    marginBottom: "2.5rem",
                    position: "relative",
                  }}
                >
                  {/* Point sur la timeline */}
                  <div style={{
                    position: "absolute", left: "50%", top: "1rem",
                    width: "14px", height: "14px", borderRadius: "9999px",
                    background: "#1565C0", border: "3px solid white",
                    boxShadow: "0 0 0 3px rgba(21,101,192,0.2)",
                    transform: "translateX(-50%)",
                  }} />

                  {/* Card */}
                  <div style={{
                    background: "#f5f9ff", borderRadius: "1rem",
                    padding: "1.25rem 1.5rem", maxWidth: "320px",
                    borderLeft: i % 2 === 0 ? "none" : "3px solid #1565C0",
                    borderRight: i % 2 === 0 ? "3px solid #1565C0" : "none",
                  }}>
                    <span style={{ display: "block", fontWeight: 900, fontSize: "1.15rem", color: "#1565C0", marginBottom: "0.4rem", fontFamily: "'Inter', sans-serif" }}>
                      {j.annee}
                    </span>
                    <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.7 }}>{j.texte}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Vision & Mission ── */}
      {apropos && (
        <section className="py-24 px-6 lg:px-10" style={{ background: "#f5f9ff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle label="Notre raison d'être" title="Vision & Mission" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                style={{
                  background: "linear-gradient(135deg, #0D2B6B, #1565C0)",
                  borderRadius: "1.5rem", padding: "2.5rem",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "12rem", height: "12rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)" }} />
                <h3 style={{ fontSize: "0.75rem", fontWeight: 800, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>
                  Vision
                </h3>
                <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.9, fontSize: "1rem" }}>
                  {apropos.vision}
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
                style={{
                  background: "linear-gradient(135deg, #1565C0, #1E88E5)",
                  borderRadius: "1.5rem", padding: "2.5rem",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", bottom: "-3rem", left: "-3rem", width: "12rem", height: "12rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)" }} />
                <h3 style={{ fontSize: "0.75rem", fontWeight: 800, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>
                  Mission
                </h3>
                <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.9, fontSize: "1rem" }}>
                  {apropos.mission}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── Valeurs ── */}
      {apropos?.valeurs && (
        <section className="py-24 px-6 lg:px-10" style={{ background: "white" }}>
          <div className="max-w-3xl mx-auto">
            <SectionTitle label="Ce en quoi nous croyons" title="Nos Valeurs" />
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.9, textAlign: "center" }}
            >
              {apropos.valeurs}
            </motion.p>
          </div>
        </section>
      )}

    </main>
  )
}