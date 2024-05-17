"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "../globals.css";
import Image from "next/image";
import BookItem from "../../components/BookItem";
import { getCookie } from "..";

export default function MyBook() {
  const router = useRouter();
  const accessToken = getCookie("access_token");

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
                    query: { access_token: accessToken },
                  })
                }
              >
                글루ING
              </a>
              <a
                className="cursor-pointer"
                style={{ color: "#A49E90" }}
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
            className="w-full bg-[#7C766C] h-[1px] lg:my-0 my-[17px]"
            style={{ color: "#7C766C", borderColor: "#7C766C" }}
          />
          <div className="w-full flex mt-[20px] items-center justify-center flex-row my-[30px]">
            <div className="max-w-[1120px] rounded-sm  border-1 flex flex-row">
              <div className="w-full ml-2">
                <div className="flex flex-row items-center ">
                  <div className="w-full text-black mt-[8px] text-center text-[22px] font-bold">
                    ㅇㅇㅇ님, 글쓰기 도전 성공을 축하드립니다.
                    <br />
                    표지를 골라 나만의 멋진 전자책을 발행해보세요!
                  </div>
                </div>
                <div className="flex flex-col overflow-y-auto mt-2 mb-2 items-center justify-center">
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
                  <div className="flex flex-row mt-5 gap-x-3">
                    <div
                      className="w-[115px] h-[161px]"
                      style={{
                        backgroundColor: "#D9D9D9",
                      }}
                    >
                      후보 1
                    </div>
                    <div
                      className="w-[115px] h-[161px]"
                      style={{
                        backgroundColor: "#D9D9D9",
                      }}
                    >
                      후보 2
                    </div>
                    <div
                      className="w-[115px] h-[161px]"
                      style={{
                        backgroundColor: "#D9D9D9",
                      }}
                    >
                      후보 3
                    </div>
                    <div
                      className="w-[115px] h-[161px]"
                      style={{
                        backgroundColor: "#D9D9D9",
                      }}
                    >
                      후보 4
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      className="bg-black text-[15px] w-[185px] h-[40px] rounded-md text-center text-white"
                      onClick={() => router.push("/challenge/completed")}
                    >
                      발행하기
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
