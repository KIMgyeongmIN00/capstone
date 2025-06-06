import { Dispatch, SetStateAction } from "react";
import CitySelecter from "./city-select";
import LocationSelecter from "./location-select";
import ApartmentSelecter from "./apartment-select";

type ResultPannelProps = {
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setSelectedApartment: Dispatch<SetStateAction<string>>;
  selectedRegion: string;
  selectedCity: string;
};

const ResultPannel = ({ setSelectedRegion, setSelectedCity, setSelectedApartment, selectedRegion, selectedCity }: ResultPannelProps) => {
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
              <CitySelecter setSelectedCity={setSelectedCity} region={selectedRegion} />
            </div>
            <div className="flex place-items-center justify-center gap-2">
              <label className="text-xl">아파트</label>
              <ApartmentSelecter setSelectedApartment={setSelectedApartment} region={selectedRegion} district={selectedCity} />
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
