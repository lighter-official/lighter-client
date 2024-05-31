import { getCurrentSessions, getUserInfo } from "@/api/api";
import { atom } from "jotai";

export const accessTokenAtom = atom<string | null>(null);

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
    return userData;
  }
  return null;
});

export const writingDataAtom = atom(async (get) => {
  const accessToken = get(accessTokenAtom);
  if (accessToken) {
    const currentWritings = await getCurrentSessions(accessToken);
    return currentWritings;
  }
  return null;
});
