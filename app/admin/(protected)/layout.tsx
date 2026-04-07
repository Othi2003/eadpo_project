import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "./SignOutButton"
import { AdminNavItems } from "./AdminNavItems"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/admin/login")

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#F0F6FF" }}>

      {/* Sidebar */}
      <aside style={{
        width: "260px",
        minHeight: "100vh",
        background: "white",
        borderRight: "1px solid rgba(21,101,192,0.1)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        boxShadow: "2px 0 16px rgba(21,101,192,0.06)",
      }}>

        {/* Logo */}
        <div style={{
          padding: "1.75rem 1.5rem",
          borderBottom: "1px solid rgba(21,101,192,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "linear-gradient(135deg, #1565C0, #1E88E5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ color: "white", fontWeight: 900, fontSize: "1rem" }}>P</span>
            </div>
            <div>
              <p style={{ fontWeight: 800, color: "#1e3a5f", fontSize: "0.95rem", lineHeight: 1.2 }}>PEADPO</p>
              <p style={{ fontSize: "0.7rem", color: "#9CA3AF", fontWeight: 500 }}>Administration</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <AdminNavItems />
        </nav>

        {/* Footer sidebar */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(21,101,192,0.08)" }}>
          <p style={{ fontSize: "0.75rem", color: "#9CA3AF", paddingLeft: "1rem", marginBottom: "0.5rem" }}>
            {session.user?.email}
          </p>
          <SignOutButton />
        </div>
      </aside>

      {/* Contenu principal */}
      <main style={{ marginLeft: "260px", flex: 1, minHeight: "100vh", padding: "2rem" }}>
        {children}
      </main>

      <style>{`
        .admin-nav-link:hover {
          background: rgba(21,101,192,0.06);
          color: #1565C0;
        }
      `}</style>
    </div>
  )
}