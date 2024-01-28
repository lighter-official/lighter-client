// Settings.tsx
import { useRouter } from 'next/router';
import React from 'react';



export default function Settings() {
    // const router = useRouter()
    // const handleClick = () => {
    //     // 시작하기 버튼을 누르면 settings.tsx로 이동
    //     router.push('/writer');
    // };

    return (
        <div className="flex flex-col w-[1440px]">
            <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
            <div className='flex flex-row mx-[45px] w-full'>
                <div className='flex flex-col w-full mx-[20px] mt-[20px]'>
                    <img className="w-[105px] h-[35px] mb-[20px]" src="image/logo.svg" alt="Logo" />
                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <div className='flex mt-[20px] gap-x-[21px] flex-row justify-between'>
                        <div className='bg-black rounded-sm flex flex-row w-[398px] h-[600px]'>
                            <div className='flex ml-[20px]'>
                                <div className='text-white mt-[34px] w-[172px] h-[120px] text-[36px]'>김이현님의<br />글쓰기 시간</div>
                                <div className='flex flew-row gap-x-[8px] mt-[8px]'>
                                    <div className='flex text-white'>21:00</div>

                                    <div className='flex text-white'>변경하기 1/2회</div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white w-[981px] rounded-sm border-black border-1 flex flex-row h-[600px]'>dd</div>

                    </div>
                </div>

            </div>
        </div>
    );
}

