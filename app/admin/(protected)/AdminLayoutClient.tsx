"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard, Users, Building2, Church, ImageIcon,
  Home, FileText, ChevronDown, Calendar, Info,
  UsersRound, Menu, ChevronLeft, LogOut, User,
  Image as ImagePic,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
]

const accueilSubItems = [
  { href: "/admin/accueil", label: "Hero & Slides", icon: ImagePic },
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

const TOPBAR_HEIGHT = 60
const GAP = 12
const PADDING = 12

export default function AdminLayoutClient({ children, email }: { children: React.ReactNode; email: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [accueilOpen, setAccueilOpen] = useState(pathname.startsWith("/admin/accueil"))
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(href + "/")
  }

  const NavLink = ({
    href, label, icon: Icon, exact = false, sub = false,
  }: { href: string; label: string; icon: any; exact?: boolean; sub?: boolean }) => {
    const active = isActive(href, exact)
    return (
      <Link
        href={href}
        title={collapsed ? label : undefined}
        style={{
          display: "flex", alignItems: "center", gap: collapsed ? 0 : "0.75rem",
          padding: sub ? "0.55rem 0.875rem" : "0.75rem 1rem",
          borderRadius: "0.875rem", textDecoration: "none",
          color: active ? "#1565C0" : "#6B7280",
          fontSize: sub ? "0.83rem" : "0.88rem",
          fontWeight: active ? 700 : 500,
          background: active ? "rgba(21,101,192,0.08)" : "transparent",
          transition: "all 0.15s",
          justifyContent: collapsed ? "center" : "flex-start",
          overflow: "hidden", whiteSpace: "nowrap" as const,
        }}
      >
        <Icon size={sub ? 15 : 18} style={{ flexShrink: 0 }} />
        {!collapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>}
      </Link>
    )
  }

  // hauteur totale occupée : padding haut + topbar + gap + padding bas
  const sidebarAndContentHeight = `calc(100vh - ${PADDING * 2 + TOPBAR_HEIGHT + GAP}px)`

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      background: "#F0F6FF",
      padding: `${PADDING}px`,
      gap: `${GAP}px`,
    }}>

      {/* ── Topbar ── sticky, bords arrondis conservés */}
      <header style={{
        position: "sticky",
        top: `${PADDING}px`,
        zIndex: 50,
        background: "white",
        borderRadius: "1.25rem",
        height: `${TOPBAR_HEIGHT}px`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1.5rem",
        boxShadow: "0 2px 16px rgba(21,101,192,0.07)",
        flexShrink: 0,
      }}>
        {/* Logo + nom */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Image
              src="/images/logo.png"          // ← ton chemin dans /public
              alt="Logo PEADPO"
              width={45}
              height={45}
              style={{ borderRadius: "9px", objectFit: "contain", flexShrink: 0 }}
            />
          <div>
            <p style={{ fontWeight: 800, color: "#1e3a5f", fontSize: "0.92rem", lineHeight: 1.1, margin: 0 }}>PEADPO</p>
            <p style={{ fontSize: "0.65rem", color: "#9CA3AF", fontWeight: 500, margin: 0 }}>Administration</p>
          </div>
        </div>

        {/* Profil */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button
            onClick={() => setProfileOpen(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: profileOpen ? "rgba(21,101,192,0.06)" : "none",
              border: "none", cursor: "pointer", padding: "0.4rem 0.75rem",
              borderRadius: "9999px", fontFamily: "'Inter', sans-serif",
              transition: "background 0.15s",
            }}
          >
            <div style={{
              width: "32px", height: "32px", borderRadius: "9999px",
              background: "linear-gradient(135deg, #1565C0, #42A5F5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <User size={15} color="white" />
            </div>
            <ChevronDown
              size={14} color="#9CA3AF"
              style={{ transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            />
          </button>

          {profileOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 0.5rem)", right: 0,
              background: "white", borderRadius: "1rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid rgba(21,101,192,0.08)",
              minWidth: "220px", overflow: "hidden", zIndex: 100,
            }}>
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(21,101,192,0.06)" }}>
                <p style={{ fontSize: "0.72rem", color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" as const, margin: "0 0 0.2rem" }}>
                  Connecté en tant que
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e3a5f", wordBreak: "break-all" as const, margin: 0 }}>
                  {email}
                </p>
              </div>
              <div style={{ padding: "0.5rem" }}>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    width: "100%", padding: "0.7rem 0.875rem",
                    background: "none", border: "none", cursor: "pointer",
                    borderRadius: "0.75rem", color: "#DC2626",
                    fontSize: "0.85rem", fontWeight: 600,
                    fontFamily: "'Inter', sans-serif", transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <LogOut size={15} />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Zone sidebar + contenu ── même hauteur, ne scrollent pas elles-mêmes */}
      <div style={{
        display: "flex",
        gap: `${GAP}px`,
        height: sidebarAndContentHeight,
      }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: collapsed ? "68px" : "240px",
          transition: "width 0.25s ease",
          background: "white",
          borderRadius: "1.25rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",          // prend exactement la hauteur du parent
          boxShadow: "0 2px 16px rgba(21,101,192,0.07)",
          flexShrink: 0,
          overflow: "hidden",
        }}>
          {/* Toggle button */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-end",
            padding: "1rem 0.875rem 0.5rem",
            flexShrink: 0,          // ne rétrécit pas
          }}>
            <button
              onClick={() => setCollapsed(v => !v)}
              style={{
                width: "32px", height: "32px", borderRadius: "0.625rem",
                background: "rgba(21,101,192,0.06)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#1565C0", flexShrink: 0,
              }}
            >
              {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Nav — scroll interne uniquement ici */}
          <nav style={{
            flex: 1,
            padding: "0.5rem 0.625rem",
            display: "flex", flexDirection: "column", gap: "0.2rem",
            overflowY: "auto", overflowX: "hidden",
          }}>
            {navItems.map(item => <NavLink key={item.href} {...item} />)}

            <div>
              <button
                onClick={() => !collapsed && setAccueilOpen(v => !v)}
                title={collapsed ? "Accueil" : undefined}
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: collapsed ? "center" : "space-between",
                  width: "100%", gap: "0.75rem",
                  padding: "0.75rem 1rem", borderRadius: "0.875rem",
                  color: isActive("/admin/accueil") ? "#1565C0" : "#6B7280",
                  fontSize: "0.88rem", fontWeight: isActive("/admin/accueil") ? 700 : 500,
                  background: isActive("/admin/accueil") ? "rgba(21,101,192,0.08)" : "transparent",
                  border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s", whiteSpace: "nowrap" as const,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : "0.75rem" }}>
                  <Home size={18} style={{ flexShrink: 0 }} />
                  {!collapsed && "Accueil"}
                </div>
                {!collapsed && (
                  <ChevronDown size={14} style={{
                    transform: accueilOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s", flexShrink: 0,
                  }} />
                )}
              </button>

              {!collapsed && accueilOpen && (
                <div style={{ paddingLeft: "0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem", marginTop: "0.15rem" }}>
                  {accueilSubItems.map(item => <NavLink key={item.href} {...item} sub />)}
                </div>
              )}
            </div>

            {mainNavItems.map(item => <NavLink key={item.href} {...item} />)}
          </nav>
        </aside>

        {/* ── Contenu principal ── */}
        <div style={{
          flex: 1,
          background: "white",
          borderRadius: "1.25rem",
          boxShadow: "0 2px 16px rgba(21,101,192,0.07)",
          display: "flex",
          flexDirection: "column",
          height: "100%",           // même hauteur que la sidebar
          minWidth: 0,
          overflow: "hidden",       // le conteneur lui-même ne scroll pas
        }}>
          {/* ── En-tête de page fixe (titre + actions) — à définir par chaque page via un slot ou prop ── */}
          {/* Si tu veux un header fixe générique ici, ajoute-le avec flexShrink: 0 */}

          {/* Zone scrollable — seul cet élément scroll */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "2rem",
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}