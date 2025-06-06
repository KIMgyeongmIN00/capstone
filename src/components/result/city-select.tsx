import { Dispatch, SetStateAction, useEffect, useState } from "react";

type CitySelecterProps = {
  setSelectedCity: Dispatch<SetStateAction<string>>;
  region?: string; // 시/도 값, 기본값은 '서울특별시'
};

const CitySelecter = ({ setSelectedCity, region = "서울특별시" }: CitySelecterProps) => {
  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cities?region=${encodeURIComponent(region)}`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts || []);
        setLoading(false);
      });
  }, [region]);

  return (
    <div className="flex place-items-center border-2 rounded-lg p-1">
      <select
        id="seoul-gu"
        name="seoul-gu"
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={loading}
      >
        <option value="">구 선택</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelecter;
