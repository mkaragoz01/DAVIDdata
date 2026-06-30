"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/calculations";
import { Trash2, ArrowUpCircle, ArrowDownCircle, Search } from "lucide-react";

export default function TransactionList() {
  const { transactions, removeTransaction } = useFinanceStore();
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [query, setQuery] = useState("");

  const filtered = [...transactions]
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) =>
      query
        ? t.category.toLowerCase().includes(query.toLowerCase()) ||
          t.description?.toLowerCase().includes(query.toLowerCase())
        : true
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, color: "var(--text-1)", fontSize: "14px" }}>
            İşlemler
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
            {filtered.length} kayıt
          </span>
        </div>

        {/* Filters row */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 140px", minWidth: "120px" }}>
            <Search size={13} style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
            <input
              type="text" placeholder="Ara..." value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field"
              style={{ paddingLeft: "28px" }}
            />
          </div>
          {/* Type filter */}
          <div style={{ display: "flex", gap: "4px" }}>
            {(["all", "income", "expense"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className="btn btn-ghost"
                style={{
                  padding: "6px 12px", fontSize: "12px",
                  background: filter === f ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.04)",
                  color: filter === f ? "var(--text-1)" : "var(--text-3)",
                  borderColor: filter === f ? "var(--border-s)" : "var(--border)",
                }}>
                {f === "all" ? "Tümü" : f === "income" ? "Gelir" : "Gider"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ maxHeight: "480px", overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-3)", fontSize: "13px" }}>
            İşlem bulunamadı.
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "11px 20px",
                borderBottom: "1px solid rgba(255,255,255,.04)",
                transition: "background .1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Icon */}
              <span style={{ flexShrink: 0, color: t.type === "income" ? "var(--green)" : "var(--pink)", opacity: 0.8 }}>
                {t.type === "income" ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
              </span>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, color: "var(--text-1)", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.category}
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--text-3)", display: "flex", gap: "6px", marginTop: "1px" }}>
                  <span>{t.date}</span>
                  {t.description && <><span>·</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description}</span></>}
                </div>
              </div>

              {/* Amount */}
              <span style={{
                fontWeight: 700, fontSize: "13.5px",
                color: t.type === "income" ? "var(--green)" : "var(--pink)",
                fontVariantNumeric: "tabular-nums",
                flexShrink: 0,
              }}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </span>

              {/* Delete */}
              <button
                onClick={() => removeTransaction(t.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", padding: "4px", borderRadius: "6px", flexShrink: 0, display: "flex" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#f87171")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)")}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
