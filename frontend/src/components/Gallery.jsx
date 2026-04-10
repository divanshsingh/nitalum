const GALLERY = [
  { id: 1, color: "#FF6B6B", year: "2019", label: "Farewell Night"   },
  { id: 2, color: "#4ECDC4", year: "2020", label: "Annual Fest"      },
  { id: 3, color: "#FFE66D", year: "2021", label: "Convocation"      },
  { id: 4, color: "#A8E6CF", year: "2022", label: "Reunion"          },
  { id: 5, color: "#FF8B94", year: "2023", label: "Alumni Meet"      },
  { id: 6, color: "#B4A7D6", year: "2018", label: "Cultural Night"   },
];

export default function Gallery() {
  return (
    <section style={{ background: "#0f0f23", padding: "5rem 2rem", textAlign: "center" }}>
      <p style={{ fontSize: "11px", color: "#FF6B6B", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: "0.5rem" }}>Memories</p>
      <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", margin: "0 0 0.75rem" }}>
        Our <span style={{ color: "#FFE66D" }}>Moments</span>
      </h2>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontFamily: "'Courier New', monospace", marginBottom: "3rem" }}>
        Photos uploaded by admin will appear here
      </p>
 
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "16px", maxWidth: "1100px", margin: "0 auto",
      }}>
        {GALLERY.map((item, i) => (
          <div key={item.id} style={{
            borderRadius: "14px", overflow: "hidden",
            height: i % 3 === 1 ? "300px" : "220px",
            position: "relative", cursor: "pointer",
            background: `${item.color}18`,
            border: `1px solid ${item.color}33`,
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 20px 40px ${item.color}33`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span style={{ fontSize: "11px", color: item.color, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{item.label}</span>
            </div>
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              background: `${item.color}25`, border: `1px solid ${item.color}55`,
              borderRadius: "50px", padding: "3px 10px",
              fontSize: "11px", color: item.color, fontFamily: "'Courier New', monospace",
            }}>{item.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}