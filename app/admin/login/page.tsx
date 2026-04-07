"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Email ou mot de passe incorrect.")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Image de fond */}
      <Image
        src="/images/img1.jpeg"
        alt="background"
        fill
        className="object-cover object-center"
        style={{ zIndex: 0 }}
        priority
      />

      {/* Overlay fumée */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "rgba(10, 30, 80, 0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "white",
          borderRadius: "2rem",
          padding: "2.5rem 2.5rem 3rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.25)",
          position: "relative",
          zIndex: 2,
          border: "1px solid rgba(21,101,192,0.2)",
          outline: "4px solid rgba(21,101,192,0.06)",
          outlineOffset: "3px",
        }}
      >
        {/* Logo + nom église */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ width: "80px", height: "80px", position: "relative", marginBottom: "0.75rem" }}>
            <Image src="/images/logo.png" alt="PEADPO" fill className="object-contain" />
          </div>
          <span style={{
            fontSize: "1.4rem", fontWeight: 900, letterSpacing: "0.08em",
            background: "linear-gradient(135deg, #1565C0, #42A5F5)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", fontFamily: "'Inter', sans-serif",
          }}>
            PEADPO
          </span>
        </div>

        {/* Séparateur */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #1565C0, transparent)", marginBottom: "2rem" }} />

        {/* Titre */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h1 style={{
            fontSize: "1.35rem", fontWeight: 800, color: "#1e3a5f",
            marginBottom: "0.3rem", fontFamily: "'Inter', sans-serif",
          }}>
            Connexion Admin
          </h1>
          <p style={{
            fontSize: "0.82rem", color: "#9CA3AF",
            fontFamily: "'Inter', sans-serif",
          }}>
            Accès réservé aux administrateurs
          </p>
        </div>

        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: "0.75rem", padding: "0.85rem 1rem",
              marginBottom: "1.5rem",
            }}
          >
            <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "0.85rem", color: "#DC2626" }}>{error}</span>
          </motion.div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Email */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} color="#9CA3AF" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@peadpo.org"
                required
                style={{
                  width: "100%", padding: "0.85rem 1rem 0.85rem 2.75rem",
                  border: "1.5px solid #E5E7EB", borderRadius: "0.875rem",
                  fontSize: "0.92rem", color: "#1e3a5f", outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  boxSizing: "border-box",
                  background: "#FAFAFA",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = "#1565C0"; e.target.style.background = "white" }}
                onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.background = "#FAFAFA" }}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
              Mot de passe
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={15} color="#9CA3AF" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%", padding: "0.85rem 3rem 0.85rem 2.75rem",
                  border: "1.5px solid #E5E7EB", borderRadius: "0.875rem",
                  fontSize: "0.92rem", color: "#1e3a5f", outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  boxSizing: "border-box",
                  background: "#FAFAFA",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = "#1565C0"; e.target.style.background = "white" }}
                onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.background = "#FAFAFA" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9CA3AF" }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Bouton */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "0.95rem",
              background: loading ? "#BFDBFE" : "linear-gradient(135deg, #1565C0, #1E88E5)",
              color: "white", border: "none", borderRadius: "0.875rem",
              fontSize: "0.95rem", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Inter', sans-serif",
              marginTop: "0.25rem",
              boxShadow: loading ? "none" : "0 4px 20px rgba(21,101,192,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </motion.button>

        </form>
      </motion.div>
    </div>
  )
}