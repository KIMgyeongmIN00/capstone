'use client';

import CompareTitleArea from "@/components/compare/compare-title-area";
import CompareInteractionSection from "@/components/compare/compare-interaction-section";

export default function ComparePage() {
  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8">
      <CompareTitleArea />
      <CompareInteractionSection />
    </main>
  );
} 