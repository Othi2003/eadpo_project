"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import type { SlideHero } from "@prisma/client"

const SLIDE_DURATION = 6000

export default function HeroClient({ slides }: { slides: SlideHero[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null

  const slide = slides[current]

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center mt-20 overflow-hidden" style={{ clipPath: "inset(0)" }}>

      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image src={slide.image} alt="Église" fill className="object-cover object-center" priority />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10" style={{
        background: `linear-gradient(to right, rgba(235,245,255,1) 0%, rgba(235,245,255,0.98) 30%, rgba(235,245,255,0.70) 48%, rgba(235,245,255,0.35) 65%, rgba(235,245,255,0) 80%)`
      }} />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-10 -mt-48">
        <div className="max-w-md lg:max-w-xl">
          <AnimatePresence mode="wait">
            {!slide.label ? (
              <motion.div
                key={`slide-${current}-default`}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <span style={{
                  fontFamily: "'Georgia', 'Palatino Linotype', serif",
                  fontSize: "clamp(3.2rem, 8vw, 6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1,
                  background: "linear-gradient(135deg, #1565C0 0%, #1E88E5 50%, #42A5F5 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block",
                }}>
                  Bienvenue !
                </span>
                <div style={{ marginTop: "4px", marginBottom: "1.5rem", height: "3px", width: "60%", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)" }} />
                <h1 className="font-extrabold leading-[1.1] text-gray-600" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", fontFamily: "'Inter', 'Times New Roman', serif" }}>
                  Première Église des Assemblées de Dieu de la Patte d&apos;Oie (<span className="text-[#1565C0]">PEADPO</span>)
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key={`slide-${current}-label`}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <span style={{
                  fontFamily: "'Georgia', 'Palatino Linotype', serif",
                  fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1,
                  background: "linear-gradient(135deg, #1565C0 0%, #1E88E5 50%, #42A5F5 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block",
                }}>
                  {slide.label}
                </span>
                <div style={{ marginTop: "4px", marginBottom: "1.5rem", height: "3px", width: "60%", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)" }} />
                {slide.texte && (
                  <blockquote className="text-gray-700 font-semibold leading-snug mb-3" style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontFamily: "'Georgia', serif", fontStyle: "italic", borderLeft: "3px solid #1565C0", paddingLeft: "1rem" }}>
                    &ldquo;{slide.texte}&rdquo;
                  </blockquote>
                )}
                {slide.reference && (
                  <span className="font-semibold text-[#1565C0]" style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontFamily: "'Georgia', serif" }}>
                    — {slide.reference}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}