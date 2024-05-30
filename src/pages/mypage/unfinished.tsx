"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "../globals.css";
import { useAtom } from "jotai";
import { loginAtom, userInfoAtom, writingDataAtom } from "../atoms";
import Image from "next/image";
import BookItem from "../../components/BookItem";
import { getCookie } from "..";

export default function UnfinishedBook() {
  const router = useRouter();
  const accessToken = getCookie("access_token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginState, setLoginState] = useAtom(loginAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [writingData, setWritingData] = useAtom(writingDataAtom);

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
        <div className="flex flex-col w-full mx-[120px] sm:max-w-[682px] lg:max-w-none">
          <div className="flex flex-row justify-between sm:max-w-[682px] lg:max-w-none lg:w-full">
            <Image
              className="cursor-pointer lg:mb-[20px] mb-0 w-[74px] lg:w-[105px] h-[24px] lg:h-[35px]"
              src="https://gloo-image-bucket.s3.amazonaws.com/archive/logo.svg"
              width="105"
              height="35"
              alt="Logo"
            />
            <Image
              className="lg:hidden block h-[18px] w-[18px]"
              src="https://gloo-image-bucket.s3.amazonaws.com/archive/Group 57.png"
              width={18}
              height={18}
              alt="menu"
            />
            <div className="hidden lg:block flex-row">
              <a
                className="lg:pr-10 cursor-pointer"
                onClick={() =>
                  router.push({
                    pathname: "/glooing",
                    query: { access_token: accessToken },
                  })
                }
              >
                글루ING
              </a>
              <a
                className="lg:pr-10 cursor-pointer font-bold"
                onClick={() =>
                  router.push({
                    pathname: "/mypage/badgeList",
                    query: { access_token: accessToken },
                  })
                }
              >
                나의 보관함
              </a>
              <a className="cursor-pointer" onClick={() => router.push("/")}>
                {loginState.isLoggedIn == true ? "로그아웃" : "로그인"}
              </a>
            </div>
          </div>
          <hr
            className="lg:block hidden w-full bg-[#7C766C] h-[1px] sm:my-[17px] lg:my-0"
            style={{ color: "#7C766C", borderColor: "#7C766C" }}
          />
          <div className="flex mt-[20px] justify-between  lg:flex-row flex-col my-[30px]">
            <div className="lg:bg-black rounded-sm flex flex-col w-full lg:w-[400px] h-[130px] lg:h-[471px]">
              <div className="flex flex-col lg:mx-[20px]">
                <div className="text-black lg:text-white lg:mt-[34px] mt-[20px] w-full lg:h-[51px] h-[40px] text-[25px] lg:text-[36px] font-bold lg:font-normal">
                  나의 보관함
                </div>
                <div className="flex flex-col lg:gap-y-[26px] mt-[24px]">
                  <div
                    className="hidden lg:flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/badgeList")}
                  >
                    나의 뱃지
                  </div>
                  <div
                    className="hidden lg:flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/finished")}
                  >
                    내가 발행한 책
                  </div>
                  <div
                    className="flex text-[20px] font-normal lg:font-bold cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/unfinished")}
                  >
                    못다쓴 책
                  </div>
                  <hr
                    className="block lg:hidden w-full bg-[#7C766C] h-[1px] mt-2"
                    style={{ color: "#7C766C", borderColor: "#7C766C" }}
                  />
                  <div
                    className="hidden lg:flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/change-settings")}
                  >
                    설정
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1120px] rounded-sm flex flex-row max-h-[797px]">
              <div className="w-full lg:ml-2 ">
                <div className="flex flex-row items-center ">
                  <div className="lg:block hidden w-[205px] text-black mt-[8px] lg:text-[32px] text-[25px] font-bold">
                    못다쓴 책
                  </div>
                </div>
                <div className="flex flex-col max-h-[643px] overflow-y-auto mt-[21px] mb-[21px] ">
                  <div className=" mt-2 flex flex-row gap-x-[46px]">
                    <BookItem
                      imageUrl="https://gloo-image-bucket.s3.amazonaws.com/archive/book_yet.png"
                      title="영화 평론"
                      date="2023년 12월 25일 발행"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
