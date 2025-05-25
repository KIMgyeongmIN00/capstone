type MaintenanceCostCardProps = { CardDate: string };

const MaintenanceCostCard = ({ CardDate }: MaintenanceCostCardProps) => {
  return (
    <div className="flex flex-col border w-fit border-black rounded-lg p-2 my-2">
      <h3>{String(CardDate)} 공과금 입력</h3>
      <div className="flex gap-4">
        <div>
          <label htmlFor="electric">전기세 : </label>
          <input
            id="electric"
            className="border-b-2 border-black w-36 placeholder:text-sm"
            placeholder="전기세를 입력해주세요."
          ></input>
        </div>
        <div>
          <label htmlFor="gas">가스비 : </label>
          <input
            id="gas"
            className="border-b-2 border-black w-36 placeholder:text-sm"
            placeholder="가스비를 입력해주세요."
          ></input>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCostCard;
