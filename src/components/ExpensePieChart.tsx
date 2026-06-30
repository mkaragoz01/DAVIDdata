"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CHART_COLORS, formatCurrency } from "@/lib/calculations";

interface Props {
  data: { name: string; value: number }[];
  title: string;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-s)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
        fontSize: "13px",
        boxShadow: "0 8px 24px rgba(0,0,0,.4)",
      }}>
        <div style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: "2px" }}>{payload[0].name}</div>
        <div style={{ color: "var(--green)", fontWeight: 700 }}>{formatCurrency(payload[0].value)}</div>
      </div>
    );
  }
  return null;
};

export default function ExpensePieChart({ data, title }: Props) {
  if (data.length === 0) {
    return (
      <div className="card" style={{
        padding: "20px",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "240px",
      }}>
        <div style={{ fontSize: "28px", marginBottom: "8px", opacity: 0.3 }}>○</div>
        <span style={{ color: "var(--text-3)", fontSize: "13px" }}>{title} — veri yok</span>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "20px" }}>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "16px" }}>
        {title}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            innerRadius={55} outerRadius={88}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconSize={8} iconType="circle"
            formatter={(value) => (
              <span style={{ color: "var(--text-2)", fontSize: "11px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
