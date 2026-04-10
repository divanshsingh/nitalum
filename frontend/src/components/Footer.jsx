export default function Footer() {
  return (
    <footer style={{
      background: "#080818", borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "3rem 2rem", textAlign: "center",
    }}>
      <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "5px", color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", marginBottom: "0.5rem" }}>NITALUM</div>
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", letterSpacing: "1px", marginBottom: "1.5rem" }}>
        National Institute of Technology Agartala · Alumni Network
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {["Home", "Batches", "About Us", "Add My Profile"].map((l) => (
          <a key={l} href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "'Courier New', monospace", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#FFE66D")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
          >{l}</a>
        ))}
      </div>
      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "'Courier New', monospace" }}>
        © {new Date().getFullYear()} NITALUM. Made with ♥ by NITA Alumni.
      </p>
    </footer>
  );
}