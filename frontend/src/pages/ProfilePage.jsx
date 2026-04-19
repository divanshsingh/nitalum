import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ROLES = [
  "SDE-1","SDE-2","SDE-3","Senior Software Engineer","Staff Engineer",
  "Principal Engineer","Engineering Manager","Product Manager",
  "Data Scientist","ML Engineer","DevOps Engineer","Cloud Engineer",
  "Full Stack Developer","Frontend Engineer","Backend Engineer",
  "QA Engineer","Data Analyst","Research Engineer","Consultant","Other",
];
const CITIES = [
  "Bangalore","Hyderabad","Pune","Mumbai","Delhi","Chennai","Kolkata",
  "Agartala","Noida","Gurugram","Austin","Seattle","San Francisco",
  "New York","London","Singapore","Toronto","Dubai","Other",
];
const BATCHES = [
  "2006–09", "2007–10", "2008–11", "2009–12", "2010–13",
  "2011–14", "2012–15", "2013–16", "2014–17", "2015–18",
  "2016–19", "2017–20", "2018–21", "2019–22", "2020–23",
  "2021–24", "2022–25", "2023–26", "2024–27", "2025–28",
  "2026–29", "2027–30", "2028–31"
];
// ─── avatar colors ────────────────────────────────────────────────────────────
const COLORS = ["#FF4D4D","#111","#FFD600","#4ECDC4","#A78BFA","#34D399"];
const avatarColor = (n) => COLORS[(n - 1) % COLORS.length];
const isLight = (c) => ["#FFD600","#4ECDC4","#34D399"].includes(c);

// ─── helpers ──────────────────────────────────────────────────────────────────
function initials(name) {
  return name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
}

// ─── sub-components ───────────────────────────────────────────────────────────
function Tag({ children, accent }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      border: `1px solid ${accent ? "#FF4D4D" : "#e8e8e4"}`,
      borderRadius: "50px",
      fontSize: "11px",
      fontFamily: "'Courier New', monospace",
      color: accent ? "#FF4D4D" : "#666",
      letterSpacing: "0.5px",
      background: accent ? "rgba(255,77,77,0.05)" : "#fff",
    }}>{children}</span>
  );
}

function InfoRow({ icon, value, href }) {
  if (!value) return null;
  const content = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: "32px", height: "32px", borderRadius: "8px",
        background: "#f5f5f2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{icon}</div>
      <span style={{ fontSize: "13px", color: href ? "#111" : "#555", fontFamily: "'Courier New', monospace", wordBreak: "break-all" }}>{value}</span>
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{content}</a>;
  return content;
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF4D4D", flexShrink: 0 }} />
      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#111", fontFamily: "'Courier New', monospace" }}>{children}</span>
      <div style={{ flex: 1, height: "1px", background: "#f0efeb" }} />
    </div>
  );
}

