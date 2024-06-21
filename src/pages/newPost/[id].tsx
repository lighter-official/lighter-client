"use client";
import { useRouter } from "next/router";
import { getCookie } from "..";
import Image from "next/image";
import { useAtom } from "jotai";
import "../globals.css";
import {
  accessTokenAtom,
  loginAtom,
  remainingTime2Atom,
  userInfoAtom,
  writingDataAtom,
} from "../../../public/atoms";
import { putWriting, submitWriting } from "@/api/api";
import React, { useState } from "react";

interface WritingState {
  dataArray: {
    arrayData: any[];
  };
}

const convertTimeToMinutes = (timeString: Number) => {
  const [hours, minutes, seconds] = timeString
    .toString()
    .split(":")
    .map(Number);
  return hours * 60 + minutes + seconds / 60;
};

export const NewWriting = () => {
  const router = useRouter();
  const { writingId } = router.query;
  const [accessToken] = useAtom(accessTokenAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [writingInfo, setWritingInfo] = useAtom(writingDataAtom);
  const [loginState, setLoginState] = useAtom(loginAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [remainingTime] = useAtom(remainingTime2Atom);
  console.log(typeof remainingTime);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    // 최대 길이를 40으로 설정
    if (inputText.length <= 40) {
      // 40자 이내일 때만 setTitle 호출하여 상태 업데이트, 초과하면 무시
      setTitle(inputText);
    }
  };

  const handlePost = async () => {
    // 모달 열기 전에 확인 모달을 띄우도록 수정
    setIsConfirmationModalOpen(true);
  };

  const handleCancelPost = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmPost = async () => {
    const writingData = {
      title: title || null, // 만약 title이 빈 문자열이면 null로 설정
      content: content || null, // 만약 content가 빈 문자열이면 null로 설정
    };
    const writingIdStr = Array.isArray(writingId) ? writingId[0] : writingId;

    if (typeof writingIdStr !== "string") {
      console.error("Invalid writing ID");
      return;
    }
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }

    try {
      const response = await submitWriting(
        writingData,
        writingIdStr,
        accessToken
      );
      console.log("Submitted Data ---- ", response);

      const currentURL = window.location.href;
      const newURL = `${currentURL}?access_token=${accessToken}`;
      window.history.replaceState({}, document.title, newURL);

      // mini(true);
      router.push({
        pathname: "/glooing",
        query: { access_token: accessToken },
      });
    } catch (error) {
      console.error("Error saving writing:", error);
    }

    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="w-full max-w-[1200px] rounded-sm flex flex-col mx-auto lg:my-[50px]">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className="hidden lg:block">
        {/* MenuWithTopBar 추가 예정 */}
        <div className="flex flex-row justify-between">
          <Image
            className="cursor-pointer lg:mb-[20px] mb-0 w-[74px] h-[24px]"
            src="https://gloo-image-bucket.s3.amazonaws.com/archive/logo.svg"
            width="105"
            height="35"
            alt="Logo"
          />
          <Image
            className="lg:hidden block h-[18px] w-[18px]"
            src="https://gloo-image-bucket.s3.amazonaws.com/archive/menu_small.png"
            width={18}
            height={18}
            alt="menu"
          />
          <div className="hidden lg:block flex-row">
            <a
              className="lg:pr-10 cursor-pointer font-bold"
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
              className="lg:pr-10 cursor-pointer"
              onClick={() =>
                router.push({
                  pathname: "/mypage/badgeList",
                  query: { access_token: accessToken },
                })
              }
            >
              나의 보관함
            </a>
            <a
              className="cursor-pointer"
              //   onClick={handleLogIn}
            >
              {loginState.isLoggedIn == true ? "로그아웃" : "로그인"}
            </a>
          </div>
        </div>
      </div>
      <hr
        className="lg:block hidden w-full bg-[#7C766C] h-[1px] sm:my-[17px] lg:my-0"
        style={{ color: "#7C766C", borderColor: "#7C766C" }}
      />
      <div className="w-full rounded-sm flex items-center flex-col">
        <div className="w-full h-[950px] mt-[30px] lg:h-[747px] lg:border-black lg:bg-[#E0D5BF] lg:my-[30px] mx-[30px]">
          <div
            className="lg:hidden block text-center mb-5 justify-center text-[20px]"
            style={{ color: "#202020" }}
          >
            글쓰기
          </div>
          <hr
            className="lg:hidden block w-full mx-5 items-center h-[1px]"
            style={{ color: "#DFD8CD", borderColor: "#DFD8CD" }}
          />

          <div className="flex flex-col items-between justify-between w-full h-full lg:bg-none">
            <div className="flex w-full px-[64px] pt-[32px] flex-col">
              <div className="w-full text-black text-[22px] lg:text-[36px]">
                <textarea
                  className="text-[20px] lg:text-[40px] resize-none w-full lg:mb-[10px] h-[30px] lg:h-[50px] bg-[#F2EBDD] lg:bg-[#E0D5BF]"
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={handleTitleChange}
                  maxLength={40}
                />
              </div>
              {/* <div
                className="lg:block hidden w-[300px] text-[12px] lg:text-[16px]"
                style={{ color: "#706B61" }}
              >
                날짜
              </div> */}
            </div>
            <hr
              className="mx-[64px] items-center h-[1px]"
              style={{ color: "#7C766C", borderColor: "#7C766C" }}
            />
            <div
              className="flex px-[64px] py-[32px] items-center justify-center text-center h-full"
              style={{ color: "#706B61" }}
            >
              <textarea
                className="lg:mt-[20px] resize-none w-full h-full overflow-y-auto flex  bg-[#F2EBDD] lg:bg-[#E0D5BF]"
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // 최대 입력 글자수 - 4000자로 제한
                  if (inputValue.length <= 4000) {
                    setContent(inputValue);
                  }
                }}
              />
            </div>
            <div className="flex flex-col rounded-md mx-[30px]">
              <div className="lg:h-[100px] flex justify-between px-[64px] py-[100px] lg:p-8 items-center rounded-md w-full">
                <a
                  className={`items-start justify-center lg:justify-start flex ${
                    convertTimeToMinutes(remainingTime) < 10
                      ? "text-orange-500"
                      : "text-black"
                  }`}
                >
                  남은 시간 {remainingTime}
                </a>
                <button
                  className={`w-[152px] items-center justify-center h-[53px] cursor-pointer rounded-md ${
                    title && content
                      ? "bg-orange-500 text-black"
                      : "bg-[#3F3F3F] text-[#8E887B]"
                  }`}
                  disabled={!title || !content}
                  onClick={handlePost}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isConfirmationModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute w-full h-full bg-gray-800 opacity-50"
            onClick={() =>
              router.push({
                pathname: "/mypage/glooing",
                query: { access_token: accessToken },
              })
            }
          ></div>
          <div className="flex flex-col bg-white w-[300px] h-[155px] text-center justify-center items-center rounded-lg z-50">
            <div className="p-8 ">
              <div className="text-[16px] mb-[30px]">
                해당 내용으로 발행하시겠습니까?
              </div>
              <div className="flex justify-center gap-x-[10px]">
                <button
                  className="w-[120px] text-[14px] cursor-pointer h-[40px] rounded-md"
                  style={{ backgroundColor: "#D9D9D9" }}
                  onClick={handleCancelPost}
                >
                  취소
                </button>
                <button
                  className="w-[120px] text-[14px] cursor-pointer h-[40px] rounded-md"
                  style={{ backgroundColor: "#FF8126" }}
                  onClick={handleConfirmPost}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewWriting;
