'use client';

import type { FC } from 'react';

interface BillData {
  month: string;
  amount: number;
}

interface UtilityComparisonTableProps {
  title: string;
  userBills: BillData[];
  averageBills: BillData[];
}

const UtilityComparisonTable: FC<UtilityComparisonTableProps> = ({
  title,
  userBills = [],
  averageBills = [],
}: UtilityComparisonTableProps) => {
  const getDifference = (my: number, avg: number) => {
    const diff = my - avg;
    return {
      value: Math.abs(diff),
      type: diff > 0 ? '높음' : diff < 0 ? '낮음' : '동일',
      color: diff > 0 ? 'text-red-500' : diff < 0 ? 'text-blue-500' : 'text-gray-500',
    };
  };

  const calculateTotal = (bills: BillData[]) => {
    if (!Array.isArray(bills)) return 0;
    return bills.reduce((sum, bill) => sum + (bill?.amount || 0), 0);
  };

  const userTotal = calculateTotal(userBills);
  const avgTotal = calculateTotal(averageBills);

  if (!Array.isArray(userBills) || !Array.isArray(averageBills)) {
    return (
      <div className="w-full overflow-x-auto mb-8">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-center text-gray-500">데이터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">월</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">내 {title}</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">평균 {title}</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">비교 (차액)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {userBills.map((bill, index) => {
            const avgBill = averageBills[index];
            return (
              <tr key={bill.month}>
                <td className="px-6 py-4 text-sm text-gray-900">{bill.month}</td>
                <td className="px-6 py-4 text-right text-sm text-gray-900">
                  {bill.amount.toLocaleString()}원
                </td>
                <td className="px-6 py-4 text-right text-sm text-gray-900">
                  {avgBill?.amount.toLocaleString()}원
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <span className={getDifference(bill.amount, avgBill?.amount || 0).color}>
                    {`${getDifference(bill.amount, avgBill?.amount || 0).value.toLocaleString()}원 (${
                      getDifference(bill.amount, avgBill?.amount || 0).type
                    })`}
                  </span>
                </td>
              </tr>
            );
          })}
          <tr className="font-semibold bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-900">총 합계</td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">
              {userTotal.toLocaleString()}원
            </td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">
              {avgTotal.toLocaleString()}원
            </td>
            <td className="px-6 py-4 text-right text-sm">
              <span className={getDifference(userTotal, avgTotal).color}>
                {`${getDifference(userTotal, avgTotal).value.toLocaleString()}원 (${
                  getDifference(userTotal, avgTotal).type
                })`}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UtilityComparisonTable; 