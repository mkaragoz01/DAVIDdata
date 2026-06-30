"use client";

import { useFinanceStore } from "@/lib/store";
import { Download, Upload, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const { transactions, trackers } = useFinanceStore();

  const handleExport = () => {
    const data = { transactions, trackers };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `davidata-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        localStorage.setItem("davidata-storage-v2", JSON.stringify({
          state: { transactions: parsed.transactions ?? [], trackers: parsed.trackers ?? [] },
          version: 0,
        }));
        window.location.reload();
      } catch {
        alert("Geçersiz dosya formatı.");
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    if (confirm("Tüm veriler silinecek. Bu işlem geri alınamaz.")) {
      localStorage.removeItem("davidata-storage-v2");
      window.location.reload();
    }
  };

  const Section = ({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) => (
    <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--text-1)" }}>{title}</div>
        {sub && <div style={{ fontSize: "12.5px", color: "var(--text-3)", marginTop: "3px" }}>{sub}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ maxWidth: "580px", display: "flex", flexDirection: "column", gap: "24px" }}>

      <div className="animate-in">
        <h1 style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text-1)" }}>
          Ayarlar
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: "13px", marginTop: "4px" }}>
          Veri yönetimi ve uygulama tercihleri
        </p>
      </div>

      <Section
        title="Veri Özeti"
        sub="Tüm veriler tarayıcınızın LocalStorage alanında saklanır."
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {[
            { label: "İşlem", value: transactions.length },
            { label: "Yatırım Planı", value: trackers.length },
          ].map(({ label, value }) => (
            <div key={label} style={{
              flex: 1, background: "rgba(255,255,255,.04)", borderRadius: "var(--radius-sm)",
              padding: "12px 14px", border: "1px solid var(--border)",
            }}>
              <div style={{ fontSize: "11px", color: "var(--text-3)", marginBottom: "4px" }}>{label}</div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-1)" }}>{value}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Veri Dışa Aktar"
        sub="Tüm verilerinizi JSON formatında bilgisayarınıza indirin."
      >
        <button onClick={handleExport} className="btn btn-green" style={{ width: "fit-content" }}>
          <Download size={14} /> JSON İndir
        </button>
      </Section>

      <Section
        title="Veri İçe Aktar"
        sub="Daha önce dışa aktardığınız yedek dosyasını yükleyin."
      >
        <label className="btn btn-blue" style={{ width: "fit-content", cursor: "pointer" }}>
          <Upload size={14} /> Dosya Seç
          <input type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} />
        </label>
      </Section>

      <Section
        title="Tehlikeli Bölge"
        sub="Tüm verileri kalıcı olarak sil. Bu işlem geri alınamaz."
      >
        <button onClick={handleClear} className="btn btn-danger" style={{ width: "fit-content" }}>
          <Trash2 size={14} /> Tüm Verileri Sil
        </button>
      </Section>
    </div>
  );
}
