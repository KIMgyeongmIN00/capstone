'use client';

import { useMaintenanceTypeStore } from "@/store/maintenance-type-store";
import { userMaintenanceValueStore } from "@/store/user-maintenance-value-store";
import MaintenanceCard from "./maintenance-card";
import DateRangeSelector from "./date-range-selector";

const MaintenanceTypeCheckArea = () => {
  const {
    isElectricityChecked,
    isGasChecked,
    isWaterChecked,
    setElectricityChecked,
    setGasChecked,
    setWaterChecked,
  } = useMaintenanceTypeStore();

  const {
    monthlyElectricityValue,
    monthlyGasValue,
    monthlyWaterValue,
    setElectricityValue,
    setGasValue,
    setWaterValue,
  } = userMaintenanceValueStore();

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">비교하고 싶은 공과금을 선택하세요</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setElectricityChecked(!isElectricityChecked)}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isElectricityChecked
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            전기세
          </button>
          <button
            onClick={() => setGasChecked(!isGasChecked)}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isGasChecked
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            가스비
          </button>
          <button
            onClick={() => setWaterChecked(!isWaterChecked)}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isWaterChecked
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            수도세
          </button>
        </div>
      </div>

      {(isElectricityChecked || isGasChecked || isWaterChecked) && (
        <DateRangeSelector />
      )}

      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {isElectricityChecked && (
          <MaintenanceCard
            title="전기세"
            monthlyValue={monthlyElectricityValue}
            setValue={setElectricityValue}
          />
        )}
        {isGasChecked && (
          <MaintenanceCard
            title="가스비"
            monthlyValue={monthlyGasValue}
            setValue={setGasValue}
          />
        )}
        {isWaterChecked && (
          <MaintenanceCard
            title="수도세"
            monthlyValue={monthlyWaterValue}
            setValue={setWaterValue}
          />
        )}
      </div>
    </div>
  );
};

export default MaintenanceTypeCheckArea; 