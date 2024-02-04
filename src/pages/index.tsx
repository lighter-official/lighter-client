'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import "./globals.css";
import axios from 'axios';
import Settings from './text-setting';
import { getLoginInfo } from '@/api/api';
import Cookies from 'js-cookie';
import { access } from 'fs';
import nookies from 'nookies';


export const Redirection = ({ isLoggedIn, setLoggedIn }) => {
  const router = useRouter();  // 수정된 부분
  const REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
  const REDIRECT_URI = 'http://localhost:3000';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const [nickname, setNickname] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  

  const getCode = () => {
    // 현재 URL에서 쿼리 매개변수 'code'를 추출
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    
    return code;
  };
  
  const handleLoginClick = (code:any) => {
    window.location.href = link
    console.log(link,'--------------')
    // handleClick(code)
    getToken(code)
    if (accessToken) {
      setLoggedIn(true);
      // 로그인된 경우
      router.push({
        pathname: '/text-setting',
        query: { access_token: accessToken },
      } as any); // 'as any'를 사용하여 타입 명시
    }
  };
  

  const getToken = async (code: any) => {
    // const KAKAO_REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
    // const KAKAO_REDIRECT_URI = 'http://localhost.3000';

    try {
      const response = await fetch(`http://localhost:8000/api/login/kakao?code=${code}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
       
      });

      console.log(response);
      const data = await response.json();
      console.log(data,'=======');

      if (code) {
        console.log(code, 'code!!!');
        localStorage.setItem('name', data.profile.nickname); 
        const cookies = nookies.get();
        nookies.set({}, 'access_token', data.access_token, {
          path: '/',
          secure: true,
          maxAge: 3600, 
          sameSite: 'Strict',
        });
        setLoggedIn(true);
        setNickname(data.profile.nickname);
        setAccessToken(data.access_token) // 이용하기, code 재사용 불가
        console.log('ACCESS-TOKEN', data.access_token)

        router.push({
          pathname: '/text-setting',
          query: { access_token: data.access_token },
        } as any);
      }
    } catch (error) {
      console.error('Error during token request:', error);
      throw error;
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
    <button type='button' onClick={isLoggedIn ? setLoggedIn(false) : (code)=>handleLoginClick(code)}>
      {isLoggedIn ? `로그아웃` : '로그인'}
    </button>
  );
};

export function getCookie(name: any) {
  console.log(nookies.get(null)[name], '쿠키?');
  return nookies.get(null)[name];
}

export default function Home() {
  // const navigate = useNavigate();
  const router = useRouter()
  // const accessToken = getCookie('access_token');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
  const REDIRECT_URI = 'http://localhost:3000';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  const getToken = async (code: any) => {
    // const KAKAO_REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
    // const KAKAO_REDIRECT_URI = 'http://localhost.3000';

    try {
      const response = await fetch(`http://localhost:8000/api/login/kakao?code=${code}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
       
      });

      console.log(response);
      const data = await response.json();
      console.log(data,'=======');

      if (code) {
        console.log(code, 'code!!!');
        localStorage.setItem('name', data.profile.nickname); 
        const cookies = nookies.get();
        nookies.set({}, 'access_token', data.access_token, {
          path: '/',
          secure: true,
          maxAge: 3600, 
          sameSite: 'Strict',
        });
        setLoggedIn(true);
        setNickname(data.profile.nickname);
        setAccessToken(data.access_token) // 이용하기, code 재사용 불가
        console.log('ACCESS-TOKEN', data.access_token)

        router.push({
          pathname: '/text-setting',
          query: { access_token: data.access_token },
        } as any);
      }
    } catch (error) {
      console.error('Error during token request:', error);
      throw error;
    }
  };


  const handleLoginClick = (code:any) => {
    window.location.href = link
    console.log(link,'--------------')
    // handleClick(code)
    getToken(code)
    if (accessToken) {
      // 로그인된 경우
      router.push({
        pathname: '/text-setting',
        query: { access_token: accessToken },
      } as any); // 'as any'를 사용하여 타입 명시
    }
  };

  
  return (
    <div className="flex flex-col my-[50px] w-full">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className='flex flex-row mx-auto w-full'>
        <div className='flex flex-col w-full mx-[120px]'>

          {/* <Redirection /> */}
          <div className='flex flex-row justify-between'><img className="w-[105px] h-[35px] mb-[20px]" src="image/logo.svg" alt="Logo" />
            <div className='flex gap-x-[70px]'>
            <a className='cursor-pointer' onClick={()=>router.push({
                pathname: '/writer',
                query: { access_token: accessToken },
              } as any)}>글루ING</a>
              <a className='cursor-pointer' onClick={()=>router.push({
                pathname: '/mypage/badge',
                query: { access_token: accessToken },
              } as any)}>나의 보관함</a>
              <a className='cursor-pointer' onClick={()=>setLoggedIn(false)}> 
              <Redirection isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
              </a>
            </div>
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
              <img className="w-[875px] h-[657px]" src="image/badges.svg" alt="Badges" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
