// Settings.tsx
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={onClose}></div>
            <div className="relative flex flex-col bg-white w-[800px] h-[550px] rounded-lg z-50">
                <div className='p-8'>
                    <div className='text-[16px]'>4번째 글</div>
                    <div className='mb-[10px] text-[22px]'>뮤직비디오 해석하기</div>
                    <textarea className='text-[40px] w-full mb-[30px] h-[50px]' placeholder='제목을 입력해주세요.' />
                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <textarea className='mt-[30px] w-full h-[220px] overflow-y-auto' placeholder='내용을 입력해주세요.' />
                </div>
                <div className='flex flex-col w-full rounded-md'>
                    <div className='h-[100px] flex justify-between  p-8 items-center rounded-md w-full' style={{ backgroundColor: '#F1F1F1' }}>
                        <a className='items-start justify-start flex'>남은 시간 01:03:55</a>
                        <button
                            className='w-[152px] h-[53px] rounded-md'
                            style={{ backgroundColor: '#979797' }}
                            onClick={onClose}
                        >
                            저장
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};


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
                    <div className='flex flex-row justify-between'><img className="w-[105px] h-[35px] mb-[20px]" src="image/logo.svg" alt="Logo" />
            <div className='flex gap-x-[70px]'>
            <a className='cursor-pointer font-bold' style={{color:'#191919'}}  onClick={()=>router.push('/')}>글루ING</a>
            <a className='cursor-pointer'  style={{color:'#A49E90'}} onClick={()=>router.push('/mypage/badge')}>나의 보관함</a>
            <a className='cursor-pointer'  style={{color:'#A49E90'}} onClick={()=>router.push('/')}>로그아웃</a>
            </div>
          </div>
                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <div className='flex mt-[20px] justify-between flex-row my-[30px]'>
                        <div className='bg-black rounded-sm  flex flex-col w-[400px] h-[600px]'>
                            <div className='flex flex-col mx-[20px]'>
                                <div className='text-white mt-[34px] w-full h-[120px] text-[36px]'>김이현님의<br />글쓰기 시간</div>
                                <div className='flex flex-row gap-x-[8px] mt-[8px]'>
                                    <div className='flex text-[26px]' style={{ color: '#CEB292' }}>21:00</div>

                                    <button className='flex text-white w-[106px] rounded-lg' style={{ backgroundColor: '#3F3F3F' }}><a className="w-full text-[14px] my-auto" style={{ color: '#8E887B' }}>변경하기 1/2</a></button>
                                </div>
                            </div>
                            <div className='flex flex-col mx-[20px] mt-[76px]'>
                                <div className='' style={{ color: '#BAB1A0' }}>글쓰기 시간까지</div>
                                <div className='w-full justify-center text-[60px]' style={{ color: '#F2EBDD' }}>12 : 40 : 50</div>
                            </div>
                            <div className='flex justify-center items-center mt-[110px]'>
                                <button className='rounded-xl w-[333px] h-[62px] text-white' style={{ backgroundColor: '#3F3F3F', color: '#8E887B' }} onClick={handleOpenModal}>글 작성하기</button>
                            </div>
                        </div>
                        <div className='w-[1120px] rounded-sm border-black border-1 flex flex-row max-h-[797px]' style={{ backgroundColor: '#E0D5BF' }}>
                            <div className='w-full  my-[30px] mx-[20px]'>
                                <div className='bg-black text-white w-[60px] text-center'>D-12</div>
                                <div className='flex flex-row items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <div className='w-[306px] text-black mt-[8px] text-[36px]'>뮤직비디오 해석하기</div>
                                        <div className='w-[300px] text-[16px]' style={{ color: '#706B61' }}>2024년 1월 25일 - 2024년 2월 8일</div>
                                    </div>
                                    <div className='w-[83px] h-[49px] text-[36px] justify-end'>3/10</div></div>
                                <hr className='w-full bg-[#7C766C] h-[2px] my-[17px]' />
                                <div className='w-full h-[29px] border-black border-1 flex items-center justify-center' style={{ backgroundColor: '#F2EBDD', borderColor: '#7C766C' }}>
                                    <div className='w-full mx-[7px] py-[5px] h-[17px]' style={{ backgroundColor: '#FF8126' }}></div>
                                </div>
                                <div className='flex flex-col max-h-[580px] mt-[21px] mb-[21px] overflow-y-auto'>
                                    <div className='flex flex-row w-full h-[197px] gap-y-[22px] rounded-xl' style={{ backgroundColor: '#F4EDE0' }}>
                                        <div className='my-[30px] mx-[47px]'>
                                            <div className=' w-[161px] text-[16px]' style={{ color: '#8A8170' }}>2024년 1월 26일 화요일</div>
                                            <div className='w-[192px] h-[39px] text-[26px]'>레드벨벳 Chill Kill</div>
                                            <div className='mt-[18px] max-w-[685px] text-[16px]' style={{ color: '#C5BCAB' }}>오늘 본 뮤비 : 레드벨벳의 Chill Kill 2. 오늘 레드벨벳의 Chill Kill 뮤비를 봤는데, 와 너무 예쁘고 멋있고 난리가 났다.
                                                이게 무슨 일인가. 이번에 한국풍 호러같은 컨셉으로 나와서 뮤비가 더 흥미롭고...</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-row w-full h-[197px] mt-[21px] gap-y-[22px] rounded-xl' style={{ backgroundColor: '#F4EDE0' }}>
                                        <div className='my-[30px] mx-[47px]'>
                                            <div className=' w-[161px] text-[16px]' style={{ color: '#8A8170' }}>2024년 1월 26일 화요일</div>
                                            <div className='w-[192px] h-[39px] text-[26px]'>레드벨벳 Chill Kill</div>
                                            <div className='mt-[18px] max-w-[685px] text-[16px]' style={{ color: '#C5BCAB' }}>오늘 본 뮤비 : 레드벨벳의 Chill Kill 2. 오늘 레드벨벳의 Chill Kill 뮤비를 봤는데, 와 너무 예쁘고 멋있고 난리가 났다.
                                                이게 무슨 일인가. 이번에 한국풍 호러같은 컨셉으로 나와서 뮤비가 더 흥미롭고...</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-row w-full h-[197px] mt-[21px] gap-y-[22px] rounded-xl' style={{ backgroundColor: '#F4EDE0' }}>
                                        <div className='my-[30px] mx-[47px]'>
                                            <div className=' w-[161px] text-[16px]' style={{ color: '#8A8170' }}>2024년 1월 26일 화요일</div>
                                            <div className='w-[192px] h-[39px] text-[26px]'>레드벨벳 Chill Kill</div>
                                            <div className='mt-[18px] max-w-[685px] text-[16px]' style={{ color: '#C5BCAB' }}>오늘 본 뮤비 : 레드벨벳의 Chill Kill 2. 오늘 레드벨벳의 Chill Kill 뮤비를 봤는데, 와 너무 예쁘고 멋있고 난리가 났다.
                                                이게 무슨 일인가. 이번에 한국풍 호러같은 컨셉으로 나와서 뮤비가 더 흥미롭고...</div>
                                        </div>
                                    </div>
                                    <div className='flex mb-[22px] flex-row w-full h-[197px] mt-[21px] gap-y-[22px] rounded-xl' style={{ backgroundColor: '#F4EDE0' }}>
                                        <div className='my-[30px] mx-[47px]'>
                                            <div className=' w-[161px] text-[16px]' style={{ color: '#8A8170' }}>2024년 1월 26일 화요일</div>
                                            <div className='w-[192px] h-[39px] text-[26px]'>레드벨벳 Chill Kill</div>
                                            <div className='mt-[18px] max-w-[685px] text-[16px]' style={{ color: '#C5BCAB' }}>오늘 본 뮤비 : 레드벨벳의 Chill Kill 2. 오늘 레드벨벳의 Chill Kill 뮤비를 봤는데, 와 너무 예쁘고 멋있고 난리가 났다.
                                                이게 무슨 일인가. 이번에 한국풍 호러같은 컨셉으로 나와서 뮤비가 더 흥미롭고...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

