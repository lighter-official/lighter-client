import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoSDKScript() {
  const initKakaoSDK = () => {
    const kakaoAppKey = "67511eea297fb0f856f791b369c67355";
    window.Kakao.init(kakaoAppKey);
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
      onLoad={initKakaoSDK}
    />
  );
}

export default KakaoSDKScript;