function DetailCard({ label, value, icon, accent = false }) {
  if (!value) return null;
  return (
    <div style={{
      padding: "14px 16px",
      borderRadius: "14px",
      border: accent ? "1px solid rgba(255,77,77,0.18)" : "1px solid #ecebe6",
      background: accent ? "linear-gradient(180deg, rgba(255,77,77,0.06), rgba(255,255,255,0.95))" : "#fafaf8",
      minHeight: "84px",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{
          width: "28px",
          height: "28px",
          borderRadius: "9px",
          background: accent ? "rgba(255,77,77,0.12)" : "#fff",
          border: accent ? "1px solid rgba(255,77,77,0.18)" : "1px solid #ecebe6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          color: accent ? "#FF4D4D" : "#8b8b86",
          fontFamily: "'Courier New', monospace",
        }}>
          {label}
        </span>
      </div>
      <div style={{
        fontSize: "15px",
        lineHeight: 1.45,
        color: "#111",
        fontWeight: 600,
        fontFamily: "'Courier New', monospace",
        wordBreak: "break-word",
      }}>
        {value}
      </div>
    </div>
  );
}

function EditInput({ label, value, onChange, type = "text", placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#111", fontFamily: "'Courier New', monospace" }}>{label}</label>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "10px 14px",
          border: `1px solid ${focused ? "#111" : "#e8e8e4"}`,
          borderRadius: "8px", fontSize: "13px",
          fontFamily: "'Courier New', monospace", color: "#111",
          background: "#fafaf8", outline: "none", transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function EditSelect({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#111", fontFamily: "'Courier New', monospace" }}>{label}</label>
      <select value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "10px 14px",
          border: `1px solid ${focused ? "#111" : "#e8e8e4"}`,
          borderRadius: "8px", fontSize: "13px",
          fontFamily: "'Courier New', monospace", color: "#111",
          background: "#fafaf8", outline: "none", appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
          paddingRight: "32px", transition: "border-color 0.2s", boxSizing: "border-box",
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Tech stack tag input ────────────────────────────────────────────────────
function TechStackEditor({ tags, onChange }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput("");
  };
  const remove = (t) => onChange(tags.filter((x) => x !== t));
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
        {tags.map((t) => (
          <span key={t} style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", border: "1px solid #e8e8e4", borderRadius: "50px",
            fontSize: "12px", fontFamily: "'Courier New', monospace", color: "#444", background: "#fff",
          }}>
            {t}
            <span onClick={() => remove(t)} style={{ cursor: "pointer", color: "#FF4D4D", fontWeight: 700, fontSize: "14px", lineHeight: 1 }}>×</span>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Type a skill and press Enter"
          style={{
            flex: 1, padding: "9px 14px", border: "1px solid #e8e8e4",
            borderRadius: "8px", fontSize: "13px", fontFamily: "'Courier New', monospace",
            color: "#111", background: "#fafaf8", outline: "none",
          }}
        />
        <button onClick={add} style={{
          background: "#111", color: "#fff", border: "none", borderRadius: "8px",
          padding: "9px 16px", fontSize: "12px", fontFamily: "'Courier New', monospace", cursor: "pointer",
        }}>Add</button>
      </div>
    </div>
  );
}

// ─── Main ProfilePage ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { username }  = useParams();
  const navigate    = useNavigate();

  const currentUsername = sessionStorage.getItem("username");
  const isOwner = String(username) === String(currentUsername);

  const [profile, setProfile] = useState(null);
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(null);
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(true);
  const resumeRef               = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8081/api/alumni/profile/${username}`);
        if (!response.ok) {
          setProfile(null);
          return;
        }

        const data = await response.json();
        setProfile({
          ...data,
          techStack: Array.isArray(data.techStack) ? data.techStack : [],
        });
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <Layout>
        <div style={{ paddingTop: "60px", minHeight: "100vh", background: "#fafaf8", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
          <div style={{ fontSize: "14px", color: "#888", fontFamily: "'Courier New', monospace" }}>
            Loading profile...
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div style={{ paddingTop: "60px", minHeight: "100vh", background: "#fafaf8", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
          <div style={{ fontSize: "48px" }}>404</div>
          <p style={{ fontFamily: "'Courier New', monospace", color: "#aaa" }}>Profile not found.</p>
          <button onClick={() => navigate("/home")} style={{ background: "#111", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "50px", fontFamily: "'Courier New', monospace", cursor: "pointer" }}>← Go Home</button>
        </div>
      </Layout>
    );
  }

  const color = avatarColor(profile.id || 1);
  const light  = isLight(color);

  const startEdit = () => { setDraft({ ...profile, techStack: [...profile.techStack] }); setEditing(true); setSaved(false); };
  const cancelEdit = () => { setEditing(false); setDraft(null); };
  const saveEdit  = async () => {
    try{
    // Switch from JSON to FormData 
    const formData = new FormData();
    
    // Loop through your draft and add everything to formData
    Object.keys(draft).forEach((key) => {
      if (key === 'techStack') {
        formData.append(key, JSON.stringify(draft[key]));
      } else {
        formData.append(key, draft[key]);
      }
    });
    const response = await fetch(`http://localhost:8081/api/alumni/profile/update/${username}`, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      const updatedData = await response.json();
      setProfile(updatedData); // Update UI with data from database
      setEditing(false);
      setDraft(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const error = await response.json();
      alert(error.msg || "Failed to update profile");
    }
  } catch(err){
    console.error("Update error:", err);
    alert("Connection error. Is the server running?");
  }
  };

  const setD = (key) => (e) => setDraft((d) => ({ ...d, [key]: e.target.value }));
  const p    = editing ? draft : profile;
  const stateOrCountry = p.state || p.country || "";
  const locationLine = [p.city, stateOrCountry].filter(Boolean).join(", ");

  return (
    <Layout>
      <div style={{ paddingTop: "40px", minHeight: "100vh", background: "#fafaf8" }}>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 2.5rem 5rem" }}>

          {/* Hero card: big photo + core info */}
          <div style={{
            display: "grid", gridTemplateColumns: "220px 1fr",
            gap: "0", marginBottom: "2rem",
            border: "1px solid #e8e8e4", borderRadius: "20px", overflow: "hidden",
            background: "#fff",
          }}>
            {/* Left — big photo */}
            <div style={{ background: color, minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {p.image
                ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                : <span style={{ fontSize: "56px", fontWeight: 900, color: light ? "#111" : "#fff", fontFamily: "'Georgia', serif", opacity: 0.9 }}>{initials(p.name)}</span>
              }
              {/* Upload photo button — edit mode only */}
              {editing && (
                <label style={{
                  position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "11px",
                  padding: "6px 14px", borderRadius: "50px", cursor: "pointer",
                  fontFamily: "'Courier New', monospace", whiteSpace: "nowrap",
                  backdropFilter: "blur(4px)",
                }}>
                  Change Photo
                  <input type="file" accept="image/*" style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setDraft((d) => ({ ...d, image: URL.createObjectURL(f) }));
                    }}
                  />
                </label>
              )}
            </div>

            {/* Right — core details */}
            <div style={{ padding: "2rem", background: "linear-gradient(180deg, #fff 0%, #fcfbf8 100%)" }}>
              {editing ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <EditInput label="Full Name" value={draft.name} onChange={setD("name")} placeholder="Your full name" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <EditSelect label="Batch" value={draft.batch} onChange={setD("batch")} options={BATCHES} />
                    <EditSelect label="Role" value={draft.role} onChange={setD("role")} options={ROLES} />
                  </div>
                  <EditInput label="Company" value={draft.company} onChange={setD("company")} placeholder="Current company" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <EditSelect label="City" value={draft.city} onChange={setD("city")} options={CITIES} />
                    <EditInput label="Country" value={draft.country} onChange={setD("country")} placeholder="Country" />
                  </div>
                  <EditInput label="Phone" value={draft.phone} onChange={setD("phone")} placeholder="+91 98765 43210" />
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "12px", color: "#8b8b86", letterSpacing: "1.7px", textTransform: "uppercase", fontFamily: "'Courier New', monospace," }}>
                      Alumni Profile
                    </div>
                    <div style={{ fontSize: "42px", fontWeight: 900, color: "#111", fontFamily: "'Georgia', serif", letterSpacing: "-1.4px", lineHeight: 0.95, textTransform: "capitalize" }}>
                      {p.name}
                    </div>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                    gap: "12px",
                  }}>
                    <DetailCard
                      label="Role"
                      value={p.role}
                      accent
                      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21V19a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                    />
                    <DetailCard
                      label="Company"
                      value={p.company}
                      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h.01"/><path d="M9 13h.01"/><path d="M9 17h.01"/><path d="M15 13h.01"/><path d="M15 17h.01"/></svg>}
                    />
                    <DetailCard
                      label="Location"
                      value={locationLine}
                      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                    />
                    <DetailCard
                      label="Batch"
                      value={p.batch}
                      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg>}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto", paddingTop: "4px" }}>
                    {/* <InfoRow
                      icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                      value={locationLine}
                    /> */}
                    <InfoRow
                      icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.56 3.29 2 2 0 0 1 3.53 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z"/></svg>}
                      value={p.phone}
                    />
                    <InfoRow
                      icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                      value={p.email}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Two column layout ───────────────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

            {/* LEFT column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Bio */}
              <div style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "16px", padding: "1.5rem" }}>
                <SectionTitle>Bio</SectionTitle>
                {editing
                  ? <textarea
                      value={draft.bio} onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                      placeholder="Tell your story — who you are, what you do, what drives you..."
                      rows={5}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #e8e8e4", borderRadius: "8px", fontSize: "13px", fontFamily: "'Courier New', monospace", color: "#555", background: "#fafaf8", outline: "none", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }}
                    />
                  : p.bio
                    ? <p style={{ fontSize: "14px", color: "#555", fontFamily: "'Courier New', monospace", lineHeight: 1.75, margin: 0 }}>{p.bio}</p>
                    : <p style={{ fontSize: "13px", color: "#ccc", fontFamily: "'Courier New', monospace", fontStyle: "italic", margin: 0 }}>No bio added yet.</p>
                }
              </div>

              {/* Tech Stack */}
              <div style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "16px", padding: "1.5rem" }}>
                <SectionTitle>Tech Stack & Skills</SectionTitle>
                {editing
                  ? <TechStackEditor tags={draft.techStack} onChange={(t) => setDraft((d) => ({ ...d, techStack: t }))} />
                  : p.techStack?.length
                    ? <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {p.techStack.map((t) => (
                          <span key={t} style={{
                            padding: "5px 14px", background: "#111", color: "#fff",
                            borderRadius: "50px", fontSize: "12px",
                            fontFamily: "'Courier New', monospace", letterSpacing: "0.5px",
                          }}>{t}</span>
                        ))}
                      </div>
                    : <p style={{ fontSize: "13px", color: "#ccc", fontFamily: "'Courier New', monospace", fontStyle: "italic", margin: 0 }}>No skills added yet.</p>
                }
              </div>
            </div>

            {/* RIGHT column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Links */}
              <div style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "16px", padding: "1.5rem" }}>
                <SectionTitle>Links</SectionTitle>
                {editing
                  ? <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <EditInput label="LinkedIn" value={draft.linkedin} onChange={setD("linkedin")} placeholder="https://linkedin.com/in/..." />
                      <EditInput label="GitHub" value={draft.github} onChange={setD("github")} placeholder="https://github.com/..." />
                      <EditInput label="Portfolio" value={draft.portfolio} onChange={setD("portfolio")} placeholder="https://yoursite.com" />
                      {/* <EditInput label="LinkedIn" value={draft.linkedin} onChange={setD("linkedin")} placeholder="https://linked.com/u/xyz" /> */}
                      <EditInput label="Leetcode" value={draft.leetcode} onChange={setD("leetcode")} placeholder="https://leetcode.com/u/xyz" />
                    </div>
                  : <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <InfoRow
                        href={p.linkedin}
                        value={p.linkedin ? "LinkedIn Profile" : null}
                        icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="#0077B5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
                      />
                      <InfoRow
                        href={p.github}
                        value={p.github ? "GitHub Profile" : null}
                        icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="#111"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>}
                      />
                      <InfoRow
                        href={p.portfolio}
                        value={p.portfolio ? "Portfolio / Website" : null}
                        icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                      />
                      <InfoRow
                        href={p.leetcode}
                        value={p.leetcode ? "Leetcode Profile" : null}
                        icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="#FFA116">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z"/>
    </svg>}
                      />
                      {!p.linkedin && !p.github && !p.portfolio && !p.leetcode && (
                        <p style={{ fontSize: "13px", color: "#ccc", fontFamily: "'Courier New', monospace", fontStyle: "italic", margin: 0 }}>No links added yet.</p>
                      )}
                    </div>
                }
              </div>

              {/* Resume */}
              <div style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "16px", padding: "1.5rem" }}>
                <SectionTitle>Resume</SectionTitle>
                {editing
                  ? <label style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "12px 16px", border: "1px dashed #e8e8e4",
                      borderRadius: "10px", cursor: "pointer", transition: "border-color 0.2s",
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#111")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e8e4")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span style={{ fontSize: "13px", color: "#888", fontFamily: "'Courier New', monospace" }}>
                        {draft.resumeUrl ? "Resume uploaded ✓" : "Upload Resume (PDF)"}
                      </span>
                      <input ref={resumeRef} type="file" accept=".pdf" style={{ display: "none" }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) setDraft((d) => ({ ...d, resumeUrl: URL.createObjectURL(f), resumeName: f.name }));
                        }}
                      />
                    </label>
                  : p.resumeUrl
                    ? <a href={p.resumeUrl} target="_blank" rel="noreferrer" style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "12px 16px", border: "1px solid #e8e8e4", borderRadius: "10px",
                        textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
                        color: "#111",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.background = "#fafaf8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e8e4"; e.currentTarget.style.background = "#fff"; }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span style={{ fontSize: "13px", fontFamily: "'Courier New', monospace" }}>Open Resume →</span>
                      </a>
                    : <p style={{ fontSize: "13px", color: "#ccc", fontFamily: "'Courier New', monospace", fontStyle: "italic", margin: 0 }}>No resume uploaded yet.</p>
                }
              </div>
            </div>
          </div>

          {/* Email note — edit mode */}
          {editing && (
            <div style={{ marginTop: "16px", padding: "12px 16px", background: "#fafaf8", border: "1px solid #f0efeb", borderRadius: "10px" }}>
              <p style={{ fontSize: "12px", color: "#aaa", fontFamily: "'Courier New', monospace", margin: 0 }}>
                🔒 Email address cannot be changed. Contact admin if needed.
              </p>
            </div>
          )}
        </div>
                {/* ── Page header bar ──────────────────────────────────────────────── */}
        <div style={{ borderBottom: "1px solid #e8e8e4", padding: "2rem 2.5rem 1.5rem", background: "#fafaf8" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "11px", color: "#FF4D4D", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: "0.3rem" }}>
                Make your real identity
              </p>
              <h2 style={{ fontSize: "clamp(24px, 5vw, 42px)", fontWeight: 900, color: "#111", fontFamily: "'Georgia', serif", margin: 0, letterSpacing: "-1px", lineHeight: 1 }}>
                 @{profile.username}
              </h2>
            </div>

            {isOwner && !editing && (
              <button onClick={startEdit} style={{
                display: "flex", alignItems: "center", gap: "7px",
                background: "#111", color: "#fff", border: "none",
                padding: "10px 20px", borderRadius: "50px",
                fontSize: "13px", fontFamily: "'Courier New', monospace",
                cursor: "pointer", transition: "background 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FF4D4D")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Profile
              </button>
            )}

            {editing && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={saveEdit} style={{
                  background: "#111", color: "#fff", border: "none",
                  padding: "10px 22px", borderRadius: "50px",
                  fontSize: "13px", fontFamily: "'Courier New', monospace", cursor: "pointer",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1a7a4a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
                >Save Changes ✓</button>
                <button onClick={cancelEdit} style={{
                  background: "transparent", border: "1px solid #e8e8e4", color: "#888",
                  padding: "10px 18px", borderRadius: "50px",
                  fontSize: "13px", fontFamily: "'Courier New', monospace", cursor: "pointer",
                }}>Cancel</button>
              </div>
            )}
          </div>
          {saved && (
            <div style={{ maxWidth: "900px", margin: "0.75rem auto 0", fontSize: "12px", color: "#1a7a4a", fontFamily: "'Courier New', monospace" }}>
              ✓ Profile saved successfully
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
