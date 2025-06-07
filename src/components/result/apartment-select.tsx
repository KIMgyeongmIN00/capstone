import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ApartmentSelecterProps = {
  setSelectedApartment: Dispatch<SetStateAction<string>>;
  region: string;
  district: string;
};

const ApartmentSelecter = ({ setSelectedApartment, region, district }: ApartmentSelecterProps) => {
  const [apartments, setApartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("region:", region, "district:", district);
    if (!region || !district) {
      setApartments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/apartments?region=${encodeURIComponent(region)}&district=${encodeURIComponent(district)}`)
      .then((res) => res.json())
      .then((data) => {
        setApartments(data.apartments || []);
        setLoading(false);
      });
  }, [region, district]);

  return (
    <div className="flex place-items-center border-2 rounded-lg p-1">
      <select
        id="apartment"
        name="apartment"
        onChange={(e) => setSelectedApartment(e.target.value)}
        disabled={loading || !district}
      >
        <option value="">아파트 선택</option>
        {apartments.map((apartment) => (
          <option key={apartment} value={apartment}>
            {apartment}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ApartmentSelecter; 