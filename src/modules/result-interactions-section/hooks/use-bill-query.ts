import { useQuery } from "@tanstack/react-query";

type BillsParams = {
  region: string;
  city: string;
  start: Date;
  count: number;
};

export const useBillsQuery = ({ region, city, start, count }: BillsParams) => {
  return useQuery({
    queryKey: ["bills", region, city, start?.toISOString?.() ?? start, count],
    queryFn: async () => {
      const query = new URLSearchParams({
        region,
        city,
        start: start.toISOString(),
        count: count.toString(),
      });

      const res = await fetch(`/api/bills?${query}`);
      if (!res.ok) throw new Error("데이터 요청 실패");

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
