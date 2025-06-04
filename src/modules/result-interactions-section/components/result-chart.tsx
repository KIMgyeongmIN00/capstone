/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { MergedEnergyData } from "../util/format-fetch-data";
import { reuseableValueStore } from "@/store/reuseable-value-store";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  const [yyyy, mm] = label.split(".").map(Number);

  const getFormatName = (key: string): string => {
    switch (key) {
      case "gasFee":
        return "평균 가스비";
      case "clientGasValue":
        return "내 가스비";
      case "electricityFee":
        return "전기세";
      case "clientElectricityValue":
        return "내 전기세";
      default:
        return "알 수 없는 항목";
    }
  };

  return (
    <div className="p-2 bg-white border rounded shadow text-sm space-y-1">
      <p className="font-bold">
        {yyyy}년 {mm}월
      </p>
      {payload.map((entry: any, index: any) => (
        <p key={index} style={{ color: entry.color }}>
          {getFormatName(entry.name)} : {entry.value}원
        </p>
      ))}
    </div>
  );
};

type ResultsChartProps = {
  chartData: MergedEnergyData[];
};

const ResultsChart = ({ chartData }: ResultsChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isGasChecked = reuseableValueStore((state) => state.isGasChecked);
  const isElectricityChecked = reuseableValueStore(
    (state) => state.isElectricityChecked
  );

  const handleMouseMove = (state: any) => {
    if (state?.activeTooltipIndex !== undefined) {
      setActiveIndex(state.activeTooltipIndex);
    }
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={chartData}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis dataKey="date" padding={{ left: 100, right: 100 }} />
          <YAxis padding={{ top: 20, bottom: 20 }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#ccc", strokeWidth: 1 }}
          />
          {isGasChecked && (
            <>
              <Line
                type="linear"
                dataKey="gasFee"
                stroke="#ff3232"
                strokeWidth={3}
                dot={true}
              />
              <Line
                type="linear"
                dataKey="clientGasValue"
                stroke="#ff7300"
                strokeWidth={3}
                dot={true}
              />
            </>
          )}
          {isElectricityChecked && (
            <>
              <Line
                type="linear"
                dataKey="electricityFee"
                stroke="#0084ff"
                strokeWidth={3}
                dot={true}
              />
              <Line
                type="linear"
                dataKey="clientElectricityValue"
                stroke="#0014ca"
                strokeWidth={2}
                dot={true}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
