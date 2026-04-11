export default function Marquee() {
  const TEXT = "NITALUM · NITA ALUMNI · REWIND · RECONNECT · REFER · ";
  const repeated = TEXT.repeat(6);

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1.5px solid #111",
      borderBottom: "1.5px solid #111",
      padding: "18px 0",
      background: "#111",
      userSelect: "none",
    }}>
      <div style={{
        display: "inline-flex", whiteSpace: "nowrap",
        animation: "marquee 28s linear infinite",
      }}>
        <span style={{
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 900,
          letterSpacing: "6px",
          color: "#fafaf8",
          fontFamily: "'Georgia', serif",
          paddingRight: "2rem",
          textTransform: "uppercase",
        }}>{repeated}</span>
        <span style={{
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 900,
          letterSpacing: "6px",
          color: "#fafaf8",
          fontFamily: "'Georgia', serif",
          paddingRight: "2rem",
          textTransform: "uppercase",
        }}>{repeated}</span>
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}