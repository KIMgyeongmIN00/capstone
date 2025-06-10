"use client";

import { useMaintenanceTypeStore } from "@/store/maintenance-type-store";
import ResultTitleArea from "@/components/result/result-title-area";
import ResultInteractionSection from "@/components/result/result-interaction-section";

export default function ResultPage() {
  const { isElectricityChecked, isGasChecked, isWaterChecked } = useMaintenanceTypeStore();

  // 선택된 공과금이 없는 경우 안내 메시지 표시
  if (!isElectricityChecked && !isGasChecked && !isWaterChecked) {
    return (
      <main className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">선택된 공과금이 없습니다</h1>
          <p className="text-gray-600">
            홈 화면에서 비교하고 싶은 공과금 종류를 선택해주세요.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8">
      <ResultTitleArea />
      <ResultInteractionSection />
    </main>
  );
}
