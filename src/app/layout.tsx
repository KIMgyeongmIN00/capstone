import type { Metadata } from "next";
import localFont from "next/font/local";
import TQProvider from "@/providers/tq-provider";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

const pretendard = localFont({
  src: "../../public/fonts/pretendard-variable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "체크인하우스",
  // description: "나중에 여기 프로젝트 설명 채우세요.",
  // metadataBase: new URL("사이트 링크"),
  // openGraph: {
  //   title: "제목",
  //   description: "설명",
  //   url: "링크",
  //   siteName: "체크인하우스",
  //   images: [
  //     {
  //       url: "/images/퍼블릭폴더 내부 파일 이름",
  //       alt: "체크인하우스",
  //     },
  //   ],
  //   type: "website",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className={`${pretendard.variable} antialiased`}>
        <TQProvider>{children}</TQProvider>
      </body>
    </html>
  );
}
