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
  isCardGenerated: boolean;
  setIsCardGenerated: (v: boolean) => void;
};

export const reuseableValueStore = create<ReuseableValueStore>()(
  persist(
    (set, get) => ({
      //supabase 데이터 가져올 시작점
      startMonth: new Date(2022, 0, 1), // 2022년 1월 1일로 초기화
      setStartMonth: (month: Date | null) => {
        set({ startMonth: month });
      },

      //supabase 데이터 가져올 갯수
      monthDiff: 3, // 3개월치 데이터로 초기화
      setMonthDiff: (diff: number) => {
        set({ monthDiff: diff });
      },

      isGasChecked: true,
      toggleGasCheck: () => {
        const current = get().isGasChecked;
        set({ isGasChecked: !current });
      },

      isElectricityChecked: true,
      toggleElectricityCheck: () => {
        const current = get().isElectricityChecked;
        set({ isElectricityChecked: !current });
      },

      startYear: 2022,
      setStartYear: (year: number) => set({ startYear: year }),
      startMonthNum: 1,
      setStartMonthNum: (month: number) => set({ startMonthNum: month }),
      endYear: 2022,
      setEndYear: (year: number) => set({ endYear: year }),
      endMonthNum: 3,
      setEndMonthNum: (month: number) => set({ endMonthNum: month }),
      isCardGenerated: false,
      setIsCardGenerated: (v: boolean) => set({ isCardGenerated: v }),
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
        isCardGenerated: state.isCardGenerated,
      }),
    }
  )
);

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    reuseableValueStore.setState({
      startMonth: new Date(2022, 0, 1),
      monthDiff: 3,
      isGasChecked: true,
      isElectricityChecked: true,
      startYear: 2022,
      startMonthNum: 1,
      endYear: 2022,
      endMonthNum: 3,
      isCardGenerated: false,
    });
  });
}
