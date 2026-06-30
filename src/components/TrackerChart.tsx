"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { InvestmentTracker } from "@/lib/store";
import { calcTrackerRows, formatNumber, SCENARIO_COLORS } from "@/lib/calculations";

interface Props { tracker: InvestmentTracker }

export default function TrackerChart({ tracker }: Props) {
  const rows = calcTrackerRows(tracker);
  if (rows.length < 2) return null;

  const data = rows.map((row) => {
    const point: Record<string, number> = { month: row.month, toplam: row.total };
    tracker.scenarios.forEach((s, i) => { point[`s${s}`] = row.scenarioValues[i]; });
    return point;
  });

  return (
    <div className="card" style={{ padding: "20px" }}>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "16px" }}>
        Büyüme Grafiği
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11.5px", color: "var(--text-2)" }}>
          <span style={{ width: "20px", height: "2px", background: "var(--blue)", display: "inline-block", borderRadius: "2px" }} />
          Toplam
        </span>
        {tracker.scenarios.map((s, i) => (
          <span key={s} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11.5px", color: "var(--text-2)" }}>
            <span style={{ width: "20px", height: "2px", background: SCENARIO_COLORS[i], display: "inline-block", borderRadius: "2px", opacity: 0.7 }} />
            %{s} Artarsa
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--text-3)", fontSize: 10 }} tickFormatter={(v) => `Ay ${v}`} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--text-3)", fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={38} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border-s)", borderRadius: "var(--radius-sm)", fontSize: "12px", boxShadow: "0 8px 24px rgba(0,0,0,.4)" }}
            labelStyle={{ color: "var(--text-2)" }}
            labelFormatter={(v) => `Ay ${v}`}
            formatter={(value, name) => {
              const label = name === "toplam" ? "Toplam" : `%${String(name).slice(1)} Artarsa`;
              return [formatNumber(Number(value)) + " ₺", label];
            }}
          />
          <Line type="monotone" dataKey="toplam" stroke="var(--blue)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          {tracker.scenarios.map((s, i) => (
            <Line key={s} type="monotone" dataKey={`s${s}`}
              stroke={SCENARIO_COLORS[i]} strokeWidth={1.5}
              strokeDasharray="6 3" dot={false} activeDot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
