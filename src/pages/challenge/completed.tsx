"use client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "../globals.css";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  useUserInfoAtom,
  useWritingDataAtom,
} from "../../../public/atoms";
import { formatDate, useMenu } from "../../../public/utils/utils";
import MenuWithTopbar from "@/components/MenuWithTopbar";

//신규 사용자가 아니면서 기존 사용자 플로우 중 진행중인 세션이 없는 경우(완료한 경우)
export default function FinishedPage() {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const userInfo = useUserInfoAtom();
  const writingInfo = useWritingDataAtom();
  const { showMenu, setShowMenu, toggleMenu } = useMenu();

  useEffect(() => {
    console.log(userInfo);
    console.log(writingInfo);
  }, [userInfo, writingInfo]);

  return (
    <div className="flex flex-col my-[50px] w-full">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className="flex flex-row mx-auto w-full">
        <div className="flex flex-col w-full mx-[120px]">
          <MenuWithTopbar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            toggleMenu={toggleMenu}
            accessToken={accessToken}
            router={router}
          />
          <hr
            className="w-full bg-[#7C766C] h-[1px] lg:my-0 my-[17px]"
            style={{ color: "#7C766C", borderColor: "#7C766C" }}
          />
          <div className="w-full flex mt-[20px] items-center justify-center flex-row my-[30px]">
            <div className="max-w-[1120px] rounded-sm  border-1 flex flex-row">
              <div className="flex flex-col w-full ml-2 my-[70px]">
                <div className="flex flex-col items-center gap-y-2">
                  <div className="w-full text-black text-center text-[22px] font-bold">
                    <span className="relative">
                      <span className="bg-[#FF8126] opacity-[47%] absolute top-2 left-0 right-0 h-[20px]"></span>
                      <span className="relative">
                        {userInfo?.data?.writingSessions[3]?.subject}
                      </span>
                    </span>
                    <br />
                    글쓰기 도전이 끝났어요!
                  </div>
                  <div className="mt-[12px] text-[#8C8575]">
                    {" "}
                    {formatDate(
                      userInfo?.data?.writingSessions[3]?.startDate
                    )}{" "}
                    ~{" "}
                    {formatDate(userInfo?.data?.writingSessions[3]?.finishDate)}
                  </div>
                </div>
                <div className="flex flex-col overflow-y-auto mt-5 mb-2 items-center justify-center">
                  <div className="flex flex-col mt-[40px] gap-x-[46px] gap-y-2">
                    <div className="flex flex-row items-center justify-between">
                      <div>글쓰기 목표 달성률</div>
                      <div className="text-[24px] font-bold">
                        {userInfo?.data?.writingSessions[2]?.progressPercentage}
                        %
                      </div>
                    </div>
                    <div
                      className="w-[498px] h-3 flex items-center rounded-xl"
                      style={{
                        backgroundColor: "#DADADA",
                      }}
                    >
                      <div
                        className=" h-3 rounded-xl"
                        style={{
                          width: `${
                            userInfo?.data?.writingSessions[2]
                              ?.progressPercentage || 0
                          }%`,
                          backgroundColor: "#FF8126",
                          transition: "width 0.5s ease",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center my-[50px] gap-x-[15px]">
                    <div
                      className="flex flex-col gap-y-2 w-[161px] h-[200px] rounded-md px-3 py-3 cursor-pointer"
                      style={{
                        backgroundColor: "#FFFCF6",
                        border: "1px solid black",
                        borderColor: "black",
                      }}
                      onClick={() =>
                        router.push({
                          pathname: "/session-settings",
                        })
                      }
                    >
                      <span className="font-bold">새로운 주제</span>
                      <span>글쓰기 도전 시작</span>
                    </div>
                    <div
                      className="flex flex-col gap-y-2 w-[161px] h-[200px] rounded-md px-3 py-3 cursor-pointer"
                      style={{
                        backgroundColor: "#FFFCF6",
                        border: "1px solid black",
                        borderColor: "black",
                      }}
                      onClick={() =>
                        router.push({
                          pathname: "/mypage/change-settings",
                        })
                      }
                    >
                      <span className="font-bold">지금 주제</span>
                      <span>이어서 글쓰기</span>
                    </div>
                    <div
                      className="flex flex-col gap-y-2 w-[161px] h-[200px] rounded-md px-3 py-3 cursor-pointer"
                      style={{
                        backgroundColor: "#FFFCF6",
                        border: "1px solid black",
                        borderColor: "black",
                      }}
                      onClick={() =>
                        router.push({
                          pathname: "/mypage/unfinished",
                        })
                      }
                    >
                      <span className="font-bold">이전에 쓰던 주제</span>
                      <span>이어서 글쓰기</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-[100px] text-[#8C8575]">
                    시도하지 않으면 아무것도 얻을 수 없다.
                    <br />
                    도전하는 당신이 진정한 승리자입니다.
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

// export default function MyBook() {
//   const router = useRouter();
//   const [accessToken] = useAtom(accessTokenAtom);
//   const userInfo = useUserInfoAtom();
//   const writingInfo = useWritingDataAtom();
//   const { showMenu, setShowMenu, toggleMenu } = useMenu();

//   useEffect(() => {
//     console.log(userInfo);
//     console.log(writingInfo);
//   }, [userInfo, writingInfo]);

//   return (
//     <div className="flex flex-col my-[50px] w-full">
//       <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
//       <div className="flex flex-row mx-auto w-full">
//         <div className="flex flex-col w-full mx-[120px]">
//           <MenuWithTopbar
//             showMenu={showMenu}
//             setShowMenu={setShowMenu}
//             toggleMenu={toggleMenu}
//             accessToken={accessToken}
//             router={router}
//           />
//           <hr
//             className="w-full bg-[#7C766C] h-[1px] lg:my-0 my-[17px]"
//             style={{ color: "#7C766C", borderColor: "#7C766C" }}
//           />
//           <div className="w-full flex mt-[20px] items-center justify-center flex-row my-[30px]">
//             <div className="max-w-[1120px] rounded-sm  border-1 flex flex-row">
//               <div className="w-full ml-2">
//                 <div className="flex flex-col items-center gap-y-2">
//                   <div className="w-full text-black mt-[18px] text-center text-[22px] font-bold">
//                     {userInfo?.data?.nickname}님의
//                     <br />
//                     N번째 전자책이 발행되었습니다!
//                   </div>
//                   <div>
//                     나의 보관함 - 내가 발행한 책 메뉴에서 언제든지 확인이
//                     가능합니다.
//                   </div>
//                 </div>
//                 <div className="flex flex-col overflow-y-auto mt-5 mb-2 items-center justify-center">
//                   <div className="mt-2 flex flex-row gap-x-[46px]">
//                     <div>
//                       <div
//                         className="w-[290px] h-[431px]"
//                         style={{
//                           backgroundColor: "#D5C8AE",
//                           border: "1px solid gray",
//                         }}
//                       >
//                         <Image
//                           className="w-full h-full z-50"
//                           src={
//                             "https://gloo-image-bucket.s3.amazonaws.com/archive/book_1.png"
//                           }
//                           alt={"영화"}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-10 flex flex-col gap-y-3">
//                     <button className="bg-black text-[15px] w-[252px] h-[40px] rounded-md text-center text-white">
//                       확인
//                     </button>
//                     <button
//                       style={{ backgroundColor: "#FF8126" }}
//                       className="text-[15px] w-[252px] h-[40px] rounded-md text-center text-black"
//                     >
//                       새로운 도전 시작하기
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
