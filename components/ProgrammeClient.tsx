"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import type { Programme } from "@prisma/client"

const ProgrammeCard = ({ item, i }: { item: Programme; i: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(21,101,192,0.18)", transition: { duration: 0.3 } }}
      style={{
        background: "#dbeafe", borderRadius: "1.25rem", padding: "2rem 1.75rem",
        boxShadow: "0 2px 16px rgba(21,101,192,0.08)",
        borderTop: "4px solid #1565C0", borderBottom: "4px solid #1565C0",
        cursor: "default", textAlign: "center",
      }}
    >
      <motion.span
        initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
        style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#1565C0", lineHeight: 1, marginBottom: "0.25rem" }}
      >
        {item.jour}
      </motion.span>

      <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 600, color: "#64748b", letterSpacing: "0.05em", marginBottom: "1rem", fontFamily: "'Inter', sans-serif" }}>
        {item.heure}
      </span>

      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: i * 0.15 + 0.4 }}
        style={{ height: "0.2px", background: "linear-gradient(to right, transparent, #1565C0, transparent)", marginBottom: "1rem", transformOrigin: "center" }}
      />

      <motion.span
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
        style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "#374151", lineHeight: 1.3 }}
      >
        {item.titre}
      </motion.span>
    </motion.div>
  )
}

export default function ProgrammeClient({ programmes }: { programmes: Programme[] }) {
  if (programmes.length === 0) return null

  return (
    <section className="py-20 px-6 lg:px-10" style={{ background: "#ffffff", position: "relative", overflow: "hidden" }}>
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

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <motion.div className="mb-14 text-center" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, background: "linear-gradient(135deg, #1565C0 0%, #1E88E5 50%, #42A5F5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
            Programme
          </span>
          <div style={{ marginTop: "6px", height: "3px", width: "80px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto" }} />
          <p className="mt-4 text-gray-500 text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem" }}>
            Rejoignez-nous tout au long de la semaine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programmes.map((item, i) => (
            <ProgrammeCard key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}