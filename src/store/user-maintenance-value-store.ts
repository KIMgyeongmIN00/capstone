import { create } from "zustand";
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

export const userMaintenanceValueStore = create<MaintenanceValueStore>(
  (set, get) => ({
    monthlyGasValue: new Map(),
    monthlyElectricityValue: new Map(),

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
  })
);
