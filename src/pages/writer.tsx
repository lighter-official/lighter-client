// @ts-nocheck
'use client';
import {
  getGlooingInfo,
  getUserInfo,
  getCurrentSessions,
  getWritingInfo,
  initWebSocket,
  postWriting,
  putWriting,
  startWriting,
} from '@/api/api';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { Redirection, getCookie } from '.';
import { access } from 'fs';
import './globals.css';
import { day } from '@/lib/dayjs';
import {
  WritingSession,
  WritingSessionStartAt,
} from '@/schemas/WritingSession.schema';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  id?: string;
  writingData: any;
  remainingTime?: any;
  textColor?: boolean;
  mini?: any;
  remainingSecond?: any;
  remainingTime2?: any;
}

// 새로 등록하는 모달로 사용
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  writingData,
  remainingTime,
  textColor,
  glooingInfo,
  mini,
  id,
  remainingSecond,
  remainingTime2,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const accessToken = getCookie('access_token')
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const disabled = !title || !content;
  const [writingDetails, setWritingDetails] = useState<any>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isOpen) {
      intervalId = setInterval(async () => {
        try {
          await temporarySaveWriting(id, accessToken, { title, content });
          console.log('임시 저장 성공');
        } catch (error) {
          console.error('임시 저장 실패:', error);
        }
      }, 30000); // 30초마다 호출
    }

    // 컴포넌트 언마운트 or 모달 닫힐 경우 clear interval하도록 설정
    return () => clearInterval(intervalId);
  }, [isOpen, title, content]);


  const handleCancelPost = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleTitleChange = (e) => {
    const inputText = e.target.value;

    // 최대 길이를 40으로 설정
    if (inputText.length <= 40) {
      // 40자 이내일 때만 setTitle 호출하여 상태 업데이트
      setTitle(inputText);
    }
    // 만약 40자를 초과하면 무시
  };

  const handlePost = async () => {
    // 모달 열기 전에 확인 모달을 띄우도록 수정
    setIsConfirmationModalOpen(true);
  };

  const handleClose = () => {
    mini(false);
  };

  const handleConfirmPost = async () => {
    // 작성한 글을 서버에 저장
    const writingData = {
      title: title || null, // 만약 title이 빈 문자열이면 null로 설정
      content: content || null, // 만약 content가 빈 문자열이면 null로 설정
    };
    try {
      // 새로운 글 작성
      await submitWriting(writingData, id, accessToken);
      console.log('들어옴 ???');

      const currentURL = window.location.href;
      const newURL = `${currentURL}?access_token=${accessToken}`;
      window.history.replaceState({}, document.title, newURL);
      mini(true);
    } catch (error) {
      console.error('Error saving writing:', error);
    }

    onClose();
    setIsConfirmationModalOpen(false);
    // mini(false)
  };

  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div
        className='absolute w-full h-full bg-gray-800 opacity-50'
        onClick={onClose}
      ></div>
      <div className='relative flex flex-col bg-white w-[800px] h-[550px] rounded-lg z-50'>
        <div className='p-8'>
          <div className='text-[16px]'>{writingData?.data?.writings?.length + 1}번째 글</div>
          <div
            className='mb-[10px] font-bold text-[22px]'
            style={{ color: '#646464' }}
          >
            {writingData?.data?.subject}
          </div>
          <textarea
            className='text-[40px] w-full mb-[10px] h-[50px]'
            placeholder='제목을 입력해주세요.'
            value={title}
            onChange={handleTitleChange}
            maxLength={40}
          />

          <hr
            className='w-full bg-[#7C766C] h-[1px] my-[17px]'
            style={{ color: '#7C766C', borderColor: '#7C766C' }}
          />
          <textarea
            className='mt-[20px] w-full h-[220px] overflow-y-auto'
            placeholder='내용을 입력해주세요.'
            value={content}
            onChange={(e) => {
              const inputValue = e.target.value;
              // 최대 입력 글자수 - 4000자로 제한
              if (inputValue.length <= 4000) {
                setContent(inputValue);
              }
            }}
          />
          <div className='text-[14px] text-gray-500 items-end justify-end flex'>{`${content.length}/4000`}</div>
        </div>
        <div className='flex flex-col w-full rounded-md'>
          <div
            className='h-[100px] flex justify-between  p-8 items-center rounded-md w-full'
            style={{ backgroundColor: '#F1F1F1' }}
          >
            <a
              className={`items-start justify-start flex ${
                textColor ? 'text-orange-500' : 'text-black'
              }`}
            >
              남은 시간 {remainingTime2}
            </a>
            <button
              className={`w-[152px] h-[53px] cursor-pointer rounded-md ${
                disabled
                  ? 'bg-zinc-400 text-gray-100'
                  : 'bg-orange-500 text-black'
              }`}
              disabled={disabled}
              onClick={handlePost}
            >
              저장
            </button>
          </div>
        </div>
      </div>
      {isConfirmationModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
          <div
            className='absolute w-full h-full bg-gray-800 opacity-50'
            onClick={onClose}
          ></div>
          <div className='flex flex-col bg-white w-[300px] h-[155px] text-center justify-center items-center rounded-lg z-50'>
            <div className='p-8 '>
              <div className='text-[16px] mb-[30px]'>
                해당 내용으로 발행하시겠습니까?
              </div>
              <div className='flex justify-center gap-x-[10px]'>
                <button
                  className='w-[120px] text-[14px] cursor-pointer h-[40px] rounded-md'
                  style={{ backgroundColor: '#D9D9D9' }}
                  onClick={handleCancelPost}
                >
                  취소
                </button>
                <button
                  className='w-[120px] text-[14px] cursor-pointer h-[40px] rounded-md'
                  style={{ backgroundColor: '#FF8126' }}
                  onClick={handleConfirmPost}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// MiniModal 컴포넌트 수정

const MiniModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  id,
  writingData,
  mini,
}) => {
  const handleClose = () => {
    console.log('Closing MiniModal');
    mini(false);
    onClose();
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div
        className='absolute w-full h-full bg-gray-800 opacity-50'
        onClick={handleClose}
      ></div>
      <div className='flex flex-col bg-white w-[328px] h-[171px] text-center justify-center items-center rounded-lg z-50'>
        <div className='text-center items-center flex flex-col'>
          <div className='text-[15px] font-bold mb-[2px]'>
            {data?.total_writing + 1}번째
          </div>
          <div className='text-[15px] mb-[6px]'>글 등록을 완료했어요!</div>
          <div className='text-[13px] mb-[10px]' style={{ color: '#7F7F7F' }}>
            다음{' '}
            <a>
              {data?.setting?.start_time[0]}:{data?.setting?.start_time[1]}
            </a>
            시에 꼭 다시 만나요!
          </div>
          <div className='flex justify-center'>
            <button
              className='w-[120px] text-[15px] font-bold cursor-pointer h-[40px] rounded-md'
              style={{ backgroundColor: '#FF5A26' }}
              onClick={handleClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 수정용 모달로 사용
const EditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  id,
  writingData,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const accessToken = router.query.access_token as string;
  const [isConfirmationModal2Open, setIsConfirmationModal2Open] =
    useState(false);
  const disabled = !title || !content;
  const [writingDetails, setWritingDetails] = useState<any>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isOpen) {
      intervalId = setInterval(async () => {
        try {
          await temporarySaveWriting(id, accessToken, { title, content });
          console.log('임시 저장 성공');
        } catch (error) {
          console.error('임시 저장 실패:', error);
        }
      }, 30000); // 30초마다 호출
    }

    // 컴포넌트 언마운트 or 모달 닫힐 경우 clear interval하도록 설정
    return () => clearInterval(intervalId);
  }, [isOpen, title, content]);


  const handleTitleChange = (e) => {
    const inputText = e.target.value;

    // 최대 길이를 40으로 설정
    if (inputText.length <= 40) {
      // 40자 이내일 때만 setTitle 호출하여 상태 업데이트
      setTitle(inputText);
    }
    // 만약 40자를 초과하면 무시
  };

  const handleCancelPost = () => {
    setIsConfirmationModal2Open(false);
  };

  const handleEditPost = async () => {
    console.log('EDIT');
    // 모달 열기 전에 확인 모달을 띄우도록 수정
    setIsConfirmationModal2Open(true);
  };

  const handleConfirmPost = async () => {
    // 작성한 글을 서버에 저장
    const editData = {
      title: title || writingData?.title || null,
      content: content || writingData?.content || null,
    };

    try {
      // 새로운 글 작성
      await putWriting(id, editData, accessToken);
      console.log('글 작성 완료');

      // 페이지 새로 고침 없이 현재 URL에 토큰을 포함하여 다시 로드
      const currentURL = window.location.href;
      const newURL = `${currentURL}?access_token=${accessToken}`;
      window.history.replaceState({}, document.title, newURL);
    } catch (error) {
      console.error('Error saving writing:', error);
    }

    onClose();
    setIsConfirmationModal2Open(false);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div
        className='absolute w-full h-full bg-gray-800 opacity-50'
        onClick={onClose}
      ></div>
      <div className='relative flex flex-col bg-white w-[800px] h-[550px] rounded-lg z-50'>
        <div className='p-8'>
          <div className='text-[16px]'>{writingData?.idx + '번째 글'}</div>
          <div
            className='mb-[10px] font-bold text-[22px]'
            style={{ color: '#646464' }}
          >
            {data?.setting?.subject}
          </div>
          <textarea
            className='text-[40px] w-full mb-[10px] h-[50px]'
            placeholder='제목을 입력해주세요.'
            value={title || writingData?.title}
            onChange={handleTitleChange}
          />

          <hr
            className='w-full bg-[#7C766C] h-[1px] my-[17px]'
            style={{ color: '#7C766C', borderColor: '#7C766C' }}
          />
          <textarea
            className='mt-[20px] w-full h-[220px] overflow-y-auto'
            placeholder='내용을 입력해주세요.'
            value={content || writingData?.content}
            onChange={(e) => {
              const inputValue = e.target.value;
              // 최대 입력 글자수 - 4000자로 제한
              if (inputValue.length <= 4000) {
                setContent(inputValue);
              }
            }}
          />
          <div className='text-[14px] text-gray-500 items-end justify-end flex'>{`${content.length}/4000`}</div>
        </div>
        <div className='flex flex-col w-full rounded-md'>
          <div
            className='h-[100px] flex p-8  justify-end items-center rounded-md w-full'
            style={{ backgroundColor: '#F1F1F1' }}
          >
            <button
              className='w-[152px] h-[53px] cursor-pointer rounded-md bg-orange-500 text-black'
              // disabled={disabled}
              onClick={handleEditPost}
            >
              수정
            </button>
          </div>
        </div>
      </div>
      {isConfirmationModal2Open && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
          <div
            className='absolute w-full h-full bg-gray-800 opacity-50'
            onClick={onClose}
          ></div>
          <div className='flex flex-col bg-white w-[300px] h-[155px] text-center justify-center items-center rounded-lg z-50'>
            <div className='p-8 '>
              <div className='text-[16px] mb-[30px]'>
                해당 내용으로 수정하시겠습니까?
              </div>
              <div className='flex justify-center gap-x-[10px]'>
                <button
                  className='w-[120px] text-[14px] cursor-pointer h-[40px] rounded-md'
                  style={{ backgroundColor: '#D9D9D9' }}
                  onClick={handleCancelPost}
                >
                  취소
                </button>
                <button
                  className='w-[120px] text-[14px] cursor-pointer h-[40px] rounded-md'
                  style={{ backgroundColor: '#FF8126' }}
                  onClick={handleConfirmPost}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Writer() {
  // 미니 모달이 오픈됨과 동시에 타이머 바꾸기
  const router = useRouter();
  const [isWriterModalOpen, setIsWriterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [glooingInfo, setGlooingInfo] = useState<WritingSession>({});
  const [userInfo, setUserInfo] = useState<any>({});
  const [selectedWritingId, setSelectedWritingId] = useState('');
  const [writingData, setWritingData] = useState<any>({});
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [writingCount, setWritingCount] = useState(0);
  const [remainingTime, setRemainingTime] = useState<string>();
  const [remainingTime2, setRemainingTime2] = useState<string>();
  const [buttonActivated, setButtonActivated] = useState<boolean>(false);
  const [textColor, setTextColor] = useState<boolean>(false);
  const [remainingSecond, setRemainingSecond] = useState<number>();
  const [remainingSecond2, setRemainingSecond2] = useState<number>();
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [currentWritingsData, setCurrentWritingsData] = useState<any>({});
  const [isEndTime, setIsEndTime] = useState(false)
  const isFirst = router.query.isFirst === 'true';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo(accessToken);
        setUserInfo(userData);
        console.log('유저 데이터 정보: ', userData);

        const currentWritings = await getCurrentSessions(accessToken);
        console.log('현재 글쓰기 데이터 정보: ', currentWritings);
        setCurrentWritingsData(currentWritings);

        if (isFirst == true) {
          setIsFirstModalOpen(true)
        }

        const startHour = parseInt(currentWritings?.data?.startAt?.hour);
        const startMinute = parseInt(currentWritings?.data?.startAt?.minute);
        const startHour2 = !isNaN(startHour) ? startHour : 0;
        const startMinute2 = !isNaN(startMinute) ? startMinute : 0;

        const currentTime = new Date();

        const finishedString = currentWritings?.data?.nearestFinishDate
        const finishTime = new Date(finishedString)
        const newStartString = currentWritings?.data?.nearestStartDate
        const newStartTime = new Date(newStartString)

        let startTime = new Date(
          currentTime?.getFullYear(),
          currentTime?.getMonth(),
          currentTime?.getDate(),
          startHour,
          startMinute
        );
        let startTime2 = new Date(
          currentTime?.getFullYear(),
          currentTime?.getMonth(),
          currentTime?.getDate(),
          startHour + startHour2,
          startMinute + startMinute2
        );
        // 타이머
        const newIntervalId = setInterval(() => {
          const currentTime = new Date();
          const timeDiff = newStartTime?.getTime() - currentTime?.getTime();
          const seconds = Math.floor(timeDiff / 1000);
          const updatedHours = Math.floor(seconds / 3600);
          const updatedMinutes = Math.floor((seconds % 3600) / 60);
          const updatedRemainingSeconds = seconds % 60;

          const timeDiff2 = finishTime?.getTime() - currentTime?.getTime();
          const seconds2 = Math.floor(timeDiff2 / 1000);
          const updatedHours2 = Math.floor(seconds2 / 3600);
          const updatedMinutes2 = Math.floor((seconds2 % 3600) / 60);
          const updatedRemainingSeconds2 = seconds2 % 60;

          if (!buttonActivated) {
            const updatedTime = `${
              updatedHours < 10
                ? updatedHours < 0
                  ? updatedHours + 23
                  : '0' + updatedHours
                : updatedHours
            }:${
              updatedMinutes < 10
                ? updatedMinutes < 0
                  ? updatedMinutes + 59
                  : '0' + updatedMinutes
                : updatedMinutes
            }:${
              updatedRemainingSeconds < 0
                ? updatedRemainingSeconds + 59
                : updatedRemainingSeconds < 10
                ? '0' + updatedRemainingSeconds
                : updatedRemainingSeconds
            }`;

            setRemainingTime(updatedTime);
          } else {
            const updatedTime2 = `${
              updatedHours2 < 10
                ? updatedHours2 < 0
                  ? updatedHours2 + 23
                  : '0' + updatedHours2
                : updatedHours2
            }:${
              updatedMinutes2 < 10
                ? updatedMinutes2 < 0
                  ? updatedMinutes2 + 59
                  : '0' + updatedMinutes2
                : updatedMinutes2
            }:${
              updatedRemainingSeconds2 < 0
                ? updatedRemainingSeconds2 + 59
                : updatedRemainingSeconds2 < 10
                ? '0' + updatedRemainingSeconds2
                : updatedRemainingSeconds2
            }`;

            setRemainingTime2(updatedTime2);
          }

          if (seconds <= 0 && !buttonActivated) {
            setButtonActivated(true);
            clearInterval(newIntervalId);
          }
        }, 1000);

        setIntervalId(newIntervalId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };
  }, [buttonActivated]);

  useEffect(() => {
    // currentWritings?.data?.isActivated 값이 true이면 버튼 활성화, false이면 비활성화
    if (currentWritingsData?.data?.isActivated === true) {
      setButtonActivated(true);
    } else {
      setButtonActivated(false);
    }
  }, [currentWritingsData?.data?.isActivated]); 
  

  const { isActivated, nearestStartDate, nearestFinishDate } = glooingInfo; //useQuery로 받아온 데이터


  const now = day();
  const seconds = day(isActivated ? nearestFinishDate : nearestStartDate).diff(
    now,
    'second'
  );

  const [timer, setTimer] = useState<number>(seconds);
  useEffect(() => {
    if (timer === 0) {
      return setIsEndTime(true);
    }

    const updateTimer = () => {
      setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    };
    const intervalId = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(intervalId);
    };
    // setInterval(updateTimer, 1000);
  }, [timer]);

  const displayHours = Math.floor(timer / (60 * 60));
  const displayMinutes = Math.floor((timer % (60 * 60)) / 60);
  const displaySeconds = timer % 60;

  const formattedTime = `${isActivated ? '남은 시간' : ''}${
    displayHours < 10 ? '0' : ''
  }${displayHours} : ${displayMinutes < 10 ? '0' : ''}${displayMinutes} : ${
    displaySeconds < 10 ? '0' : ''
  }${displaySeconds}`;

  const handleOpenWriterModal = async () => {
    try {
      // 새로운 글 작성
      await startWriting();
      console.log('시작 ???');
      router.push('/newWriting')
    } catch (error) {
      console.error('Error start writing:', error);
    }
    // setIsWriterModalOpen(true);
  };

  const handleCloseWriterModal = () => {
    setIsWriterModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    window.location.reload();
  };

  const handleCloseMiniModal = () => {
    setIsMiniModalOpen(false);
    setButtonActivated(false);
    window.location.reload();
  };

  const handleCloseFirstModal = () => {
    setIsFirstModalOpen(false);
  }

  const handleWritingClick = async (writingId: string) => {
    try {
      const writingData = await getWritingInfo(writingId, accessToken);
      setWritingData(writingData);
      console.log('writingDATA', writingData);
      setSelectedWritingId(writingId);
      setIsWriterModalOpen(true);
    } catch (error) {
      console.error('Error fetching writing data:', error);
    }
  };

  // 수정할 글 클릭했을 때
  const handleEditClick = async (writingId: string) => {
    try {
      const writingData = await getWritingInfo(writingId, accessToken);
      setWritingData(writingData);
      setSelectedWritingId(writingId);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Error fetching writing data:', error);
    }
  };

  const handleLogIn = () => {
    setLoggedIn(prevLoggedIn => !prevLoggedIn);
    if (isLoggedIn === true) {
      setLoggedIn(false)
      nookies.destroy(null, 'access_token'); 
      router.push('/');
    }
  };

  
  function getCookie(name: any) {
    return nookies.get(null)[name];
  }

  const completion_percentage = currentWritingsData?.data?.progressPercentage;
  const accessToken = getCookie('access_token');

  useEffect(() => {
    const accessToken = getCookie('access_token');

    // 페이지에 변동사항이 있을 때 리다이렉트
    if (accessToken) {
      router.push({
        pathname: router.pathname,
        query: { access_token: accessToken },
      });
    }
  }, [glooingInfo, userInfo]);

  // console.log(formattedTime, 'formatted Time')

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 맞춤
    const day = dateObject.getDate().toString().padStart(2, '0'); // 두 자리 맞춤
    return `${year}년 ${month}월 ${day}일`;
  }

  const startDateString = currentWritingsData?.data?.startDate;
  const finishDateString = currentWritingsData?.data?.finishDate;

  const formattedStartDate = formatDate(startDateString);
  const formattedFinishDate = formatDate(finishDateString);

  const formattedDateRange = `${formattedStartDate} - ${formattedFinishDate}`;

  return (
    <div className='flex flex-col my-[50px] w-full overflow-hidden'>
      <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
      <div className='flex flex-row mx-auto w-full'>
        <div className='flex flex-col w-full mx-[120px]'>
          <div className='flex flex-row justify-between'>
            <Image
              className='mb-[20px]'
              src='image/logo.svg'
              width="105" height="35"
              alt='Logo'
            />
            <div className='flex gap-x-[70px]'>
              <a
                className='cursor-pointer font-bold'
                onClick={() =>
                  router.push({
                    pathname: '/writer',
                    query: { access_token: accessToken },
                  } as any)
                }
              >
                글루ING
              </a>
              <a
                className='cursor-pointer'
                onClick={() =>
                  router.push({
                    pathname: '/mypage/badge',
                    query: { access_token: accessToken },
                  } as any)
                }
              >
                나의 보관함
              </a>
              <a className='cursor-pointer' onClick={handleLogIn}>
                {isLoggedIn === false ? '로그인' : '로그아웃'}
              </a>
            </div>
          </div>
          <hr
            className='w-full bg-[#7C766C] h-[1px] my-[17px]'
            style={{ color: '#7C766C', borderColor: '#7C766C' }}
          />
          <div className='flex mt-[20px] justify-between flex-row my-[30px]'>
            <div className='bg-black rounded-sm  flex flex-col w-[400px] h-[600px]'>
              <div className='flex flex-col mx-[20px]'>
                <div className='text-white mt-[34px] w-full h-[120px] text-[36px]'>
                  <a>{userInfo?.data?.nickname}</a>님의
                  <br />
                  글쓰기 시간
                </div>
                <div className='flex flex-row gap-x-[8px] mt-[8px]'>
                  <div
                    className='flex text-[26px]'
                    style={{ color: '#CEB292' }}
                  >
                    <a>
                      {currentWritingsData?.data?.startAt?.hour}:
                      {currentWritingsData?.data?.startAt?.minute === 0
                        ? '00'
                        : currentWritingsData?.data?.startAt?.minute}
                    </a>
                  </div>

                  {/* <button className='flex text-white w-[106px] rounded-lg' style={{ backgroundColor: '#3F3F3F' }}><a className="w-full text-[14px] my-auto" style={{ color: '#8E887B' }}>변경하기 <a>{glooingInfo?.setting?.change_num}</a>/<a>{glooingInfo?.max_change_num}</a></a></button> */}
                </div>
              </div>
              <div className='flex flex-col mx-[20px] mt-[76px]'>
                <div className='' style={{ color: '#BAB1A0' }}>
                  {buttonActivated === true ? '남은 시간' : '글쓰기 시간까지'}
                </div>
                {/* <div className='' style={{ color: '#BAB1A0' }}>글쓰기 시간까지</div> */}
                <div
                  className='flex w-full justify-start text-[72px]'
                  style={{ color: '#F2EBDD' }}
                >
                  {buttonActivated === true ? remainingTime2 : remainingTime}
                </div>
                {/* <div className='flex w-full justify-start text-[66px]' style={{ color: '#F2EBDD' }}>12 : 30 : 00</div> */}
              </div>
              <div className='flex justify-center items-center mt-[100px] relative'>
                <button
                  className={`rounded-xl w-[333px] h-[62px] ${
                    buttonActivated === true
                      ? 'bg-orange-500 text-black'
                      : 'bg-zinc-700  text-white'
                  }`}
                  disabled={!buttonActivated}
                  onClick={handleOpenWriterModal}
                  // style={{ zIndex: 1 }}  // 버튼을 위로 올리기 위해 zIndex를 설정
                >
                  글 작성하기
                </button>
                <div
                  style={{
                    position: 'absolute',
                    top: '5%',
                    left: '68%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                  }}
                >
                  {buttonActivated === false && (
                    <Image
                      src='/image/soon2.png'
                      width={120}
                      height={42}
                      alt='soon2'
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              className='w-[1120px] rounded-sm flex flex-row h-[817px]'
              style={{ border: '1px solid black', backgroundColor: '#E0D5BF' }}
            >
              <div className='w-full  my-[30px] mx-[40px]'>
                <div className='bg-black text-white w-[60px] text-center'>
                  <a>{glooingInfo?.d_day}</a>
                </div>
                <div className='flex flex-row items-center justify-between w-full'>
                  <div className='flex flex-col'>
                    <div className='w-full text-black mt-[8px] text-[36px]'>
                      <a>{currentWritingsData?.data?.subject}</a>
                    </div>
                    <div
                      className='w-[300px] text-[16px]'
                      style={{ color: '#706B61' }}
                    >
                      {formattedDateRange}
                    </div>
                  </div>
                  <div className='w-[83px] h-[49px] text-[36px] justify-end'>
                    <a className='text-black'>
                      {currentWritingsData?.data?.writings.length}
                    </a>
                    /
                    <a style={{ color: '#706B61' }}>
                      {currentWritingsData?.data?.page}
                    </a>
                  </div>
                </div>
                <hr
                  className='w-full bg-[#7C766C] h-[1px] my-[17px]'
                  style={{ color: '#7C766C', borderColor: '#7C766C' }}
                />
                {currentWritingsData?.data?.writings.length === 0 && (
                  <div
                    className='flex items-center justify-center text-center my-auto h-[580px] text-[20px]'
                    style={{ color: '#706B61' }}
                  >
                    나만의 기록으로 채워보아요!
                  </div>
                )}
                {currentWritingsData?.data?.writings.length !== 0 && (
                  <div
                    className='w-full h-[29px] flex items-center'
                    style={{
                      backgroundColor: '#F2EBDD',
                      border: '1px solid black',
                      borderColor: 'black',
                    }}
                  >
                    <div
                      className='w-full mx-[5px] h-[17px]'
                      style={{
                        width: `${completion_percentage || 0}%`,
                        backgroundColor: '#FF8126',
                        transition: 'width 0.5s ease',
                      }}
                    ></div>
                  </div>
                )}
                {currentWritingsData?.data?.writings !== null && (
                  <div className='flex flex-col max-h-[580px] mb-[21px] overflow-y-auto'>
                    {currentWritingsData?.data?.writings?.map(
                      (writing, index) => (
                        <div
                          key={index}
                          className='flex cursor-pointer flex-row w-full h-[197px] mt-[22px] rounded-xl'
                          style={{ backgroundColor: '#F4EDE0' }}
                          onClick={() => handleEditClick(writing.id)}
                        >
                          <div className='my-[30px] mx-[47px]'>
                            {/* <div className=' w-full text-[16px]' style={{ color: '#8A8170' }}>{writings?.createdAt + '년 '}{writing?.created_at[1] + '월 '}{writing?.created_at[2] + '일'} {writing.created_at[3]}요일</div> */}
                            <div className='w-full h-[39px] text-[26px]'>
                              {writing?.title}
                            </div>
                            <div
                              className='mt-[18px] max-w-[685px] truncate text-[16px]'
                              style={{ color: '#C5BCAB' }}
                            >
                              {writing?.content}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {isFirstModalOpen && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
              <div
                className='absolute w-full h-full bg-gray-800 opacity-50'
                onClick={handleCloseFirstModal}
              ></div>
              <div className='flex flex-col bg-white w-[328px] h-[171px] text-center justify-center items-center rounded-lg z-50'>
                <div className='text-center items-center flex flex-col'>
                  <div className='text-[15px] mb-[6px]'>
                    앞으로 매일 
                    {currentWritingsData?.data?.startAt?.hour}:
                    {currentWritingsData?.data?.startAt?.minute}시에 만나요!
                  </div>
                  <div
                    className='text-[13px] mb-[10px]'
                    style={{ color: '#7F7F7F' }}
                  >
                    휴대폰 알림에 글쓰기 시간을 등록하면<br/>
                    글쓰기를 잊지 않을 수 있어요!
                  </div>
                  <div className='flex justify-center'>
                    <button
                      className='w-[120px] text-[15px] font-bold cursor-pointer h-[40px] rounded-md'
                      style={{ backgroundColor: '#FF8126' }}
                      onClick={handleCloseFirstModal}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isMiniModalOpen && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
              <div
                className='absolute w-full h-full bg-gray-800 opacity-50'
                onClick={handleCloseMiniModal}
              ></div>
              <div className='flex flex-col bg-white w-[328px] h-[171px] text-center justify-center items-center rounded-lg z-50'>
                <div className='text-center items-center flex flex-col'>
                  <div className='text-[15px] font-bold mb-[2px]'>
                    {currentWritingsData?.data?.writings.length + 1}번째
                  </div>
                  <div className='text-[15px] mb-[6px]'>
                    글 등록을 완료했어요!
                  </div>
                  <div
                    className='text-[13px] mb-[10px]'
                    style={{ color: '#7F7F7F' }}
                  >
                    다음{' '}
                    <a>
                      {currentWritingsData?.data?.startAt?.hour}:
                      {currentWritingsData?.data?.startAt?.minute}
                    </a>
                    에 꼭 다시 만나요!
                  </div>
                  <div className='flex justify-center'>
                    <button
                      className='w-[120px] text-[15px] font-bold cursor-pointer h-[40px] rounded-md'
                      style={{ backgroundColor: '#FF8126' }}
                      onClick={handleCloseMiniModal}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isWriterModalOpen}
        onClose={handleCloseWriterModal}
        id={selectedWritingId}
        data={glooingInfo}
        writingData={currentWritingsData}
        mini={setIsMiniModalOpen}
        remainingTime={remainingTime}
        textColor={textColor}
        remainingSecond={remainingSecond}
        remainingTime2={remainingTime2}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        data={glooingInfo}
        id={selectedWritingId}
        writingData={writingData}
      />
    </div>
  );
}
