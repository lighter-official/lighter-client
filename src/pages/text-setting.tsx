// Settings.tsx
'use client'
import "./globals.css";
import { initWebSocket, postSetUp } from '@/api/api';
import axios from 'axios';
import { fork } from 'child_process';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type DropdownItem = {
    name: string;
    value: number
  };
  type DropdownProps = {
    items: DropdownItem[];
    onSelect: (selectedItem: DropdownItem) => void;
  };
  


function DropDown({ items, onSelect }: DropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

    const handleSelect = (item: DropdownItem) => {
        setSelectedItem(item);
        setIsDropdownOpen(false);
        console.log('Selected Item:', item);
        onSelect(item);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => {
                    setIsDropdownOpen((prev) => !prev);
                }}
                className="w-[112px] bg-white h-[40px] rounded-md flex items-center justify-between p-[16px]"
            >
                <div className={`${selectedItem?.name === "선택" && "text-[#a0a0a0]"} w-fit`}>
                    {selectedItem?.name || "선택"}
                </div>
                <div className={`${isDropdownOpen && "rotate-180"}`}></div>
            </button>

            <div
                className={`${
                    isDropdownOpen ? "" : "hidden"
                } absolute bg-white w-[112px] rounded-md max-h-[150px] overflow-y-auto`}
            >
                {items.map((item) => (
                    <div
                        key={item.value}
                        className="h-[50px] text-left p-[16px] cursor-pointer"
                        onMouseDown={() => {
                            setSelectedItem(item);
                            setIsDropdownOpen(false);
                            handleSelect(item);
                            console.log(selectedItem, typeof(selectedItem));
                        }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}


  


export default function Settings() {
    const router = useRouter()
    const [subject, setSubject] = useState('');
    const [period, setPeriod] = useState(0);
    const [page, setPage] = useState(0);
    const [start_time, setStartTime] = useState<[string, number|undefined, number|undefined]>(['', undefined, undefined]);
    const [for_hours, setForHours] = useState(0);
    const disabled = !subject || !period || !page || !start_time[0] || start_time[1] == undefined || start_time[2] == undefined || !for_hours;
    const accessToken = router.query.access_token as string


  useEffect(() => {
    console.log('subject updated:', subject)
    console.log('period updated:', period);
    console.log('page updated:', page);
    console.log('start_time updated:', start_time);
    console.log('for_hours updated:', for_hours);
  }, [subject, period, page, start_time, for_hours]);

  // 시작하기 버튼 클릭 시 서버로 설정된 값들을 전송
  const isPageValid = page < 10;  // 10 미만이면 필수 필드 채워지지 않은 것으로 간주
  const handleStart = async () => {

    try {
        const response = await postSetUp({
            subject,
            period,
            page,
            start_time,
            for_hours,
          }, accessToken);

      console.log(response.data, '============');
      router.push({
        pathname: '/writer',
        query: { access_token: accessToken },
      } as any);
      // 서버 응답에 따른 처리 추가
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
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
            <a className='cursor-pointer' onClick={()=>router.push('/')}>글루ING</a>
              <a className='cursor-pointer' onClick={()=>router.push('/mypage/badge')}>나의 보관함</a>
              <a className='cursor-pointer' onClick={()=>router.push('/')}>로그아웃</a>
            </div>
          </div>
          <hr className='w-full bg-[#7C766C] h-[1px] my-[17px]' style={{color: '#7C766C', borderColor:'#7C766C'}} />
                    <div className='flex flex-col mx-auto'>
                        <div className='flex w-full font-bold items-center justify-center mt-[40px] text-[40px] h-[55px]'>
                            글쓰기의 첫걸음
                        </div>
                        <div className='w-full text-center mt-[22px]'>평소 흥미로웠던 주제로 정해진 시간에 글을 쓰는 연습을 함께 해봐요.<br />
                            <a className='w-full items-center justify-center font-bold'>타이머가 설정되어 설정한 시간에만 글을 쓸 수 있어요!</a>
                        </div>
                        <div className='flex w-full items-center justify-center mt-[30px] text-[22px] h-[60px]'>
                            어떤 주제로 글을 써볼까요?
                        </div>
                        <textarea
                        className='w-[593px] rounded-md h-[60px] mx-auto text-center flex items-center justify-center'
                        placeholder='ex. 뮤직 비디오, 리뷰, 영화, 맛집 탐방 기록'
                        value={subject}
                        style={{ lineHeight: '60px'}}
                        onChange={(e) => {
                            setSubject(e.target.value)
                            console.log(subject)
                        }}
                        ></textarea>

                        <div className='flex w-full items-center justify-center mt-[60px] text-[22px] h-[40px]'>
                            글쓰기 목표를 설정해봐요!
                        </div>
                        <div>
                            <div>
                                <div className='flex flex-col mt-[20px] gap-y-[20px]'>
                                    <div className='flex flex-col gap-y-[20px]'>
                                        <a className='font-bold'>1. 글쓰기 기간</a>
                                        <div className='flex flex-row gap-x-[20px]'>
                                            <button className={`w-[82px] h-[40px] border-1 rounded-md ${period === 14 ? 'bg-black text-white' : ' bg-white'}`} onClick={() => {
                                                setPeriod(14)
                                                console.log(period, 'period 14')
                                                }}>14일</button>
                                            <button className={`w-[82px] h-[40px] border-1 rounded-md ${period === 30  ? 'bg-black text-white' : ' bg-white'}`}  onClick={() => setPeriod(30)}>30일</button>
                                            <button className={`w-[82px] h-[40px] border-1 rounded-md ${period === 100  ? 'bg-black text-white' : ' bg-white'}`} onClick={() => setPeriod(100)}>100일</button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-[20px]'>
                                        <a className='font-bold'>2. 글쓰기 페이지 수</a>
                                        <div className='flex flex-row gap-x-[20px]'>
                                        <button className={`w-[82px] h-[40px] border-1 rounded-md ${page === 10 ? 'bg-black text-white' : ' bg-white'}`} 
                                            onClick={() => {
                                                setPage(10)
                                                console.log(page, 'page 10')
                                                }}>10편</button>
                                        <button className={`w-[82px] h-[40px] border-1 rounded-md ${page === 20 ? 'bg-black text-white' : ' bg-white'}`} 
                                            onClick={() => {
                                                setPage(20)
                                                console.log(page, 'page 20')
                                                }}>20편</button>
                                        <button className={`w-[82px] h-[40px] border-1 rounded-md ${page === 30 ? 'bg-black text-white' : ' bg-white'}`} 
                                            onClick={() => {
                                                setPage(30)
                                                console.log(page, 'page 30')
                                                }}>30편</button>
                                           <textarea
                                            className={`w-[82px] flex text-center items-center justify-center h-[40px] border-1 border-black rounded-lg`}
                                            placeholder= '직접입력'
                                            style={{ lineHeight: '40px' }}
                                            onChange={(e) => {
                                                setPage(0)
                                                const inputValue = e.target.value;
                                                const numericValue = parseInt(inputValue, 10); // 문자열을 숫자로 변환

                                                // 숫자로 변환 가능한 경우에만 set
                                                if (!isNaN(numericValue) && numericValue >= 10) {
                                                    setPage(numericValue);
                                                    console.log(numericValue, typeof(numericValue));
                                                }
                                                
                                            }}
                                            >
                                           </textarea>
                                           {isPageValid ? <div className='items-center flex text-[10px]' style={{color:'red'}}>*10일 이상 입력해주세요.</div> : ''}
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-[20px]'>
                                        <a className='font-bold'>3. 글쓰기 시간</a>
                                        <div className='flex flex-row gap-x-[20px]'>
                                        <button
                                            className={`w-[82px] h-[40px] border-1 rounded-md ${start_time[0] === 'AM' ? 'bg-black text-white' : ' bg-white'}`}
                                            onClick={() => {
                                            setStartTime(['AM', start_time[1], start_time[2]]);
                                            console.log(start_time, 'start_time');
                                            }}
                                        >
                                            AM
                                        </button>
                                        <button
                                            className={`w-[82px] h-[40px] border-1 rounded-md ${start_time[0] === 'PM' ? 'bg-black text-white' : ' bg-white'}`}
                                            onClick={() => {
                                            setStartTime(['PM', start_time[1], start_time[2]]);
                                            console.log(start_time, 'start_time');
                                            }}
                                        >
                                            PM
                                        </button>
                                           <DropDown
                                                items={[
                                                { name: '1시', value: 1 },
                                                { name: '2시', value: 2 },
                                                { name: '3시', value: 3 },
                                                { name: '4시', value: 4 },
                                                { name: '5시', value: 5 },
                                                { name: '6시', value: 6 },
                                                { name: '7시', value: 7 },
                                                { name: '8시', value: 8 },
                                                { name: '9시', value: 9 },
                                                { name: '10시', value: 10 },
                                                { name: '11시', value: 11 },
                                                { name: '12시', value: 12 },
                                                ]}
                                                onSelect={(selectedHour) => {
                                                    setStartTime([start_time[0], selectedHour.value, start_time[2]]);

                                                  }}
                                            />
                                            <DropDown
                                                items={[
                                                { name: '00분', value: 0 },
                                                { name: '15분', value: 15 },
                                                { name: '30분', value: 30 },
                                                { name: '45분', value: 45 },
                                                ]}
                                                onSelect={(selectedMinute) => {
                                                    setStartTime([start_time[0], start_time[1], selectedMinute.value]);
                                                  }}
                                            /><a className='my-auto'>부터</a>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-md bg-white'>
                                            <DropDown
                                                items={[
                                                { name: '1시간', value: 1 },
                                                { name: '2시간', value: 2 },
                                                { name: '3시간', value: 3 },
                                                { name: '4시간', value: 4 },
                                                { name: '5시간', value: 5 },
                                                ]}
                                            onSelect={(selectedForHours) => {
                                                setForHours(selectedForHours.value)
                                            }}
                                            />
                                              
                                            </button>
                                            <a className='ml-[20px] my-auto'>동안</a>
                                        </div>
                                    </div>
                                    {/* <form onSubmit={sendMessage}>
                                        <input type="text" id="messageText1" />
                                        <input type="text" id="messageText2" />
                                        <input type="text" id="messageText3" />
                                        <input type="text" id="messageText4" />
                                        <button type="submit">Send Messages</button>
                                    </form> */}
                                    <button
                                        className={`rounded-md mx-auto mt-[30px] w-[386px] font-bold h-[62px] ${disabled ? 'bg-gray-800 text-gray-600' : 'bg-orange-500 text-black'}`}
                                        onClick={handleStart}
                                        disabled={disabled} 
                                    >
                                        글쓰기 도전 시작
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

