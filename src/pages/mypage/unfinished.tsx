"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "../globals.css";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  loginAtom,
  userInfoAtom,
  writingDataAtom,
} from "../../../public/atoms";
import BookItem from "../../components/BookItem";
import { UserInfo } from "../../../interface";
import { formatDate, useMenu } from "../../../public/utils/utils";
import Menu from "@/components/MenuWithTopbar";
import MenuWithTopbar from "@/components/MenuWithTopbar";

const UnfinishedItem = ({ data }: UserInfo) => {
  const filteredWritingSessions = data?.writingSessions?.filter(
    (session: any) =>
      session.progressPercentage < 75 && session.status === "aborted"
  );
  console.log(data?.writingSessions, "[===========");

  const imageUrls = [
    "https://gloo-image-bucket.s3.amazonaws.com/archive/cover_1.png",
    "https://gloo-image-bucket.s3.amazonaws.com/archive/cover_2.png",
    "https://gloo-image-bucket.s3.amazonaws.com/archive/cover_3.png",
  ];

  const randomImageUrl =
    imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return (
    <div className="flex flex-col max-h-[643px] overflow-y-auto mb-[21px]">
      {filteredWritingSessions?.length > 0 ? (
        filteredWritingSessions.map((session: any) => (
          <div key={session.id} className="mt-2 flex flex-row gap-x-[46px]">
            <BookItem
              id={session?.id}
              imageUrl={randomImageUrl}
              title={session?.subject}
              date={formatDate(session?.finishDate)}
              username={data?.nickname}
              session={session}
            />
          </div>
        ))
      ) : (
        <div
          style={{ color: "#D5C8AE" }}
          className="text-[18px] lg:text-[20px]"
        >
          아직 못다쓴 책이 없어요.
        </div>
      )}
    </div>
  );
};

export default function UnfinishedBook() {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginState, setLoginState] = useAtom(loginAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [writingInfo, setWritingInfo] = useAtom(writingDataAtom);

  const filteredWritingSessions = userInfo?.data?.writingSessions?.filter(
    (session: any) =>
      session.progressPercentage < 75 && session.status === "aborted"
  );

  console.log(filteredWritingSessions, "filter");
  const { showMenu, setShowMenu, toggleMenu } = useMenu();

  useEffect(() => {
    console.log(userInfo);
    console.log(writingInfo);
    console.log(accessTokenAtom);
  }, []);

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
          <MenuWithTopbar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            toggleMenu={toggleMenu}
            accessToken={accessToken}
            loginState={loginState}
            router={router}
          />
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
                    className="hidden lg:flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() =>
                      router.push({
                        pathname: "/mypage/badgeList",
                        query: { access_token: accessToken },
                      })
                    }
                  >
                    나의 뱃지
                  </div>
                  <div
                    className="hidden lg:flex text-[20px] cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() =>
                      router.push({
                        pathname: "/mypage/finished",
                        query: { access_token: accessToken },
                      })
                    }
                  >
                    내가 발행한 책
                  </div>
                  <div
                    className="flex text-[20px] font-normal lg:font-bold cursor-pointer"
                    style={{ color: "#CEB292" }}
                    onClick={() =>
                      router.push({
                        pathname: "/mypage/unfinished",
                        query: { access_token: accessToken },
                      })
                    }
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
                    onClick={() =>
                      router.push({
                        pathname: "/mypage/change-settings",
                        query: { access_token: accessToken },
                      })
                    }
                  >
                    설정
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[1120px] rounded-sm flex flex-row max-h-[797px]">
              <div className="w-full lg:ml-2 ">
                <div className="flex flex-col items-center ">
                  <div className="lg:block hidden w-full text-black mt-[8px] lg:text-[32px] text-[25px] font-bold">
                    못다쓴 책 ({filteredWritingSessions?.length})
                  </div>
                  <div className="lg:block hidden w-full mt-2">
                    글쓰기 달성 완료하지 못한 게시글을 이어서 작성할 수 있어요.
                  </div>
                </div>
                <div className="flex flex-col max-h-[643px] overflow-y-auto mt-[21px] mb-[21px] ">
                  <div className=" mt-2 flex flex-row gap-x-[46px]">
                    <UnfinishedItem {...userInfo} />
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
