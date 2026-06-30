"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpensePieChart from "@/components/ExpensePieChart";
import { useFinanceStore } from "@/lib/store";
import { calcExpenseByCategory, calcIncomeByCategory, calcTotals, formatCurrency } from "@/lib/calculations";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function TransactionsPage() {
  const { transactions } = useFinanceStore();
  const { totalIncome, totalExpense, net } = calcTotals(transactions);
  const expenseData = calcExpenseByCategory(transactions);
  const incomeData = calcIncomeByCategory(transactions);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Header */}
      <div className="animate-in">
        <h1 style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text-1)" }}>
          Gelir /{" "}
          <span style={{ background: "linear-gradient(135deg,var(--pink),var(--purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Gider
          </span>
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: "13px", marginTop: "4px" }}>
          İşlemlerinizi kaydedin ve kategorilere göre analiz edin
        </p>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "10px" }}>
        {[
          { label: "Toplam Gelir", value: formatCurrency(totalIncome), color: "var(--green)", icon: <TrendingUp size={15} /> },
          { label: "Toplam Gider", value: formatCurrency(totalExpense), color: "var(--pink)", icon: <TrendingDown size={15} /> },
          { label: "Net", value: formatCurrency(net), color: net >= 0 ? "var(--teal)" : "var(--pink)" },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 600, marginBottom: "3px" }}>{label}</div>
              <div style={{ fontWeight: 700, color, fontSize: "1.05rem", fontVariantNumeric: "tabular-nums" }}>{value}</div>
            </div>
            {icon && <span style={{ color, opacity: 0.6 }}>{icon}</span>}
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div style={{ display: "grid", gridTemplateColumns: "clamp(240px,25%,300px) 1fr", gap: "16px", alignItems: "start" }}>
        <TransactionForm />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TransactionList />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px" }}>
            <ExpensePieChart data={expenseData} title="Gider Dağılımı" />
            <ExpensePieChart data={incomeData} title="Gelir Dağılımı" />
          </div>
        </div>
      </div>
    </div>
  );
}
