"use client"

import Image from "next/image"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import type { Pasteur } from "@prisma/client"

const PasteurCard = ({ item, i }: { item: Pasteur; i: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(21,101,192,0.15)",
        position: "relative",
        aspectRatio: "3/4",
        cursor: "default",
        maxWidth: "320px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src={item.photo} alt={`${item.prenom} ${item.nom}`} fill className="object-cover object-top" />
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%" }} preserveAspectRatio="none">
          <path d="M0,90 C80,40 160,120 240,70 C300,35 355,65 400,55 L400,180 L0,180 Z" fill="#64B5F6" />
          <path d="M0,110 C80,60 160,140 240,90 C300,55 355,85 400,75 L400,180 L0,180 Z" fill="#1565C0" />
        </svg>
        <div style={{ background: "#1565C0", padding: "0 1.5rem 1.5rem", marginTop: "-2px" }}>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.18 + 0.55 }}
            style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginBottom: "0.3rem" }}
          >
            {item.prenom} {item.nom}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.18 + 0.65 }}
            style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}
          >
            {item.titre}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default function PasteursClient({ pasteurs }: { pasteurs: Pasteur[] }) {
  if (pasteurs.length === 0) return null

  return (
    <section className="py-20 px-6 lg:px-10" style={{ background: "#f5f9ff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "28rem", height: "28rem", borderRadius: "9999px", background: "radial-gradient(circle, rgba(21,101,192,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-4rem", left: "-4rem", width: "20rem", height: "20rem", borderRadius: "9999px", background: "radial-gradient(circle, rgba(66,165,245,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2,
            background: "linear-gradient(135deg, #1565C0 0%, #1E88E5 50%, #42A5F5 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", display: "inline-block",
          }}>
            Nos Pasteurs
          </span>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ marginTop: "6px", height: "3px", width: "80px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto", transformOrigin: "left" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-gray-500 text-center"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem" }}
          >
            Ceux qui veillent sur notre communauté
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pasteurs.map((item, i) => (
            <PasteurCard key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}