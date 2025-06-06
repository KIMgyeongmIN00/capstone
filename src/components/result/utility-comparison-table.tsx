'use client';

import type { FC } from 'react';

interface UtilityComparisonTableProps {
  myUtilities: {
    electric: number;
    gas: number;
    total: number;
  };
  averageUtilities: {
    electric: number;
    gas: number;
    total: number;
  };
}

const UtilityComparisonTable: FC<UtilityComparisonTableProps> = ({
  myUtilities,
  averageUtilities,
}: UtilityComparisonTableProps) => {
  const getDifference = (my: number, avg: number) => {
    const diff = my - avg;
    return {
      value: Math.abs(diff),
      type: diff > 0 ? '높음' : diff < 0 ? '낮음' : '동일',
      color: diff > 0 ? 'text-red-500' : diff < 0 ? 'text-blue-500' : 'text-gray-500',
    };
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">항목</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">내 공과금</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">평균 공과금</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">비교 (차액)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td className="px-6 py-4 text-sm text-gray-900">전기세</td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">{myUtilities.electric.toLocaleString()}원</td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">{averageUtilities.electric.toLocaleString()}원</td>
            <td className="px-6 py-4 text-right text-sm">
              <span className={getDifference(myUtilities.electric, averageUtilities.electric).color}>
                {`${getDifference(myUtilities.electric, averageUtilities.electric).value.toLocaleString()}원 (${
                  getDifference(myUtilities.electric, averageUtilities.electric).type
                })`}
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm text-gray-900">가스비</td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">{myUtilities.gas.toLocaleString()}원</td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">{averageUtilities.gas.toLocaleString()}원</td>
            <td className="px-6 py-4 text-right text-sm">
              <span className={getDifference(myUtilities.gas, averageUtilities.gas).color}>
                {`${getDifference(myUtilities.gas, averageUtilities.gas).value.toLocaleString()}원 (${
                  getDifference(myUtilities.gas, averageUtilities.gas).type
                })`}
              </span>
            </td>
          </tr>
          <tr className="font-semibold">
            <td className="px-6 py-4 text-sm text-gray-900">총 합계</td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">{myUtilities.total.toLocaleString()}원</td>
            <td className="px-6 py-4 text-right text-sm text-gray-900">{averageUtilities.total.toLocaleString()}원</td>
            <td className="px-6 py-4 text-right text-sm">
              <span className={getDifference(myUtilities.total, averageUtilities.total).color}>
                {`${getDifference(myUtilities.total, averageUtilities.total).value.toLocaleString()}원 (${
                  getDifference(myUtilities.total, averageUtilities.total).type
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