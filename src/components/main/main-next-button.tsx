import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

type MainNextButtonType = {
  disabled: boolean;
};

const MainNextButton = ({ disabled }: MainNextButtonType) => {
  const router = useRouter();

  const handleClick = () => {
    Swal.fire({
      title: "관리비 입력 다 하셨나요?",
      text: "입력 내용이 저장되지 않습니다!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/results");
        Swal.fire({
          title: "수고하셨습니다!",
          text: "비교 페이지로 넘어갑니다.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="flex justify-center">
      <button
        className="text-white py-3 px-24 rounded-lg bg-black hover:bg-gray-800 active:bg-gray-600 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        onClick={handleClick}
        disabled={disabled}
      >
        비교하기
      </button>
    </div>
  );
};

export default MainNextButton;
