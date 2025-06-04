import { Dispatch, SetStateAction } from "react";

type YearSelectProps = {
  selectType: string;
  setYearFn: Dispatch<SetStateAction<number>>;
};

const YearSelect = ({ selectType, setYearFn }: YearSelectProps) => {
  return (
    <div className="flex place-items-center">
      <select
        id={`${selectType}`}
        name={`${selectType}`}
        onChange={(e) => {
          setYearFn(Number(e.target.value));
        }}
        className="border-2 p-2 rounded-lg"
      >
        <option value={0}>----</option>
        {Array.from({ length: 3 }).map((_, i) => (
          <option key={i} value={2022 + i}>
            {String(2022 + i)}
          </option>
        ))}
      </select>
      <label className="text-lg">년</label>
    </div>
  );
};

export default YearSelect;
