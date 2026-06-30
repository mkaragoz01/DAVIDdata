import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
}

// Excel formatına göre aylık giriş
export interface MonthlyEntry {
  id: string;
  added: number;   // Eklenen Para
  note?: string;
}

// Yatırım takip planı
export interface InvestmentTracker {
  id: string;
  name: string;
  initialCapital: number;     // İlk "Mevcut Para"
  scenarios: number[];        // Örn: [10, 15, 20] → %10, %15, %20
  entries: MonthlyEntry[];    // Aylık katkılar
}

interface FinanceStore {
  transactions: Transaction[];
  trackers: InvestmentTracker[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
  addTracker: (tracker: Omit<InvestmentTracker, "id">) => void;
  removeTracker: (id: string) => void;
  addMonthEntry: (trackerId: string, entry: Omit<MonthlyEntry, "id">) => void;
  removeLastEntry: (trackerId: string) => void;
  updateScenarios: (trackerId: string, scenarios: number[]) => void;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      transactions: [],
      trackers: [],
      addTransaction: (t) =>
        set((state) => ({
          transactions: [...state.transactions, { ...t, id: crypto.randomUUID() }],
        })),
      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      addTracker: (tracker) =>
        set((state) => ({
          trackers: [...state.trackers, { ...tracker, id: crypto.randomUUID() }],
        })),
      removeTracker: (id) =>
        set((state) => ({
          trackers: state.trackers.filter((t) => t.id !== id),
        })),
      addMonthEntry: (trackerId, entry) =>
        set((state) => ({
          trackers: state.trackers.map((t) =>
            t.id === trackerId
              ? { ...t, entries: [...t.entries, { ...entry, id: crypto.randomUUID() }] }
              : t
          ),
        })),
      removeLastEntry: (trackerId) =>
        set((state) => ({
          trackers: state.trackers.map((t) =>
            t.id === trackerId
              ? { ...t, entries: t.entries.slice(0, -1) }
              : t
          ),
        })),
      updateScenarios: (trackerId, scenarios) =>
        set((state) => ({
          trackers: state.trackers.map((t) =>
            t.id === trackerId ? { ...t, scenarios } : t
          ),
        })),
    }),
    { name: "davidata-storage-v2" }
  )
);
