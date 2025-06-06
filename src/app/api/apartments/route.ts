import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    { cookies: cookies() }
  );

  const { searchParams } = req.nextUrl;
  const region = searchParams.get("region") ?? "서울특별시";
  const district = searchParams.get("district") ?? "";

  // Supabase RPC 함수 호출 (중복 없는 아파트 목록)
  const { data, error } = await supabase.rpc("get_apartments", {
    region_input: region,
    district_input: district
  });

  console.log(data)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ apartments: (data as { "Complex Name": string }[])?.map((row) => row["Complex Name"]) ?? [] });
} 