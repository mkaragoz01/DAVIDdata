import { Transaction, InvestmentTracker } from "./store";

export function calcTotals(transactions: Transaction[]) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return { totalIncome, totalExpense, net: totalIncome - totalExpense };
}

export function calcExpenseByCategory(transactions: Transaction[]) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const map: Record<string, number> = {};
  for (const t of expenses) map[t.category] = (map[t.category] ?? 0) + t.amount;
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function calcIncomeByCategory(transactions: Transaction[]) {
  const incomes = transactions.filter((t) => t.type === "income");
  const map: Record<string, number> = {};
  for (const t of incomes) map[t.category] = (map[t.category] ?? 0) + t.amount;
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

// Excel formatındaki hesaplama:
// Mevcut[0] = initialCapital
// Toplam[n] = Mevcut[n] + Eklenen[n]
// Mevcut[n+1] = Toplam[n]
// Senaryo[n][i] = Toplam[n] * (1 + scenarios[i]/100)
export interface TrackerRow {
  month: number;
  label: string;
  current: number;
  added: number;
  total: number;
  scenarioValues: number[];
  note?: string;
}

export function calcTrackerRows(tracker: InvestmentTracker): TrackerRow[] {
  const rows: TrackerRow[] = [];
  let current = tracker.initialCapital;

  for (let i = 0; i < tracker.entries.length; i++) {
    const entry = tracker.entries[i];
    const total = current + entry.added;
    const scenarioValues = tracker.scenarios.map((s) => total * (1 + s / 100));

    rows.push({
      month: i + 1,
      label: `Ay ${i + 1}`,
      current,
      added: entry.added,
      total,
      scenarioValues,
      note: entry.note,
    });

    current = total;
  }

  return rows;
}

export function calcTrackerSummary(tracker: InvestmentTracker) {
  const rows = calcTrackerRows(tracker);
  if (rows.length === 0) {
    return {
      totalAdded: 0,
      currentTotal: tracker.initialCapital,
      scenarioFinals: tracker.scenarios.map(() => tracker.initialCapital),
      monthCount: 0,
    };
  }
  const last = rows[rows.length - 1];
  const totalAdded = tracker.entries.reduce((s, e) => s + e.added, 0);
  return {
    totalAdded,
    currentTotal: last.total,
    scenarioFinals: last.scenarioValues,
    monthCount: rows.length,
  };
}

export function calcNetWorth(transactions: Transaction[], trackers: InvestmentTracker[]) {
  const { net } = calcTotals(transactions);
  const investmentValue = trackers.reduce((sum, t) => {
    const { currentTotal } = calcTrackerSummary(t);
    return sum + currentTotal;
  }, 0);
  return net + investmentValue;
}

export const INCOME_CATEGORIES = ["Maaş", "Ek Gelir", "Kira Geliri", "Yatırım Getirisi", "Diğer"];
export const EXPENSE_CATEGORIES = [
  "Kira", "Fatura", "Market", "Ulaşım", "Sağlık",
  "Eğlence", "Girişim/İş", "Eğitim", "Giyim", "Diğer",
];

export const CHART_COLORS = [
  "#6ee7b7", "#60a5fa", "#f9a8d4", "#fcd34d", "#a78bfa",
  "#34d399", "#93c5fd", "#f472b6", "#fbbf24", "#c4b5fd",
];

export const SCENARIO_COLORS = ["#fcd34d", "#6ee7b7", "#f472b6", "#a78bfa"];

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(amount);
}
