import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const BATCHES = [
  { label: "2025–28", path: "/batch/2025" },
  { label: "2024–27", path: "/batch/2024" },
  { label: "2023–26", path: "/batch/2023" },
  { label: "2022–25", path: "/batch/2022" },
  { label: "2021–24", path: "/batch/2021" },
  { label: "2020–23", path: "/batch/2020" },
  { label: "2019–22", path: "/batch/2019" },
  { label: "2018–21", path: "/batch/2018" },
  { label: "2017–20", path: "/batch/2017" },
  { label: "2016–19", path: "/batch/2016" },
  { label: "2015–18", path: "/batch/2015" },
  { label: "2014–17", path: "/batch/2014" },
  { label: "2013–16", path: "/batch/2013" },
  { label: "2012–15", path: "/batch/2012" },
  { label: "2011–14", path: "/batch/2011" },
  { label: "2010–13", path: "/batch/2010" },
  { label: "2009–12", path: "/batch/2009" },
  { label: "2008–11", path: "/batch/2008" },
  { label: "2007–10", path: "/batch/2007" },
  { label: "2006–09", path: "/batch/2006" }
];

export default function Navbar({ onLogout }) {
  const [batchOpen, setBatchOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const dropRef  = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [myUserName, setMyUsername] = useState(sessionStorage.getItem("username"));
  const userToken = sessionStorage.getItem("userToken"); 
  const username = sessionStorage.getItem("username");

useEffect(() => {
  const interval = setInterval(() => {
    setMyUsername(sessionStorage.getItem("username"));
  }, 300);
  return () => clearInterval(interval);
}, []);

const handleLogout = () => {
    // Clear user data but keep the 'role' if you want them to stay past the gate
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("username");
    navigate("/home"); // Redirect to home after logout
  };


  const isBatchActive = location.pathname.startsWith("/batch");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  useEffect(() => { setBatchOpen(false); }, [location.pathname]);

  const navLink = (label, path) => {
    const active = location.pathname === path;
    return (
      <span
        key={label}
        onClick={() => navigate(path)}
        style={{
          color: active ? "#111" : "#888",
          fontSize: "13px", letterSpacing: "0.5px",
          fontFamily: "'Courier New', monospace",
          cursor: "pointer", transition: "color 0.2s",
          borderBottom: active ? "1.5px solid #111" : "1.5px solid transparent",
          paddingBottom: "2px",
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#111"; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#888"; }}
      >{label}</span>
    );
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2.5rem", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(250,250,248,0.95)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid #e8e8e4",
      transition: "all 0.3s ease",
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate("/home")}
        style={{
          fontSize: "17px", fontWeight: 800, letterSpacing: "3px",
          color: "#111", fontFamily: "'Georgia', serif", cursor: "pointer",
        }}
      >NITALUM.</div>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* {navLink("Home", "/home")} */}
        {navLink("About Us", "/about")}

        {/* Batches dropdown */}
        <div ref={dropRef} style={{ position: "relative" }}>
          <button
            onClick={() => setBatchOpen(!batchOpen)}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: isBatchActive ? "#111" : "#888",
              fontSize: "13px", letterSpacing: "0.5px",
              fontFamily: "'Courier New', monospace",
              display: "flex", alignItems: "center", gap: "4px",
              borderBottom: isBatchActive ? "1.5px solid #111" : "1.5px solid transparent",
              paddingBottom: "2px", transition: "color 0.2s", padding: "0 0 2px 0",
            }}
            onMouseEnter={(e) => { if (!isBatchActive) e.currentTarget.style.color = "#111"; }}
            onMouseLeave={(e) => { if (!isBatchActive) e.currentTarget.style.color = isBatchActive ? "#111" : "#888"; }}
          >
            Batches
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
              style={{ transform: batchOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          {batchOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 12px)", left: "50%",
              transform: "translateX(-50%)",
              background: "#fff", border: "1px solid #e8e8e4",
              borderRadius: "10px", padding: "6px 0", minWidth: "130px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)", zIndex: 200,
              maxHeight: '300px',
              overflowY: "auto",
              scrollbarWidth: "thin"
            }}>
              {BATCHES.map((b) => {
                const active = location.pathname === b.path;
                return (
                  <div
                    key={b.path}
                    onClick={() => navigate(b.path)}
                    style={{
                      padding: "9px 18px",
                      color: active ? "#111" : "#777",
                      fontSize: "13px", cursor: "pointer",
                      fontFamily: "'Courier New', monospace",
                      fontWeight: active ? 700 : 400,
                      background: active ? "#f5f5f2" : "transparent",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f5f2"; e.currentTarget.style.color = "#111"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = active ? "#f5f5f2" : "transparent"; e.currentTarget.style.color = active ? "#111" : "#777"; }}
                  >{b.label}</div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Profile CTA */}
        {userToken ? (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span onClick={() => navigate(`/profile/${username}`)} style={{ cursor: 'pointer' }}>
            Hi, {username}
          </span>
          <button onClick={handleLogout} 
          style={{
            background: "#111", color: "#fff", fontSize: "12px", fontWeight: 600,
            padding: "8px 18px", borderRadius: "50px", border: "none",
            letterSpacing: "0.5px", fontFamily: "'Courier New', monospace",
            cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>Logout</button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/login"
            style={{
              background: "transparent",
              color: "#111",
              fontSize: "12px",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: "50px",
              border: "1px solid #111",
              letterSpacing: "0.5px",
              fontFamily: "'Courier New', monospace",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
          <Link
            to="/add-profile"
            style={{
              background: "#111", color: "#fff", fontSize: "12px", fontWeight: 600,
              padding: "8px 18px", borderRadius: "50px", border: "none",
              letterSpacing: "0.5px", fontFamily: "'Courier New', monospace",
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
              textDecoration: "none",
            }}
          >
            Be a Member
          </Link>
        </div>
      )}

        {/* {Profile} */}
        {myUserName && (
  <button
    onClick={() => navigate(`/profile/${myUserName}`)}
    style={{
      background: "transparent",
      border: "1px solid #e8e8e4",
      color: "#555", fontSize: "12px",
      padding: "8px 16px", borderRadius: "50px",
      cursor: "pointer", fontFamily: "'Courier New', monospace",
      letterSpacing: "0.5px", transition: "all 0.2s",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; }}
  >My Profile</button>
)}

        {userToken && (
          <button
            onClick={onLogout}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: "#bbb", fontSize: "12px", fontFamily: "'Courier New', monospace",
              letterSpacing: "0.5px", transition: "color 0.2s", padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
