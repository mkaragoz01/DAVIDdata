"use client";

import CreateTrackerForm from "@/components/CreateTrackerForm";
import TrackerPanel from "@/components/TrackerPanel";
import { useFinanceStore } from "@/lib/store";

export default function InvestmentsPage() {
  const { trackers } = useFinanceStore();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Header */}
      <div className="animate-in">
        <h1 style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text-1)" }}>
          Yatırım{" "}
          <span style={{ background: "linear-gradient(135deg,var(--purple),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Takibi
          </span>
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: "13px", marginTop: "4px" }}>
          Aylık değişken katkılarınız · %10 / %15 / %20 getiri senaryoları
        </p>
      </div>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "clamp(240px,22%,280px) 1fr", gap: "16px", alignItems: "start" }}>
        <CreateTrackerForm />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {trackers.length === 0 ? (
            <div className="card" style={{ padding: "48px 32px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>📊</div>
              <div style={{ fontWeight: 600, color: "var(--text-2)", marginBottom: "6px" }}>
                Henüz plan yok
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.6 }}>
                Sol panelden plan oluşturun.<br />
                Her ay eklediğiniz tutarı girin,<br />
                senaryo kolonları otomatik hesaplanır.
              </div>
            </div>
          ) : (
            trackers.map((tracker) => (
              <TrackerPanel key={tracker.id} tracker={tracker} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
