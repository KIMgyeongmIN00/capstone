import { addMonths, format } from "date-fns";

export const addMonthAndFormat = (
  date: Date | null,
  monthToAdd: number
): string | undefined => {
  if (date === null) return;
  const newDate = addMonths(date, monthToAdd);
  return format(newDate, "yyyy년 MM월");
};
