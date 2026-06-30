"use client";

import { InvestmentTracker } from "@/lib/store";
import { calcTrackerRows, formatNumber, SCENARIO_COLORS } from "@/lib/calculations";

interface Props { tracker: InvestmentTracker }

export default function TrackerTable({ tracker }: Props) {
  const rows = calcTrackerRows(tracker);

  if (rows.length === 0) {
    return (
      <div style={{ color: "var(--text-3)", fontSize: "13px", padding: "16px 0" }}>
        Henüz ay eklenmedi.
      </div>
    );
  }

  const headers = [
    { label: "Ay",             align: "left"  as const },
    { label: "Mevcut Para ₺",  align: "right" as const },
    { label: "Eklenen ₺",     align: "right" as const },
    { label: "Toplam ₺",      align: "right" as const },
    ...tracker.scenarios.map((s) => ({ label: `%${s} Artarsa`, align: "right" as const })),
  ];

  return (
    <div style={{
      overflowX: "auto",
      borderRadius: "var(--radius)",
      border: "1px solid var(--border)",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,.03)" }}>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: "10px 14px",
                textAlign: h.align,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: i >= 4 ? SCENARIO_COLORS[i - 4] : "var(--text-3)",
                borderBottom: "1px solid var(--border)",
                whiteSpace: "nowrap",
              }}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const isLast = idx === rows.length - 1;
            return (
              <tr
                key={row.month}
                style={{
                  background: isLast ? "rgba(74,222,128,.04)" : "transparent",
                  transition: "background .12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = isLast ? "rgba(74,222,128,.04)" : "transparent")}
              >
                {/* Ay */}
                <td style={{ padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,.04)", whiteSpace: "nowrap" }}>
                  <span style={{ fontWeight: 600, color: isLast ? "var(--green)" : "var(--text-1)", fontSize: "13px" }}>
                    {row.label}
                  </span>
                  {row.note && (
                    <span style={{ marginLeft: "6px", fontSize: "11px", color: "var(--text-3)" }}>
                      ({row.note})
                    </span>
                  )}
                </td>
                {/* Mevcut */}
                <td style={{ padding: "9px 14px", textAlign: "right", color: "var(--text-2)", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,.04)", fontVariantNumeric: "tabular-nums" }}>
                  {formatNumber(row.current)}
                </td>
                {/* Eklenen */}
                <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,.04)", fontVariantNumeric: "tabular-nums" }}>
                  <span style={{
                    color: row.added > 0 ? "var(--blue)" : "var(--text-3)",
                    fontWeight: row.added > 0 ? 600 : 400,
                    fontSize: "13px",
                  }}>
                    {row.added > 0 ? `+${formatNumber(row.added)}` : "—"}
                  </span>
                </td>
                {/* Toplam */}
                <td style={{ padding: "9px 14px", textAlign: "right", fontWeight: 700, color: "var(--text-1)", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,.04)", fontVariantNumeric: "tabular-nums" }}>
                  {formatNumber(row.total)}
                </td>
                {/* Senaryolar */}
                {row.scenarioValues.map((val, si) => (
                  <td key={si} style={{
                    padding: "9px 14px",
                    textAlign: "right",
                    borderBottom: "1px solid rgba(255,255,255,.04)",
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    <span style={{
                      color: SCENARIO_COLORS[si],
                      fontWeight: 600,
                      fontSize: "13px",
                      background: `${SCENARIO_COLORS[si]}12`,
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}>
                      {formatNumber(val)}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
