"use client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "../globals.css";
import Image from "next/image";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  useUserInfoAtom,
  useWritingDataAtom,
  userInfoAtom,
  writingDataAtom,
} from "../../../public/atoms";
import { WritingData } from "../../../interface";

export default function MyBook() {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const userInfo = useUserInfoAtom();
  const writingInfo = useWritingDataAtom();

  useEffect(() => {
    console.log(userInfo);
    console.log(writingInfo);
  }, [userInfo, writingInfo]);

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
                className="cursor-pointer  font-bold"
                style={{ color: "#191919" }}
                onClick={() =>
                  router.push({
                    pathname: "/glooing",
                  })
                }
              >
                글루ING
              </a>
              <a
                className="cursor-pointer"
                style={{ color: "#A49E90" }}
                onClick={() =>
                  router.push({
                    pathname: "/mypage/badgeList",
                  })
                }
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
            className="w-full bg-[#7C766C] h-[1px] lg:my-0 my-[17px]"
            style={{ color: "#7C766C", borderColor: "#7C766C" }}
          />
          <div className="w-full flex mt-[20px] items-center justify-center flex-row my-[30px]">
            <div className="max-w-[1120px] rounded-sm  border-1 flex flex-row">
              <div className="w-full ml-2">
                <div className="flex flex-col items-center gap-y-2">
                  <div className="w-full text-black mt-[18px] text-center text-[22px] font-bold">
                    {userInfo?.data?.nickname}님의
                    <br />
                    N번째 전자책이 발행되었습니다!
                  </div>
                  <div>
                    나의 보관함 - 내가 발행한 책 메뉴에서 언제든지 확인이
                    가능합니다.
                  </div>
                </div>
                <div className="flex flex-col overflow-y-auto mt-5 mb-2 items-center justify-center">
                  <div className="mt-2 flex flex-row gap-x-[46px]">
                    <div>
                      <div
                        className="w-[290px] h-[431px]"
                        style={{
                          backgroundColor: "#D5C8AE",
                          border: "1px solid gray",
                        }}
                      >
                        <img
                          className="w-full h-full z-50"
                          src={
                            "https://gloo-image-bucket.s3.amazonaws.com/archive/book_1.png"
                          }
                          alt={"영화"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex flex-col gap-y-3">
                    <button className="bg-black text-[15px] w-[252px] h-[40px] rounded-md text-center text-white">
                      확인
                    </button>
                    <button
                      style={{ backgroundColor: "#FF8126" }}
                      className="text-[15px] w-[252px] h-[40px] rounded-md text-center text-black"
                    >
                      새로운 도전 시작하기
                    </button>
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
