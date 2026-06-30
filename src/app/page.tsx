"use client";

import { useFinanceStore } from "@/lib/store";
import {
  calcTotals, calcExpenseByCategory, calcIncomeByCategory,
  calcNetWorth, calcTrackerSummary, formatCurrency, formatNumber, SCENARIO_COLORS,
} from "@/lib/calculations";
import KpiCard from "@/components/KpiCard";
import ExpensePieChart from "@/components/ExpensePieChart";
import { Wallet, TrendingUp, TrendingDown, BarChart2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function DashboardPage() {
  const { transactions, trackers } = useFinanceStore();
  const { totalIncome, totalExpense } = calcTotals(transactions);
  const netWorth = calcNetWorth(transactions, trackers);
  const expenseData = calcExpenseByCategory(transactions);
  const incomeData = calcIncomeByCategory(transactions);
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Page title */}
      <div className="animate-in">
        <h1 style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text-1)", lineHeight: 1.2 }}>
          DAVIData{" "}
          <span style={{
            background: "linear-gradient(135deg, var(--green), var(--teal))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Dashboard
          </span>
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: "13px", marginTop: "4px" }}>
          Finansal durumunuzun genel görünümü
        </p>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
        <KpiCard label="Net Varlık" value={formatCurrency(netWorth)} sub="Gelir − Gider + Yatırım" accent="var(--green)" icon={<Wallet size={16} />} />
        <KpiCard label="Toplam Gelir" value={formatCurrency(totalIncome)} sub={`${transactions.filter(t => t.type === "income").length} işlem`} accent="var(--teal)" icon={<TrendingUp size={16} />} />
        <KpiCard label="Toplam Gider" value={formatCurrency(totalExpense)} sub={`${transactions.filter(t => t.type === "expense").length} işlem`} accent="var(--pink)" icon={<TrendingDown size={16} />} />
        <KpiCard label="Yatırım Planı" value={String(trackers.length)} sub="Aktif plan" accent="var(--purple)" icon={<BarChart2 size={16} />} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
        <ExpensePieChart data={expenseData} title="Gider Dağılımı" />
        <ExpensePieChart data={incomeData} title="Gelir Dağılımı" />
      </div>

      {/* Bottom row: recent + investments */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>

        {/* Recent transactions */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: "13px", color: "var(--text-1)" }}>Son İşlemler</span>
            <a href="/transactions" style={{ fontSize: "11.5px", color: "var(--blue)" }}>Tümü →</a>
          </div>
          {recent.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-3)", fontSize: "13px" }}>İşlem yok</div>
          ) : (
            recent.map((t) => (
              <div key={t.id} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 18px", borderBottom: "1px solid rgba(255,255,255,.04)",
              }}>
                <span style={{ color: t.type === "income" ? "var(--green)" : "var(--pink)", opacity: 0.8 }}>
                  {t.type === "income" ? <ArrowUpCircle size={15} /> : <ArrowDownCircle size={15} />}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.category}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-3)" }}>{t.date}</div>
                </div>
                <span style={{ fontWeight: 700, fontSize: "13px", color: t.type === "income" ? "var(--green)" : "var(--pink)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Investment summary */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: "13px", color: "var(--text-1)" }}>Yatırım Planları</span>
            <a href="/investments" style={{ fontSize: "11.5px", color: "var(--purple)" }}>Tümü →</a>
          </div>
          {trackers.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-3)", fontSize: "13px" }}>
              <div style={{ fontSize: "22px", marginBottom: "6px" }}>📊</div>
              Yatırım planı oluşturulmadı
            </div>
          ) : (
            trackers.map((tracker) => {
              const summary = calcTrackerSummary(tracker);
              return (
                <div key={tracker.id} style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-1)" }}>{tracker.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-3)" }}>{summary.monthCount} ay</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--blue)", fontWeight: 600, fontVariantNumeric: "tabular-nums", marginBottom: "6px" }}>
                    {formatNumber(summary.currentTotal)} ₺
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {tracker.scenarios.map((s, i) => (
                      <span key={s} style={{ fontSize: "11.5px", fontWeight: 600, color: SCENARIO_COLORS[i], background: `${SCENARIO_COLORS[i]}12`, padding: "2px 7px", borderRadius: "5px" }}>
                        %{s}: {formatNumber(summary.scenarioFinals[i])} ₺
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
