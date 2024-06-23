import { getCurrentSessions, getUserInfo } from "@/api/api";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { UserInfo, WritingData } from "../interface";

export const accessTokenAtom = atom<string | null>(null);
export const sessionDataAtom = atom<any>(null);
export const remainingTimeAtom = atom(0);
export const remainingTime2Atom = atom(0);

export const loginAtom = atom(
  { isLoggedIn: false, accessToken: null as string | null },
  (
    get,
    set,
    update: {
      accessToken: string | null;
      isLoggedIn: boolean;
    }
  ) => {
    set(accessTokenAtom, update.accessToken);
    set(loginAtom, update);
  }
);

export const userInfoAtom = atom<UserInfo | null>(null);
export const writingDataAtom = atom<WritingData | null>(null);

export const useUserInfoAtom = () => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const userData = await getUserInfo(accessToken);
          setUserInfo(userData);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, [setUserInfo]);

  return userInfo; // 상태 반환
};

export const useWritingDataAtom = () => {
  const [writingData, setWritingData] = useAtom(writingDataAtom);

  useEffect(() => {
    const fetchWritingData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const currentWritings = await getCurrentSessions(accessToken);
          setWritingData(currentWritings);
        }
      } catch (error) {
        console.error("Error fetching writing data:", error);
        setWritingData(null);
      }
    };

    fetchWritingData();
  }, [setWritingData]);
  console.log(writingData);

  return writingData;
};
