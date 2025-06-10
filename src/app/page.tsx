'use client';

import { useRouter } from 'next/navigation';
import { useMaintenanceTypeStore } from "@/store/maintenance-type-store";
import MaintenanceTypeCheckArea from "@/components/main/maintenance-type-check-area";

export default function Home() {
  const router = useRouter();
  const { isElectricityChecked, isGasChecked, isWaterChecked } = useMaintenanceTypeStore();

  const hasSelectedUtility = isElectricityChecked || isGasChecked || isWaterChecked;

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">우리집 공과금 비교하기</h1>
      <MaintenanceTypeCheckArea />
      <button
        onClick={() => router.push('/results')}
        disabled={!hasSelectedUtility}
        className={`mt-8 px-8 py-4 rounded-lg text-lg font-semibold transition-colors ${
          hasSelectedUtility
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {hasSelectedUtility ? "결과 보기" : "공과금을 선택해주세요"}
      </button>
    </main>
  );
}
