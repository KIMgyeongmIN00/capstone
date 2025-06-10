'use client';

import { useDateRangeStore } from "@/store/date-range-store";

interface MaintenanceCardProps {
  title: string;
  monthlyValue: Map<number, number>;
  setValue: (index: number, value: number) => void;
}

const MaintenanceCard = ({
  title,
  monthlyValue,
  setValue,
}: MaintenanceCardProps) => {
  const { getMonthsBetween } = useDateRangeStore();
  const months = getMonthsBetween();

  const handleInputChange = (index: number, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      setValue(index, numValue);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title} 입력</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map(({ date, index }) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              {formatDate(date)}
            </label>
            <div className="relative">
              <input
                type="text"
                value={monthlyValue.get(index)?.toLocaleString() || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                원
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceCard; 