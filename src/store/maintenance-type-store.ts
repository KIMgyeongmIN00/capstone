import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MaintenanceTypeState {
  isElectricityChecked: boolean;
  isGasChecked: boolean;
  isWaterChecked: boolean;
  setElectricityChecked: (checked: boolean) => void;
  setGasChecked: (checked: boolean) => void;
  setWaterChecked: (checked: boolean) => void;
  resetAll: () => void;
}

export const useMaintenanceTypeStore = create<MaintenanceTypeState>()(
  persist(
    (set) => ({
      isElectricityChecked: false,
      isGasChecked: false,
      isWaterChecked: false,
      setElectricityChecked: (checked) => set({ isElectricityChecked: checked }),
      setGasChecked: (checked) => set({ isGasChecked: checked }),
      setWaterChecked: (checked) => set({ isWaterChecked: checked }),
      resetAll: () => set({ isElectricityChecked: false, isGasChecked: false, isWaterChecked: false }),
    }),
    {
      name: "maintenance-type-storage",
      skipHydration: true,
    }
  )
); 