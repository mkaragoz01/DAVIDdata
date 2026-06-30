"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/lib/calculations";
import { CheckCircle } from "lucide-react";

export default function TransactionForm() {
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [success, setSuccess] = useState(false);

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const typeAccent = type === "income" ? "var(--green)" : "var(--pink)";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;
    addTransaction({ type, amount: parseFloat(amount), category, description, date });
    setAmount(""); setCategory(""); setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2200);
  };

  return (
    <div className="card" style={{ padding: "20px" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-1)", marginBottom: "16px" }}>
        Yeni İşlem
      </h3>

      {/* Toggle */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "6px", marginBottom: "16px",
        background: "rgba(255,255,255,.04)",
        padding: "4px", borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
      }}>
        {(["income", "expense"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setType(t); setCategory(""); }}
            style={{
              padding: "7px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "13px",
              transition: "all .15s",
              background: type === t
                ? (t === "income" ? "rgba(74,222,128,.15)" : "rgba(244,114,182,.15)")
                : "transparent",
              color: type === t
                ? (t === "income" ? "var(--green)" : "var(--pink)")
                : "var(--text-3)",
              boxShadow: type === t ? `inset 0 0 0 1px ${t === "income" ? "rgba(74,222,128,.3)" : "rgba(244,114,182,.3)"}` : "none",
            }}
          >
            {t === "income" ? "↑ Gelir" : "↓ Gider"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", display: "block", marginBottom: "5px", letterSpacing: "0.04em" }}>
            MİKTAR (₺)
          </label>
          <input
            type="number" placeholder="0.00" value={amount} min="0" step="0.01" required
            onChange={(e) => setAmount(e.target.value)}
            className="field"
            style={{ fontSize: "15px", fontWeight: 600 }}
          />
        </div>

        <div>
          <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", display: "block", marginBottom: "5px", letterSpacing: "0.04em" }}>
            KATEGORİ
          </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="field" required>
            <option value="">Seçin...</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", display: "block", marginBottom: "5px", letterSpacing: "0.04em" }}>
            TARİH
          </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field" required />
        </div>

        <div>
          <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", display: "block", marginBottom: "5px", letterSpacing: "0.04em" }}>
            NOT
          </label>
          <input
            type="text" placeholder="İsteğe bağlı..." value={description}
            onChange={(e) => setDescription(e.target.value)} className="field"
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "4px",
            padding: "10px",
            borderRadius: "var(--radius-sm)",
            border: "none", cursor: "pointer",
            fontWeight: 700, fontSize: "13px",
            transition: "all .15s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            background: success ? "rgba(74,222,128,.15)" : (type === "income" ? "var(--green)" : "var(--pink)"),
            color: success ? "var(--green)" : "#0a0a0a",
            boxShadow: success ? "inset 0 0 0 1px rgba(74,222,128,.4)" : "none",
          }}
        >
          {success ? (<><CheckCircle size={14} /> Eklendi!</>) : "Ekle"}
        </button>
      </form>
    </div>
  );
}
