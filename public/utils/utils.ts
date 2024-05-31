import { loginAtom, userInfoAtom, writingDataAtom } from "../atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import nookies from "nookies";

export function formatDate(dateString: string) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 맞춤
  const day = dateObject.getDate().toString().padStart(2, "0"); // 두 자리 맞춤
  return `${year}/${month}/${day}`;
}

export const Logout = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useAtom(loginAtom);

  const handleLogout = () => {
    setLoginState({
      username: "",
      isLoggedIn: false,
      accessToken: null,
    });
    nookies.destroy(null, "access_token");
    router.push("/");
  };

  return handleLogout;
};
