import { Provider } from "jotai";
import { useEffect, useState } from "react";
import { store } from "../app/store";
import { useAtom } from "jotai";
import { accessTokenAtom, loginAtom } from "../../public/atoms";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [loginState, setLoginState] = useAtom(loginAtom);

  const [initialAccessToken, setInitialAccessToken] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setInitialAccessToken(token);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
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
  }, [setLoginState]);

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
