import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

// ─── dummy alumni data — replace with API later ───────────────────────────────
const ALL_ALUMNI = [
  { id: 1,  batch: "2015", name: "Arjun Sharma",    role: "SDE-2",             company: "Google",     city: "Bangalore",  country: "India",   linkedin: "#", avatar: "AS" },
  { id: 2,  batch: "2015", name: "Priya Nair",       role: "Product Manager",   company: "Amazon",     city: "Hyderabad",  country: "India",   linkedin: "#", avatar: "PN" },
  { id: 3,  batch: "2015", name: "Rahul Das",         role: "Data Scientist",    company: "Microsoft",  city: "Pune",       country: "India",   linkedin: "#", avatar: "RD" },
  { id: 4,  batch: "2015", name: "Sneha Gupta",       role: "ML Engineer",       company: "Infosys",    city: "Chennai",    country: "India",   linkedin: "#", avatar: "SG" },
  { id: 5,  batch: "2015", name: "Vikram Roy",        role: "DevOps Engineer",   company: "TCS",        city: "Mumbai",     country: "India",   linkedin: "#", avatar: "VR" },
  { id: 6,  batch: "2015", name: "Ananya Singh",      role: "Frontend Engineer", company: "Wipro",      city: "Delhi",      country: "India",   linkedin: "#", avatar: "AS" },
  { id: 7,  batch: "2016", name: "Karan Mehta",       role: "SDE-1",             company: "Accenture",  city: "Kolkata",    country: "India",   linkedin: "#", avatar: "KM" },
  { id: 8,  batch: "2016", name: "Deepa Krishnan",    role: "QA Engineer",       company: "Samsung",    city: "Bangalore",  country: "India",   linkedin: "#", avatar: "DK" },
  { id: 9,  batch: "2017", name: "Aditya Bose",       role: "Backend Engineer",  company: "IBM",        city: "Austin",     country: "USA",     linkedin: "#", avatar: "AB" },
  { id: 10, batch: "2017", name: "Pooja Verma",       role: "Cloud Engineer",    company: "Deloitte",   city: "London",     country: "UK",      linkedin: "#", avatar: "PV" },
  { id: 11, batch: "2018", name: "Rohit Chakraborty", role: "SDE-3",             company: "Cognizant",  city: "Toronto",    country: "Canada",  linkedin: "#", avatar: "RC" },
  { id: 12, batch: "2018", name: "Meera Pillai",      role: "Full Stack Dev",    company: "Capgemini",  city: "Paris",      country: "France",  linkedin: "#", avatar: "MP" },
  { id: 13, batch: "2019", name: "Suresh Rao",        role: "Android Dev",       company: "Google",     city: "Singapore",  country: "Singapore", linkedin: "#", avatar: "SR" },
  { id: 14, batch: "2019", name: "Nisha Joshi",       role: "iOS Developer",     company: "Amazon",     city: "Seattle",    country: "USA",     linkedin: "#", avatar: "NJ" },
  { id: 15, batch: "2020", name: "Tanmay Dey",        role: "SDE-1",             company: "Microsoft",  city: "Hyderabad",  country: "India",   linkedin: "#", avatar: "TD" },
  { id: 16, batch: "2020", name: "Riya Chatterjee",   role: "Data Analyst",      company: "TCS",        city: "Bangalore",  country: "India",   linkedin: "#", avatar: "RC" },
];

const BATCH_LABELS = {
  "2015": "Batch 2015–19",
  "2016": "Batch 2016–20",
  "2017": "Batch 2017–21",
  "2018": "Batch 2018–22",
  "2019": "Batch 2019–23",
  "2020": "Batch 2020–24",
};

// avatar colors cycling
const AVATAR_COLORS = ["#FF4D4D", "#111", "#FFD600", "#4ECDC4", "#A78BFA", "#34D399"];

function AlumniCard({ alumni, index }) {
  const [hovered, setHovered] = useState(false);
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const isLight = color === "#FFD600" || color === "#4ECDC4" || color === "#34D399";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #e8e8e4",
        borderRadius: "16px",
        padding: "1.5rem",
        display: "flex", flexDirection: "column", gap: "12px",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
        borderColor: hovered ? "#ccc" : "#e8e8e4",
        cursor: "default",
      }}
    >
      {/* Top row: avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: color, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: 800,
          color: isLight ? "#111" : "#fff",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "1px",
        }}>{alumni.avatar}</div>
        <div>
          <div style={{ fontSize: "17px", fontWeight: 800, color: "#111", fontFamily: "'Georgia', serif", lineHeight: 1.2 }}>{alumni.name}</div>
          <div style={{ fontSize: "12px", color: "#888", fontFamily: "'Courier New', monospace", marginTop: "2px", letterSpacing: "0.3px" }}>{alumni.role}</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#f0efeb" }} />

      {/* Company + Location */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "24px", height: "24px", borderRadius: "6px",
            background: "#f5f5f2", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <span style={{ fontSize: "13px", color: "#444", fontFamily: "'Courier New', monospace", fontWeight: 600 }}>{alumni.company}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "24px", height: "24px", borderRadius: "6px",
            background: "#f5f5f2", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span style={{ fontSize: "12px", color: "#888", fontFamily: "'Courier New', monospace" }}>{alumni.city}, {alumni.country}</span>
        </div>
      </div>

      {/* Bottom: LinkedIn + Connect */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
        <a
          href={alumni.linkedin}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            color: "#888", textDecoration: "none", fontSize: "12px",
            fontFamily: "'Courier New', monospace", transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0077B5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          LinkedIn
        </a>

        <button style={{
          background: hovered ? "#111" : "transparent",
          border: "1px solid #e8e8e4",
          color: hovered ? "#fff" : "#555",
          fontSize: "11px", fontWeight: 600,
          padding: "6px 14px", borderRadius: "50px",
          cursor: "pointer", fontFamily: "'Courier New', monospace",
          letterSpacing: "0.5px", transition: "all 0.2s",
        }}>Connect →</button>
      </div>
    </div>
  );
}

