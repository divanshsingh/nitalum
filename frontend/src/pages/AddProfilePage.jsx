import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const BATCHES = [
  "2025–28",
  "2024–27",
  "2023–26",
  "2022–25",
  "2021–24",
  "2020–23",
  "2019–22",
  "2018–21",
  "2017–20",
  "2016–19",
  "2015–18",
  "2014–17",
  "2013–16",
  "2012–15",
  "2011–14",
  "2010–13",
  "2009–12",
  "2008–11",
  "2007–10",
  "2006–09"
];

const ROLES = [
  "SDE-1",
  "SDE-2",
  "SDE-3",
  "Senior Software Engineer",
  "Staff Engineer",
  "Principal Engineer",
  "Engineering Manager",
  "Product Manager",
  "Data Scientist",
  "ML Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "QA Engineer",
  "Data Analyst",
  "Research Engineer",
  "Consultant",
  "Other",
];

const CITIES = [
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Kolkata",
  "Agartala",
  "Noida",
  "Gurugram",
  "Ahmedabad",
  "Austin",
  "Seattle",
  "San Francisco",
  "New York",
  "London",
  "Singapore",
  "Toronto",
  "Dubai",
  "Other",
];

// ─── tiny reusable field wrapper ─────────────────────────────────────────────
function Field({ label, required, hint, children, error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#111",
          fontFamily: "'Courier New', monospace",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#FF4D4D", fontSize: "14px", lineHeight: 1 }}>
            *
          </span>
        )}
      </label>
      {hint && (
        <p
          style={{
            fontSize: "11px",
            color: "#aaa",
            fontFamily: "'Courier New', monospace",
            margin: 0,
          }}
        >
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          style={{
            fontSize: "11px",
            color: "#FF4D4D",
            fontFamily: "'Courier New', monospace",
            margin: 0,
          }}
        >
          ↑ {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (focused, error) => ({
  width: "100%",
  padding: "12px 16px",
  border: `1px solid ${error ? "#FF4D4D" : focused ? "#111" : "#e8e8e4"}`,
  borderRadius: "10px",
  fontSize: "14px",
  fontFamily: "'Courier New', monospace",
  color: "#111",
  background: "#fafaf8",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
});

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputStyle(focused, error)}
      {...rest}
    />
  );
}

function Select({ value, onChange, children, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle(focused, error),
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: "36px",
      }}
    >
      {children}
    </select>
  );
}

