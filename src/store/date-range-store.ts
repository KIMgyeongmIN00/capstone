import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateRangeState {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  getMonthsBetween: () => { date: Date; index: number }[];
}

export const useDateRangeStore = create<DateRangeState>()(
  persist(
    (set, get) => ({
      startDate: new Date(2022, 0, 1), // 2022년 1월
      endDate: new Date(2022, 11, 1), // 2022년 12월

      setStartDate: (date: Date) => set({ startDate: date }),
      setEndDate: (date: Date) => set({ endDate: date }),

      getMonthsBetween: () => {
        const start = get().startDate;
        const end = get().endDate;
        const months: { date: Date; index: number }[] = [];
        let index = 0;

        const current = new Date(start);
        while (current <= end) {
          months.push({
            date: new Date(current),
            index: index++
          });
          current.setMonth(current.getMonth() + 1);
        }

        return months;
      },
    }),
    {
      name: "date-range-storage",
    }
  )
); 