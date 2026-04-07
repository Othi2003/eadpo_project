"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa"

const Footer = () => {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ nom: "", email: "", sujet: "", message: "" })
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1.5px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    fontSize: "0.92rem",
    color: "white",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    marginBottom: "0.4rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  }

  const socials = [
    { Icon: FaFacebook,  href: "#", hoverColor: "#1877F2", label: "Facebook"  },
    { Icon: FaWhatsapp,  href: "#", hoverColor: "#25D366", label: "WhatsApp"  },
    { Icon: FaYoutube,   href: "#", hoverColor: "#FF0000", label: "YouTube"   },
  ]

  return (
    <footer style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── PARTIE HAUTE : fond bleu foncé ── */}
      <div style={{ background: "#0D2B6B", position: "relative", overflow: "hidden" }}>

        {/* Vague de transition */}
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", marginBottom: "-2px" }}
          preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#f5f9ff"/>
        </svg>

        {/* Cercles décoratifs */}
        <div style={{
          position: "absolute", top: "-8rem", right: "-8rem",
          width: "32rem", height: "32rem", borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(21,101,192,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-6rem", left: "-6rem",
          width: "24rem", height: "24rem", borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(66,165,245,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Carte + infos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "white",
                display: "inline-block",
                marginBottom: "0.5rem",
              }}>
                Nous trouver
              </h3>
              <div style={{
                height: "3px", width: "60px", borderRadius: "9999px",
                background: "linear-gradient(to right, #42A5F5, transparent)",
                marginBottom: "1.5rem",
              }} />

              {/* Carte */}
              <div style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                height: "300px",
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.123456789!2d-1.5326!3d12.3647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIxJzUzLjAiTiAxwrAzMSc1Ny42Ilc!5e0!3m2!1sfr!2sbf!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation PEADPO"
                />
              </div>

              {/* Infos */}
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { Icon: MapPin, text: "Patte d'Oie, Ouagadougou, Burkina Faso" },
                  { Icon: Phone,  text: "+226 XX XX XX XX" },
                  { Icon: Mail,   text: "contact@peadpo.org" },
                ].map(({ Icon, text }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "9999px",
                      background: "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color="#90CAF9" />
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "white",
                display: "inline-block",
                marginBottom: "0.5rem",
              }}>
                Nous contacter
              </h3>
              <div style={{
                height: "3px", width: "60px", borderRadius: "9999px",
                background: "linear-gradient(to right, #42A5F5, transparent)",
                marginBottom: "1.5rem",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* Nom + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Nom</label>
                    <input name="nom" value={form.nom} onChange={handleChange}
                      placeholder="Votre nom" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" value={form.email} onChange={handleChange}
                      placeholder="votre@email.com" type="email" style={inputStyle} />
                  </div>
                </div>

                {/* Sujet — saisie libre */}
                <div>
                  <label style={labelStyle}>Sujet</label>
                  <input name="sujet" value={form.sujet} onChange={handleChange}
                    placeholder="Objet de votre message" style={inputStyle} />
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Votre message..." rows={5}
                    style={{ ...inputStyle, resize: "none" }} />
                </div>

                {/* Bouton */}
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                    background: sent ? "#22c55e" : "linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "0.75rem",
                    padding: "0.9rem 2rem",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.3s",
                    letterSpacing: "0.03em",
                  }}
                >
                  {sent ? "✓ Message envoyé !" : <><Send size={16} /> Envoyer le message</>}
                </motion.button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── PARTIE BASSE : fond noir ── */}
      <div style={{ background: "#E3F2FD", position: "relative" }}>

        {/* Vague de séparation */}
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", marginTop: "-1px" }}
          preserveAspectRatio="none">
          <path d="M0,25 C400,50 1000,0 1440,25 L1440,0 L0,0 Z" fill="#1565C0"/>
        </svg>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

            {/* Nom */}
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0D2B6B", letterSpacing: "-0.01em", display: "block" }}>
                PEADPO
              </span>
              <span style={{ fontSize: "0.8rem", color: "rgba(13,43,107,0.6)", letterSpacing: "0.04em" }}>
                Première Église des Assemblées de Dieu de la Patte d&apos;Oie
              </span>
            </div>

            {/* Réseaux sociaux */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socials.map(({ Icon, href, hoverColor, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  style={{
                    width: "42px", height: "42px", borderRadius: "9999px",
                    background: "rgba(13,43,107,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(13,43,107,0.7)",
                    transition: "background 0.25s, color 0.25s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = hoverColor
                    e.currentTarget.style.color = "white"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(13,43,107,0.1)"
                    e.currentTarget.style.color = "rgba(13,43,107,0.7)"
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Séparateur */}
            <div style={{ height: "1px", width: "100%", background: "rgba(13,43,107,0.1)" }} />

            {/* Copyright */}
            <p style={{ fontSize: "0.78rem", color: "rgba(13,43,107,0.5)", textAlign: "center" }}>
              © {new Date().getFullYear()} PEADPO — Tous droits réservés
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
