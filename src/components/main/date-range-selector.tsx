'use client';

import { useDateRangeStore } from "@/store/date-range-store";
import { useState } from "react";

const DateRangeSelector = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDateRangeStore();
  const [error, setError] = useState<string | null>(null);

  // 선택 가능한 연도 범위
  const years = Array.from({ length: 4 }, (_, i) => 2022 + i);
  // 월 배열
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleStartDateChange = (year: number, month: number) => {
    const newStartDate = new Date(year, month - 1);
    const minDate = new Date(2022, 0); // 2022년 1월
    const maxDate = new Date(2025, 3); // 2025년 4월

    if (newStartDate < minDate || newStartDate > maxDate) {
      setError("2022년 1월부터 2025년 4월 사이의 날짜를 선택해주세요.");
      return;
    }

    if (newStartDate > endDate) {
      setError("시작 날짜는 종료 날짜보다 이전이어야 합니다.");
      return;
    }

    setError(null);
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (year: number, month: number) => {
    const newEndDate = new Date(year, month - 1);
    const minDate = new Date(2022, 0); // 2022년 1월
    const maxDate = new Date(2025, 3); // 2025년 4월

    if (newEndDate < minDate || newEndDate > maxDate) {
      setError("2022년 1월부터 2025년 4월 사이의 날짜를 선택해주세요.");
      return;
    }

    if (newEndDate < startDate) {
      setError("종료 날짜는 시작 날짜보다 이후여야 합니다.");
      return;
    }

    setError(null);
    setEndDate(newEndDate);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-semibold">기간 선택</h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <select
            value={startDate.getFullYear()}
            onChange={(e) => handleStartDateChange(Number(e.target.value), startDate.getMonth() + 1)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select
            value={startDate.getMonth() + 1}
            onChange={(e) => handleStartDateChange(startDate.getFullYear(), Number(e.target.value))}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
        <span className="text-gray-500">부터</span>
        <div className="flex items-center gap-2">
          <select
            value={endDate.getFullYear()}
            onChange={(e) => handleEndDateChange(Number(e.target.value), endDate.getMonth() + 1)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select
            value={endDate.getMonth() + 1}
            onChange={(e) => handleEndDateChange(endDate.getFullYear(), Number(e.target.value))}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
        <span className="text-gray-500">까지</span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DateRangeSelector; 