import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function generateElectricityMonthStrings(start: Date, count: number): string[] {
  const list: string[] = [];
  let year = start.getFullYear();
  let month = start.getMonth() + 1;

  for (let i = 0; i < count; i++) {
    list.push(`${year}.${String(month).padStart(2, "0")}`);
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return Array.from(new Set(list));
}

function generateGasDateInfo(start: Date, count: number) {
  const years: Set<string> = new Set();
  const months: Set<string> = new Set();

  let year = start.getFullYear();
  let month = start.getMonth() + 1;

  for (let i = 0; i < count; i++) {
    years.add(`${year}`);
    months.add(String(month).padStart(2, "0"));
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return {
    years: Array.from(years),
    months: Array.from(months),
  };
}

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    {
      cookies: cookies(),
    }
  );

  const { searchParams } = req.nextUrl;
  const region = searchParams.get("region")!;
  const city = searchParams.get("city")!;
  const apartment = searchParams.get("apartment") ?? null;
  const start = new Date(searchParams.get("start")!);
  const count = parseInt(searchParams.get("count")!, 10);

  // 전기세
  const electMonths = generateElectricityMonthStrings(start, count);
  const electRes = await supabase.rpc("get_electricity_bills", {
    region_input: region,
    city_input: city,
    apartment_input: apartment,
    month_list: electMonths,
  });

  // 가스비
  const { years, months } = generateGasDateInfo(start, count);

  // 요청 파라미터 콘솔 출력
  console.log("요청 파라미터:", { region, city, apartment, years, months });

  const gasRes = await supabase.rpc("get_gas_bills", {
    region_input: region,
    city_input: city,
    apartment_input: apartment,
    year_list: years,
    month_list: months,
  });

  // Supabase 응답 콘솔 출력
  console.log("전기세 응답:", electRes);
  console.log("가스비 응답:", gasRes);

  return Response.json({
    electricity: electRes.data ?? [],
    gas: gasRes.data ?? [],
  });
}
