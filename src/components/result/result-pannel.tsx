'use client';

import type { Dispatch, SetStateAction, FC } from "react";
import CitySelecter from "./city-select";
import LocationSelecter from "./location-select";
import ResultsChart from "@/modules/result-interactions-section/components/result-chart";
import { mergeEnergyData } from "@/modules/result-interactions-section/util/format-fetch-data";

interface BillData {
  month: string;
  amount: number;
}

interface ResultPannelProps {
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  userBills?: {
    electric: BillData[];
    gas: BillData[];
  };
  averageBills?: {
    electric: BillData[];
    gas: BillData[];
  };
}

const DEFAULT_BILLS = {
  electric: [],
  gas: []
};

const ResultPannel: FC<ResultPannelProps> = ({
  setSelectedRegion,
  setSelectedCity,
  userBills = DEFAULT_BILLS,
  averageBills = DEFAULT_BILLS
}) => {
  const transformToElectricityData = (bills: BillData[], city: string) => 
    bills.map(bill => ({
      자치구: city,
      연도: bill.month,
      사용료: bill.amount
    }));

  const transformToGasData = (bills: BillData[], city: string) =>
    bills.map(bill => {
      const [year, month] = bill.month.split('.');
      return {
        자치구: city,
        연도: year,
        월: `${parseInt(month)}월`,
        사용요금: bill.amount
      };
    });

  const chartData = userBills && averageBills ? mergeEnergyData(
    transformToElectricityData(averageBills.electric, "강남구"),
    transformToGasData(averageBills.gas, "강남구"),
    new Map(userBills.electric.map((bill, index) => [index, bill.amount])),
    new Map(userBills.gas.map((bill, index) => [index, bill.amount]))
  ) : [];

  return (
    <div className="flex flex-col">
      <div className="py-4 text-center">
        <div className="flex place-items-center justify-center gap-4">
          <div className="flex gap-4"></div>
        </div>
        <div className="flex flex-col justify-center gap-y-2">
          <h2 className="text-2xl">비교 대상</h2>
          <div className="flex justify-center gap-6">
            <div className="flex place-items-center justify-center gap-2">
              <label className="text-xl">지역별</label>
              <LocationSelecter setSelectedRegion={setSelectedRegion} />
            </div>
            <div className="flex place-items-center justify-center gap-2">
              <label className="text-xl">도시별</label>
              <CitySelecter setSelectedCity={setSelectedCity} />
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-400 text-center">
          프로토타입 버전에서는 서울특별시만 지원합니다.
        </span>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl mb-4 text-center">공과금 비교</h2>
        <ResultsChart chartData={chartData} />
      </div>
    </div>
  );
};

export default ResultPannel;
