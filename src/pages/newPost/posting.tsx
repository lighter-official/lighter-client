"use client";
import { useRouter } from "next/router";
import { getCookie } from "..";
import Image from "next/image";

export default function NewWriting() {
  const router = useRouter();
  const accessToken = getCookie("access_token");
  const dataString = Array.isArray(router.query.data)
    ? router.query.data[0]
    : router.query.data;

  // dataString이 유효한 경우 JSON.parse를 사용하여 객체로 변환, 그렇지 않은 경우 null 할당
  const currentWritingsData = dataString
    ? JSON.parse(decodeURIComponent(dataString))
    : null;

  return (
    <div className="w-full max-w-[1199px] rounded-sm flex flex-col mx-auto lg:my-[50px]">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className="hidden lg:block">
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
            src="https://gloo-image-bucket.s3.amazonaws.com/archive/Group 57.png"
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
                  pathname: "/mypage/badge",
                  query: { access_token: accessToken },
                })
              }
            >
              나의 보관함
            </a>
            <a
              className="lg:pr-10 cursor-pointer"
              //   onClick={handleLogIn}
            >
              {/* {isLoggedIn === false ? "로그인" : "로그아웃"} */}
              로그인
            </a>
          </div>
        </div>
      </div>
      <div className="w-full rounded-sm flex items-center flex-col">
        <div
          className="w-full h-[797px] lg:my-[30px] mx-[30px]"
          style={{ border: "1px solid black", backgroundColor: "#E0D5BF" }}
        >
          <div className="flex flex-col items-between justify-between w-full h-full">
            <div className="flex w-full px-[64px] pt-[32px] pb-[22px] flex-col">
              <div className="w-full text-black mt-[8px] text-[22px] lg:text-[36px]">
                {/* <a>title</a> */}
                <textarea
                  className="text-[40px] resize-none w-full mb-[10px] h-[50px]"
                  style={{ backgroundColor: "#E0D5BF", color: "#7C766C" }}
                  placeholder="제목을 입력해주세요."
                  //   value={title}
                  //   onChange={handleTitleChange}
                  maxLength={40}
                />
              </div>
              <div
                className="w-[300px] text-[12px] lg:text-[16px]"
                style={{ color: "#706B61" }}
              >
                날짜
              </div>
              {/* <div className="w-[83px] h-[49px] text-[30px] lg:text-[36px] justify-end">
              <a className="text-black">1</a>/{" "}
              <a style={{ color: "#706B61" }}>32</a>
            </div> */}
            </div>
            <hr
              className="bg-[#7C766C] mx-[64px] items-center h-[1px]"
              style={{ color: "#7C766C", borderColor: "#7C766C" }}
            />
            {/* <div className="w-full h-[29px] flex items-center">{50}</div> */}
            <div
              className="flex px-[64px] py-[32px] items-center justify-center text-center h-full"
              style={{ color: "#706B61" }}
            >
              <textarea
                className="mt-[20px] resize-none w-full h-full overflow-y-auto flex"
                placeholder="내용을 입력해주세요."
                // value={content}
                style={{ backgroundColor: "#E0D5BF", color: "#706B61" }}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // 최대 입력 글자수 - 4000자로 제한
                  //   if (inputValue.length <= 4000) {
                  //     setContent(inputValue);
                  //   }
                }}
              />
            </div>
            <div className="flex flex-col rounded-md mx-[30px]">
              <div className="h-[100px] lg:flex lg:justify-between p-8 items-center rounded-md w-full">
                <a
                  className={`items-center lg:items-start justify-center lg:justify-start flex ${
                    "text-orange-500"
                    // textColor ?
                    // "text-orange-500" : "text-black"
                  }`}
                >
                  남은 시간
                  {/* {remainingTime2} */}
                </a>
                <button
                  className={`w-[152px] items-center justify-center h-[53px] cursor-pointer rounded-md ${
                    // disabled
                    //   ? "bg-zinc-400 text-gray-100"
                    //   : "bg-orange-500 text-black"
                    "bg-orange-500 text-black"
                  }`}
                  //   disabled={disabled}
                  //   onClick={handlePost}
                >
                  저장
                </button>
              </div>
            </div>
            {/* <div className="flex flex-col max-h-[580px] mb-[21px] overflow-y-auto">
            dgjhaljdhs
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
