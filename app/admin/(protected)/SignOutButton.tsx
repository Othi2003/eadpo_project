"use client"

import { LogOut } from "lucide-react"
import { handleSignOut } from "./actions"

export function SignOutButton() {
  return (
    <button 
      onClick={handleSignOut}
      style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        width: "100%", padding: "0.75rem 1rem", borderRadius: "0.875rem",
        background: "none", border: "none", cursor: "pointer",
        color: "#DC2626", fontSize: "0.88rem", fontWeight: 500,
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.15s",
      }}
    >
      <LogOut size={18} />
      Déconnexion
    </button>
  )
}