import { Provider } from "jotai";
import { useEffect } from "react";
import { store } from "../app/store";
import { useAtom } from "jotai";
import nookies from "nookies";
import { accessTokenAtom, loginAtom } from "../../public/atoms";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [loginState, setLoginState] = useAtom(loginAtom);

  useEffect(() => {
    const token = nookies.get(null).access_token;
    if (token) {
      setAccessToken(token);
      setLoginState({ username: "", isLoggedIn: true, accessToken: token });
    }
  }, []);

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
