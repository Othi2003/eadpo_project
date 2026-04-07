"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

const SectionTitle = ({ text }: { text: string }) => (
  <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
    <span style={{
      fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em",
      background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text", display: "inline-block",
    }}>
      {text}
    </span>
    <div style={{ marginTop: "6px", height: "3px", width: "48px", borderRadius: "9999px", background: "linear-gradient(to right, #1565C0, #42A5F5, transparent)", marginLeft: "auto", marginRight: "auto" }} />
  </div>
)

const coords = [
  { icon: MapPin, text: "Patte d'Oie, Ouagadougou, Burkina Faso" },
  { icon: Phone, text: "+226 XX XX XX XX" },
  { icon: Mail, text: "contact@peadpo.com" },
]

export default function ContactClient() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1.5px solid #e2e8f0",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    color: "#1a2e4a",
    background: "white",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#1565C0",
    marginBottom: "0.4rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  }

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
            Nous écrire
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            <span style={{ background: "linear-gradient(135deg, #90CAF9, #42A5F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Contactez{" "}
            </span>
            -nous
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Une question, une demande de prière ou simplement envie d&apos;en savoir plus ? Nous sommes là pour vous.
          </motion.p>
        </div>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* ── Contenu principal ── */}
      <section style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>

          {/* Grid responsive via Tailwind */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* ── Colonne gauche : Localisation ── */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <SectionTitle text="Nous trouver" />

              {/* Carte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                style={{ borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(21,101,192,0.12)", border: "1.5px solid #dbeafe", marginBottom: "1.75rem" }}
              >
                <iframe
                  title="Localisation PEADPO"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898!2d-1.5144853!3d12.3272035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1032ebde7082ff93%3A0x15cecea85ba48f1d!2sPatte+d%E2%80%99oie%2C+Ouagadougou!5e0!3m2!1sfr!2sbf"
                  width="100%" height="260"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>

              {/* Coordonnées */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                {coords.map((c, i) => {
                  const Icon = c.icon
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "9999px", flexShrink: 0,
                        background: "linear-gradient(135deg, #EBF4FF, #DBEAFE)",
                        border: "1.5px solid #BFDBFE",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(21,101,192,0.12)",
                      }}>
                        <Icon size={16} color="#1565C0" strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.5 }}>{c.text}</span>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* ── Colonne droite : Formulaire ── */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <SectionTitle text="Nous contacter" />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                  style={{ background: "linear-gradient(135deg, #f0f7ff, #e8f2ff)", borderRadius: "1.5rem", padding: "3rem 2rem", textAlign: "center" }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "9999px", background: "linear-gradient(135deg, #1565C0, #42A5F5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1a2e4a", marginBottom: "0.75rem" }}>Message envoyé !</h3>
                  <p style={{ color: "#6B7280", lineHeight: 1.7, fontSize: "0.95rem" }}>Merci de nous avoir contactés. Nous vous répondrons dans les meilleurs délais.</p>
                  <button onClick={() => { setSent(false); setForm({ nom: "", email: "", sujet: "", message: "" }) }}
                    style={{ marginTop: "1.5rem", background: "linear-gradient(135deg, #1565C0, #1E88E5)", color: "white", border: "none", padding: "0.75rem 2rem", borderRadius: "9999px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    Nouveau message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                  {/* Nom + Email — colonne sur mobile, côte à côte sur desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Nom complet</label>
                      <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Votre nom complet"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#1565C0"}
                        onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                    </div>
                    <div>
                      <label style={labelStyle}>Adresse e-mail</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#1565C0"}
                        onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Sujet</label>
                    <input name="sujet" value={form.sujet} onChange={handleChange} required placeholder="Objet de votre message"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#1565C0"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                  </div>

                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required
                      placeholder="Écrivez votre message ici..." rows={6}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "150px" }}
                      onFocus={e => e.target.style.borderColor = "#1565C0"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <motion.button
                      type="submit" disabled={loading}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      style={{
                        background: loading ? "rgba(21,101,192,0.5)" : "linear-gradient(135deg, #1565C0, #1E88E5)",
                        color: "white", border: "none",
                        padding: "0.9rem 2.5rem", borderRadius: "9999px",
                        fontWeight: 800, fontSize: "0.95rem",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontFamily: "'Inter', sans-serif",
                        transition: "background 0.3s",
                        width: "100%",
                      }}
                      className="sm:w-auto"
                    >
                      {loading ? "Envoi en cours…" : "Envoyer le message"}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}