// ─── Avatar upload ─────────────────────────────────────────────────────────
function AvatarUpload({ name, image, onChange }) {
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {/* Preview */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: image ? "transparent" : "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          border: "2px solid #e8e8e4",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#fff",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {initials}
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label
          style={{
            display: "inline-block",
            padding: "9px 18px",
            borderRadius: "50px",
            border: "1px solid #e8e8e4",
            background: "#fff",
            fontSize: "12px",
            fontFamily: "'Courier New', monospace",
            color: "#555",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#111";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#111";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#555";
            e.currentTarget.style.borderColor = "#e8e8e4";
          }}
        >
          Upload Photo
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange(URL.createObjectURL(file));
            }}
          />
        </label>
        <p
          style={{
            fontSize: "11px",
            color: "#bbb",
            fontFamily: "'Courier New', monospace",
            margin: 0,
          }}
        >
          Optional · JPG, PNG · Max 2MB
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AddProfilePage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    batch: "",
    company: "",
    role: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedin: "",
    image: null,
    username: "",
  });

  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.username.trim())       e.username = "Username is required";
    else if (form.username.length < 3) e.username = "Minimum 3 characters";
    else if (!/^[a-z0-9_]+$/.test(form.username)) e.username = "Only letters, numbers, underscore";
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.batch) e.batch = "Please select your batch";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.role) e.role = "Please select your role";
    if (!form.city) e.city = "Please select your city";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (form.linkedin && !/^https?:\/\/.+/.test(form.linkedin))
      e.linkedin = "Must start with https://";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // TODO: POST to backend API
      console.log("Submitting:", form);
      setSubmitted(true);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <Layout>
        <div
          style={{
            paddingTop: "60px",
            minHeight: "100vh",
            background: "#fafaf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1.5rem",
            textAlign: "center",
            padding: "5rem 2rem",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "#111",
              fontFamily: "'Georgia', serif",
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            Profile Submitted!
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#888",
              fontFamily: "'Courier New', monospace",
              maxWidth: "380px",
              lineHeight: 1.7,
            }}
          >
            Welcome to NITALUM, <strong>{form.name.split(" ")[0]}</strong>! Your
            profile is under review and will be live shortly.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "0.5rem" }}>
            <button
              onClick={() => navigate("/home")}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                borderRadius: "50px",
                fontSize: "13px",
                fontFamily: "'Courier New', monospace",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#FF4D4D")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
            >
              Go to Home →
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  batch: "",
                  company: "",
                  role: "",
                  city: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  linkedin: "",
                  image: null,
                });
              }}
              style={{
                background: "transparent",
                color: "#888",
                border: "1px solid #e8e8e4",
                padding: "12px 28px",
                borderRadius: "50px",
                fontSize: "13px",
                fontFamily: "'Courier New', monospace",
                cursor: "pointer",
              }}
            >
              Go to Profile
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          paddingTop: "60px",
          minHeight: "100vh",
          background: "#fafaf8",
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: "1px solid #e8e8e4",
            padding: "3rem 2.5rem 2rem",
            background: "#fafaf8",
          }}
        >
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "11px",
                color: "#FF4D4D",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
                marginBottom: "0.4rem",
              }}
            >
              — Join the Network
            </p>
            <h1
              style={{
                fontSize: "clamp(32px, 6vw, 56px)",
                fontWeight: 900,
                color: "#111",
                fontFamily: "'Georgia', serif",
                margin: 0,
                letterSpacing: "-1.5px",
                lineHeight: 1.05,
              }}
            >
              Add Your
              <br />
              Profile.
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#888",
                fontFamily: "'Courier New', monospace",
                marginTop: "0.75rem",
                lineHeight: 1.7,
              }}
            >
              Fill in your details and join hundreds of NITA alumni already on
              the platform.
            </p>
          </div>
        </div>

        {/* Form */}
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "3rem 2.5rem 5rem",
          }}
        >
          {/* ── Avatar ── */}
          <div
            style={{
              marginBottom: "2.5rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid #f0efeb",
            }}
          >
            <Field
              label="Profile Photo"
              hint="Optional — we'll use your initials if you skip this"
            >
              <AvatarUpload
                name={form.name}
                image={form.image}
                onChange={(url) => setForm((f) => ({ ...f, image: url }))}
              />
            </Field>
          </div>

          {/* ── Personal ── */}
          <SectionTitle>Personal Info</SectionTitle>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <Field label="Full Name" required error={errors.name}>
              <Input
                placeholder="e.g. Arjun Sharma"
                value={form.name}
                onChange={set("name")}
                error={errors.name}
              />
            </Field>

            <Field 
              label="Username"
              required
              hint="Your profile URL: nitalum.com/profile/username · Only letters, numbers, underscore"
              error={errors.username}              
              >
              <Input
                placeholder="e.g. divansh_xml"
                value={form.username}
                  onChange={(e) => {
                    const val = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9_]/g, "");
                    setForm((f) => ({ ...f, username: val }));
                    setMessage(null);
                  }}                
                error={errors.name}
              />
            </Field>            

            <Field label="Batch" required error={errors.batch}>
              <Select
                value={form.batch}
                onChange={set("batch")}
                error={errors.batch}
              >
                <option value="">Select your batch</option>
                {BATCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          {/* ── Professional ──
          <SectionTitle>Professional Info</SectionTitle>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <Field label="Current Company" required error={errors.company}>
              <Input
                placeholder="e.g. Amazon, Google, TCS"
                value={form.company}
                onChange={set("company")}
                error={errors.company}
              />
            </Field>

            <Field label="Current Role" required error={errors.role}>
              <Select
                value={form.role}
                onChange={set("role")}
                error={errors.role}
              >
                <option value="">Select your role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Current City" required error={errors.city}>
              <Select
                value={form.city}
                onChange={set("city")}
                error={errors.city}
              >
                <option value="">Select your city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="LinkedIn URL"
              hint="We'll show this on your profile card"
            >
              <Input
                placeholder="https://linkedin.com/in/yourname"
                value={form.linkedin}
                onChange={set("linkedin")}
                error={errors.linkedin}
              />
            </Field>
          </div> */}

          {/* ── Account ── */}
          <SectionTitle>Account Setup</SectionTitle>
          <p
            style={{
              fontSize: "12px",
              color: "#aaa",
              fontFamily: "'Courier New', monospace",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            Your email is your login ID. Set a password so you can edit your
            profile later.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <Field label="Email" required error={errors.email}>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
              />
            </Field>

            <Field
              label="Password"
              required
              error={errors.password}
              hint="Minimum 6 characters"
            >
              <div style={{ position: "relative" }}>
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={set("password")}
                  error={errors.password}
                />
                <button
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                  }}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </Field>

            <Field
              label="Confirm Password"
              required
              error={errors.confirmPassword}
            >
              <div style={{ position: "relative" }}>
                <Input
                  type={showCpw ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  error={errors.confirmPassword}
                />
                <button
                  onClick={() => setShowCpw(!showCpw)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                  }}
                >
                  <EyeIcon open={showCpw} />
                </button>
              </div>
            </Field>
          </div>

          {/* ── Submit ── */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              onClick={handleSubmit}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "14px 36px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "'Courier New', monospace",
                cursor: "pointer",
                letterSpacing: "0.5px",
                transition: "all 0.2s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FF4D4D";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#111";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Submit Profile →
            </button>

            <button
              onClick={() => navigate(-1)}
              style={{
                background: "transparent",
                border: "none",
                color: "#aaa",
                fontSize: "13px",
                fontFamily: "'Courier New', monospace",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
            >
              ← Cancel
            </button>
          </div>

          {Object.keys(errors).length > 0 && (
            <p
              style={{
                fontSize: "12px",
                color: "#FF4D4D",
                fontFamily: "'Courier New', monospace",
                marginTop: "1rem",
              }}
            >
              Please fix the errors above before submitting.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

function SectionTitle({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#FF4D4D",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#111",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: "#f0efeb" }} />
    </div>
  );
}

function EyeIcon({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#aaa"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? (
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
  );
}
