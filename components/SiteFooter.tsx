"use client"

import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa"

const SiteFooter = () => {
  const socials = [
    { Icon: FaFacebook, href: "#", hoverColor: "#1877F2", label: "Facebook" },
    { Icon: FaWhatsapp, href: "#", hoverColor: "#25D366", label: "WhatsApp" },
    { Icon: FaYoutube, href: "#", hoverColor: "#FF0000", label: "YouTube" },
  ]

  return (
    <footer className="py-8" style={{ background: "#E3F2FD" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center gap-4">
          {/* Nom de l'église */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0D2B6B", letterSpacing: "-0.01em", display: "block" }}>
              PEADPO
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(13,43,107,0.6)", letterSpacing: "0.04em" }}>
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
                  width: "38px", height: "38px", borderRadius: "9999px",
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
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Séparateur avec effet de disparition */}
          <div style={{ 
            height: "1px", 
            width: "90%", 
            maxWidth: "800px",
            background: "linear-gradient(to right, transparent, rgba(13,43,107,0.3), transparent)" 
          }} />

          {/* Copyright */}
          <p style={{ fontSize: "0.78rem", color: "rgba(13,43,107,0.5)" }}>
            © {new Date().getFullYear()} PEADPO — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter