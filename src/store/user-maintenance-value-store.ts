import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

type MaintenanceValueStore = {
  monthlyGasValue: Map<number, number>;
  monthlyElectricityValue: Map<number, number>;
  initValues: (n: number | null) => void;
  setGasValue: (index: number, value: number) => void;
  setElectricityValue: (index: number, value: number) => void;
  getGasValueMap: () => [number, number][];
  getElectricityValueMap: () => [number, number][];
};

function mapToArray(map: Map<number, number>) {
  return Array.from(map.entries());
}
function arrayToMap(arr: [number, number][]) {
  return new Map(arr);
}

// 초기 데이터 생성
const createInitialData = () => {
  const map = new Map<number, number>();
  map.set(0, 11111);
  map.set(1, 22222);
  map.set(2, 33333);
  return map;
};

export const userMaintenanceValueStore = create<MaintenanceValueStore>()(
  persist(
    (set, get) => ({
      monthlyGasValue: createInitialData(),
      monthlyElectricityValue: createInitialData(),

      initValues: (n: number | null) => {
        if (n === null) return;
        const newMap = new Map<number, number>();
        for (let i = 0; i < n; i++) {
          newMap.set(i, 0);
        }
        set({ monthlyGasValue: newMap });
        set({ monthlyElectricityValue: newMap });
      },

      setGasValue: (index, value) => {
        const map = new Map(get().monthlyGasValue);
        map.set(index, value);
        set({ monthlyGasValue: map });
      },

      setElectricityValue: (index, value) => {
        const map = new Map(get().monthlyElectricityValue);
        map.set(index, value);
        set({ monthlyElectricityValue: map });
      },

      getGasValueMap: () => {
        const map = get().monthlyGasValue;
        return Array.from(map.entries());
      },

      getElectricityValueMap: () => {
        const map = get().monthlyElectricityValue;
        return Array.from(map.entries());
      },

      shallow,
    }),
    {
      name: "user-maintenance-value-store",
      partialize: (state) => ({
        monthlyGasValue: mapToArray(state.monthlyGasValue),
        monthlyElectricityValue: mapToArray(state.monthlyElectricityValue),
      }),
      merge: (persisted, current) => {
        const p = persisted as Record<string, unknown>;
        return {
          ...current,
          ...p,
          monthlyGasValue: arrayToMap((p.monthlyGasValue as [number, number][]) || []),
          monthlyElectricityValue: arrayToMap((p.monthlyElectricityValue as [number, number][]) || []),
        };
      },
      skipHydration: true,
    }
  )
);

// 클라이언트 마운트 시 store 초기화
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    userMaintenanceValueStore.setState({
      monthlyGasValue: createInitialData(),
      monthlyElectricityValue: createInitialData(),
    });
  });
}
