import { useState, useEffect } from "react";

const STATS = [
  { value: 200, suffix: "+", label: "Alumni Connected" },
  { value: 15,  suffix: "",  label: "Batches"          },
  { value: 80,  suffix: "+", label: "Companies"        },
  { value: 12,  suffix: "",  label: "Countries"        },
];

const COMPANIES = [
  "Google", "Amazon", "Microsoft", "Infosys", "TCS",
  "Wipro", "Accenture", "Samsung", "IBM", "Deloitte",
  "Cognizant", "Capgemini",
];

function StatCard({ value, suffix, label, animate }) {
  const count = useCounter(value, 1600, animate);
  return (
    <div style={{
      textAlign: "center",
      padding: "1.5rem 2rem",
      background: "rgba(255,255,255,0.12)",
      borderRadius: "16px",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.25)",
      minWidth: "140px",
      flex: "1",
    }}>
      <div style={{
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 800,
        color: "#fff",
        fontFamily: "'Playfair Display', Georgia, serif",
        lineHeight: 1,
      }}>
        {animate ? count : 0}{suffix}
      </div>
      <div style={{
        fontSize: "13px",
        color: "rgba(255,255,255,0.75)",
        marginTop: "6px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        fontFamily: "'Courier New', monospace",
      }}>{label}</div>
    </div>
  );
}

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Hero() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimate(true), 400); return () => clearTimeout(t); }, []);
 
  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 40%, #0d2137 70%, #0f0f23 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "7rem 2rem 4rem", position: "relative",
      overflow: "hidden", textAlign: "center",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "15%", left: "8%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,107,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "6%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(78,205,196,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
 
      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(255,230,109,0.12)", border: "1px solid rgba(255,230,109,0.3)",
        borderRadius: "50px", padding: "6px 18px", marginBottom: "1.5rem",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FFE66D" }} />
        <span style={{ fontSize: "12px", color: "#FFE66D", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>
          National Institute of Technology Agartala
        </span>
      </div>
 
      {/* Tagline */}
      <h1 style={{
        fontSize: "clamp(38px, 7vw, 72px)", fontWeight: 900, color: "#fff",
        fontFamily: "'Playfair Display', Georgia, serif",
        lineHeight: 1.1, margin: "0 0 1.2rem", maxWidth: "800px",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease 0.1s",
      }}>
        Rewind,{" "}
        <span style={{ color: "#FF6B6B" }}>Reconnect,</span>
        <br />and{" "}
        <span style={{ background: "linear-gradient(90deg,#FFE66D,#FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Refer.</span>
      </h1>
 
      <p style={{
        fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(255,255,255,0.6)",
        maxWidth: "520px", lineHeight: 1.7, marginBottom: "3rem",
        fontFamily: "'Courier New', monospace",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.2s",
      }}>
        One platform for every NITA alumnus — celebrate memories, discover batchmates, and grow together.
      </p>
 
      {/* Stats */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "16px",
        justifyContent: "center", marginBottom: "3.5rem",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.3s",
      }}>
        {STATS.map((s) => <StatCard key={s.label} {...s} animate={animate} />)}
      </div>
 
      {/* Company strip */}
      <div style={{ opacity: animate ? 1 : 0, transition: "opacity 0.7s ease 0.5s", width: "100%", maxWidth: "700px" }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "'Courier New', monospace" }}>
          Our alumni work at
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
          {COMPANIES.map((co) => (
            <div key={co} style={{
              padding: "7px 16px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50px", fontSize: "12px",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Courier New', monospace",
              transition: "all 0.2s", cursor: "default",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,230,109,0.12)"; e.currentTarget.style.color = "#FFE66D"; e.currentTarget.style.borderColor = "rgba(255,230,109,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >{co}</div>
          ))}
        </div>
      </div>
 
      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        opacity: 0.4, animation: "bounce 2s infinite",
      }}>
        <span style={{ fontSize: "10px", color: "#fff", letterSpacing: "2px", fontFamily: "'Courier New', monospace" }}>SCROLL</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M7 10l5 5 5-5z" /></svg>
      </div>
    </section>
  );
}