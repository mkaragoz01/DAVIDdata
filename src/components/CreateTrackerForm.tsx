"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { CheckCircle } from "lucide-react";

export default function CreateTrackerForm() {
  const addTracker = useFinanceStore((s) => s.addTracker);
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");
  const [scenarios, setScenarios] = useState("10,15,20");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedScenarios = scenarios
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((s) => !isNaN(s) && s > 0)
      .slice(0, 4);
    if (!parsedScenarios.length) return;
    addTracker({
      name: name || "Yatırım Takibi",
      initialCapital: parseFloat(initial),
      scenarios: parsedScenarios,
      entries: [],
    });
    setName(""); setInitial(""); setScenarios("10,15,20");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="card" style={{ padding: "20px" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-1)", marginBottom: "16px" }}>
        Yeni Plan
      </h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {[
          { label: "PLAN ADI", type: "text", placeholder: "Borsa, Kripto...", val: name, set: setName, required: false },
          { label: "BAŞLANGIÇ SERMAYESİ (₺)", type: "number", placeholder: "0.00", val: initial, set: setInitial, required: true },
          { label: "SENARYO ORANLARI (%)", type: "text", placeholder: "10,15,20", val: scenarios, set: setScenarios, required: true },
        ].map(({ label, type, placeholder, val, set, required }) => (
          <div key={label}>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", display: "block", marginBottom: "5px", letterSpacing: "0.04em" }}>
              {label}
            </label>
            <input
              type={type} placeholder={placeholder} value={val}
              onChange={(e) => set(e.target.value)}
              className="field" required={required}
              {...(type === "number" ? { min: "0", step: "0.01" } : {})}
            />
          </div>
        ))}

        <div style={{ fontSize: "11px", color: "var(--text-3)", background: "rgba(255,255,255,.03)", padding: "8px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
          Virgülle ayır · maks 4 senaryo<br />
          <span style={{ color: "var(--text-2)" }}>Örn: "10,15,20" → %10 %15 %20 kolonları</span>
        </div>

        <button type="submit" className="btn btn-purple" style={{ width: "100%", padding: "10px" }}>
          {success ? <><CheckCircle size={13} /> Oluşturuldu!</> : "Plan Oluştur"}
        </button>
      </form>
    </div>
  );
}
