import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ReuseableValueStore = {
  startMonth: Date | null;
  setStartMonth: (month: Date | null) => void;
  monthDiff: number;
  setMonthDiff: (diff: number) => void;
  isGasChecked: boolean;
  toggleGasCheck: () => void;
  isElectricityChecked: boolean;
  toggleElectricityCheck: () => void;
  startYear: number;
  setStartYear: (year: number) => void;
  startMonthNum: number;
  setStartMonthNum: (month: number) => void;
  endYear: number;
  setEndYear: (year: number) => void;
  endMonthNum: number;
  setEndMonthNum: (month: number) => void;
};

export const reuseableValueStore = create<ReuseableValueStore>()(
  persist(
    (set, get) => ({
      //supabase 데이터 가져올 시작점
      startMonth: null,
      setStartMonth: (month: Date | null) => {
        set({ startMonth: month });
      },

      //supabase 데이터 가져올 갯수
      monthDiff: 0,
      setMonthDiff: (diff: number) => {
        set({ monthDiff: diff });
      },

      isGasChecked: false,
      toggleGasCheck: () => {
        const current = get().isGasChecked;
        set({ isGasChecked: !current });
      },

      isElectricityChecked: false,
      toggleElectricityCheck: () => {
        const current = get().isElectricityChecked;
        set({ isElectricityChecked: !current });
      },

      startYear: 0,
      setStartYear: (year: number) => set({ startYear: year }),
      startMonthNum: 0,
      setStartMonthNum: (month: number) => set({ startMonthNum: month }),
      endYear: 0,
      setEndYear: (year: number) => set({ endYear: year }),
      endMonthNum: 0,
      setEndMonthNum: (month: number) => set({ endMonthNum: month }),
    }),
    {
      name: "reuseable-value-store",
      partialize: (state) => ({
        startMonth: state.startMonth,
        monthDiff: state.monthDiff,
        isGasChecked: state.isGasChecked,
        isElectricityChecked: state.isElectricityChecked,
        startYear: state.startYear,
        startMonthNum: state.startMonthNum,
        endYear: state.endYear,
        endMonthNum: state.endMonthNum,
      }),
    }
  )
);

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    reuseableValueStore.setState({
      startMonth: null,
      monthDiff: 0,
      isGasChecked: false,
      isElectricityChecked: false,
      startYear: 0,
      startMonthNum: 0,
      endYear: 0,
      endMonthNum: 0,
    });
  });
}
