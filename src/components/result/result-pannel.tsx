'use client';

import type { Dispatch, SetStateAction, FC } from "react";
import CitySelecter from "./city-select";
import LocationSelecter from "./location-select";

interface ResultPannelProps {
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
}

const ResultPannel: FC<ResultPannelProps> = ({
  setSelectedRegion,
  setSelectedCity,
}) => {
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
    </div>
  );
};

export default ResultPannel;
