const GALLERY = [
  { id: 1, color: "#FF4D4D", year: "2019", label: "Farewell Night"  },
  { id: 2, color: "#111111", year: "2020", label: "Annual Fest"     },
  { id: 3, color: "#FFD600", year: "2021", label: "Convocation"     },
  { id: 4, color: "#111111", year: "2022", label: "Reunion"         },
  { id: 5, color: "#FF4D4D", year: "2023", label: "Alumni Meet"     },
  { id: 6, color: "#111111", year: "2018", label: "Cultural Night"  },
];

export default function Gallery() {
  return (
    <section style={{ background: "#fafaf8", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "10px", color: "#FF4D4D", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: "0.4rem" }}>— Memories</p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#111", fontFamily: "'Georgia', serif", margin: 0, letterSpacing: "-1px" }}>
              Our Moments
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#aaa", fontFamily: "'Courier New', monospace", maxWidth: "260px", lineHeight: 1.6 }}>
            Photos uploaded by admin appear here. Real memories, real people.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: "12px",
        }}>
          {GALLERY.map((item, i) => {
            const isAccent = item.color !== "#111111";
            const tall = i === 1 || i === 4;
            return (
              <div key={item.id} style={{
                borderRadius: "12px", overflow: "hidden",
                height: tall ? "320px" : "220px",
                position: "relative", cursor: "pointer",
                background: isAccent ? item.color : "#f0efeb",
                border: "1px solid #e8e8e4",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                gridRow: tall ? "span 1" : "span 1",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Content */}
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke={isAccent ? "rgba(255,255,255,0.7)" : "#bbb"}
                    strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span style={{
                    fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
                    fontFamily: "'Courier New', monospace",
                    color: isAccent ? "rgba(255,255,255,0.8)" : "#bbb",
                  }}>{item.label}</span>
                </div>

                {/* Year badge */}
                <div style={{
                  position: "absolute", top: "12px", left: "12px",
                  background: isAccent ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)",
                  borderRadius: "50px", padding: "3px 10px",
                  fontSize: "11px", fontFamily: "'Courier New', monospace",
                  color: isAccent ? "#fff" : "#999",
                  letterSpacing: "1px",
                }}>{item.year}</div>

                {/* Hover overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0)",
                  transition: "background 0.3s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0)")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}