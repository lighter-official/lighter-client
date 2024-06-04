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
import Image from "next/image";
import BookItem from "../../components/BookItem";
import { SessionInfo, UserInfo } from "../../../interface";
import {
  formatDate,
  getAccessTokenFromCookies,
  useMenu,
} from "../../../public/utils/utils";
import { GetServerSideProps } from "next";
import Menu from "@/components/Menu";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = getAccessTokenFromCookies(ctx);

  return {
    props: {
      accessToken,
    },
  };
};

export default function MyBookItem() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginState, setLoginState] = useAtom(loginAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [writingInfo, setWritingInfo] = useAtom(writingDataAtom);
  const filteredWritingSessions = userInfo?.data?.writingSessions?.filter(
    (session: any) => !session.isActivated && session.progressPercentage < 75 //수정 필요
  );
  const { showMenu, setShowMenu, toggleMenu } = useMenu();

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    console.log(userInfo);
    console.log(writingInfo);
    console.log(accessTokenAtom);
  }, [userInfo, writingInfo]);

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
          <Menu
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
            <div className="w-full max-w-[1120px] rounded-sm flex flex-row max-h-[797px]">
              <div className="w-full lg:ml-2 ">
                <div className="flex flex-col max-h-[643px] overflow-y-auto mt-[21px] mb-[21px] ">
                  <div className=" mt-2 flex flex-row gap-x-[20px]">
                    <div
                      className="w-[217px] h-[298px]"
                      style={{
                        backgroundColor: "#D5C8AE",
                        border: "1px solid gray",
                      }}
                    >
                      <img
                        className="z-50"
                        src="https://gloo-image-bucket.s3.amazonaws.com/archive/book_1.png"
                        alt={writingInfo?.data?.subject}
                      />
                    </div>
                    <div className="justify-end gap-y-2 flex flex-col">
                      <div
                        className="mt-[10px] lg:text-[20px] text-[16px]"
                        style={{ color: "#8A8170" }}
                      >
                        {formatDate(writingInfo?.data?.finishDate)} 완료
                      </div>
                      <div className="lg:text-[20px] text-[16px]">
                        총 {writingInfo?.data?.writings?.length}/
                        {writingInfo?.data?.page}편
                      </div>
                      <div className="flex flex-row gap-x-5">
                        <button
                          className="rounded-lg text-[14px] bg-black  text-white lg:text-[16px] lg:rounded-xl w-[150px] lg:w-[200px] h-[30px] lg:h-[42px]"
                          onClick={() => router.back()}
                        >
                          목록으로 돌아가기
                        </button>
                        {writingInfo?.data?.progressPercentage < 100 && (
                          <button
                            className="rounded-lg text-[14px] bg-orange-500 text-black lg:text-[16px] lg:rounded-xl w-[150px] lg:w-[200px] h-[30px] lg:h-[42px]"
                            onClick={() =>
                              router.push({
                                pathname: "/session-settings",
                                query: { access_token: accessToken },
                              })
                            }
                          >
                            이어서 진행하기
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-[30px] max-h-[500px]">
                  <div className="font-bold text-[20px]">기록한 글</div>
                  {writingInfo?.data?.writings !== null && (
                    <div className="flex flex-col gap-y-2 lg:gap-y-4 my-5 overflow-y-scroll rounded-xl">
                      {writingInfo?.data?.writings?.map(
                        (writing: any, index: number) => (
                          <div
                            key={index}
                            className="flex cursor-pointer px-5 py-5 flex-row w-full h-52 rounded-xl"
                            style={{ backgroundColor: "#E0D5BF" }}
                            //   onClick={() => handleEditClick(writing.id)}
                          >
                            <div className="my-3 mx-3">
                              <div className="w-full h-10 text-xl">
                                {writing?.title}
                              </div>
                              <div
                                className="mt-3 max-w-full truncate text-base"
                                style={{ color: "#C5BCAB" }}
                              >
                                {writing?.content}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
