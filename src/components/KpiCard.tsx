interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export default function KpiCard({
  label,
  value,
  sub,
  accent = "var(--green)",
  icon,
}: KpiCardProps) {
  return (
    <div
      className="card animate-in"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow behind accent */}
      <span style={{
        position: "absolute",
        top: 0, right: 0,
        width: "80px", height: "80px",
        borderRadius: "50%",
        background: accent,
        opacity: 0.06,
        filter: "blur(24px)",
        pointerEvents: "none",
      }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--text-3)",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}>
          {label}
        </span>
        {icon && (
          <span style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px", height: "32px",
            borderRadius: "var(--radius-sm)",
            background: `${accent}18`,
            color: accent,
          }}>
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <div>
        <div style={{
          fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
          fontWeight: 800,
          color: "var(--text-1)",
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
        }}>
          {value}
        </div>
        {sub && (
          <div style={{ marginTop: "6px", fontSize: "12px", color: "var(--text-3)" }}>
            {sub}
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        opacity: 0.5,
      }} />
    </div>
  );
}
