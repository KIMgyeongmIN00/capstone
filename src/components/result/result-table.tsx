'use client';

import { useEffect, useState } from "react";

interface ResultTableProps {
  type: 'electricity' | 'gas' | 'water';
  region: string;
  district: string;
  apartment: string;
}

interface BillData {
  month: number;
  userBill: number;
  averageBill: number;
  difference: number;
}

const ResultTable = ({ type, region, district, apartment }: ResultTableProps) => {
  const [data, setData] = useState<BillData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/${type}?region=${encodeURIComponent(region)}&district=${encodeURIComponent(district)}&apartment=${encodeURIComponent(apartment)}`
        );
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, region, district, apartment]);

  if (isLoading) {
    return <div className="text-center py-4">데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">월</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">우리집</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">평균</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">차이</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.month}>
              <td className="px-6 py-4 whitespace-nowrap">{item.month}월</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.userBill.toLocaleString()}원</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.averageBill.toLocaleString()}원</td>
              <td className={`px-6 py-4 whitespace-nowrap ${item.difference > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {item.difference > 0 ? '+' : ''}{item.difference.toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable; 