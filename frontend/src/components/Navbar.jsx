import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About Us"];
const BATCHES   = ["2015–19", "2016–20", "2017–21", "2018–22", "2019–23", "2020–24"];

export default function Navbar({ onLogout }) {
  const [batchOpen, setBatchOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const dropRef = useRef(null);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setBatchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
 
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2.5rem", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(15,15,35,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      transition: "all 0.35s ease",
    }}>
      <div style={{
        fontSize: "22px", fontWeight: 900, letterSpacing: "4px",
        color: "#fff", fontFamily: "'Playfair Display', Georgia, serif",
      }}>NITALUM</div>
 
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" style={{
            color: "rgba(255,255,255,0.85)", fontSize: "14px",
            letterSpacing: "1px", textDecoration: "none",
            fontFamily: "'Courier New', monospace", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.target.style.color = "#FFE66D")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.85)")}
          >{link}</a>
        ))}
 
        {/* Batches dropdown */}
        <div ref={dropRef} style={{ position: "relative" }}>
          <button onClick={() => setBatchOpen(!batchOpen)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.85)", fontSize: "14px",
            letterSpacing: "1px", fontFamily: "'Courier New', monospace",
            display: "flex", alignItems: "center", gap: "4px",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFE66D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          >
            Batches
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
              style={{ transform: batchOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          {batchOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15,15,35,0.96)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px", padding: "8px 0", minWidth: "130px",
            }}>
              {BATCHES.map((b) => (
                <div key={b} style={{
                  padding: "9px 18px", color: "rgba(255,255,255,0.8)",
                  fontSize: "13px", cursor: "pointer", fontFamily: "'Courier New', monospace",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,230,109,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >{b}</div>
              ))}
            </div>
          )}
        </div>
 
        {/* CTA */}
        <a href="#" style={{
          background: "linear-gradient(135deg, #FF6B6B, #FFE66D)",
          color: "#1a1a2e", fontSize: "13px", fontWeight: 700,
          padding: "9px 20px", borderRadius: "50px", textDecoration: "none",
          letterSpacing: "1px", fontFamily: "'Courier New', monospace",
          boxShadow: "0 4px 15px rgba(255,107,107,0.35)", whiteSpace: "nowrap",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(255,107,107,0.5)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,107,107,0.35)"; }}
        >+ Add My Profile</a>
 
        {/* Logout */}
        <button onClick={onLogout} style={{
          background: "transparent", border: "1px solid rgba(255,255,255,0.25)",
          color: "rgba(255,255,255,0.6)", fontSize: "12px", padding: "7px 14px",
          borderRadius: "50px", cursor: "pointer", letterSpacing: "1px",
          fontFamily: "'Courier New', monospace", transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
        >Logout</button>
      </div>
    </nav>
  );
}