import { getCurrentSessions, getUserInfo } from "@/api/api";
import { access } from "fs";
import { atom } from "jotai";
import nookies from "nookies";
import { getAccessTokenFromCookies } from "./utils/utils";

export const accessTokenAtom = atom<string | null>(null);
export const sessionDataAtom = atom<any>(null);
export const remainingTimeAtom = atom(0);
export const remainingTime2Atom = atom(0);

export const loginAtom = atom(
  { username: "", isLoggedIn: false, accessToken: null as string | null },
  (
    get,
    set,
    update: {
      username: string;
      accessToken: string | null;
      isLoggedIn: boolean;
    }
  ) => {
    set(accessTokenAtom, update.accessToken);
    set(loginAtom, update);
  }
);

export const userInfoAtom = atom(async (get) => {
  const accessToken = get(accessTokenAtom);
  if (accessToken) {
    const userData = await getUserInfo(accessToken);
    console.log(userData, "user?");
    return userData;
  }
  return null;
});

export const writingDataAtom = atom(async (get) => {
  const accessToken = get(accessTokenAtom);
  if (accessToken) {
    const currentWritings = await getCurrentSessions(accessToken);
    console.log(currentWritings, "current!");
    return currentWritings;
  }
  return null;
});
