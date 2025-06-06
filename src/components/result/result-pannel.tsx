'use client';

import type { Dispatch, SetStateAction, FC } from "react";
import CitySelecter from "./city-select";
import LocationSelecter from "./location-select";
import UtilityComparisonTable from "./utility-comparison-table";

interface ResultPannelProps {
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  myUtilities?: {
    electric: number;
    gas: number;
    total: number;
  };
  averageUtilities?: {
    electric: number;
    gas: number;
    total: number;
  };
}

const ResultPannel: FC<ResultPannelProps> = ({
  setSelectedRegion,
  setSelectedCity,
  myUtilities = {
    electric: 50000,
    gas: 70000,
    total: 120000
  },
  averageUtilities = {
    electric: 45000,
    gas: 65000,
    total: 110000
  }
}: ResultPannelProps) => {
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
        <UtilityComparisonTable
          myUtilities={myUtilities}
          averageUtilities={averageUtilities}
        />
      </div>
    </div>
  );
};

export default ResultPannel;
