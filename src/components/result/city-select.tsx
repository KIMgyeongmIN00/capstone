import { Dispatch, SetStateAction } from "react";

type CitySelecterProps = {
  setSelectedCity: Dispatch<SetStateAction<string>>;
};

const CitySelecter = ({ setSelectedCity }: CitySelecterProps) => {
  return (
    <div className="flex place-items-center border-2 rounded-lg p-1">
      <select
        id="seoul-gu"
        name="seoul-gu"
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="강남구">서울 강남구</option>
        <option value="강동구">서울 강동구</option>
        <option value="강북구">서울 강북구</option>
        <option value="강서구">서울 강서구</option>
        <option value="관악구">서울 관악구</option>
        <option value="광진구">서울 광진구</option>
        <option value="구로구">서울 구로구</option>
        <option value="금천구">서울 금천구</option>
        <option value="노원구">서울 노원구</option>
        <option value="도봉구">서울 도봉구</option>
        <option value="동대문구">서울 동대문구</option>
        <option value="동작구">서울 동작구</option>
        <option value="마포구">서울 마포구</option>
        <option value="서내문구">서울 서내문구</option>
        <option value="서초구">서울 서초구</option>
        <option value="성동구">서울 성동구</option>
        <option value="성북구">서울 성북구</option>
        <option value="송파구">서울 송파구</option>
        <option value="양천구">서울 양천구</option>
        <option value="영등포구">서울 영등포구</option>
        <option value="용산구">서울 용산구</option>
        <option value="은평구">서울 은평구</option>
        <option value="종로구">서울 종로구</option>
        <option value="중구">서울 중구</option>
        <option value="중랑구">서울 중랑구</option>
      </select>
    </div>
  );
};

export default CitySelecter;
