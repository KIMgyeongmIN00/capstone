"use client";

import { userMaintenanceValueStore } from "@/store/user-maintenance-value-store";
import { Dispatch, SetStateAction } from "react";

type MakeCardButtonProps = {
  monthsDiff: number | null;
  setCardNumbers: Dispatch<SetStateAction<number>>;
};

const MakeCardButton = ({
  monthsDiff,
  setCardNumbers,
}: MakeCardButtonProps) => {
  const initialMap = userMaintenanceValueStore((state) => state.initValues);
  return (
    <button
      onClick={() => {
        setCardNumbers(monthsDiff || 0);
        initialMap(monthsDiff);
      }}
      className={`bg-black rounded-lg hover:bg-gray-800 active:bg-gray-600 text-white p-2 transition-colors ${
        monthsDiff === null && `pointer-events-none`
      }`}
    >
      {monthsDiff
        ? `총 ${monthsDiff} 개월 치의 카드 생성하기`
        : "날짜를 선택해주세요."}
    </button>
  );
};

export default MakeCardButton;
