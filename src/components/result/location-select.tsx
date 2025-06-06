import { Dispatch, SetStateAction } from "react";

type LocationSelecterProps = {
  setSelectedRegion: Dispatch<SetStateAction<string>>;
};

const LocationSelecter = ({ setSelectedRegion }: LocationSelecterProps) => {
  return (
    <div className="flex place-items-center border-2 rounded-lg p-1">
      <select
        id="location"
        name="location"
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="서울특별시">서울특별시</option>
      </select>
    </div>
  );
};

export default LocationSelecter;
