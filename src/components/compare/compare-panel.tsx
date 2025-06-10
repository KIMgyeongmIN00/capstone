import { Dispatch, SetStateAction } from "react";
import LocationSelecter from "../result/location-select";
import CitySelecter from "../result/city-select";
import ApartmentSelecter from "../result/apartment-select";

interface ComparePanelProps {
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setSelectedApartment: Dispatch<SetStateAction<string>>;
  selectedRegion: string;
  selectedCity: string;
  selectedApartment: string;
  setComparisonData: Dispatch<SetStateAction<any>>;
}

const ComparePanel = ({
  setSelectedRegion,
  setSelectedCity,
  setSelectedApartment,
  selectedRegion,
  selectedCity,
  selectedApartment,
  setComparisonData
}: ComparePanelProps) => {
  const handleCompare = async () => {
    if (!selectedRegion || !selectedCity || !selectedApartment) return;

    try {
      const response = await fetch(
        `/api/compare?region=${encodeURIComponent(selectedRegion)}&city=${encodeURIComponent(selectedCity)}&apartment=${encodeURIComponent(selectedApartment)}`
      );
      const data = await response.json();
      setComparisonData(data);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="py-4 text-center">
        <div className="flex flex-col justify-center gap-y-4">
          <h2 className="text-2xl">비교 대상 선택</h2>
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
          <button
            onClick={handleCompare}
            disabled={!selectedRegion || !selectedCity || !selectedApartment}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            비교하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparePanel; 