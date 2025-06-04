import HomeInteractionSection from "@/components/main/main-interaction-section";
import MainTitleArea from "@/components/main/main-title-area";

export default function Home() {
  return (
    <div className="flex max-w-[1440px] flex-col border-2 rounded-lg my-4 mx-auto p-4">
      <MainTitleArea />
      <HomeInteractionSection />
    </div>
  );
}
