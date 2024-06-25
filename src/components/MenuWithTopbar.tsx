import Image from "next/image";
import { useAtom } from "jotai";
import { NextRouter, useRouter } from "next/router";
import { accessTokenAtom, loginAtom } from "../../public/atoms";
import { useEffect, useState } from "react";
import { toggleLoginState } from "../../public/utils/utils";

interface MenuProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu?: () => void;
  handleLogIn?: () => void;
  accessToken: string | null;
  router: NextRouter;
}

export const Menubar: React.FC<MenuProps> = ({ showMenu, setShowMenu }) => {
  const router = useRouter();
  const [loginState, setLoginState] = useAtom(loginAtom);
  const handleToggleLogin = toggleLoginState();
  const isCurrentPath = (path: string) => router.pathname === path;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        setLoginState({
          isLoggedIn: true,
          accessToken: token,
        });
      }
    }
  }, [setLoginState]);

  return (
    <div>
      {showMenu && (
        <div
          className="lg:hidden block fixed inset-0 bg-black bg-opacity-40 z-10"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
      <div
        className={`lg:hidden block fixed top-0 right-0 h-screen w-[50%] bg-[#302F2D] transition-transform transform ${
          showMenu ? "translate-x-5" : "translate-x-full"
        }`}
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col gap-y-4 ml-[60px] mt-[140px] justify-center">
          <div
            className={`text-[20px] cursor-pointer ${
              isCurrentPath("/glooing") ? "text-[#CEB292]" : "text-[#858178]"
            }`}
            onClick={() =>
              router.push({
                pathname: "/glooing",
              })
            }
          >
            글루ING
          </div>
          <div
            className={`text-[20px] cursor-pointer ${
              isCurrentPath("/mypage/badgeList") ||
              isCurrentPath("/mypage/finished") ||
              isCurrentPath("/mypage/unfinished")
                ? "text-[#CEB292]"
                : "text-[#858178]"
            }`}
          >
            나의 보관함
          </div>
          <div className="flex flex-col ml-3 gap-y-3">
            <div
              className={`text-[16px] cursor-pointer ${
                isCurrentPath("/mypage/badgeList")
                  ? "text-white"
                  : "text-[#858178] "
              }`}
              onClick={() =>
                router.push({
                  pathname: "/mypage/badgeList",
                })
              }
            >
              - 나의 뱃지
            </div>
            <div
              className={`text-[16px] cursor-pointer ${
                isCurrentPath("/mypage/finished")
                  ? "text-white"
                  : "text-[#858178] "
              }`}
              onClick={() =>
                router.push({
                  pathname: "/mypage/finished",
                })
              }
            >
              - 내가 발행한 책
            </div>
            <div
              className={`text-[16px] cursor-pointer ${
                isCurrentPath("/mypage/unfinished")
                  ? "text-white"
                  : "text-[#858178] "
              }`}
              onClick={() =>
                router.push({
                  pathname: "/mypage/unfinished",
                })
              }
            >
              - 못다쓴 책
            </div>
          </div>
          <div
            className={`text-[20px] cursor-pointer ${
              isCurrentPath("/mypage/change-settings")
                ? "text-[#CEB292]"
                : "text-[#858178]"
            }`}
            onClick={() =>
              router.push({
                pathname: "/mypage/change-settings",
              })
            }
          >
            설정
          </div>
          <div
            className="text-[#858178] text-[20px] cursor-pointer"
            onClick={handleToggleLogin}
          >
            {loginState.isLoggedIn === true ? "로그아웃" : "로그인"}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MenuWithTopbar: React.FC<MenuProps> = ({
  showMenu,
  setShowMenu,
  toggleMenu,
  handleLogIn,
  accessToken,
  router,
}) => {
  const [loginState, setLoginState] = useAtom(loginAtom);
  const isCurrentPath = (path: string) => router.pathname === path;
  const handleToggleLogin = toggleLoginState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        setLoginState({
          accessToken: token,
          isLoggedIn: true,
        });
      } else {
        setLoginState({
          accessToken: null,
          isLoggedIn: false,
        });
      }
    }
  }, [setLoginState]);

  return (
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
        src="https://gloo-image-bucket.s3.amazonaws.com/archive/menu_small.png"
        width={18}
        height={18}
        alt="menu"
        onClick={() => setShowMenu(true)}
      />
      {showMenu && (
        <Menubar
          toggleMenu={toggleMenu}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          accessToken={accessToken}
          router={router}
        />
      )}
      <div className="hidden lg:block flex-row">
        <a
          className={`lg:pr-10 cursor-pointer ${
            isCurrentPath("/glooing") ? "font-bold" : ""
          }`}
          onClick={() =>
            router.push({
              pathname: "/glooing",
            })
          }
        >
          글루ING
        </a>
        <a
          className={`lg:pr-10 cursor-pointer ${
            isCurrentPath("/mypage/badgeList") ||
            isCurrentPath("/mypage/finished") ||
            isCurrentPath("/mypage/unfinished") ||
            isCurrentPath("/mypage/change-settings")
              ? "font-bold"
              : ""
          }`}
          onClick={() =>
            router.push({
              pathname: "/mypage/badgeList",
            })
          }
        >
          나의 보관함
        </a>
        <a className="cursor-pointer" onClick={handleToggleLogin}>
          {loginState.isLoggedIn === true ? "로그아웃" : "로그인"}
        </a>
      </div>
    </div>
  );
};

export default MenuWithTopbar;
