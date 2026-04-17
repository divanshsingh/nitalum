import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // Renamed from email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const cardStyle = {
    width: "100%",
    maxWidth: "440px",
    margin: "0 auto",
    padding: "36px 32px",
    background: "#fffdf8",
    border: "1px solid #e8e8e4",
    borderRadius: "20px",
    boxShadow: "0 24px 60px rgba(17, 17, 17, 0.06)",
    boxSizing: "border-box",
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 16px",
    border: `1px solid ${focusedField === field ? "#111" : "#e8e8e4"}`,
    borderRadius: "12px",
    fontSize: "14px",
    fontFamily: "'Courier New', monospace",
    color: "#111",
    background: focusedField === field ? "#fff" : "#fafaf8",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(17, 17, 17, 0.05)" : "none",
  });

  const submitBtnStyle = {
    width: "100%",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "13px 20px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
    boxShadow: "0 14px 30px rgba(17, 17, 17, 0.14)",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8081/api/alumni/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          identifier, // This is sent to the backend
          password 
        }),
      });
      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("userToken", data.token);
        sessionStorage.setItem("username", data.username);
        navigate(`/profile/${data.username}`);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Server connection failed");
    }
  };

  return (
    <Layout>
      <div
        style={{
          padding: "120px 20px",
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        <div style={cardStyle}>
          <p
            style={{
              margin: "0 0 10px",
              fontFamily: "'Courier New', monospace",
              fontSize: "11px",
              color: "#FF4D4D",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Alumni Access
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", margin: "0 0 10px", color: "#111" }}>Login</h2>
          <p style={{ fontFamily: "'Courier New', monospace", fontSize: "13px", color: "#888", margin: "0 0 25px", lineHeight: 1.6 }}>
            Enter your username or registered email.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onFocus={() => setFocusedField("identifier")}
              onBlur={() => setFocusedField("")}
              style={inputStyle("identifier")}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              style={inputStyle("password")}
            />

            {error && <p style={{ color: "#FF4D4D", fontSize: "12px", fontFamily: "'Courier New', monospace", margin: 0 }}>↑ {error}</p>}

            <button
              type="submit"
              style={submitBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FF4D4D";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 18px 34px rgba(255, 77, 77, 0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#111";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(17, 17, 17, 0.14)";
              }}
            >
              Login →
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
