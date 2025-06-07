import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    { cookies: cookies() }
  );

  // region 파라미터 받기 (기본값: 서울특별시)
  const { searchParams } = req.nextUrl;
  const region = searchParams.get("region") ?? "서울특별시";

  // Supabase RPC 함수 호출 (중복 없는 District 목록)
  const { data, error } = await supabase.rpc("get_districts", { region_input: region });

  console.log(data);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ districts: (data as { District: string }[])?.map((row) => row.District) ?? [] });
} 