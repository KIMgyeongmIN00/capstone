"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navigationItems = [
  { name: "홈", href: "/", type: "route" },
  { name: "기능 소개", href: "#features", type: "scroll" },
  { name: "지역별 비교", href: "/compare-local", type: "route" },
  { name: "타세대 비교", href: "/compare-peer", type: "route" },
  { name: "절약 팁", href: "#tips", type: "scroll" },
  { name: "결과", href: "/results", type: "route" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // 스크롤 위치에 따른 활성 섹션 감지
  useEffect(() => {
    if (pathname !== "/") return

    const handleScroll = () => {
      const sections = ["features", "tips"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleScrollTo = (href: string) => {
    if (pathname !== "/") {
      window.location.href = `/${href}`
      return
    }

    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const isActive = (href: string, type: string) => {
    if (type === "route") {
      return pathname === href
    }
    return activeSection === href
  }

  return (
    <nav className="w-full bg-[#FFF7F2] border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex h-16 items-center px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#FFA46B] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">체</span>
          </div>
          <span className="text-xl font-bold text-gray-800 hover:text-[#FFA46B] transition-colors">체크인하우스</span>
        </Link>

        {/* 데스크톱 메뉴 - 가운데 정렬 */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 font-medium text-sm transition-colors duration-200 hover:text-[#FFA46B] ${
                    isActive(item.href, item.type) ? "text-[#FFA46B]" : "text-gray-700"
                  }`}
                >
                  {item.name}
                  {isActive(item.href, item.type) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFA46B] rounded-full" />
                  )}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleScrollTo(item.href)}
                  className={`relative px-3 py-2 font-medium text-sm transition-colors duration-200 hover:text-[#FFA46B] ${
                    isActive(item.href, item.type) ? "text-[#FFA46B]" : "text-gray-700"
                  }`}
                >
                  {item.name}
                  {isActive(item.href, item.type) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFA46B] rounded-full" />
                  )}
                </button>
              ),
            )}
          </div>
        </div>

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-[#FFA46B] transition-colors ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기/닫기"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 드로어 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFF7F2] border-t border-orange-100 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-3 py-3 font-medium text-sm transition-colors duration-200 hover:text-[#FFA46B] hover:bg-orange-50 rounded-lg ${
                    isActive(item.href, item.type) ? "text-[#FFA46B] bg-orange-50" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleScrollTo(item.href)}
                  className={`block w-full text-left px-3 py-3 font-medium text-sm transition-colors duration-200 hover:text-[#FFA46B] hover:bg-orange-50 rounded-lg ${
                    isActive(item.href, item.type) ? "text-[#FFA46B] bg-orange-50" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  )
} 