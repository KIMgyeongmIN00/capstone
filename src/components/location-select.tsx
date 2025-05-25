const LocationSelecter = () => {
  return (
    <div className="flex place-items-center">
      <label className="text-lg">서울시 자치구 선택:</label>
      <select id="seoul-gu" name="seoul-gu">
        <option value="gangnam">서울 강남구</option>
        <option value="gangdong">서울 강동구</option>
        <option value="gangbuk">서울 강북구</option>
        <option value="gangseo">서울 강서구</option>
        <option value="gwanak">서울 관악구</option>
        <option value="gwangjin">서울 광진구</option>
        <option value="guro">서울 구로구</option>
        <option value="geumcheon">서울 금천구</option>
        <option value="nowon">서울 노원구</option>
        <option value="dobong">서울 도봉구</option>
        <option value="dongdaemun">서울 동대문구</option>
        <option value="dongjak">서울 동작구</option>
        <option value="mapo">서울 마포구</option>
        <option value="seodaemun">서울 서대문구</option>
        <option value="seocho">서울 서초구</option>
        <option value="seongdong">서울 성동구</option>
        <option value="seongbuk">서울 성북구</option>
        <option value="songpa">서울 송파구</option>
        <option value="yangcheon">서울 양천구</option>
        <option value="yeongdeungpo">서울 영등포구</option>
        <option value="yongsan">서울 용산구</option>
        <option value="eunpyeong">서울 은평구</option>
        <option value="jongno">서울 종로구</option>
        <option value="jung">서울 중구</option>
        <option value="jungnang">서울 중랑구</option>
      </select>
    </div>
  );
};

export default LocationSelecter;
