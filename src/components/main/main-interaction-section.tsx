"use client";

import { useMonthRange } from "@/modules/main-pannel/util/use-month-diff";
import MainCardArea from "./main-card-area";
import MainPannel from "./main-pannel";
import MainNextButton from "./main-next-button";
import { useState } from "react";

const HomeInteractionSection = () => {
  const {
    startYear,
    startMonth,
    setStartYear,
    setStartMonth,
    setEndYear,
    setEndMonth,
    monthDiff,
    addMonth,
  } = useMonthRange();

  const [disabled, setDisabled] = useState<boolean>(true);
  return (
    <div className="flex flex-col">
      <MainPannel
        startYear={startYear}
        startMonth={startMonth}
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
