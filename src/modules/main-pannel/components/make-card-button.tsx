"use client";

import { reuseableValueStore } from "@/store/reuseable-value-store";
import { userMaintenanceValueStore } from "@/store/user-maintenance-value-store";
import { Dispatch, SetStateAction } from "react";

type MakeCardButtonProps = {
  monthsDiff: number | null;
  startDate: Date;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

const MakeCardButton = ({
  monthsDiff,
  startDate,
  setDisabled,
}: MakeCardButtonProps) => {
  const initialMap = userMaintenanceValueStore((state) => state.initValues);
  const setStartMonthStore = reuseableValueStore(
    (state) => state.setStartMonth
  );

  const setMonthDiffStore = reuseableValueStore((state) => state.setMonthDiff);

  return (
    <>
      <button
        onClick={() => {
          if (monthsDiff === 0 || monthsDiff === -1) return;
          setStartMonthStore(startDate);
          setMonthDiffStore(monthsDiff || 0);
          initialMap(monthsDiff);
          setDisabled(false);
        }}
        className={`bg-black rounded-lg  w-full max-w-3xl  text-white p-2 transition-colors ${
          monthsDiff === 0 || monthsDiff === -1
            ? `cursor-not-allowed`
            : "hover:bg-gray-800 active:bg-gray-600"
        }`}
      >
        {monthsDiff === 0
          ? "날짜를 선택해주세요."
          : monthsDiff === -1
          ? "날짜 순서를 확인해주세요."
          : `총 ${monthsDiff} 개월 치의 카드 생성하기`}
      </button>
    </>
  );
};

export default MakeCardButton;
