"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "../globals.css";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute w-full h-full bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative flex flex-col bg-white w-[800px] h-[550px] rounded-lg z-50">
        <div className="p-8">
          <div className="text-[16px]">4번째 글</div>
          <div className="mb-[10px] text-[22px]">뮤직비디오 해석하기</div>
          <textarea
            className="text-[40px] w-full mb-[30px] h-[50px]"
            placeholder="제목을 입력해주세요."
          />
          <hr
            className="w-full bg-[#7C766C] h-[1px] my-[17px]"
            style={{ color: "#7C766C", borderColor: "#7C766C" }}
          />
          <textarea
            className="mt-[30px] w-full h-[220px] overflow-y-auto"
            placeholder="내용을 입력해주세요."
          />
        </div>
        <div className="flex flex-col w-full rounded-md">
          <div
            className="h-[100px] flex justify-between  p-8 items-center rounded-md w-full"
            style={{ backgroundColor: "#F1F1F1" }}
          >
            <a className="items-start justify-start flex">남은 시간 01:03:55</a>
            <button
              className="w-[152px] h-[53px] rounded-md"
              style={{ backgroundColor: "#979797" }}
              onClick={onClose}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Writer() {
  // const router = useRouter()
  // const handleClick = () => {
  //     // 시작하기 버튼을 누르면 settings.tsx로 이동
  //     router.push('/writer');
  // };
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col my-[50px] w-full">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className="flex flex-row mx-auto w-full">
        <div className="flex flex-col w-full mx-[120px]">
          {/* <Redirection /> */}
          <div className="flex flex-row justify-between">
            <Image
              className="lg:mb-[20px] mb-0 w-[74px] lg:w-[105px] h-[24px] lg:h-[35px]"
              src="https://gloo-image-bucket.s3.amazonaws.com/archive/logo.svg"
              width="105"
              height="35"
              alt="Logo"
            />
            <div className="flex gap-x-[70px]">
              <a
                className="cursor-pointer"
                style={{ color: "#A49E90" }}
                onClick={() => router.push("/")}
              >
                글루ING
              </a>
              <a
                className="cursor-pointer font-bold"
                style={{ color: "#191919" }}
                onClick={() => router.push("/mypage/badge")}
              >
                나의 보관함
              </a>
              <a
                className="cursor-pointer"
                style={{ color: "#A49E90" }}
                onClick={() => router.push("/")}
              >
                로그아웃
              </a>
            </div>
          </div>
          <hr
            className="w-full bg-[#7C766C] h-[1px] my-[17px]"
            style={{ color: "#7C766C", borderColor: "#7C766C" }}
          />
          <div className="flex mt-[20px] justify-between flex-row my-[30px]">
            <div className="bg-black rounded-sm  flex flex-col w-[400px] h-[471px]">
              <div className="flex flex-col mx-[20px]">
                <div className="text-white mt-[34px] w-full h-[51px] text-[36px]">
                  나의 보관함
                </div>
                <div className="flex flex-col gap-y-[26px] mt-[24px]">
                  <div
                    className="flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/badge")}
                  >
                    나의 뱃지
                  </div>
                  <div
                    className="flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/book")}
                  >
                    내가 발행한 책
                  </div>
                  <div
                    className="flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/unfinished")}
                  >
                    못다쓴 책
                  </div>

                  <div
                    className="flex text-[20px] font-bold cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/settings")}
                  >
                    설정
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-[1120px]  bg-gray-800 opacity-20 rounded-sm border-black  border-1 flex flex-row h-[759px]"
              style={{ backgroundColor: "#E0D5BF", border: "1px solid black" }}
            >
              <div className="w-full  my-[30px] ml-[53px] ">
                <div className="flex flex-row items-center ">
                  <div className="w-[205px] text-black mt-[8px] text-[36px] font-bold">
                    설정
                  </div>
                </div>
                <div className="flex text-[20px] cursor-pointer mt-[20px]">
                  글쓰기 시간 변경
                </div>
                <div
                  className="flex text-[14px] cursor-pointer mt-[8px]"
                  style={{ color: "#918A7C" }}
                >
                  *주 최대 2회 변경 가능합니다. 0/2
                </div>
                <div className="w-[130px] flex flex-row gap-x-[4px]">
                  <button
                    className="rounded-md mx-auto mt-[30px] w-[64px] h-[30px] bg-white"
                    style={{ border: "1px solid gray" }}
                  >
                    AM
                  </button>
                  <button className="rounded-md mx-auto mt-[30px] w-[64px] h-[30px] bg-black text-white">
                    PM
                  </button>
                </div>
                <div className="w-full mt-[30px] items-center flex flex-row gap-x-[13px]">
                  <button
                    className="rounded-md  w-[93px] h-[45px] bg-white"
                    style={{ border: "1px solid gray" }}
                  >
                    9시
                  </button>
                  <button
                    className="rounded-md w-[148px] h-[45px] bg-white"
                    style={{ border: "1px solid gray" }}
                  >
                    00분
                  </button>
                  <a className="my-auto">부터</a>
                  <button
                    className="rounded-md w-[105px] h-[45px] bg-white"
                    style={{ border: "1px solid gray" }}
                  >
                    1시간
                  </button>
                  <a className="my-auto">동안</a>
                </div>
                <button className="rounded-md mx-auto mt-[30px] w-[148px] h-[45px] bg-black text-white">
                  변경하기
                </button>
              </div>
            </div>
            <div style={{ position: "absolute", top: "50%", left: "55%" }}>
              <Image
                className="z-9999"
                src="https://gloo-image-bucket.s3.amazonaws.com/archive/soon.png"
                width={184}
                height={53}
                alt="soon"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
