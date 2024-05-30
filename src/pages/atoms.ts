import { getCurrentSessions, getUserInfo } from "@/api/api";
import { atom } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { getCookie } from ".";

const accessToken = getCookie("access_token");

export const loginAtom = atom({
  username: "",
  isLoggedIn: false,
  accessToken: null as string | null,
});

export const userInfoAtom = atom(async () => {
  const userData = await getUserInfo(accessToken);
  return userData;
});

export const writingDataAtom = atom(async () => {
  const currentWritings = await getCurrentSessions(accessToken);
  return currentWritings;
});
