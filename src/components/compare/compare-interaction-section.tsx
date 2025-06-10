'use client';

import { useState } from "react";
import ComparePanel from "./compare-panel";
import CompareChart from "./compare-chart";

const CompareInteractionSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("서울특별시");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedApartment, setSelectedApartment] = useState<string>("");
  const [comparisonData, setComparisonData] = useState<any>(null);

  return (
    <div className="mt-8">
      <ComparePanel
        setSelectedRegion={setSelectedRegion}
        setSelectedCity={setSelectedCity}
        setSelectedApartment={setSelectedApartment}
        selectedRegion={selectedRegion}
        selectedCity={selectedCity}
        selectedApartment={selectedApartment}
        setComparisonData={setComparisonData}
      />
      {comparisonData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">타세대 공과금 비교</h2>
          <CompareChart data={comparisonData} />
        </div>
      )}
    </div>
  );
};

export default CompareInteractionSection; 