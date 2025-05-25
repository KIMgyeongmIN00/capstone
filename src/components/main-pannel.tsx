"use client";

import MonthPicker from "@/modules/main-pannel/month-picker";
import MakeCardButton from "./make-card-button";
import { useMonthRangePicker } from "@/modules/main-pannel/use-month-diff";
import LocationSelecter from "./location-select";
import MaintenanceCostCard from "./maintenance-cost-card";
import { addMonthAndFormat } from "@/modules/main-pannel/maintenace-cost-card/add-month-and-format";
import { useState } from "react";

const MainPannel = () => {
  const [cardNumbers, setCardNumbers] = useState<number>(0);
  const { startDate, setStartDate, endDate, setEndDate, monthsDiff } =
    useMonthRangePicker();
  return (
    <div className="flex max-w-[1440px] flex-col border-2 rounded-lg my-4 mx-auto p-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl text-center text-">[관리비 입력하기]</h1>
        <p className="text-xl text-gray-400 text-center">
          당신의 기간별 관리비를 입력하세요.
        </p>
      </div>
      <div className="pt-4">
        <h2 className="text-2xl">지역 선택</h2>
        <LocationSelecter />
      </div>
      <div className="py-4">
        <h2 className="text-2xl">기간 선택</h2>
        <MonthPicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
      {/* <div>
        <h2>관리비 선택</h2>
      </div> */}
      <MakeCardButton setCardNumbers={setCardNumbers} monthsDiff={monthsDiff} />
      <div className="pt-2 mx-auto">
        {monthsDiff !== null &&
          startDate !== null &&
          Array.from({ length: cardNumbers }).map((_, i) => (
            <MaintenanceCostCard
              key={i}
              CardDate={addMonthAndFormat(startDate, i)}
            />
          ))}
      </div>
    </div>
  );
};

export default MainPannel;
