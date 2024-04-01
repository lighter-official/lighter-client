'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import "./globals.css";
import axios from 'axios';
import Settings from './text-setting';
import { getLoginInfo } from '@/api/api';
import nookies from 'nookies';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

export const Redirection = ({ isLoggedIn, setLoggedIn }:any) => {
  const router = useRouter();  // 수정된 부분
  const REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
  const REDIRECT_URI = 'https://lighter-client.vercel.app';
  // const REDIRECT_URI ='http://localhost:8000'
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const [nickname, setNickname] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      getToken(code);
    }
  }, []);
  
  const handleLoginClick = (code:any) => {
    console.log('redirection login', isLoggedIn)
    window.location.href = link
    console.log(link,'--------------')
    // handleClick(code)
    if (isLoggedIn) {
      // 로그인된 경우
      router.push({
        pathname: '/',
        query: { access_token: accessToken },
      } as any); 
      return
    }
    getToken(code)
    if (!isLoggedIn && accessToken) {
      setLoggedIn(true);

      // 로그인된 경우
      router.push({
        pathname: '/text-setting',
        query: { access_token: accessToken },
      } as any); 
    }

    
  };   
  const getToken = async (code: string) => {
    try {
      const response = await fetch(`https://core.gloo-lighter.com/account/users/sign-in/kakao?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, redirectUri: REDIRECT_URI }),
      });

      console.log(response);
      const data = await response.json();
      console.log(data,'=======');

      if (data.accessToken) {
        const accessToken = data.accessToken;
        nookies.set(null, 'access_token', accessToken, {
          path: '/',
          secure: true,
          maxAge: 3600,
          sameSite: 'Strict',
        });
        setLoggedIn(true);
        router.push({
          pathname: '/text-setting',
          query: { access_token: accessToken},
        } as any); 
      }
      
    } catch (error) {
      console.error('Error during token request:', error);
    }
  };




  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    const bodyData: {
      code: any;
    } = {
      code: code
    };

    if (code) {
      getToken(code);
    }
  }, []);
  
  

  return (
    <button type='button' onClick={isLoggedIn ? setLoggedIn(false) : handleLoginClick}>
      {isLoggedIn ? `로그아웃` : '로그인'}
    </button>
  );
};

export function getCookie(name: any) {
  return nookies.get(null)[name];
}

export default function Home() {
  // const navigate = useNavigate();
  const router = useRouter()
  // const accessToken = getCookie('access_token');
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>('');
  const APP_KEY = '67511eea297fb0f856f791b369c67355';
  const REDIRECT_URI = 'https://lighter-client.vercel.app';
  // const REDIRECT_URI ='http://localhost:8000'
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
      const script = document.createElement('script');
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);

  // 지금 여기
  const getToken = async (code: string) => {
    try {
      const response = await fetch(`https://core.gloo-lighter.com/account/users/sign-in/kakao`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, redirectUri: REDIRECT_URI })
       
      });
      const data = await response.json();
      console.log(data,'=======');

      if (data?.data?.accessToken) {
        const accessToken = data?.data?.accessToken;
        nookies.set(null, 'access_token', accessToken, {
          path: '/',
          secure: true,
          maxAge: 3600,
          sameSite: 'Strict',
        });
        setAccessToken(accessToken)
        console.log(data?.data?.accessToken,'getToken-token?')
        setLoggedIn(true);
        console.log(isLoggedIn,'로그인 ???')
        // accessToken을 설정한 후에 router.push 호출
        if (data?.data?.isSignUp === true) { // 신규 회원가입
        router.push({
            pathname: '/text-setting',
            query: { access_token: accessToken},
          } as any); 
        }
        else if (data?.data?.isSignUp === false) {
          if (data?.data?.hasOnProcessedWritingSession === true)
          {
            console.log('>?????????')
            router.push({
            pathname: '/writer',
            query: { access_token: accessToken},
          } as any); 
          }
          else 
          {
            router.push({
            pathname: '/text-setting',
            query: { access_token: accessToken},
          } as any); 
          }
        }
      }
      
    } catch (error) {
      console.error('Error during token request:', error);
    }
  };


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');


    const bodyData: {
      code: any;
    } = {
      code: code
    };

    if (code) {
      getToken(code);
    }
  }, []);
  

  const handleLoginClick = (code:any) => {
    
    window.location.href = link
    console.log(link,'--------------')
    // handleClick(code)
    getToken(code)
    setLoggedIn(true)
    if (isLoggedIn) {
      // 로그인된 경우
      console.log(isLoggedIn,'logloglog')
      router.push({
        pathname: '/text-setting',
        query: { access_token: accessToken},
      } as any); 
    }
  };

  
  return (
    <>
    <Script src="https://developers.kakao.com/sdk/js/kakao.js"/>
    <div className="flex flex-col my-[50px] w-full">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className='flex flex-row mx-auto w-full'>
        <div className='flex flex-col w-full mx-[120px]'>
          <div className='flex flex-row justify-between'><Image className="mb-[20px]" src="image/logo.svg" width="105" height="35" alt="Logo" />
          </div>
          <hr className='w-full bg-[#7C766C] h-[1px] my-[17px]' style={{color: '#7C766C', borderColor:'#7C766C'}} />
          <div className='flex my-[90px] flex-row justify-between'>
            <div className='w-[368px] h-[264px] my-auto border-1'>
              <div className='mb-[20px] text-[44px]'>
                <a className='font-bold'>글로</a>
                <br />시작하는
                <br /><a className='font-bold'>우리</a>의 이야기
                </div>
                
              <button className='rounded-xl w-[200px] h-[42px] text-black' style={{backgroundColor: '#FFE000'}} onClick={(code)=>handleLoginClick(code)}>카카오 로그인</button>
            </div>
            <div className='flex items-end w-[876px] h-[657px] border-1'>
              <Image src="https://gloo-image-bucket.s3.amazonaws.com/archive/badges.svg"  width="875" height="657" alt="Badges" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
