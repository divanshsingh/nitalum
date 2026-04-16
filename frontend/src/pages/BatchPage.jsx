import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

// ─── Constants ────────────────────────────────────────────────────────────────
const BATCH_LABELS = {
  "2025": "Batch 2025–28",
  "2024": "Batch 2024–27",
  "2023": "Batch 2023–26",
  "2022": "Batch 2022–25",
  "2021": "Batch 2021–24",
  "2020": "Batch 2020–23",
  "2019": "Batch 2019–22",
  "2018": "Batch 2018–21",
  "2017": "Batch 2017–20",
  "2016": "Batch 2016–19",
  "2015": "Batch 2015–18",
};

const AVATAR_COLORS = ["#FF4D4D", "#111", "#FFD600", "#4ECDC4", "#A78BFA", "#34D399"];

// ─── Components ───────────────────────────────────────────────────────────────

function AlumniCard({ alumni, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const getInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
  };

  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const isLight = ["#FFD600", "#4ECDC4", "#34D399"].includes(color);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/profile/${alumni.username}`)}
      style={{
        background: "#fff",
        border: "1px solid #e8e8e4",
        borderRadius: "16px",
        padding: "1.5rem",
        display: "flex", flexDirection: "column", gap: "12px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
        borderColor: hovered ? "#ccc" : "#e8e8e4",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: color, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: 800,
          color: isLight ? "#111" : "#fff",
          fontFamily: "'Courier New', monospace",
        }}>{getInitials(alumni.name)}</div>
        <div>
          <div style={{ fontSize: "17px", fontWeight: 800, color: "#111", fontFamily: "'Georgia', serif", lineHeight: 1.2 }}>{alumni.name}</div>
          <div style={{ fontSize: "12px", color: "#888", fontFamily: "'Courier New', monospace", marginTop: "2px" }}>{alumni.role || "Alumnus"}</div>
        </div>
      </div>

      <div style={{ height: "1px", background: "#f0efeb" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#444", fontFamily: "'Courier New', monospace", fontWeight: 600 }}>{alumni.company || "NITA"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#888", fontFamily: "'Courier New', monospace" }}>{alumni.city || "India"}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
        <a
          href={alumni.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ color: "#888", textDecoration: "none", fontSize: "12px", fontFamily: "'Courier New', monospace" }}
        >
          LinkedIn
        </a>
        <button style={{
          background: hovered ? "#111" : "transparent",
          border: "1px solid #e8e8e4",
          color: hovered ? "#fff" : "#555",
          fontSize: "11px", fontWeight: 600,
          padding: "6px 14px", borderRadius: "50px",
          fontFamily: "'Courier New', monospace",
        }}>View Profile →</button>
      </div>
    </div>
  );
}

export default function BatchPage() {
  const { year } = useParams();
  const [alumniFromDB, setAlumniFromDB] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  useEffect(() => {
    const fetchBatchAlumni = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/api/alumni/batch/${year}`);
        const data = await response.json();
        setAlumniFromDB(data);
      } catch (err) {
        console.error("Failed to fetch batch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBatchAlumni();
  }, [year]);

  const cities = useMemo(() => ["All", ...new Set(alumniFromDB.map((a) => a.city))].filter(Boolean), [alumniFromDB]);
  const companies = useMemo(() => ["All", ...new Set(alumniFromDB.map((a) => a.company))].filter(Boolean), [alumniFromDB]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return alumniFromDB.filter((a) => {
      const matchSearch = !q || 
        a.name.toLowerCase().includes(q) || 
        (a.company && a.company.toLowerCase().includes(q)) ||
        (a.role && a.role.toLowerCase().includes(q));
      const matchCity = cityFilter === "All" || a.city === cityFilter;
      const matchCompany = companyFilter === "All" || a.company === companyFilter;
      return matchSearch && matchCity && matchCompany;
    });
  }, [search, cityFilter, companyFilter, alumniFromDB]);

  const label = BATCH_LABELS[year] || `Batch ${year}`;

  if (loading) return <Layout><div style={{ padding: "100px", textAlign: "center", fontFamily: "'Courier New', monospace" }}>Loading Alumni...</div></Layout>;

  return (
    <Layout>
      <div style={{ paddingTop: "60px", minHeight: "100vh", background: "#fafaf8" }}>
        <div style={{ borderBottom: "1px solid #e8e8e4", padding: "3rem 2.5rem 2rem", background: "#fafaf8" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "11px", color: "#FF4D4D", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>— Alumni Directory</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <h1 style={{ fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 900, color: "#111", fontFamily: "'Georgia', serif" }}>{label}</h1>
              <div style={{ fontSize: "13px", color: "#aaa", fontFamily: "'Courier New', monospace" }}>{filtered.length} alumni found</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "1.5rem 2.5rem", borderBottom: "1px solid #e8e8e4", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: "1", minWidth: "220px" }}>
              <input
                type="text"
                placeholder="Search by name, company, role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1px solid #e8e8e4", borderRadius: "50px", fontSize: "13px", fontFamily: "'Courier New', monospace", outline: "none", background: "#fafaf8" }}
              />
            </div>
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} style={{ padding: "10px 16px", border: "1px solid #e8e8e4", borderRadius: "50px", fontSize: "13px", fontFamily: "'Courier New', monospace", color: "#555" }}>
              {cities.map((c) => <option key={c} value={c}>{c === "All" ? "📍 All Cities" : `📍 ${c}`}</option>)}
            </select>
            <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} style={{ padding: "10px 16px", border: "1px solid #e8e8e4", borderRadius: "50px", fontSize: "13px", fontFamily: "'Courier New', monospace", color: "#555" }}>
              {companies.map((c) => <option key={c} value={c}>{c === "All" ? "🏢 All Companies" : `🏢 ${c}`}</option>)}
            </select>
            {(search || cityFilter !== "All" || companyFilter !== "All") && (
              <button onClick={() => { setSearch(""); setCityFilter("All"); setCompanyFilter("All"); }} style={{ background: "transparent", border: "1px solid #e8e8e4", borderRadius: "50px", padding: "10px 16px", fontSize: "12px", fontFamily: "'Courier New', monospace", color: "#888", cursor: "pointer" }}>✕ Clear</button>
            )}
          </div>
        </div>

        <div style={{ padding: "2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <p style={{ fontSize: "16px", color: "#aaa", fontFamily: "'Courier New', monospace" }}>No alumni found matching your search.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {filtered.map((alumni, i) => (
                <AlumniCard key={alumni._id} alumni={alumni} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}