"use client";

import ResultTitleArea from "@/components/result/result-title-area";
import ResultInteractionSection from "@/components/result/result-interaction-section";

const Results = () => {
  return (
    <div className="flex max-w-[1440px] flex-col border-2 rounded-lg my-4 mx-auto p-4">
      <ResultTitleArea />
      <ResultInteractionSection />
    </div>
  );
};

export default Results;
