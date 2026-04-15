import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// const PASSWORDS = {
//   nitalum2024: "member",
//   nitalumADMIN: "admin",
// };

const SLIDES = [
  { id: 1, color: "#c9b99a", label: "Class Photo" },
  { id: 2, color: "#2d6a4f", label: "Group Photo" },
  { id: 3, color: "#4a4e69", label: "Campus Event" },
];

function SlideCard({ slide, position, index }) {
  const styles = {
    active: {
      width: "400px", height: "270px", zIndex: 3,
      transform: "translateX(-50%) rotate(0deg)", left: "50%",
      filter: "none", border: "4px solid #fff",
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    },
    prev: {
      width: "250px", height: "210px", zIndex: 2,
      transform: "rotate(-4deg)", left: "0",
      filter: "grayscale(0.5) brightness(0.88)", border: "3px solid #fff",
    },
    next: {
      width: "250px", height: "210px", zIndex: 2,
      transform: "rotate(4deg)", right: "0", left: "auto",
      filter: "grayscale(1) brightness(0.82)", border: "3px solid #fff",
    },
  };

  return (
    <div style={{
      position: "absolute", borderRadius: "4px", overflow: "hidden",
      transition: "all 0.48s cubic-bezier(0.4,0,0.2,1)",
      ...styles[position],
    }}>
      <div style={{
        width: "100%", height: "100%",
        background: `${slide.color}44`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "10px",
      }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
          stroke={slide.color} strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span style={{
          fontSize: "10px", letterSpacing: "2px", color: slide.color,
          fontWeight: 600, textTransform: "uppercase",
        }}>{slide.label}</span>
      </div>
      <div style={{
        position: "absolute", top: "8px", right: "10px",
        fontSize: "11px", fontWeight: 700, color: "#fff",
        letterSpacing: "1px", textShadow: "0 1px 4px rgba(0,0,0,0.6)",
        fontFamily: "'Courier New', monospace",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function NitalumPasswordPage() {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  useEffect(() => {
  if (role === "member") navigate("/home");
  if (role === "admin") navigate("/admin");
  }, []);
  const [current, setCurrent] = useState(1);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [shake, setShake] = useState(false);
  const autoRef = useRef(null);

  const mod = (n, m) => ((n % m) + m) % m;
  const goNext = useCallback(() => setCurrent((c) => mod(c + 1, SLIDES.length)), []);
  const goPrev = useCallback(() => setCurrent((c) => mod(c - 1, SLIDES.length)), []);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(goNext, 4000);
  }, [goNext]);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto]);

const handleSubmit = async () => {
  try {
    const response = await fetch("http://localhost:8081/api/auth/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem("role", data.role);
      // Redirect based on role
      navigate(data.role === "admin" ? "/admin" : "/home");
    } else {
      setMessage({ text: data.msg, type: "error" });
      triggerShake();
    }
  } catch (err) {
    setMessage({ text: "Backend not running!", type: "error" });
  }
};

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 500); };

  const prevIdx = mod(current - 1, SLIDES.length);
  const nextIdx = mod(current + 1, SLIDES.length);

  return (
    <div style={{
      minHeight: "100vh", background: "#cfcec7",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "2rem 1rem 4rem",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      backgroundImage:
        "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.06) 0%, transparent 60%)",
    }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{
          fontSize: "clamp(48px, 8vw, 72px)", fontWeight: 900,
          letterSpacing: "10px", color: "#1a1a1a", textTransform: "uppercase",
          lineHeight: 1, fontFamily: "'Georgia', serif", margin: 0,
        }}>NITALUM</h1>
        <p style={{
          fontSize: "12px", letterSpacing: "6px", color: "#666",
          textTransform: "uppercase", marginTop: "6px",
          fontFamily: "'Courier New', monospace",
        }}>Nita Alumni</p>
      </div>

      {/* Slider */}
      <div
        style={{ position: "relative", width: "100%", maxWidth: "860px", height: "300px" }}
        onMouseEnter={() => clearInterval(autoRef.current)}
        onMouseLeave={startAuto}
      >
        <SlideCard slide={SLIDES[prevIdx]} position="prev" index={prevIdx} />
        <SlideCard slide={SLIDES[current]} position="active" index={current} />
        <SlideCard slide={SLIDES[nextIdx]} position="next" index={nextIdx} />

        <div style={{ position: "absolute", bottom: "-40px", right: "60px", display: "flex", gap: "8px", zIndex: 10 }}>
          {[
            { fn: goPrev, d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" },
            { fn: goNext, d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" },
          ].map(({ fn, d }, i) => (
            <button key={i} onClick={fn} style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: "#888", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#444")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#888")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d={d} /></svg>
            </button>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: "7px", marginTop: "3rem" }}>
        {SLIDES.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: i === current ? "#333" : "#aaa", cursor: "pointer",
            transition: "all 0.3s", transform: i === current ? "scale(1.3)" : "scale(1)",
          }} />
        ))}
      </div>

      {/* Password */}
      <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          animation: shake ? "shake 0.4s ease" : "none",
        }}>
          <label htmlFor="pw" style={{
            fontSize: "16px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "1px",
          }}>Password</label>

          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              id="pw"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setMessage(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••"
              style={{
                background: "transparent", border: "none",
                borderBottom: "1.5px solid #444", borderRadius: 0,
                outline: "none", width: "150px", fontSize: "15px",
                padding: "5px 28px 5px 4px", color: "#1a1a1a",
                letterSpacing: showPassword ? "1px" : "4px",
                fontFamily: "'Courier New', monospace",
              }}
              autoComplete="off"
            />
            <button onClick={() => setShowPassword(!showPassword)} style={{
              position: "absolute", right: "2px", background: "transparent",
              border: "none", cursor: "pointer", padding: "2px",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <button onClick={handleSubmit} style={{
            background: "transparent", border: "none", cursor: "pointer", padding: "4px 6px",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#444">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        </div>

        {message && (
          <p style={{
            fontSize: "12px", marginTop: "8px", letterSpacing: "0.5px",
            fontFamily: "'Courier New', monospace",
            color: message.type === "success" ? "#1a7a4a" : "#c0392b",
          }}>{message.text}</p>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
      `}</style>
    </div>
  );
}
