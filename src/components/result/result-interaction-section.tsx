import { useBillsQuery } from "@/modules/result-interactions-section/hooks/use-bill-query";
import { reuseableValueStore } from "@/store/reuseable-value-store";
import { mergeEnergyData } from "@/modules/result-interactions-section/util/format-fetch-data";
import { userMaintenanceValueStore } from "@/store/user-maintenance-value-store";
import ResultsChart from "@/modules/result-interactions-section/components/result-chart";
import ResultPannel from "./result-pannel";
import UtilityComparisonTable from "./utility-comparison-table";
import { useState } from "react";

const ResultInteractionSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("서울특별시");
  const [selectedCity, setSelectedCity] = useState<string>("강남구");

  const gasMapValues = userMaintenanceValueStore(
    (state) => state.monthlyGasValue
  );
  const electricMapValues = userMaintenanceValueStore(
    (state) => state.monthlyElectricityValue
  );

  const startMonthStore = reuseableValueStore((state) => state.startMonth);
  const monthDiffStore = reuseableValueStore((state) => state.monthDiff);

  const { data, isLoading, isFetching, error } = useBillsQuery({
    region: selectedRegion,
    city: selectedCity,
    start: startMonthStore!,
    count: monthDiffStore,
  });

  if (isLoading)
    return (
      <div className="w-full h-[40dvh] my-4 rounded-lg">
        <ResultPannel
          setSelectedRegion={setSelectedRegion}
          setSelectedCity={setSelectedCity}
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
        />
        <p className="text-center text-4xl break-keep">
          차트 불러오기를 실패했습니다. 처음부터 다시 시도 해주세요
        </p>
      </div>
    );

  const chartData = mergeEnergyData(
    data.electricity,
    data.gas,
    electricMapValues,
    gasMapValues
  );

  const formatBillData = (bills: any[], valuesMap: Map<number, number>) => {
    // Map 객체를 배열로 변환
    const values = Array.from({ length: bills.length }, (_, i) => valuesMap.get(i) || 0);
    
    return bills.map((bill: any, index: number) => ({
      month: bill.month,
      amount: values[index],
    }));
  };

  const formatAverageBillData = (bills: any[]) => {
    if (!Array.isArray(bills)) return [];
    
    return bills.map((bill: any) => ({
      month: bill.month,
      amount: bill.average || 0,
    }));
  };

  // 데이터가 없는 경우 빈 배열 반환
  if (!data?.electricity || !data?.gas) {
    return (
      <div>
        <ResultPannel
          setSelectedRegion={setSelectedRegion}
          setSelectedCity={setSelectedCity}
        />
        <p className="text-center text-gray-500 mt-4">데이터를 불러오는 중...</p>
      </div>
    );
  }

  const userElectricBills = formatBillData(data.electricity, electricMapValues);
  const userGasBills = formatBillData(data.gas, gasMapValues);
  const averageElectricBills = formatAverageBillData(data.electricity);
  const averageGasBills = formatAverageBillData(data.gas);

  return (
    <div>
      <ResultPannel
        setSelectedRegion={setSelectedRegion}
        setSelectedCity={setSelectedCity}
      />
      {isFetching && (
        <p className="text-center text-sm text-gray-500 mb-2">
          새 데이터를 불러오는 중...
        </p>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">공과금 비교</h2>
        <ResultsChart chartData={chartData} />
        <div className="mt-8">
          <UtilityComparisonTable
            title="전기세"
            userBills={userElectricBills}
            averageBills={averageElectricBills}
          />
          <UtilityComparisonTable
            title="가스비"
            userBills={userGasBills}
            averageBills={averageGasBills}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultInteractionSection;
