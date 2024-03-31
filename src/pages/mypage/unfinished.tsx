'use client'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import "../globals.css";
import Image from 'next/image';
import BookItem from './BookItem';

export default function Writer() {
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
                    <div className='flex flex-row justify-between'><Image className="mb-[20px]" src="https://gloo-image-bucket.s3.amazonaws.com/archive/logo.svg"  width="105" height="35" alt="Logo" />
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
                                        <BookItem imageUrl="https://gloo-image-bucket.s3.amazonaws.com/archive/book_yet.png" title="영화 평론" date="2023년 12월 25일 발행" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '50%', left: '55%'}}>
                            <Image className="z-9999" src="https://gloo-image-bucket.s3.amazonaws.com/archive/soon.png" width={184} height={53} alt="soon" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

