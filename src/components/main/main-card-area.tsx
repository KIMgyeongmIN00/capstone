import MaintenanceCostCard from "@/modules/main-card-area/components/maintenance-cost-card";
import { reuseableValueStore } from "@/store/reuseable-value-store";

type MainCardArea = {
  addMonth: (startDate: Date | null, i: number) => string | undefined;
};

const MainCardArea = ({ addMonth }: MainCardArea) => {
  const startDate = reuseableValueStore((state) => state.startMonth);
  const monthDiff = reuseableValueStore((state) => state.monthDiff);
  return (
    <div className="flex justify-center my-4">
      <div className="flex justify-center w-full flex-wrap gap-4">
        {Array.from({ length: monthDiff }).map((_, i) => {
          return (
            <MaintenanceCostCard
              key={i}
              index={i}
              CardDate={addMonth(startDate, i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainCardArea;
