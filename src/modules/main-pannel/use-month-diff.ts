import { useState } from "react";
import { differenceInMonths } from "date-fns";

export function useMonthRangePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const monthsDiff =
    startDate && endDate ? differenceInMonths(endDate, startDate) + 1 : null;

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    monthsDiff,
  };
}
