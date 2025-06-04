// 전기세 날짜 목록 생성 함수
export const generateElectricityMonthStrings = (
  startDate: Date,
  count: number
): string[] => {
  const list: string[] = [];
  let year = startDate.getFullYear();
  let month = startDate.getMonth() + 1;

  for (let i = 0; i < count; i++) {
    list.push(`${year}.${month}`);
    list.push(`${year}.${String(month).padStart(2, "0")}`);

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return Array.from(new Set(list));
};

// 가스비 날짜 목록 생성 함수
export const generateGasDateInfo = (
  startDate: Date,
  count: number
): { years: number[]; months: string[] } => {
  const years: Set<number> = new Set();
  const months: Set<string> = new Set();

  let year = startDate.getFullYear();
  let month = startDate.getMonth() + 1;

  for (let i = 0; i < count; i++) {
    years.add(year);
    months.add(`${month}월`);

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
};
