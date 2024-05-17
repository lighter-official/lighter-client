"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Redirection, getCookie } from "..";
import { getGlooingInfo, getUserInfo } from "@/api/api";
import "../globals.css";
import Image from "next/image";
import BadgeItem from "../../components/BadgeItem";

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
  const accessToken = getCookie("access_token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo(accessToken);
        setUserInfo(userData);
        console.log(userInfo, "userInfo-------------------");

        setLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [accessToken, userInfo]);

  return (
    <div className="flex flex-col my-[50px] w-full">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className="flex flex-row mx-auto w-full">
        <div className="flex flex-col w-full mx-[120px]">
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
                className="cursor-pointer  font-bold"
                onClick={() =>
                  router.push({
                    pathname: "/mypage/badgeList",
                    query: { access_token: accessToken },
                  })
                }
              >
                나의 보관함
              </a>
              <a className="cursor-pointer" onClick={() => setLoggedIn(false)}>
                <Redirection
                  isLoggedIn={isLoggedIn}
                  setLoggedIn={setLoggedIn}
                />
              </a>
            </div>
          </div>
          <hr
            className="w-full bg-[#7C766C] h-[1px] lg:my-0 my-[17px]"
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
                    className="flex text-[20px] font-bold cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/badgeList")}
                  >
                    나의 뱃지
                  </div>
                  <div
                    className="flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/mybook")}
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
                    className="flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() => router.push("/mypage/change-settings")}
                  >
                    설정
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1120px] rounded-sm flex flex-row max-h-[797px]">
              <div className="w-full ml-2">
                <div className="flex flex-row items-center ">
                  <div className="w-full text-black mt-[8px] text-[32px] font-bold">
                    나의 뱃지
                  </div>
                </div>
                <div className="flex flex-col h-[759px] overflow-y-auto mt-[21px] mb-[21px] ">
                  <div
                    className="flex text-center items-center jusify-center text-[18px] bg-black w-[80px] h-[40px]"
                    style={{ color: "#D5C8AE" }}
                  >
                    <a className="flex items-center justify-center mx-auto">
                      나비
                    </a>
                  </div>
                  <div className=" mt-[20px] flex flex-row gap-x-[46px]">
                    {userInfo?.data?.userBadges?.map((item: BadgeItem) => (
                      <BadgeItem
                        key={item?.id}
                        src={item?.badge?.imageUrl}
                        title={item?.badge?.name}
                        date={item?.createdAt}
                      />
                    ))}
                  </div>
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
