'use client';

import { useState } from "react";
import { useBillsQuery } from "@/modules/result-interactions-section/hooks/use-bill-query";
import { reuseableValueStore } from "@/store/reuseable-value-store";
import { mergeEnergyData } from "@/modules/result-interactions-section/util/format-fetch-data";
import { userMaintenanceValueStore } from "@/store/user-maintenance-value-store";
import ResultsChart from "@/modules/result-interactions-section/components/result-chart";
import ResultPannel from "./result-pannel";
import UtilityComparisonTable from "./utility-comparison-table";
import { useMaintenanceTypeStore } from "@/store/maintenance-type-store";
import LocationSelecter from "./location-select";
import CitySelecter from "./city-select";
import ApartmentSelecter from "./apartment-select";
import ResultTable from "./result-table";

interface Bill {
  month: string;
  amount: number;
  average?: number;
}

const ResultInteractionSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("서울특별시");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedApartment, setSelectedApartment] = useState<string>("");
  const { isElectricityChecked, isGasChecked, isWaterChecked } = useMaintenanceTypeStore();

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
    apartment: selectedApartment,
  });

  // 지역, 도시, 아파트가 모두 선택되어 있는지 확인
  const isAllSelected = selectedRegion && selectedCity && selectedApartment;

  if (!isAllSelected) {
    return (
      <div className="flex flex-col">
        <div className="py-4 text-center">
          <div className="flex flex-col justify-center gap-y-4">
            <h2 className="text-2xl">아파트 선택</h2>
            <div className="flex justify-center gap-6">
              <div className="flex place-items-center justify-center gap-2">
                <label className="text-xl">지역별</label>
                <LocationSelecter setSelectedRegion={setSelectedRegion} />
              </div>
              <div className="flex place-items-center justify-center gap-2">
                <label className="text-xl">도시별</label>
                <CitySelecter setSelectedCity={setSelectedCity} region={selectedRegion} />
              </div>
              <div className="flex place-items-center justify-center gap-2">
                <label className="text-xl">아파트</label>
                <ApartmentSelecter setSelectedApartment={setSelectedApartment} region={selectedRegion} district={selectedCity} />
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4 text-xl font-semibold">지역, 도시, 아파트를 모두 선택해 주세요.</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="w-full h-[40dvh] my-4 rounded-lg">
        <ResultPannel
          setSelectedRegion={setSelectedRegion}
          setSelectedCity={setSelectedCity}
          setSelectedApartment={setSelectedApartment}
          selectedRegion={selectedRegion}
          selectedCity={selectedCity}
          selectedApartment={selectedApartment}
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
          selectedApartment={selectedApartment}
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

  const formatBillData = (bills: Bill[], valuesMap: Map<number, number>) => {
    // Map 객체를 배열로 변환
    const values = Array.from({ length: bills.length }, (_, i) => valuesMap.get(i) || 0);
    
    return bills.map((bill: Bill, index: number) => ({
      month: bill.month,
      amount: values[index],
    }));
  };

  // 데이터가 없는 경우 빈 배열 반환
  if (!data?.electricity || !data?.gas) {
    return (
      <div>
        <ResultPannel
          setSelectedRegion={setSelectedRegion}
          setSelectedCity={setSelectedCity}
          setSelectedApartment={setSelectedApartment}
          selectedRegion={selectedRegion}
          selectedCity={selectedCity}
          selectedApartment={selectedApartment}
        />
        <p className="text-center text-gray-500 mt-4">데이터를 불러오는 중...</p>
      </div>
    );
  }

  const userElectricBills = formatBillData(data.electricity, electricMapValues);
  const userGasBills = formatBillData(data.gas, gasMapValues);
  const averageElectricBills = chartData.map(item => ({ month: item.date, amount: item.electricityFee }));
  const averageGasBills = chartData.map(item => ({ month: item.date, amount: item.gasFee }));

  return (
    <div className="flex flex-col">
      <div className="py-4 text-center">
        <div className="flex flex-col justify-center gap-y-4">
          <h2 className="text-2xl">아파트 선택</h2>
          <div className="flex justify-center gap-6">
            <div className="flex place-items-center justify-center gap-2">
              <label className="text-xl">지역별</label>
              <LocationSelecter setSelectedRegion={setSelectedRegion} />
            </div>
            <div className="flex place-items-center justify-center gap-2">
              <label className="text-xl">도시별</label>
              <CitySelecter setSelectedCity={setSelectedCity} region={selectedRegion} />
            </div>
            <div className="flex place-items-center justify-center gap-2">
              <label className="text-xl">아파트</label>
              <ApartmentSelecter setSelectedApartment={setSelectedApartment} region={selectedRegion} district={selectedCity} />
            </div>
          </div>
        </div>
      </div>

      {selectedRegion && selectedCity && selectedApartment && (
        <div className="flex flex-col gap-8 mt-8">
          {isElectricityChecked && (
            <div>
              <h3 className="text-xl font-semibold mb-4">전기세 비교</h3>
              <ResultTable
                type="electricity"
                region={selectedRegion}
                district={selectedCity}
                apartment={selectedApartment}
              />
            </div>
          )}
          
          {isGasChecked && (
            <div>
              <h3 className="text-xl font-semibold mb-4">가스비 비교</h3>
              <ResultTable
                type="gas"
                region={selectedRegion}
                district={selectedCity}
                apartment={selectedApartment}
              />
            </div>
          )}

          {isWaterChecked && (
            <div>
              <h3 className="text-xl font-semibold mb-4">수도세 비교</h3>
              <ResultTable
                type="water"
                region={selectedRegion}
                district={selectedCity}
                apartment={selectedApartment}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultInteractionSection;
