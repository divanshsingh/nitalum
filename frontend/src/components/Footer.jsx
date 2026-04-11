export default function Footer() {
  const links = ["Home", "Batches", "About Us", "Add My Profile"];

  return (
    <footer style={{
      background: "#111", padding: "4rem 2rem 2.5rem",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "5px", color: "#fff", fontFamily: "'Georgia', serif", marginBottom: "0.5rem" }}>
              NITALUM.
            </div>
            <p style={{ fontSize: "12px", color: "#555", fontFamily: "'Courier New', monospace", letterSpacing: "0.5px", maxWidth: "260px", lineHeight: 1.6 }}>
              National Institute of Technology Agartala · Alumni Network
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
            {links.map((l) => (
              <a key={l} href="#" style={{
                fontSize: "13px", color: "#555", textDecoration: "none",
                fontFamily: "'Courier New', monospace", letterSpacing: "0.5px",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "#555")}
              >{l}</a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #222", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "11px", color: "#444", fontFamily: "'Courier New', monospace" }}>
            © {new Date().getFullYear()} NITALUM. Made with ♥ by NITA Alumni.
          </p>
          {/* Red dot accent */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF4D4D" }} />
            <span style={{ fontSize: "11px", color: "#444", fontFamily: "'Courier New', monospace", letterSpacing: "1px" }}>NITA · AGARTALA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}