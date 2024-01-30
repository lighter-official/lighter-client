'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import "./globals.css";
import axios from 'axios';
import Settings from './text-setting';
import { getLoginInfo } from '@/api/api';

// export const fetchData = async (lessonId) => {
//   const response = await axiosGet(apis.lessons.preparation.getV5({ lessonId }))

//   if (response) {
//     return response
//   }
// }

// const Login = () => {
//   const REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
//   const REDIRECT_URI = 'http://localhost:3000';
//   const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const handleLoginClick = () => {
//     window.location.href = link;
//   };
//   const noData = () => {
//     console.log('no')
//   }
//   useEffect(() => {
//     if (localStorage.getItem('name')) {
//       setLoggedIn(true);
//     }
//   }, []);


//   return (
//     <button type='button' onClick={isLoggedIn ? noData : handleLoginClick}>
//       {isLoggedIn ? '로그인 완료' : '로그인 하기'}
//     </button>
//   );
// };


const Redirection = () => {
  const router = useRouter();  // 수정된 부분
  const REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
  const REDIRECT_URI = 'http://localhost:3000';
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const getCode = () => {
    // 현재 URL에서 쿼리 매개변수 'code'를 추출
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    
    return code;
  };
  const handleLoginClick = (code:any) => {
    window.location.href = link;
    console.log(link,'--------------')
    handleClick(code)
  };

  const noData = () => {
    console.log('no');
  };

  // useEffect(() => {
  //   const code = new URL(document.location.toString()).searchParams.get('code');
  //   const getToken = async (code: string) => {
  //     const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  //     const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  //     const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     });
  //     return response.json();
  //   }
  //   useEffect(() => {
  //     if (code) {
  //       getToken(code).then((res) => {
  //         console.log(res.access_token);
  //       })
  //     }
  //   }, []);
  //   console.log(code, '=================')
  //   // if (code) {
  //   //   // console.log(process.env.REACT_APP_URL);
  //   //   axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`).then((r) => {
  //   //     console.log(r.data);

  //   //     localStorage.setItem('name', r.data.user_name); // 일단 이름만 저장
  //   //     setLoggedIn(true);
  //   //     router.push('/settings');  // 수정된 부분
  //   //   });
  //   // }
  // }, []);
  const handleClick = async (code:any) => {
    try {
      const loginInfo = await getLoginInfo(code);
      console.log(loginInfo);
      localStorage.setItem('name', loginInfo.profile.nickname);
      setLoggedIn(true);
      setNickname(loginInfo.profile.nickname);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    const bodyData: {
      // grant_type: string;
      // client_id: string;
      // redirect_uri: string;
      // client_secret:string;
      code: any;
    } = {
      // grant_type: "authorization_code",
      // client_id: '042aae38695b074b539c155e83aa75a5',
      // redirect_uri: 'http://localhost:3000',
      // client_secret: 'JXCuUd5clcXmA7rvODgM76abo4viANap',
      code: code
    };

    const queryStringBody = Object.keys(bodyData)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(bodyData[k as keyof typeof bodyData]))
      .join("&");
  
 const getToken = async (code: any) => {
      const KAKAO_REST_API_KEY = '042aae38695b074b539c155e83aa75a5';
      const KAKAO_REDIRECT_URI = 'http://localhost.3000';
  
      try {
        const response = await fetch(`http://localhost:8000/api/login/kakao?code=${code}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
         
        });
  
        console.log(response);
        const data = await response.json();
        console.log(data);
  
        if (code) {
          console.log(code, 'code!!!');
          localStorage.setItem('name', data.profile.nickname); // 수정된 부분
          setLoggedIn(true);
          setNickname(data.profile.nickname);
        }
      } catch (error) {
        console.error('Error during token request:', error);
        throw error;
      }
    };
  
    if (code) {
      getToken(code);
    }
  }, []);
  

  return (
    <button type='button' onClick={isLoggedIn ? noData : (code)=>handleLoginClick(code)}>
      {isLoggedIn ? `안녕하세요, ${nickname}님!` : '로그인 하기'}
    </button>
  );
};



export default function Home() {
  // const navigate = useNavigate();
  const router = useRouter()
  const handleClick = () => {
    // 시작하기 버튼을 누르면 settings.tsx로 이동
    router.push('/text-setting');
  };
  return (
    <div className="flex flex-col my-[50px] w-full">
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className='flex flex-row mx-auto w-full'>
        <div className='flex flex-col w-full mx-[120px]'>

          <Redirection />
          <div className='flex flex-row justify-between'><img className="w-[105px] h-[35px] mb-[20px]" src="image/logo.svg" alt="Logo" />
            <div className='flex gap-x-[70px]'>
            <a className='cursor-pointer' onClick={()=>router.push('/')}>글루ING</a>
              <a className='cursor-pointer' onClick={()=>router.push('/mypage/book')}>나의 보관함</a>
              <a className='cursor-pointer' onClick={()=>router.push('/')}>로그아웃</a>
            </div>
          </div>
          <hr className='bg-[#7C766C] w-full h-[2px]' />
          <div className='flex my-[90px] flex-row justify-between'>
            <div className='w-[368px] h-[264px] my-auto border-1'>
              <div className='mb-[20px] text-[44px]'>
                <a className='font-bold'>글로</a>
                <br />시작하는
                <br /><a className='font-bold'>우리</a>의 이야기</div>
              <button className='rounded-xl w-[200px] h-[42px] bg-black text-orange-500' onClick={handleClick}>시작하기</button>
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
