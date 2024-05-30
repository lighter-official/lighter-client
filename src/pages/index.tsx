"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import axios from "axios";
import Settings from "./session-settings";
import { getLoginInfo } from "@/api/api";
import nookies from "nookies";
import Image from "next/image";
import Script from "next/script";
import { useAtom } from "jotai";
import { loginAtom } from "./atoms";

export function getCookie(name: any) {
  return nookies.get(null)[name];
}

export default function Home() {
  const router = useRouter();
  // const accessToken = getCookie('access_token');
  const [loginState, setLoginState] = useAtom(loginAtom); // Jotai의 Atom 사용
  const [nickname, setNickname] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>("");
  const APP_KEY = "67511eea297fb0f856f791b369c67355";
  // const REDIRECT_URI = "https://lighter-client.vercel.app";
  const REDIRECT_URI = "http://localhost:8000";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const initKakao = () => {
    const Kakao = window.Kakao;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(APP_KEY);
      console.log(Kakao.isInitialized());
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getToken = async (code: string) => {
    try {
      const response = await fetch(
        `https://core.gloo-lighter.com/account/users/sign-in/kakao`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, redirectUri: REDIRECT_URI }),
        }
      );
      const data = await response.json();
      console.log(data, "========================");

      if (data?.data?.accessToken) {
        const accessToken = data?.data?.accessToken;
        nookies.set(null, "access_token", accessToken, {
          path: "/",
          secure: true,
          maxAge: 3600,
          sameSite: "Strict",
        });
        setLoginState({ username: "", accessToken, isLoggedIn: true });
        setAccessToken(accessToken);
        console.log(data?.data?.accessToken, "getToken-token?");
        // accessToken을 설정한 후에 router.push 호출
        if (
          data?.data?.isSignUp === true ||
          data?.data?.hasOnProcessedWritingSession === false
        ) {
          // 신규 회원가입이거나 진행중인 세션이 없을 경우
          router.push({
            pathname: "/session-settings",
            query: { access_token: accessToken },
          } as any);
        } else if (data?.data?.hasOnProcessedWritingSession === true) {
          router.push({
            pathname: "/glooing",
            query: { access_token: accessToken },
          } as any);
        }
      }
    } catch (error) {
      console.error("Error during token request:", error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    const bodyData: {
      code: any;
    } = {
      code: code,
    };

    if (code) {
      getToken(code);
    }
  }, []);

  const handleLoginClick = (code: any) => {
    window.location.href = link;
    getToken(code);
    setLoginState({ username: "", isLoggedIn: true, accessToken: accessToken });
    if (loginState.isLoggedIn) {
      // 로그인된 경우
      console.log(loginState.isLoggedIn, "logloglog");
      router.push({
        pathname: "/session-settings",
        query: { access_token: accessToken },
      } as any);
    }
  };

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
      <div className="flex flex-col my-[50px]">
        <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col mx-[110px] lg:mx-[120px]">
            <div className="flex flex-row justify-between">
              <Image
                className="lg:mb-[20px] mb-0 w-[74px] lg:w-[105px] h-[24px] lg:h-[35px]"
                src="https://gloo-image-bucket.s3.amazonaws.com/archive/logo.svg"
                width="105"
                height="35"
                alt="Logo"
              />
            </div>
            <hr
              className="w-full bg-[#7C766C] h-[1px] lg:my-0 my-[17px]"
              style={{ color: "#7C766C", borderColor: "#7C766C" }}
            />
            <div className="flex lg:my-[90px] gap-y-[56px] lg:gap-y-[0px] items-start lg:flex-row-reverse flex-col lg:justify-between">
              <div className="flex items-start lg:items-end lg:w-[876px] w-[541px] lg:h-[657px] h-[405px] border-1">
                <Image
                  src="https://gloo-image-bucket.s3.amazonaws.com/archive/badges.svg"
                  width="875"
                  height="657"
                  alt="Badges"
                />
              </div>
              <div className="w-[368px] h-[264px] my-auto border-1">
                <div className="mb-[20px] text-[44px]">
                  <a className="font-bold">글로</a>
                  <br />
                  시작하는
                  <br />
                  <a className="font-bold">우리</a>의 이야기
                </div>

                <button
                  className="rounded-xl w-[200px] h-[42px] text-black"
                  style={{ backgroundColor: "#FFE000" }}
                  onClick={(code) => handleLoginClick(code)}
                >
                  카카오 로그인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
