import { addMonths, format } from "date-fns";

export function addMonthAndFormat(date: Date, monthToAdd: number): string {
  const newDate = addMonths(date, monthToAdd);
  return format(newDate, "yyyy년 MM월");
}
