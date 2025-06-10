import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

interface MaintenanceValueStore {
  monthlyGasValue: Map<number, number>;
  monthlyElectricityValue: Map<number, number>;
  monthlyWaterValue: Map<number, number>;
  initValues: (n: number | null) => void;
  setGasValue: (index: number, value: number) => void;
  setElectricityValue: (index: number, value: number) => void;
  setWaterValue: (index: number, value: number) => void;
  getGasValueMap: () => [number, number][];
  getElectricityValueMap: () => [number, number][];
  getWaterValueMap: () => [number, number][];
}

type MaintenanceValueState = Omit<
  MaintenanceValueStore,
  'getGasValueMap' | 'getElectricityValueMap' | 'getWaterValueMap'
>;

// 초기 데이터 생성
const createInitialData = () => {
  const map = new Map<number, number>();
  for (let i = 0; i < 12; i++) {
    map.set(i, 0);
  }
  return map;
};

// Map을 [number, number][] 형태로 변환
const mapToArray = (map: Map<number, number>): [number, number][] => {
  return Array.from(map.entries());
};

// [number, number][]를 Map으로 변환
const arrayToMap = (arr: [number, number][]): Map<number, number> => {
  return new Map(arr);
};

export const userMaintenanceValueStore = create<MaintenanceValueStore>()(
  persist(
    (set, get) => ({
      monthlyGasValue: createInitialData(),
      monthlyElectricityValue: createInitialData(),
      monthlyWaterValue: createInitialData(),

      initValues: (n: number | null) => {
        const newMap = new Map<number, number>();
        for (let i = 0; i < 12; i++) {
          newMap.set(i, n || 0);
        }
        set({ monthlyGasValue: newMap });
        set({ monthlyElectricityValue: newMap });
        set({ monthlyWaterValue: newMap });
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

      setWaterValue: (index, value) => {
        const map = new Map(get().monthlyWaterValue);
        map.set(index, value);
        set({ monthlyWaterValue: map });
      },

      getGasValueMap: () => mapToArray(get().monthlyGasValue),
      getElectricityValueMap: () => mapToArray(get().monthlyElectricityValue),
      getWaterValueMap: () => mapToArray(get().monthlyWaterValue),

      shallow,
    }),
    {
      name: "user-maintenance-value-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const data = JSON.parse(str);
          return {
            state: {
              ...data.state,
              monthlyGasValue: arrayToMap(data.state.monthlyGasValue || []),
              monthlyElectricityValue: arrayToMap(data.state.monthlyElectricityValue || []),
              monthlyWaterValue: arrayToMap(data.state.monthlyWaterValue || []),
            },
          };
        },
        setItem: (name, value) => {
          const data = {
            state: {
              ...value.state,
              monthlyGasValue: mapToArray(value.state.monthlyGasValue),
              monthlyElectricityValue: mapToArray(value.state.monthlyElectricityValue),
              monthlyWaterValue: mapToArray(value.state.monthlyWaterValue),
            },
          };
          localStorage.setItem(name, JSON.stringify(data));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

// 클라이언트 마운트 시 store 초기화
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    userMaintenanceValueStore.setState({
      monthlyGasValue: createInitialData(),
      monthlyElectricityValue: createInitialData(),
      monthlyWaterValue: createInitialData(),
    });
  });
}
