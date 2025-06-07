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
  const city = searchParams.get("city") ?? "";
  const apartment = searchParams.get("apartment") ?? "";

  const { data, error } = await supabase.rpc("get_apartment_info", {
    region_input: region,
    city_input: city,
    apartment_input: apartment,
  });

  console.log(data[0])

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ info: data?.[0] ?? null });
} 