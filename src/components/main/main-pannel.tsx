"use client";

import { Dispatch, SetStateAction } from "react";
import YearSelect from "@/modules/main-pannel/components/year-select";
import MonthSelect from "@/modules/main-pannel/components/month-select";
import MaintenanceTypeCheckArea from "@/modules/main-pannel/components/maintenance-type-check-area";
import MakeCardButton from "@/modules/main-pannel/components/make-card-button";

type MainPannelProps = {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  setStartYear: (year: number) => void;
  setStartMonth: (month: number) => void;
  setEndYear: (year: number) => void;
  setEndMonth: (month: number) => void;
  monthDiff: number;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

const MainPannel = ({
  startYear,
  startMonth,
  endYear,
  endMonth,
  setStartYear,
  setStartMonth,
  setEndYear,
  setEndMonth,
  monthDiff,
  setDisabled,
}: MainPannelProps) => {
  const startDate = new Date(startYear, startMonth - 1);
  return (
    <div className="flex flex-col">
      <div className="pt-4 text-center">
        <MaintenanceTypeCheckArea />
      </div>
      <div className="py-4 text-center">
        <h2 className="text-2xl">기간 선택</h2>
        <div className="flex flex-col sm:flex-row place-items-center justify-center gap-4">
          <div className="flex gap-4">
            <YearSelect selectType="startYear" setYearFn={setStartYear} value={startYear} />
            <MonthSelect selectType="startMonth" setMonthFn={setStartMonth} value={startMonth} />
          </div>
          <span className="text-lg font-bold">-</span>
          <div className="flex gap-4">
            <YearSelect selectType="endYear" setYearFn={setEndYear} value={endYear} />
            <MonthSelect selectType="endMonth" setMonthFn={setEndMonth} value={endMonth} />
          </div>
        </div>
        <span className="text-sm text-gray-400 text-center">
          본 서비스는 2022년 1월부터 2024년 12월까지 지원합니다.
        </span>
      </div>
      <div className="flex justify-center w-full">
        <MakeCardButton
          monthsDiff={monthDiff}
          startDate={startDate}
          setDisabled={setDisabled}
        />
      </div>
    </div>
  );
};

export default MainPannel;
