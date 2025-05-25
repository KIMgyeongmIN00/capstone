"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, SetStateAction } from "react";

type MonthPickerProps = {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
};

export default function MonthPicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: MonthPickerProps) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <label>시작 날짜: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          showFullMonthYearPicker
          placeholderText="년도/월 선택"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>종료 날짜: </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          showFullMonthYearPicker
          placeholderText="년도/월 선택"
        />
      </div>
    </div>
  );
}
