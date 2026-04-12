import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

// ─── mock data ────────────────────────────────────────────────────────────────
const INITIAL_ALUMNI = [
  { id: 1, name: "Arjun Sharma",    batch: "2015–19", role: "SDE-2",           company: "Google",    email: "arjun@example.com",  status: "approved", city: "Bangalore" },
  { id: 2, name: "Priya Nair",      batch: "2015–19", role: "Product Manager", company: "Amazon",    email: "priya@example.com",  status: "approved", city: "Hyderabad" },
  { id: 3, name: "Rahul Das",       batch: "2016–20", role: "Data Scientist",  company: "Microsoft", email: "rahul@example.com",  status: "pending",  city: "Pune"      },
  { id: 4, name: "Sneha Gupta",     batch: "2017–21", role: "ML Engineer",     company: "Infosys",   email: "sneha@example.com",  status: "pending",  city: "Chennai"   },
  { id: 5, name: "Vikram Roy",      batch: "2018–22", role: "DevOps Engineer", company: "TCS",       email: "vikram@example.com", status: "approved", city: "Mumbai"    },
];

const INITIAL_GALLERY = [
  { id: 1, label: "Farewell Night",  year: "2019", url: null, color: "#FF4D4D" },
  { id: 2, label: "Annual Fest",     year: "2020", url: null, color: "#4ECDC4" },
  { id: 3, label: "Convocation",     year: "2021", url: null, color: "#FFD600" },
];

const INITIAL_PASSWORDS = {
  member: "nitalum2024",
  admin:  "nitalumADMIN",
};

const AVATAR_COLORS = ["#FF4D4D", "#111", "#FFD600", "#4ECDC4", "#A78BFA", "#34D399"];
const avatarColor   = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length];
const isLight       = (c) => ["#FFD600", "#4ECDC4", "#34D399"].includes(c);
const initials      = (n) => n?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

// ─── shared UI primitives ─────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF4D4D", flexShrink: 0 }} />
      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#111", fontFamily: "'Courier New', monospace" }}>{children}</span>
      <div style={{ flex: 1, height: "1px", background: "#f0efeb" }} />
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e8e8e4", borderRadius: "14px",
      padding: "1.25rem 1.5rem", flex: 1,
    }}>
      <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontSize: "32px", fontWeight: 900, color: accent || "#111", fontFamily: "'Georgia', serif", lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    approved: { bg: "rgba(52,211,153,0.12)", color: "#059669", label: "Approved" },
    pending:  { bg: "rgba(255,193,7,0.12)",  color: "#b45309", label: "Pending"  },
    rejected: { bg: "rgba(255,77,77,0.12)",  color: "#dc2626", label: "Rejected" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "50px", background: s.bg, color: s.color, fontFamily: "'Courier New', monospace", fontWeight: 600, letterSpacing: "0.5px" }}>
      {s.label}
    </span>
  );
}

