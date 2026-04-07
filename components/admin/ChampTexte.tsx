export default function ChampTexte({ label, value, onChange, placeholder, type = "text", required = false, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; required?: boolean; multiline?: boolean
}) {
  const style = {
    width: "100%", padding: "0.8rem 1rem",
    border: "1.5px solid #E5E7EB", borderRadius: "0.875rem",
    fontSize: "0.9rem", color: "#1e3a5f", outline: "none",
    fontFamily: "'Inter', sans-serif", boxSizing: "border-box" as const,
    background: "#FAFAFA", transition: "border-color 0.2s",
    resize: multiline ? "vertical" as const : "none" as const,
  }

  return (
    <div>
      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
        {label}
      </label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} rows={4}
          style={style}
          onFocus={e => e.target.style.borderColor = "#1565C0"}
          onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
          style={style}
          onFocus={e => e.target.style.borderColor = "#1565C0"}
          onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
      )}
    </div>
  )
}