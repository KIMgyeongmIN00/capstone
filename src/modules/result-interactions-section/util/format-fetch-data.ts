// 데이터 타입 정의
interface ElectricityData {
  자치구: string;
  연도: string; // 'yyyy.mm' 형식
  사용료: number;
}

interface GasData {
  사용요금: number;
  자치구: string;
  연도: string; // '2022' 형식
  월: string; // '1월' 형식
}

export interface MergedEnergyData {
  date: string; // 'yyyy.mm' 형식
  gasFee: number;
  electricityFee: number;
  clientGasValue: number;
  clientElectricityValue: number;
}

// 유틸리티 함수
export const mergeEnergyData = (
  electricityData: ElectricityData[],
  gasData: GasData[],
  clientElectricityMap: Map<number, number>, // Map<index, value>
  clientGasMap: Map<number, number> // Map<index, value>
): MergedEnergyData[] => {
  // 1. Gas 데이터 변환
  const transformedGas = gasData.map((gas) => {
    const month = gas.월.replace("월", "").padStart(2, "0");
    return {
      date: `${gas.연도}.${month}`,
      fee: gas.사용요금,
    };
  });

  // 2. Electricity 데이터 변환
  const transformedElectricity = electricityData.map((elec) => ({
    date: elec.연도,
    fee: elec.사용료,
  }));

  // 3. 병합을 위한 Map 생성
  const resultMap = new Map<
    string,
    Omit<MergedEnergyData, "clientGasValue" | "clientElectricityValue">
  >();

  // 4. Electricity 데이터 추가
  transformedElectricity.forEach((item) => {
    resultMap.set(item.date, {
      date: item.date,
      electricityFee: item.fee,
      gasFee: 0,
    });
  });

  // 5. Gas 데이터 추가/병합
  transformedGas.forEach((item) => {
    if (resultMap.has(item.date)) {
      const existing = resultMap.get(item.date)!;
      resultMap.set(item.date, {
        ...existing,
        gasFee: item.fee,
      });
    } else {
      resultMap.set(item.date, {
        date: item.date,
        gasFee: item.fee,
        electricityFee: 0,
      });
    }
  });

  // 6. 날짜순 정렬 및 기본 배열 생성
  const sortedArray = Array.from(resultMap.values()).sort((a, b) => {
    const [aYear, aMonth] = a.date.split(".").map(Number);
    const [bYear, bMonth] = b.date.split(".").map(Number);
    return aYear - bYear || aMonth - bMonth;
  });

  const allowDates = transformedElectricity.map((e) => e.date);

  // 7. 클라이언트 데이터 추가 (Map 직접 사용)
  return sortedArray
    .map((item, index) => ({
      ...item,
      electricityFee: Math.round(item.electricityFee),
      gasFee: Math.round(item.gasFee),
      clientGasValue: Math.round(clientGasMap.get(index) ?? 0),
      clientElectricityValue: Math.round(clientElectricityMap.get(index) ?? 0),
    }))
    .filter((item) => allowDates.includes(item.date));
};
