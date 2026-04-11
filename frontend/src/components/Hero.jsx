import { useState, useEffect } from "react";
import Marquee from './Marque';

const STATS = [
  { value: 200, suffix: "+", label: "Alumni"    },
  { value: 15,  suffix: "",  label: "Batches"   },
  { value: 80,  suffix: "+", label: "Companies" },
  { value: 12,  suffix: "",  label: "Countries" },
];

const COMPANIES = [
  "Google", "Amazon", "Microsoft", "Infosys", "TCS",
  "Wipro", "Accenture", "Samsung", "IBM", "Deloitte",
  "Cognizant", "Capgemini",
];

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

function StatCard({ value, suffix, label, animate }) {
  const count = useCounter(value, 1600, animate);
  return (
    <div style={{
      textAlign: "center",
      padding: "1.2rem 1.5rem",
      borderRight: "1px solid #e8e8e4",
      flex: 1,
    }}>
      <div style={{
        fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900,
        color: "#111", fontFamily: "'Georgia', serif", lineHeight: 1,
      }}>
        {animate ? count : 0}{suffix}
      </div>
      <div style={{
        fontSize: "11px", color: "#999", marginTop: "5px",
        letterSpacing: "2px", textTransform: "uppercase",
        fontFamily: "'Courier New', monospace",
      }}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimate(true), 300); return () => clearTimeout(t); }, []);

  return (
    <>
      {/* Main hero */}
      <section style={{
        minHeight: "100vh", background: "#fafaf8",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "7rem 2rem 3rem",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Subtle grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px", opacity: 0.4,
        }} />

        {/* Pop accent — top right dot */}
        <div style={{
          position: "absolute", top: "18%", right: "12%",
          width: "14px", height: "14px", borderRadius: "50%",
          background: "#FF4D4D", zIndex: 1,
        }} />
        {/* Pop accent — bottom left dot */}
        <div style={{
          position: "absolute", bottom: "22%", left: "10%",
          width: "9px", height: "9px", borderRadius: "50%",
          background: "#FFD600", zIndex: 1,
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "820px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-block",
            border: "1px solid #ddd", borderRadius: "50px",
            padding: "5px 16px", marginBottom: "2rem",
            opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease",
          }}>
            <span style={{ fontSize: "11px", color: "#888", letterSpacing: "2px", fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}>
              NIT Agartala · Alumni Network
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(42px, 8vw, 88px)", fontWeight: 900,
            color: "#111", fontFamily: "'Georgia', serif",
            lineHeight: 1.05, margin: "0 0 1.5rem",
            letterSpacing: "-2px",
            opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            Rewind.{" "}
            <span style={{ color: "#FF4D4D", fontStyle: "italic" }}>Reconnect.</span>
            <br />Refer.
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: "clamp(14px, 1.8vw, 18px)", color: "#777",
            maxWidth: "480px", margin: "0 auto 2.5rem",
            lineHeight: 1.75, fontFamily: "'Courier New', monospace",
            opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.2s",
          }}>
            One platform for every NITA alumnus — celebrate memories, find batchmates, and grow together.
          </p>

          {/* CTA */}
          <div style={{
            opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.3s",
          }}>
            <a href="#" style={{
              display: "inline-block",
              background: "#111", color: "#fff",
              fontSize: "14px", fontWeight: 600,
              padding: "14px 36px", borderRadius: "50px",
              textDecoration: "none", letterSpacing: "1px",
              fontFamily: "'Courier New', monospace",
              transition: "all 0.25s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FF4D4D"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,77,77,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#111"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)"; }}
            >Discover →</a>
          </div>
        </div>
      </section>

      {/* Marquee band */}
      <Marquee />

      {/* Stats bar */}
      <div style={{
        background: "#fafaf8",
        borderBottom: "1px solid #e8e8e4",
        padding: "2.5rem 2rem",
      }}>
        <div style={{
          maxWidth: "860px", margin: "0 auto",
          display: "flex", flexWrap: "wrap",
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              flex: 1, textAlign: "center", padding: "1rem 1.5rem",
              borderRight: i < STATS.length - 1 ? "1px solid #e8e8e4" : "none",
            }}>
              <div style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111", fontFamily: "'Georgia', serif", lineHeight: 1 }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: "11px", color: "#999", marginTop: "5px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company strip */}
      <div style={{ background: "#fafaf8", padding: "3rem 2rem", textAlign: "center", borderBottom: "1px solid #e8e8e4" }}>
        <p style={{ fontSize: "10px", color: "#bbb", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.2rem", fontFamily: "'Courier New', monospace" }}>
          Our alumni work at
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", maxWidth: "700px", margin: "0 auto" }}>
          {COMPANIES.map((co) => (
            <div key={co} style={{
              padding: "6px 16px",
              border: "1px solid #e8e8e4",
              borderRadius: "50px", fontSize: "12px",
              color: "#666", fontFamily: "'Courier New', monospace",
              transition: "all 0.2s", cursor: "default",
              background: "#fff",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#e8e8e4"; }}
            >{co}</div>
          ))}
        </div>
      </div>
    </>
  );
}

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 1600, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const timer = setTimeout(() => requestAnimationFrame(step), 600);
    return () => clearTimeout(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}