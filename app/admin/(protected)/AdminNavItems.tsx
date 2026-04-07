"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Church, 
  Image as ImageIcon,
  Home,
  FileText,
  ChevronDown,
  Image,
  Calendar,
  Info,
  UsersRound
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
]

const accueilSubItems = [
  { href: "/admin/accueil", label: "Hero", icon: Image },
  { href: "/admin/accueil/programme", label: "Programme", icon: Calendar },
  { href: "/admin/accueil/informations", label: "Informations", icon: Info },
  { href: "/admin/accueil/pasteurs", label: "Pasteurs", icon: Users },
]

const mainNavItems = [
  { href: "/admin/about", label: "À Propos", icon: FileText },
  { href: "/admin/structures", label: "Structures", icon: Building2 },
  { href: "/admin/groupes", label: "Groupes", icon: UsersRound },
  { href: "/admin/cultes", label: "Cultes", icon: Church },
  { href: "/admin/medias", label: "Médias", icon: ImageIcon },
]

export function AdminNavItems() {
  const pathname = usePathname()
  const [accueilOpen, setAccueilOpen] = useState(false)

  const isAccueilActive = pathname.startsWith("/admin/accueil")
  const isMainNavActive = (href: string) => pathname === href || (href !== "/admin" && pathname.startsWith(href))

  return (
    <>
      {navItems.map((item) => {
        const isActive = isMainNavActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.75rem 1rem", borderRadius: "0.875rem",
              textDecoration: "none",
              color: isActive ? "#1565C0" : "#6B7280",
              fontSize: "0.88rem", fontWeight: 500,
              transition: "all 0.15s",
              background: isActive ? "rgba(21,101,192,0.08)" : "transparent",
            }}
            className="admin-nav-link"
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        )
      })}

      {/* Accueil - Menu déroulant */}
      <div>
        <button
          onClick={() => setAccueilOpen(!accueilOpen)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", gap: "0.75rem",
            padding: "0.75rem 1rem", borderRadius: "0.875rem",
            textDecoration: "none",
            color: isAccueilActive ? "#1565C0" : "#6B7280",
            fontSize: "0.88rem", fontWeight: 500,
            transition: "all 0.15s",
            background: isAccueilActive ? "rgba(21,101,192,0.08)" : "transparent",
            border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Home size={18} />
            Accueil
          </div>
          <ChevronDown 
            size={16} 
            style={{ 
              transform: accueilOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s"
            }} 
          />
        </button>
        
        {accueilOpen && (
          <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.25rem" }}>
            {accueilSubItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.6rem 1rem", borderRadius: "0.75rem",
                    textDecoration: "none",
                    color: isActive ? "#1565C0" : "#6B7280",
                    fontSize: "0.85rem", fontWeight: 500,
                    transition: "all 0.15s",
                    background: isActive ? "rgba(21,101,192,0.08)" : "transparent",
                  }}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Autres items principaux */}
      {mainNavItems.map((item) => {
        const isActive = isMainNavActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.75rem 1rem", borderRadius: "0.875rem",
              textDecoration: "none",
              color: isActive ? "#1565C0" : "#6B7280",
              fontSize: "0.88rem", fontWeight: 500,
              transition: "all 0.15s",
              background: isActive ? "rgba(21,101,192,0.08)" : "transparent",
            }}
            className="admin-nav-link"
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        )
      })}
    </>
  )
}