"use client";

import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const chartData = [
  { month: "1월", barValue: 100, lineValue: 200 },
  { month: "2월", barValue: 150, lineValue: 220 },
  { month: "3월", barValue: 90, lineValue: 250 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-2 bg-white border rounded shadow">
      <p>{label}</p>
      <p>값: {payload[0].value}</p>
    </div>
  );
};

const Results = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseMove = (state) => {
    if (state?.activeTooltipIndex !== undefined) {
      setActiveIndex(state.activeTooltipIndex);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={chartData}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="barValue" fill="#8884d8" opacity={() => activeIndex} />
        <Line type="monotone" dataKey="lineValue" stroke="#ff7300" dot={true} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Results;
