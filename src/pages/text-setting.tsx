// Settings.tsx
import { useRouter } from 'next/router';
import React from 'react';



export default function Settings() {
    const router = useRouter()
    const handleStart = () => {
        // 시작하기 버튼을 누르면 settings.tsx로 이동
        router.push('/writer');
    };

    return (
        <div className="flex flex-col w-[1440px]">
            <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
            <div className='flex flex-row mx-[45px] w-full'>
                <div className='flex flex-col w-full mx-[20px] mt-[20px]'>
                    <img className="w-[105px] h-[35px] mb-[20px]" src="image/logo.svg" alt="Logo" />
                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <div className='flex flex-col mx-auto'>
                        <div className='flex w-full font-bold items-center justify-center mt-[40px] text-[40px] h-[55px]'>
                            글쓰기의 첫걸음
                        </div>
                        <div className='w-full text-center mt-[22px]'>평소 흥미로웠던 주제로 정해진 시간에 글을 쓰는 연습을 함께 해봐요.<br />
                            <a className='w-full items-center justify-center font-bold'>타이머가 설정되어 설정한 시간에만 글을 쓸 수 있어요!</a>
                        </div>
                        <div className='flex w-full items-center justify-center mt-[30px] text-[22px] h-[50px]'>
                            어떤 주제로 글을 써볼까요?
                        </div>
                        <textarea className='w-[593px] border-1 rounded-lg h-[42px] border-black text-center' placeholder='ex. 뮤직 비디오, 리뷰, 영화, 맛집 탐방 기록'></textarea>
                        <div className='flex w-full items-center justify-center mt-[31px] text-[22px] h-[40px]'>
                            글쓰기 목표를 설정해봐요!
                        </div>
                        <div>
                            <div>
                                <div className='flex flex-col gap-y-[17px]'>
                                    <div className='flex flex-col gap-y-[20px]'>
                                        <a className='font-bold'>1. 글쓰기 기간</a>
                                        <div className='flex flex-row gap-x-[20px]'>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>14일</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>30일</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>100일</button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-[20px]'>
                                        <a className='font-bold'>2. 글쓰기 페이지 수</a>
                                        <div className='flex flex-row gap-x-[20px]'>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>10편</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>20편</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>30편</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>직접입력</button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-[20px]'>
                                        <a className='font-bold'>3. 글쓰기 시간</a>
                                        <div className='flex flex-row gap-x-[20px]'>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>AM</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>PM</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>9시</button>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>00분</button><a className='my-auto'>부터</a>
                                            <button className='w-[82px] h-[40px] border-1 border-black rounded-lg bg-white'>00시간</button><a className='my-auto'>동안</a>
                                        </div>
                                    </div>
                                    <button className='rounded-xl mx-auto mt-[30px] w-[386px] h-[42px] bg-black text-white' onClick={handleStart}>글쓰기 도전 시작</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

