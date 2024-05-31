"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  loginAtom,
  userInfoAtom,
  writingDataAtom,
} from "../../../public/atoms";
import { getCookie } from "..";
import { getGlooingInfo, getUserInfo } from "@/api/api";
import "../globals.css";
import Image from "next/image";
import BadgeItem from "../../components/BadgeItem";
import { BadgeItemProps, UserInfo } from "../../../interface";

interface BadgeItem {
  badge: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  };
  badgeId: number;
  createdAt: string;
  id: number;
  userId: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-full h-full" onClick={onClose}></div>
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

export default function BadgeList() {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [writingData, setWritingData] = useAtom(writingDataAtom);
  const [loginState, setLoginState] = useAtom(loginAtom);

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
          <div className="flex mt-[20px] justify-between gap-x-[20px] lg:flex-row flex-col my-[30px]">
            <div className="lg:bg-black rounded-sm flex flex-col w-full lg:w-[400px] h-[130px] lg:h-[471px]">
              <div className="flex flex-col lg:mx-[20px]">
                <div className="text-black lg:text-white lg:mt-[34px] mt-[20px] w-full lg:h-[51px] h-[40px] text-[25px] lg:text-[36px] font-bold lg:font-normal">
                  나의 보관함
                </div>
                <div className="flex flex-col lg:gap-y-[26px] mt-[24px]">
                  <div
                    className="flex text-[20px] font-normal lg:font-bold cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/badgeList")}
                  >
                    나의 뱃지
                  </div>
                  <hr
                    className="block lg:hidden w-full bg-[#7C766C] h-[1px] mt-2"
                    style={{ color: "#7C766C", borderColor: "#7C766C" }}
                  />
                  <div
                    className="hidden lg:flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/finished")}
                  >
                    내가 발행한 책
                  </div>
                  <div
                    className="hidden lg:flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/unfinished")}
                  >
                    못다쓴 책
                  </div>
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
            <div className="w-full max-w-[1120px] rounded-sm flex flex-row max-h-[797px]">
              <div className="w-full lg:ml-2 ">
                <div className="flex flex-row items-center ">
                  <div className="hidden lg:block text-black mt-[8px] lg:text-[32px] text-[25px] font-bold">
                    나의 뱃지
                  </div>
                </div>
                <div className="flex flex-col h-[759px] overflow-y-auto mt-[21px] mb-[21px] ">
                  {userInfo?.data?.userBadges.length === 0 && (
                    <div
                      className="flex text-[18px] w-[250px] h-[40px] font-bold"
                      style={{ color: "#D5C8AE" }}
                    >
                      아직 받은 뱃지가 없어요.
                    </div>
                  )}
                  {userInfo?.data?.userBadges.length !== 0 && (
                    <div>
                      <div
                        className="flex text-center items-center jusify-center text-[18px] bg-black w-[80px] h-[40px]"
                        style={{ color: "#D5C8AE" }}
                      >
                        <a className="flex items-center justify-center mx-auto">
                          나비
                        </a>
                      </div>

                      <div className=" mt-[20px] flex flex-row gap-x-[46px]">
                        {userInfo?.data?.userBadges?.map((item: any) => (
                          <BadgeItem
                            key={item.id}
                            badge={item.badge}
                            createdAt={item.createdAt}
                            badgeId={item.badgeId}
                            id={item.id}
                            userId={item.userId}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
