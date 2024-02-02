// Settings.tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Redirection, getCookie } from '..';
import { getGlooingInfo, getMyBadge, getUserInfo } from '@/api/api';

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
    const accessToken = getCookie('access_token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [glooingInfo, setGlooingInfo] = useState<any>({}); 
    const [userInfo, setUserInfo] = useState<any>({}); 
    const [badgeInfo, setBadgeInfo] = useState<any>({}); 

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const glooingData = await getGlooingInfo(accessToken);
            setGlooingInfo(glooingData);
            console.log(glooingInfo,'세팅 정보-------------------')
    
            // 유저 정보 가져오기
            const userData = await getUserInfo(accessToken);
            setUserInfo(userData);
            console.log(userInfo,'유저 정보-------------------')
    
            // const id = glooingInfo?.writings[i]
            // const writingData = await getWritingInfo(id, accessToken);
            // setWritingData(writingData)
            // console.log('각 글의 정보 ----------------:', writingData)
            const badgeData = await getMyBadge(accessToken);
            setBadgeInfo(badgeData)
            console.log(badgeInfo,'뱃지 정보-------------------')
                
    
            setLoggedIn(true)
    
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
    
        // 페이지 로드 시 데이터 호출
        fetchUserData();
      }, []); // 빈 배열을 전달하여 페이지가 로드될 때 한 번만 실행되도록 설정
    

    return (
        <div className="flex flex-col my-[50px] w-full">
            <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
            <div className='flex flex-row mx-auto w-full'>
                <div className='flex flex-col w-full mx-[120px]'>
                    {/* <Redirection /> */}
                    <div className='flex flex-row justify-between'><img className="w-[105px] h-[35px] mb-[20px]" src="/image/logo.svg" alt="Logo" />
                        <div className='flex gap-x-[70px]'>
                        <a className='cursor-pointer' onClick={()=>router.push({
                            pathname: '/writer',
                            query: { access_token: accessToken },
                        } as any)}>글루ING</a>
                        <a className='cursor-pointer  font-bold' onClick={()=>router.push({
                            pathname: '/mypage/badge',
                            query: { access_token: accessToken },
                        } as any)}>나의 보관함</a>
                        <a className='cursor-pointer' onClick={()=> setLoggedIn(false)}><Redirection isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /></a>
                        </div>
                    </div>
                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <div className='flex mt-[20px] justify-between flex-row my-[30px]'>
                        <div className='bg-black rounded-sm  flex flex-col w-[400px] h-[471px]'>
                            <div className='flex flex-col mx-[20px]'>
                                <div className='text-white mt-[34px] w-full h-[51px] text-[36px]'>나의 보관함</div>
                                <div className='flex flex-col gap-y-[26px] mt-[24px]'>
                                <div className='flex text-[20px] font-bold cursor-pointer' style={{ color: '#CEB292' }}  onClick={()=>router.push('/mypage/badge')}>나의 뱃지</div>
                                    <div className='flex text-[20px] cursor-pointer' style={{ color: '#CEB292' }}  onClick={()=>router.push('/mypage/book')}>내가 발행한 책</div>
                                    <div className='flex text-[20px] cursor-pointer' style={{ color: '#CEB292' }} onClick={()=>router.push('/mypage/unfinished')}>못다쓴 책</div>
            
                                    <div className='flex text-[20px] cursor-pointer' style={{ color: '#CEB292' }} onClick={()=>router.push('/mypage/settings')}>설정</div>


                                </div>
                            </div>
                        </div>
                        <div className='w-[1120px] rounded-sm flex flex-row max-h-[797px]' style={{ backgroundColor: '#E0D5BF', border:'1px solid black'}}>
                            <div className='w-full  my-[30px] ml-[53px] '>

                                <div className='flex flex-row items-center '>
                               <div className='w-[205px] text-black mt-[8px] text-[36px] font-bold'>나의 뱃지</div>
                               
                                   </div>
                                   <div className='w-full mt-[8px] text-[24px]' style={{color: '#8E8070'}}>매일 글을 쓰고 뱃지를 획득해보세요!</div>
                     
                                <div className='flex flex-col  h-[759px] overflow-y-auto mt-[21px] mb-[21px] '>
                                    <div className='flex text-center items-center jusify-center text-[18px] bg-black w-[80px] h-[40px]' style={{color: '#D5C8AE'}}>
                                        <a className='flex items-center justify-center mx-auto'>나비</a>
                                        </div>
                                    <div className=' mt-[33px] flex flex-row gap-x-[46px]'>
                                        <div>
                                            {/* <div className='w-[153px] h-[154px]' style={{backgroundColor: '#D5C8AE'}}></div> */}
                                            <div className='w-[153px] h-[154px]' style={{backgroundColor: '#D5C8AE'}}>
                                                <img className="w-[152px] h-[153px] z-50" src="/image/egg.png" alt="Logo" />
                                            </div>
                                            
                                            <div className='mt-[10px] text-[36px]'>{badgeInfo?.name}알</div>
                                            <div className='mt-[10px] text-[16px]' style={{color:'#8A8170'}}>2024년 2월 3일 발행{badgeInfo?.created_at}</div>
                                        </div>
                                        <div>
                                            <div className='w-[153px] h-[154px]' style={{backgroundColor: '#D5C8AE'}}></div>
                                            {/* <div className='mt-[10px] text-[36px]'>반려동물에 대하여</div>
                                            <div className='mt-[10px] text-[16px]' style={{color:'#8A8170'}}>2023년 11월 7일 발행</div> */}
                                        </div>
                                        <div className='w-[153px] h-[154px]' style={{backgroundColor: '#D5C8AE'}}></div>                                    
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

