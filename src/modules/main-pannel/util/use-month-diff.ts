import { useState } from "react";
import { differenceInMonths } from "date-fns";
import { addMonthAndFormat } from "@/modules/main-card-area/util/add-month-and-format";

export const useMonthRange = () => {
  const [startYear, setStartYear] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [endMonth, setEndMonth] = useState(0);

  const startDate = new Date(startYear, startMonth - 1);
  const endDate = new Date(endYear, endMonth - 1);

  const monthDiff =
    startDate <= endDate
      ? startYear &&
        startMonth &&
        endYear &&
        endMonth &&
        differenceInMonths(endDate, startDate) + 1
      : -1;

  const addMonth = (startDate: Date | null, i: number) => {
    return addMonthAndFormat(startDate, i);
  };

  return {
    startYear,
    startMonth,
    endYear,
    endMonth,
    setStartYear,
    setStartMonth,
    setEndYear,
    setEndMonth,
    monthDiff,
    addMonth,
  };
};
