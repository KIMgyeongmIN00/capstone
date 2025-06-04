"use client";

import MainCardArea from "./main-card-area";
import MainPannel from "./main-pannel";
import MainNextButton from "./main-next-button";
import { useState } from "react";
import { reuseableValueStore } from "@/store/reuseable-value-store";
import { differenceInMonths } from "date-fns";
import { addMonthAndFormat } from "@/modules/main-card-area/util/add-month-and-format";

const HomeInteractionSection = () => {
  // zustand에서 값과 setter를 가져옴
  const startYear = reuseableValueStore((s) => s.startYear);
  const setStartYear = reuseableValueStore((s) => s.setStartYear);
  const startMonth = reuseableValueStore((s) => s.startMonthNum);
  const setStartMonth = reuseableValueStore((s) => s.setStartMonthNum);
  const endYear = reuseableValueStore((s) => s.endYear);
  const setEndYear = reuseableValueStore((s) => s.setEndYear);
  const endMonth = reuseableValueStore((s) => s.endMonthNum);
  const setEndMonth = reuseableValueStore((s) => s.setEndMonthNum);

  // monthDiff 계산
  const startDate = new Date(startYear, startMonth - 1);
  const endDate = new Date(endYear, endMonth - 1);
  const monthDiff =
    startDate <= endDate && startYear && startMonth && endYear && endMonth
      ? differenceInMonths(endDate, startDate) + 1
      : -1;

  const addMonth = (startDate: Date | null, i: number) => {
    return addMonthAndFormat(startDate, i);
  };

  const [disabled, setDisabled] = useState<boolean>(true);
  return (
    <div className="flex flex-col">
      <MainPannel
        startYear={startYear}
        startMonth={startMonth}
        endYear={endYear}
        endMonth={endMonth}
        setStartYear={setStartYear}
        setStartMonth={setStartMonth}
        setEndYear={setEndYear}
        setEndMonth={setEndMonth}
        monthDiff={monthDiff}
        setDisabled={setDisabled}
      />
      <MainCardArea addMonth={addMonth} />
      <MainNextButton disabled={disabled} />
    </div>
  );
};

export default HomeInteractionSection;
