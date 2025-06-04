import { reuseableValueStore } from "@/store/reuseable-value-store";

const MaintenanceTypeCheckArea = () => {
  const isGasChecked = reuseableValueStore((state) => state.isGasChecked);
  const isElectricityChecked = reuseableValueStore(
    (state) => state.isElectricityChecked
  );
  const toggleGas = reuseableValueStore((state) => state.toggleGasCheck);
  const toggleElectricity = reuseableValueStore(
    (state) => state.toggleElectricityCheck
  );

  const notCheckedStyle =
    "bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-black";
  const checkedStyle =
    "bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white";
  const basicButtonStyle =
    "h-[64px] w-48 rounded-lg transition-colors disabled:text-gray-400 disabled:bg-slate-200 disabled:hover:bg-slate-200 disabled:active:bg-slate-200";

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={toggleElectricity}
        className={`${basicButtonStyle} ${
          isElectricityChecked ? checkedStyle : notCheckedStyle
        }`}
      >
        전기세
      </button>
      <button
        onClick={toggleGas}
        className={`${basicButtonStyle} ${
          isGasChecked ? checkedStyle : notCheckedStyle
        }`}
      >
        가스비
      </button>
    </div>
  );
};

export default MaintenanceTypeCheckArea;
