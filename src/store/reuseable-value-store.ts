import { create } from "zustand";

type reuseableValueStore = {
  startMonth: Date | null;
  setStartMonth: (month: Date | null) => void;
  monthDiff: number;
  setMonthDiff: (diff: number) => void;
  isGasChecked: boolean;
  toggleGasCheck: () => void;
  isElectricityChecked: boolean;
  toggleElectricityCheck: () => void;
};

export const reuseableValueStore = create<reuseableValueStore>((set, get) => ({
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
}));
