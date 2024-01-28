'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom'
import "./globals.css";
import axios from 'axios';


const Login = () => {
  const REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
  const REDIRECT_URI = 'http://localhost:3000';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLoginClick = () => {
    window.location.href = link;
  };
  const noData = () => {
    console.log('no')
  }
  useEffect(() => {
    if (localStorage.getItem('name')) {
      setLoggedIn(true);
    }
  }, []);


  return (
    <button type='button' onClick={isLoggedIn ? noData : handleLoginClick}>
      {isLoggedIn ? '로그인 완료' : '로그인 하기'}
    </button>
  );
};

const Redirection = () => {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(process.env.REACT_APP_URL);
    axios.post(`https://b2a2-220-75-248-102.ngrok-free.app/callback?code=${code}`).then((r) => {
      console.log(r.data);

      localStorage.setItem('name', r.data.user_name); // 일단 이름만 저장

      navigate('/settings');
    });
  }, []);

  useEffect(() => {
    // 사용자가 로그인 버튼을 클릭하면 Redirection 컴포넌트 호출
    Redirection();
  }, []);

  return <div>로그인 중입니다.</div>;
};



export default function Home() {
  // const navigate = useNavigate();
  const router = useRouter()
  const handleClick = () => {
    // 시작하기 버튼을 누르면 settings.tsx로 이동
    router.push('/settings');
  };
  return (
    <div className="flex flex-col w-[1440px]">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className='flex flex-row mx-[45px] w-full'>
        <div className='flex flex-col w-full mx-[20px] mt-[20px]'>
          <img className="w-[105px] h-[35px] mb-[20px]" src="image/logo.svg" alt="Logo" /><Login />
          <hr className='bg-[#7C766C] w-full h-[2px]' />
          <div className='flex flex-row justify-between'>
            <div className='w-[368px] h-[264px] mt-[265px] border-1'>
              <div className='mb-[20px] text-[44px]'>
                <a className='font-bold'>글로</a>
                <br />시작하는
                <br /><a className='font-bold'>우리</a>의 이야기</div>
              <button className='rounded-xl w-[200px] h-[42px] bg-black text-orange-500' onClick={handleClick}>시작하기</button>
            </div>
            <div className='flex mt-[30px] items-end w-[876px] h-[657px] border-1'>
              <img className="w-[875px] h-[657px]" src="image/badges.svg" alt="Badges" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
