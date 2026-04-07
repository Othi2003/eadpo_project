const SimpleFooter = () => {
  return (
    <footer className="py-6 text-center" style={{ background: "#E3F2FD" }}>
      <p style={{ fontSize: "0.78rem", color: "rgba(13,43,107,0.5)" }}>
        © {new Date().getFullYear()} PEADPO — Tous droits réservés
      </p>
    </footer>
  )
}

export default SimpleFooter