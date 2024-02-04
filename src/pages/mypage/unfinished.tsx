'use client'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import "../globals.css";

export default function Writer() {
    // const router = useRouter()
    // const handleClick = () => {
    //     // 시작하기 버튼을 누르면 settings.tsx로 이동
    //     router.push('/writer');
    // };
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="flex flex-col my-[50px] w-full">
            <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
            <div className='flex flex-row mx-auto w-full'>
                <div className='flex flex-col w-full mx-[120px]'>
                    {/* <Redirection /> */}
                    <div className='flex flex-row justify-between'><img className="w-[105px] h-[35px] mb-[20px]" src="/image/logo.svg" alt="Logo" />
            <div className='flex gap-x-[70px]'>
            <a className='cursor-pointer'  style={{color:'#A49E90'}} onClick={()=>router.push('/')}>글루ING</a>
            <a className='cursor-pointer font-bold' style={{color:'#191919'}}onClick={()=>router.push('/mypage/badge')}>나의 보관함</a>
            <a className='cursor-pointer'  style={{color:'#A49E90'}} onClick={()=>router.push('/')}>로그아웃</a>
            </div>
          </div>
          <hr className='w-full bg-[#7C766C] h-[1px] my-[17px]' style={{color: '#7C766C', borderColor:'#7C766C'}} />
                    <div className='flex mt-[20px] justify-between flex-row my-[30px]'>
                        <div className='bg-black rounded-sm  flex flex-col w-[400px] h-[471px]'>
                            <div className='flex flex-col mx-[20px]'>
                                <div className='text-white mt-[34px] w-full h-[51px] text-[36px]'>나의 보관함</div>
                                <div className='flex flex-col gap-y-[26px] mt-[24px]'>
                                <div className='flex text-[20px] cursor-pointer' style={{ color: '#CEB292' }} onClick={()=>router.push('/mypage/badge')}>나의 뱃지</div>
                                    <div className='flex text-[20px] cursor-pointer' style={{ color: '#CEB292' }} onClick={()=>router.push('/mypage/book')}>내가 발행한 책</div>
                                    <div className='flex text-[20px] font-bold cursor-pointer' style={{ color: '#CEB292' }} onClick={()=>router.push('/mypage/unfinished')}>못다쓴 책</div>
            
                                    <div className='flex text-[20px] cursor-pointer' style={{ color: '#CEB292' }}  onClick={()=>router.push('/mypage/settings')}>설정</div>


                                </div>
                            </div>
                        </div>
                        <div className='w-[1120px] rounded-sm border-black  bg-gray-800 opacity-25 border-1 flex flex-row max-h-[797px]' style={{ backgroundColor: '#E0D5BF', border: '1px solid black' }}>
                            <div className='w-full  my-[30px] ml-[53px] '>

                                <div className='flex flex-row items-center '>
                               <div className='w-[205px] text-black mt-[8px] text-[36px] font-bold'>못다쓴 책 (1)</div>
                     
                                   </div>
                               
                                <div className='flex flex-col  max-h-[643px] overflow-y-auto mt-[21px] mb-[21px] '>
                                    <div className=' mt-[53px] flex flex-row gap-x-[46px]'>
                                        <div>
                                            <div className='w-[266px] h-[367px]' style={{backgroundColor: '#D5C8AE', border: '1px solid gray'}}>
                                            <img className="z-50" src="/image/book_yet.png" alt="book_yet" />
                                            </div>
                                            <div className='mt-[10px] text-[32px]'>영화 평론</div>
                                            <div className='mt-[10px] text-[16px]' style={{color:'#8A8170'}}>2023년 11월 7일 발행</div>
                                        </div>
                                        <div>
                                            <div className='w-[266px] h-[367px]' style={{backgroundColor: '#D5C8AE', border: '1px solid gray'}}></div>
                                            {/* <div className='mt-[10px] text-[36px]'>반려동물에 대하여</div>
                                            <div className='mt-[10px] text-[16px]' style={{color:'#8A8170'}}>2023년 11월 7일 발행</div> */}
                                        </div>
                                        <div className='w-[266px] h-[370px]' style={{backgroundColor: '#D5C8AE', border: '1px solid gray'}}></div>                                    
                                    </div>
                                    <div className=' mt-[43px] flex flex-row gap-x-[46px]'>
                                        <div className='w-[266px] h-[367px]' style={{backgroundColor: '#D5C8AE', border: '1px solid gray'}}></div>
                                        <div className='w-[266px] h-[367px]' style={{backgroundColor: '#D5C8AE', border: '1px solid gray'}}></div>
                                        <div className='w-[266px] h-[367px]' style={{backgroundColor: '#D5C8AE', border: '1px solid gray'}}></div>                                    
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '50%', left: '55%'}}>
                            <img className="w-[184px] h-[53px] z-9999" src="/image/soon.png" alt="soon" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