export default function BatchPage() {
  const { year } = useParams();
  const [search, setSearch]     = useState("");
  const [cityFilter, setCityFilter]   = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  const batchAlumni = ALL_ALUMNI.filter((a) => a.batch === year);

  const cities    = ["All", ...new Set(batchAlumni.map((a) => a.city))];
  const companies = ["All", ...new Set(batchAlumni.map((a) => a.company))];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return batchAlumni.filter((a) => {
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q);
      const matchCity    = cityFilter === "All"    || a.city    === cityFilter;
      const matchCompany = companyFilter === "All" || a.company === companyFilter;
      return matchSearch && matchCity && matchCompany;
    });
  }, [search, cityFilter, companyFilter, year]);

  const label = BATCH_LABELS[year] || `Batch ${year}`;

  return (
    <Layout>
      <div style={{ paddingTop: "60px", minHeight: "100vh", background: "#fafaf8" }}>

        {/* Page header */}
        <div style={{
          borderBottom: "1px solid #e8e8e4",
          padding: "3rem 2.5rem 2rem",
          background: "#fafaf8",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "11px", color: "#FF4D4D", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: "0.4rem" }}>— Alumni Directory</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <h1 style={{ fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 900, color: "#111", fontFamily: "'Georgia', serif", margin: 0, letterSpacing: "-1.5px", lineHeight: 1 }}>
                {label}
              </h1>
              <div style={{ fontSize: "13px", color: "#aaa", fontFamily: "'Courier New', monospace" }}>
                {filtered.length} alumni found
              </div>
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div style={{ padding: "1.5rem 2.5rem", borderBottom: "1px solid #e8e8e4", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>

            {/* Search */}
            <div style={{ position: "relative", flex: "1", minWidth: "220px" }}>
              <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, company, city, role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px 10px 36px",
                  border: "1px solid #e8e8e4", borderRadius: "50px",
                  fontSize: "13px", fontFamily: "'Courier New', monospace",
                  color: "#111", background: "#fafaf8", outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#e8e8e4")}
              />
            </div>

            {/* City filter */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              style={{
                padding: "10px 16px", border: "1px solid #e8e8e4",
                borderRadius: "50px", fontSize: "13px",
                fontFamily: "'Courier New', monospace", color: "#555",
                background: "#fafaf8", outline: "none", cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#111")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e8e4")}
            >
              {cities.map((c) => <option key={c} value={c}>{c === "All" ? "📍 All Cities" : `📍 ${c}`}</option>)}
            </select>

            {/* Company filter */}
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              style={{
                padding: "10px 16px", border: "1px solid #e8e8e4",
                borderRadius: "50px", fontSize: "13px",
                fontFamily: "'Courier New', monospace", color: "#555",
                background: "#fafaf8", outline: "none", cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#111")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e8e4")}
            >
              {companies.map((c) => <option key={c} value={c}>{c === "All" ? "🏢 All Companies" : `🏢 ${c}`}</option>)}
            </select>

            {/* Clear filters */}
            {(search || cityFilter !== "All" || companyFilter !== "All") && (
              <button
                onClick={() => { setSearch(""); setCityFilter("All"); setCompanyFilter("All"); }}
                style={{
                  background: "transparent", border: "1px solid #e8e8e4",
                  borderRadius: "50px", padding: "10px 16px",
                  fontSize: "12px", fontFamily: "'Courier New', monospace",
                  color: "#888", cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF4D4D"; e.currentTarget.style.color = "#FF4D4D"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e8e4"; e.currentTarget.style.color = "#888"; }}
              >✕ Clear</button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: "2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "1rem" }}>🔍</div>
              <p style={{ fontSize: "16px", color: "#aaa", fontFamily: "'Courier New', monospace" }}>No alumni found matching your search.</p>
              <button
                onClick={() => { setSearch(""); setCityFilter("All"); setCompanyFilter("All"); }}
                style={{ marginTop: "1rem", background: "#111", color: "#fff", border: "none", borderRadius: "50px", padding: "10px 24px", fontSize: "13px", fontFamily: "'Courier New', monospace", cursor: "pointer" }}
              >Clear filters</button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}>
              {filtered.map((alumni, i) => (
                <AlumniCard key={alumni.id} alumni={alumni} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Footer spacing */}
        <div style={{ height: "4rem" }} />
      </div>
    </Layout>
  );
}