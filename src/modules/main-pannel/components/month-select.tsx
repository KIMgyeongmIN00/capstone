// import { Dispatch, SetStateAction } from "react";

type MonthSelectProps = {
  selectType: string;
  setMonthFn: (month: number) => void;
  value: number;
};

const MonthSelect = ({ selectType, setMonthFn, value }: MonthSelectProps) => {
  return (
    <div className="flex place-items-center">
      <select
        id={`${selectType}`}
        name={`${selectType}`}
        value={value}
        onChange={(e) => {
          setMonthFn(Number(e.target.value));
        }}
        className="border-2 p-2 rounded-lg"
      >
        <option value={0}>----</option>
        {Array.from({ length: 12 }).map((_, i) => (
          <option key={i} value={i + 1}>
            {String(i + 1)}
          </option>
        ))}
      </select>
      <label className="text-lg">월</label>
    </div>
  );
};

export default MonthSelect;
