"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "홈", href: "/" },
  { name: "결과", href: "/results" },
  { name: "타세대 비교", href: "/compare" }
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto flex h-12 items-center px-4 gap-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 py-1 rounded transition-colors duration-150 font-medium text-base
                ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"}
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 