import { reuseableValueStore } from "@/store/reuseable-value-store";
import { userMaintenanceValueStore } from "@/store/user-maintenance-value-store";
import { useEffect, useState } from "react";

type MaintenanceCostCardProps = {
  CardDate: string | undefined;
  index: number;
};

const MaintenanceCostCard = ({ CardDate, index }: MaintenanceCostCardProps) => {
  const isGasTypeCheck = reuseableValueStore((state) => state.isGasChecked);
  const isElectTypeCheck = reuseableValueStore(
    (state) => state.isElectricityChecked
  );

  const setGasValue = userMaintenanceValueStore((state) => state.setGasValue);
  const setElectricityValue = userMaintenanceValueStore(
    (state) => state.setElectricityValue
  );

  const [electricCost, setElectricCost] = useState<number>(0);
  const [gasCost, setGasCost] = useState<number>(0);

  // 상태 반영
  useEffect(() => {
    setElectricityValue(index, Number(electricCost));
  }, [electricCost]);

  useEffect(() => {
    setGasValue(index, Number(gasCost));
  }, [gasCost]);

  return (
    <div className="flex flex-col border border-gray-400 rounded-md px-4 py-3 hover:scale-105 shadow-sm transition-transform">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        {CardDate} 공과금 입력
      </h3>
      <div className="flex gap-8">
        {isElectTypeCheck && (
          <div className="flex flex-col items-center shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] p-2 rounded-lg gap-1">
            <span className="text-sm font-medium text-gray-600">전기세</span>
            <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-32">
              <input
                type="text"
                inputMode="numeric"
                className="w-full outline-none text-sm text-gray-800"
                value={electricCost === 0 ? "" : electricCost}
                onChange={(e) => {
                  const raw = e.target.value;
                  const cleaned = raw
                    .replace(/[^0-9]/g, "")
                    .replace(/^0+(?=\d)/, "");
                  setElectricCost(cleaned === "" ? 0 : Number(cleaned));
                }}
              />
              <span className="ml-1 text-sm text-gray-600">원</span>
            </div>
          </div>
        )}
        {isGasTypeCheck && (
          <div className="flex flex-col items-center shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] p-2 rounded-lg gap-1">
            <span className="text-sm font-medium text-gray-600">가스비</span>
            <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-32">
              <input
                type="text"
                inputMode="numeric"
                className="w-full outline-none text-sm text-gray-800"
                value={gasCost === 0 ? "" : gasCost}
                onChange={(e) => {
                  const raw = e.target.value;
                  const cleaned = raw
                    .replace(/[^0-9]/g, "")
                    .replace(/^0+(?=\d)/, "");
                  setGasCost(cleaned === "" ? 0 : Number(cleaned));
                }}
              />
              <span className="ml-1 text-sm text-gray-600">원</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceCostCard;