function IconBtn({ onClick, title, color = "#888", hoverColor = "#111", children }) {
  return (
    <button onClick={onClick} title={title} style={{
      background: "transparent", border: "none", cursor: "pointer",
      color, padding: "6px", borderRadius: "6px", display: "flex",
      alignItems: "center", justifyContent: "center", transition: "color 0.15s, background 0.15s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.background = "#f5f5f2"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = color; e.currentTarget.style.background = "transparent"; }}
    >{children}</button>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function AlumniSection({ alumni, setAlumni }) {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [confirm, setConfirm] = useState(null); // id to delete

  const filtered = alumni.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const approve = (id) => setAlumni((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved" } : a));
  const reject  = (id) => setAlumni((prev) => prev.map((a) => a.id === id ? { ...a, status: "rejected" } : a));
  const remove  = (id) => { setAlumni((prev) => prev.filter((a) => a.id !== id)); setConfirm(null); };

  return (
    <div>
      <SectionTitle>Alumni Profiles</SectionTitle>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <svg style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, company, email..."
            style={{ width: "100%", padding: "9px 12px 9px 30px", border: "1px solid #e8e8e4", borderRadius: "8px", fontSize: "13px", fontFamily: "'Courier New', monospace", outline: "none", background: "#fafaf8", boxSizing: "border-box" }}
            onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e8e8e4")}
          />
        </div>
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "9px 16px", borderRadius: "8px", border: "1px solid #e8e8e4",
            background: filter === f ? "#111" : "#fff", color: filter === f ? "#fff" : "#666",
            fontSize: "12px", fontFamily: "'Courier New', monospace", cursor: "pointer",
            transition: "all 0.15s", textTransform: "capitalize",
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "14px", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 100px", gap: "0", padding: "10px 16px", background: "#f9f9f7", borderBottom: "1px solid #e8e8e4" }}>
          {["Name", "Batch", "Company", "Status", "Actions"].map((h) => (
            <span key={h} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaa", fontFamily: "'Courier New', monospace" }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#ccc", fontFamily: "'Courier New', monospace", fontSize: "13px" }}>No alumni found.</div>
        ) : filtered.map((a, i) => {
          const color = avatarColor(i);
          const light = isLight(color);
          return (
            <div key={a.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 100px",
              padding: "12px 16px", borderBottom: "1px solid #f5f5f2",
              alignItems: "center", transition: "background 0.15s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Name + avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: light ? "#111" : "#fff", fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{initials(a.name)}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", fontFamily: "'Courier New', monospace" }}>{a.name}</div>
                  <div style={{ fontSize: "11px", color: "#aaa", fontFamily: "'Courier New', monospace" }}>{a.email}</div>
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "#666", fontFamily: "'Courier New', monospace" }}>{a.batch}</span>
              <div>
                <div style={{ fontSize: "12px", color: "#444", fontFamily: "'Courier New', monospace" }}>{a.company}</div>
                <div style={{ fontSize: "11px", color: "#aaa", fontFamily: "'Courier New', monospace" }}>{a.role}</div>
              </div>
              <Badge status={a.status} />
              {/* Actions */}
              <div style={{ display: "flex", gap: "2px" }}>
                {a.status === "pending" && (
                  <IconBtn onClick={() => approve(a.id)} title="Approve" color="#059669" hoverColor="#059669">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </IconBtn>
                )}
                {a.status === "pending" && (
                  <IconBtn onClick={() => reject(a.id)} title="Reject" color="#dc2626" hoverColor="#dc2626">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </IconBtn>
                )}
                {a.status !== "pending" && (
                  <IconBtn onClick={() => approve(a.id)} title="Re-approve" color="#aaa">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.27"/></svg>
                  </IconBtn>
                )}
                <IconBtn onClick={() => setConfirm(a.id)} title="Delete" color="#aaa" hoverColor="#dc2626">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                </IconBtn>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete confirm modal */}
      {confirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", maxWidth: "360px", width: "90%", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "0.75rem" }}>⚠️</div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111", fontFamily: "'Georgia', serif", margin: "0 0 0.5rem" }}>Delete Profile?</h3>
            <p style={{ fontSize: "13px", color: "#888", fontFamily: "'Courier New', monospace", marginBottom: "1.5rem", lineHeight: 1.6 }}>This action cannot be undone. The alumni profile will be permanently removed.</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => remove(confirm)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "50px", fontSize: "13px", fontFamily: "'Courier New', monospace", cursor: "pointer" }}>Yes, Delete</button>
              <button onClick={() => setConfirm(null)} style={{ background: "transparent", border: "1px solid #e8e8e4", color: "#888", padding: "10px 20px", borderRadius: "50px", fontSize: "13px", fontFamily: "'Courier New', monospace", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GallerySection({ gallery, setGallery }) {
  const [newLabel, setNewLabel] = useState("");
  const [newYear, setNewYear]   = useState("2024");
  const fileRefs = useRef({});

  const uploadPhoto = (id, file) => {
    const url = URL.createObjectURL(file);
    setGallery((prev) => prev.map((g) => g.id === id ? { ...g, url } : g));
  };

  const removePhoto = (id) => setGallery((prev) => prev.map((g) => g.id === id ? { ...g, url: null } : g));
  const deleteCard  = (id) => setGallery((prev) => prev.filter((g) => g.id !== id));

  const addSlot = () => {
    if (!newLabel.trim()) return;
    const COLORS = ["#FF4D4D","#4ECDC4","#FFD600","#A78BFA","#34D399","#111"];
    setGallery((prev) => [...prev, { id: Date.now(), label: newLabel.trim(), year: newYear, url: null, color: COLORS[prev.length % COLORS.length] }]);
    setNewLabel("");
  };

  return (
    <div>
      <SectionTitle>Gallery Management</SectionTitle>

      {/* Add new slot */}
      <div style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "14px", padding: "1.25rem", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "11px", color: "#aaa", fontFamily: "'Courier New', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>Add new gallery slot</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="e.g. Farewell Night"
            style={{ flex: 2, minWidth: "160px", padding: "9px 14px", border: "1px solid #e8e8e4", borderRadius: "8px", fontSize: "13px", fontFamily: "'Courier New', monospace", outline: "none", background: "#fafaf8" }}
            onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e8e8e4")}
            onKeyDown={(e) => e.key === "Enter" && addSlot()}
          />
          <input value={newYear} onChange={(e) => setNewYear(e.target.value)} placeholder="2024" maxLength={4}
            style={{ width: "80px", padding: "9px 14px", border: "1px solid #e8e8e4", borderRadius: "8px", fontSize: "13px", fontFamily: "'Courier New', monospace", outline: "none", background: "#fafaf8" }}
            onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e8e8e4")}
          />
          <button onClick={addSlot} style={{ background: "#111", color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontFamily: "'Courier New', monospace", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FF4D4D")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
          >+ Add Slot</button>
        </div>
      </div>

      {/* Gallery grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
        {gallery.map((g) => (
          <div key={g.id} style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "14px", overflow: "hidden", position: "relative" }}>
            {/* Photo area */}
            <div style={{ height: "140px", background: g.url ? "transparent" : `${g.color}18`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {g.url
                ? <img src={g.url} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : (
                  <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span style={{ fontSize: "11px", color: g.color, fontFamily: "'Courier New', monospace", letterSpacing: "1px" }}>Upload Photo</span>
                    <input ref={(el) => (fileRefs.current[g.id] = el)} type="file" accept="image/*" style={{ display: "none" }}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto(g.id, f); }}
                    />
                  </label>
                )
              }
              {/* Overlay actions on uploaded photo */}
              {g.url && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.45)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0)")}
                >
                  <label style={{ cursor: "pointer", background: "#fff", border: "none", padding: "6px 12px", borderRadius: "50px", fontSize: "11px", fontFamily: "'Courier New', monospace", display: "none" }}>
                    Change
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto(g.id, f); }} />
                  </label>
                  <button onClick={() => removePhoto(g.id)} style={{ background: "#FF4D4D", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "50px", fontSize: "11px", fontFamily: "'Courier New', monospace", cursor: "pointer", display: "none" }}>Remove</button>
                </div>
              )}
            </div>
            {/* Card footer */}
            <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", fontFamily: "'Courier New', monospace" }}>{g.label}</div>
                <div style={{ fontSize: "11px", color: "#aaa", fontFamily: "'Courier New', monospace" }}>{g.year}</div>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                {g.url && (
                  <label title="Change photo" style={{ cursor: "pointer", color: "#888", padding: "4px", borderRadius: "4px", display: "flex" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f5f2"; e.currentTarget.style.color = "#111"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#888"; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto(g.id, f); }} />
                  </label>
                )}
                <IconBtn onClick={() => deleteCard(g.id)} title="Delete slot" color="#aaa" hoverColor="#dc2626">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                </IconBtn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PasswordSection({ passwords, setPasswords }) {
  const [show, setShow]       = useState({ member: false, admin: false });
  const [editing, setEditing] = useState({ member: false, admin: false });
  const [drafts, setDrafts]   = useState({ ...passwords });
  const [saved, setSaved]     = useState({ member: false, admin: false });

  const save = (role) => {
    setPasswords((p) => ({ ...p, [role]: drafts[role] }));
    setEditing((e) => ({ ...e, [role]: false }));
    setSaved((s) => ({ ...s, [role]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [role]: false })), 2500);
  };

  const roles = [
    { key: "member", label: "Member Password", desc: "Shared with all alumni to access the platform" },
    { key: "admin",  label: "Admin Password",  desc: "Grants access to this admin dashboard" },
  ];

  return (
    <div>
      <SectionTitle>Manage Passwords</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {roles.map(({ key, label, desc }) => (
          <div key={key} style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: "14px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#111", fontFamily: "'Courier New', monospace" }}>{label}</div>
                <div style={{ fontSize: "12px", color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: "2px" }}>{desc}</div>
              </div>
              {saved[key] && <span style={{ fontSize: "12px", color: "#059669", fontFamily: "'Courier New', monospace" }}>✓ Saved</span>}
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  type={show[key] ? "text" : "password"}
                  value={editing[key] ? drafts[key] : passwords[key]}
                  onChange={(e) => setDrafts((d) => ({ ...d, [key]: e.target.value }))}
                  readOnly={!editing[key]}
                  style={{
                    width: "100%", padding: "10px 40px 10px 14px",
                    border: `1px solid ${editing[key] ? "#111" : "#e8e8e4"}`,
                    borderRadius: "8px", fontSize: "13px",
                    fontFamily: "'Courier New', monospace", color: "#111",
                    background: editing[key] ? "#fafaf8" : "#f9f9f7",
                    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
                    letterSpacing: show[key] ? "0.5px" : "3px",
                  }}
                />
                <button onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#aaa" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    {show[key] ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                  </svg>
                </button>
              </div>

              {editing[key] ? (
                <>
                  <button onClick={() => save(key)} style={{ background: "#111", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontSize: "12px", fontFamily: "'Courier New', monospace", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
                  >Save</button>
                  <button onClick={() => { setEditing((e) => ({ ...e, [key]: false })); setDrafts((d) => ({ ...d, [key]: passwords[key] })); }} style={{ background: "transparent", border: "1px solid #e8e8e4", color: "#888", padding: "10px 14px", borderRadius: "8px", fontSize: "12px", fontFamily: "'Courier New', monospace", cursor: "pointer" }}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditing((e) => ({ ...e, [key]: true }))} style={{ background: "transparent", border: "1px solid #e8e8e4", color: "#555", padding: "10px 18px", borderRadius: "8px", fontSize: "12px", fontFamily: "'Courier New', monospace", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#e8e8e4"; }}
                >Change</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const navigate  = useNavigate();
  const [tab, setTab]           = useState("alumni");
  const [alumni, setAlumni]     = useState(INITIAL_ALUMNI);
  const [gallery, setGallery]   = useState(INITIAL_GALLERY);
  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);

  const pending  = alumni.filter((a) => a.status === "pending").length;
  const approved = alumni.filter((a) => a.status === "approved").length;

  const TABS = [
    { key: "alumni",    label: "Alumni",    icon: "👥" },
    { key: "gallery",   label: "Gallery",   icon: "🖼️" },
    { key: "passwords", label: "Passwords", icon: "🔒" },
  ];

  return (
    <Layout>
      <div style={{ paddingTop: "60px", minHeight: "100vh", background: "#fafaf8" }}>

        {/* ── Page header ───────────────────────────────────────────────────── */}
        <div style={{ borderBottom: "1px solid #e8e8e4", padding: "2rem 2.5rem 0", background: "#fafaf8" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "11px", color: "#FF4D4D", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: "0.3rem" }}>— Admin Dashboard</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#111", fontFamily: "'Georgia', serif", margin: 0, letterSpacing: "-1px" }}>Control Panel</h1>
              {/* Stats */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <StatCard label="Total Alumni" value={alumni.length} />
                <StatCard label="Pending"      value={pending}  accent={pending > 0 ? "#b45309" : "#111"} />
                <StatCard label="Approved"     value={approved} accent="#059669" />
                <StatCard label="Photos"       value={gallery.filter((g) => g.url).length} />
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "0", borderBottom: "none" }}>
              {TABS.map((t) => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  padding: "10px 20px", border: "none", background: "transparent",
                  cursor: "pointer", fontSize: "13px", fontFamily: "'Courier New', monospace",
                  color: tab === t.key ? "#111" : "#aaa",
                  borderBottom: tab === t.key ? "2px solid #111" : "2px solid transparent",
                  transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px",
                  fontWeight: tab === t.key ? 700 : 400,
                }}>
                  <span style={{ fontSize: "14px" }}>{t.icon}</span> {t.label}
                  {t.key === "alumni" && pending > 0 && (
                    <span style={{ background: "#FF4D4D", color: "#fff", fontSize: "10px", padding: "1px 6px", borderRadius: "50px", fontWeight: 700 }}>{pending}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab content ───────────────────────────────────────────────────── */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>
          {tab === "alumni"    && <AlumniSection   alumni={alumni}       setAlumni={setAlumni} />}
          {tab === "gallery"   && <GallerySection  gallery={gallery}     setGallery={setGallery} />}
          {tab === "passwords" && <PasswordSection passwords={passwords} setPasswords={setPasswords} />}
        </div>
      </div>
    </Layout>
  );
}