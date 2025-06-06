import { useState } from "react";
import { useBillsQuery } from "@/modules/result-interactions-section/hooks/use-bill-query";
import { reuseableValueStore } from "@/store/reuseable-value-store";
import { mergeEnergyData } from "@/modules/result-interactions-section/util/format-fetch-data";
import { userMaintenanceValueStore } from "@/store/user-maintenance-value-store";
import ResultsChart from "@/modules/result-interactions-section/components/result-chart";
import ResultPannel from "./result-pannel";

const ResultInteractionSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("서울특별시");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedApartment, setSelectedApartment] = useState<string>("");

  const gasMapVaules = userMaintenanceValueStore(
    (state) => state.monthlyGasValue
  );
  const electricMapVaules = userMaintenanceValueStore(
    (state) => state.monthlyElectricityValue
  );

  const startMonthStore = reuseableValueStore((state) => state.startMonth);
  const monthDiffStore = reuseableValueStore((state) => state.monthDiff);

  const { data, isLoading, isFetching, error } = useBillsQuery({
    region: selectedRegion,
    city: selectedCity,
    start: startMonthStore!,
    count: monthDiffStore,
    apartment: selectedApartment,
  });

  if (isLoading)
    return (
      <div className="w-full h-[40dvh] my-4 rounded-lg">
        <ResultPannel
          setSelectedRegion={setSelectedRegion}
          setSelectedCity={setSelectedCity}
          setSelectedApartment={setSelectedApartment}
          selectedRegion={selectedRegion}
          selectedCity={selectedCity}
        />
        <div className="h-2/3 mx-4 my-2 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    );
  if (error)
    return (
      <div>
        <ResultPannel
          setSelectedRegion={setSelectedRegion}
          setSelectedCity={setSelectedCity}
          setSelectedApartment={setSelectedApartment}
          selectedRegion={selectedRegion}
          selectedCity={selectedCity}
        />
        <p className="text-center text-4xl break-keep">
          차트 불러오기를 실패했습니다. 처음부터 다시 시도 해주세요
        </p>
      </div>
    );

  const chartData = mergeEnergyData(
    data.electricity,
    data.gas,
    electricMapVaules,
    gasMapVaules
  );

  return (
    <div>
      <ResultPannel
        setSelectedRegion={setSelectedRegion}
        setSelectedCity={setSelectedCity}
        setSelectedApartment={setSelectedApartment}
        selectedRegion={selectedRegion}
        selectedCity={selectedCity}
      />
      {isFetching && (
        <p className="text-center text-sm text-gray-500 mb-2">
          새 데이터를 불러오는 중...
        </p>
      )}
      <ResultsChart chartData={chartData} />
    </div>
  );
};

export default ResultInteractionSection;
