import Link from "next/link"
import { MapPin, Users, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="hero" className="pt-16 pb-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#FFA46B]">체크인 하우스</span>
            <span className="text-gray-800">로</span>
            <br />
            <span className="text-gray-800">우리 집 공과금 확인하기</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            지역 평균과 비슷한 조건의 다른 세대들과 비교해보고
            <br />
            맞춤형 절약 팁으로 공과금을 줄여보세요
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/compare-local"
              className="bg-[#FFA46B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-500 transition-colors"
            >
              지역별 비교하기
            </Link>
            <Link
              href="/compare-peer"
              className="border-2 border-[#FFA46B] text-[#FFA46B] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors"
            >
              타세대 비교하기
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-[#FFA46B] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">지역별 비교</h3>
              <p className="text-gray-600 leading-relaxed">같은 지역 거주자들과 비교해 현재 사용량이 높은지 확인</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-[#FFA46B] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">타세대 비교</h3>
              <p className="text-gray-600 leading-relaxed">비슷한 조건의 세대들과 비교해 과소비 여부 확인</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-[#FFA46B] rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">맞춤형 절약 팁</h3>
              <p className="text-gray-600 leading-relaxed">사용 패턴에 따른 개인화된 절약 방법 제공</p>
            </div>
          </div>
        </div>
      </section>

      {/* 공과금 비교 방식 Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">공과금 비교 방식</h2>
            <p className="text-xl text-gray-600">
              정확하고 신뢰할 수 있는 데이터를 바탕으로 다양한 방식의 비교 분석을 제공합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 비교 가능한 공과금 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">비교 가능한 공과금</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-lg border-l-4 border-yellow-400">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">전기세</h4>
                    <p className="text-gray-600">월 사용량(kWh) 또는 납부 금액 기준</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-lg border-l-4 border-orange-400">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">🔥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">가스비</h4>
                    <p className="text-gray-600">사용량(㎥) 또는 납부 금액 기준</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 분석 방법 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">분석 방법</h3>

              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#FFA46B] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">시계열 분석</h4>
                  </div>
                  <p className="text-gray-600">6개월간의 사용량 추이를 분석하여 지역 평균과 비교</p>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#FFA46B] rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">패턴별 분석</h4>
                  </div>
                  <p className="text-gray-600">유사 조건 세대 중 상위 및 하위 해당하는지 분석</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">기능 소개</h2>
            <p className="text-xl text-gray-600">체크인하우스의 공과금 비교 서비스를 소개합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#FFA46B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">정확한 비교</h3>
              <p className="text-gray-600">실제 데이터를 기반으로 한 정확한 공과금 비교 서비스</p>
            </div>

            <div className="text-center p-6 rounded-lg border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#FFA46B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">지역별 분석</h3>
              <p className="text-gray-600">거주 지역 기준으로 세밀한 공과금 분석 제공</p>
            </div>

            <div className="text-center p-6 rounded-lg border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#FFA46B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">절약 팁</h3>
              <p className="text-gray-600">개인 맞춤형 절약 방법과 실용적인 팁 제공</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section id="tips" className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">절약 팁</h2>
            <p className="text-xl text-gray-600">공과금을 줄이는 실용적인 방법들</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold mb-2">전기 절약</h3>
              <p className="text-sm text-gray-600">LED 전구 교체, 대기전력 차단 등</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="font-semibold mb-2">가스 절약</h3>
              <p className="text-sm text-gray-600">보일러 온도 조절, 단열 개선 등</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="font-semibold mb-2">수도 절약</h3>
              <p className="text-sm text-gray-600">절수 기기 설치, 누수 점검 등</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">스마트 관리</h3>
              <p className="text-sm text-gray-600">스마트 플러그, 타이머 활용 등</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
