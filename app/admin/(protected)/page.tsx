import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Users, Building2, Church, Info, Image as ImageIcon } from "lucide-react"

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const [pasteurs, cultes, informations, medias] = await Promise.all([
    prisma.pasteur.count(),
    prisma.culte.count(),
    prisma.information.count(),
    prisma.mediaFichier.count(),
  ])

  const stats = [
    { label: "Pasteurs", value: pasteurs, icon: Users, color: "#1565C0", bg: "rgba(21,101,192,0.08)" },
    { label: "Structures", value: 5, icon: Building2, color: "#0891B2", bg: "rgba(8,145,178,0.08)" },
    { label: "Cultes", value: cultes, icon: Church, color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
    { label: "Informations", value: informations, icon: Info, color: "#059669", bg: "rgba(5,150,105,0.08)" },
    { label: "Médias", value: medias, icon: ImageIcon, color: "#D97706", bg: "rgba(217,119,6,0.08)" },
  ]

  return (
    <div>
      {/* En-tête */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a5f", marginBottom: "0.35rem" }}>
          Tableau de bord
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>
          Bienvenue, {session.user?.name} 👋
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1.25rem",
        marginBottom: "3rem",
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: "white",
            borderRadius: "1.25rem",
            padding: "1.5rem",
            boxShadow: "0 2px 12px rgba(21,101,192,0.06)",
            border: "1px solid rgba(21,101,192,0.07)",
            display: "flex", flexDirection: "column", gap: "1rem",
          }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              background: stat.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <div>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e3a5f", lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: "0.82rem", color: "#9CA3AF", marginTop: "0.25rem" }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}