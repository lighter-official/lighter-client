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
import { getCookie } from "..";
import { formatDate, useMenu } from "../../../public/utils/utils";
import { UserInfo } from "../../../interface";
import Menu from "@/components/Menu";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//       <div
//         className="absolute w-full h-full bg-gray-800 opacity-50"
//         onClick={onClose}
//       ></div>
//       <div className="relative flex flex-col bg-white w-[800px] h-[550px] rounded-lg z-50">
//         <div className="p-8">
//           <div className="text-[16px]">4번째 글</div>
//           <div className="mb-[10px] text-[22px]">뮤직비디오 해석하기</div>
//           <textarea
//             className="text-[40px] w-full mb-[30px] h-[50px]"
//             placeholder="제목을 입력해주세요."
//           />
//           <hr
//             className="w-full bg-[#7C766C] h-[1px] my-[17px]"
//             style={{ color: "#7C766C", borderColor: "#7C766C" }}
//           />
//           <textarea
//             className="mt-[30px] w-full h-[220px] overflow-y-auto"
//             placeholder="내용을 입력해주세요."
//           />
//         </div>
//         <div className="flex flex-col w-full rounded-md">
//           <div
//             className="h-[100px] flex justify-between  p-8 items-center rounded-md w-full"
//             style={{ backgroundColor: "#F1F1F1" }}
//           >
//             <a className="items-start justify-start flex">남은 시간 01:03:55</a>
//             <button
//               className="w-[152px] h-[53px] rounded-md"
//               style={{ backgroundColor: "#979797" }}
//               onClick={onClose}
//             >
//               저장
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const FinshedItem = ({ data }: UserInfo) => {
  const filteredWritingSessions = data?.writingSessions?.filter(
    (session: any) => !session.isActivated && session.progressPercentage == 100 //수정 필요
  );

  return (
    <div className="flex flex-col max-h-[643px] overflow-y-auto mb-[21px]">
      {filteredWritingSessions?.length > 0 ? (
        filteredWritingSessions.map((session: any) => (
          <div key={session.id} className="mt-2 flex flex-row gap-x-[46px]">
            <BookItem
              imageUrl="https://gloo-image-bucket.s3.amazonaws.com/archive/book_yet.png"
              title={session?.subject}
              date={formatDate(session?.finishDate)}
            />
          </div>
        ))
      ) : (
        <div
          style={{ color: "#D5C8AE" }}
          className="text-[18px] lg:text-[20px] font-bold"
        >
          아직 발행한 책이 없어요.
        </div>
      )}
    </div>
  );
};

export default function MyBook() {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showMenu, setShowMenu, toggleMenu } = useMenu();
  const [loginState, setLoginState] = useAtom(loginAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [writingInfo, setWritingInfo] = useAtom(writingDataAtom);
  const filteredWritingSessions = userInfo?.data?.writingSessions?.filter(
    (session: any) => !session.isActivated && session.progressPercentage == 100 //수정 필요
  );

  useEffect(() => {
    console.log(userInfo);
    console.log(writingInfo);
    console.log(accessTokenAtom);
  }, [userInfo, writingInfo]);

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
                    className="flex text-[20px] font-normal lg:font-bold cursor-pointer"
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
                  <hr
                    className="block lg:hidden w-full bg-[#7C766C] h-[1px] mt-2"
                    style={{ color: "#7C766C", borderColor: "#7C766C" }}
                  />
                  <div
                    className="hidden lg:flex text-[20px] cursor-pointer"
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
                <div className="flex flex-row items-center ">
                  <div className="hidden lg:block w-full text-black mt-[8px] lg:text-[32px] text-[25px] font-bold">
                    내가 발행한 책 ({filteredWritingSessions?.length})
                  </div>
                </div>
                <div className="mt-2 text-[15px] lg:text-[20px]">
                  글쓰기 완료 달성한 전자책을 둘러보세요!
                </div>
                <div className="flex flex-col max-h-[643px] overflow-y-auto mt-5 mb-2">
                  <div className="mt-2 flex flex-row gap-x-[46px]">
                    <div className=" mt-2 flex flex-row gap-x-[46px]">
                      <FinshedItem {...userInfo} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </div>
  );
}
