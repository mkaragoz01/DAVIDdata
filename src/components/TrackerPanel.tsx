"use client";

import { useState } from "react";
import { InvestmentTracker } from "@/lib/store";
import { useFinanceStore } from "@/lib/store";
import { calcTrackerSummary, formatNumber, SCENARIO_COLORS } from "@/lib/calculations";
import TrackerTable from "./TrackerTable";
import TrackerChart from "./TrackerChart";
import { Trash2, Plus, RotateCcw, CheckCircle } from "lucide-react";

interface Props { tracker: InvestmentTracker }

export default function TrackerPanel({ tracker }: Props) {
  const { addMonthEntry, removeLastEntry, removeTracker } = useFinanceStore();
  const [added, setAdded] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const summary = calcTrackerSummary(tracker);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!added) return;
    addMonthEntry(tracker.id, { added: parseFloat(added), note });
    setAdded(""); setNote("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1800);
  };

  return (
    <div className="card animate-in" style={{ overflow: "hidden" }}>
      {/* ── Header ──────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,.02)",
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-1)" }}>{tracker.name}</div>
          <div style={{ fontSize: "11.5px", color: "var(--text-3)", marginTop: "2px" }}>
            Başlangıç: {formatNumber(tracker.initialCapital)} ₺ &middot; {summary.monthCount} ay kayıt
          </div>
        </div>
        <button
          onClick={() => removeTracker(tracker.id)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", display: "flex", padding: "4px" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#f87171")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)")}
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* ── KPI row ─────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${2 + tracker.scenarios.length}, 1fr)`, gap: "8px" }}>
          {[
            { label: "Toplam Para", value: formatNumber(summary.currentTotal), color: "var(--blue)" },
            { label: "Toplam Eklenen", value: formatNumber(summary.totalAdded), color: "var(--text-2)" },
            ...tracker.scenarios.map((s, i) => ({
              label: `%${s} Artarsa`,
              value: formatNumber(summary.scenarioFinals[i]),
              color: SCENARIO_COLORS[i],
            })),
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,.04)",
              borderRadius: "var(--radius-sm)",
              padding: "12px",
              border: "1px solid var(--border)",
            }}>
              <div style={{ fontSize: "10px", color: "var(--text-3)", fontWeight: 600, marginBottom: "4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {label}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
                {value} ₺
              </div>
            </div>
          ))}
        </div>

        {/* ── Add Month Form ───────────────────────── */}
        <form onSubmit={handleAdd} style={{
          display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "flex-end",
          background: "rgba(255,255,255,.03)",
          padding: "14px", borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
        }}>
          <div style={{ flex: "1 1 160px" }}>
            <label style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-3)", display: "block", marginBottom: "5px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Ay {tracker.entries.length + 1} — Eklenen Para (₺)
            </label>
            <input
              type="number" placeholder="0" value={added} min="0" step="0.01"
              onChange={(e) => setAdded(e.target.value)}
              className="field" required
            />
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <label style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-3)", display: "block", marginBottom: "5px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Not
            </label>
            <input
              type="text" placeholder="İsteğe bağlı..." value={note}
              onChange={(e) => setNote(e.target.value)}
              className="field"
            />
          </div>
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            <button type="submit" className="btn btn-green"
              style={{
                background: success ? "rgba(74,222,128,.15)" : "var(--green)",
                color: success ? "var(--green)" : "#022c22",
                border: success ? "1px solid rgba(74,222,128,.4)" : "none",
              }}>
              {success ? <><CheckCircle size={13} /> Eklendi</> : <><Plus size={13} /> Ay Ekle</>}
            </button>
            {tracker.entries.length > 0 && (
              <button type="button" onClick={() => removeLastEntry(tracker.id)} className="btn btn-ghost">
                <RotateCcw size={13} /> Geri Al
              </button>
            )}
          </div>
        </form>

        {/* ── Table ───────────────────────────────── */}
        <TrackerTable tracker={tracker} />

        {/* ── Chart ───────────────────────────────── */}
        <TrackerChart tracker={tracker} />
      </div>
    </div>
  );
}
