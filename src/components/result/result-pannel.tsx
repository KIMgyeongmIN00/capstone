'use client';

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import CitySelecter from "./city-select";
import LocationSelecter from "./location-select";
import ApartmentSelecter from "./apartment-select";

interface ResultPannelProps {
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setSelectedApartment: Dispatch<SetStateAction<string>>;
  selectedRegion: string;
  selectedCity: string;
  selectedApartment?: string;
}

const ResultPannel = ({ 
  setSelectedRegion, 
  setSelectedCity, 
  setSelectedApartment, 
  selectedRegion, 
  selectedCity,
  selectedApartment = ""
}: ResultPannelProps) => {
  const [apartmentInfo, setApartmentInfo] = useState<{
    maxUsableFloorArea?: number | null;
    minUsableFloorArea?: number | null;
    NOG?: number | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRegion || !selectedCity || !selectedApartment) {
      setApartmentInfo(null);
      return;
    }
    setLoading(true);
    fetch(`/api/apartment-info?region=${encodeURIComponent(selectedRegion)}&city=${encodeURIComponent(selectedCity)}&apartment=${encodeURIComponent(selectedApartment)}`)
      .then(res => res.json())
      .then(data => {
        setApartmentInfo(data.info);
        setLoading(false);
      });
  }, [selectedRegion, selectedCity, selectedApartment]);

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
        {selectedRegion && selectedCity && selectedApartment && (
          <div className="mt-4 text-center">
            {loading ? (
              <span className="text-gray-500">아파트 정보 불러오는 중...</span>
            ) : apartmentInfo ? (
              <div className="inline-block px-4 py-2 border rounded bg-gray-50 text-gray-700 text-sm">
                <span>전용면적: <b>
                  {apartmentInfo.minUsableFloorArea != null && apartmentInfo.maxUsableFloorArea != null
                    ? `${Math.round(apartmentInfo.minUsableFloorArea * 100) / 100} ~ ${Math.round(apartmentInfo.maxUsableFloorArea * 100) / 100}㎡`
                    : "-"}
                </b></span>
                <span className="mx-2">|</span>
                <span>세대수: <b>{apartmentInfo.NOG ?? "-"}</b>세대</span>
              </div>
            ) : (
              <span className="text-gray-400">아파트 정보를 선택하세요.</span>
            )}
          </div>
        )}
        <span className="text-sm text-gray-400 text-center">
          프로토타입 버전에서는 서울특별시만 지원합니다.
        </span>
      </div>
    </div>
  );
};

export default ResultPannel;
