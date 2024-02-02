// Settings.tsx
'use client'
import { getGlooingInfo, getUserInfo, getWritingInfo, postWriting, putWriting } from '@/api/api';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { Redirection } from '.';
import { access } from 'fs';
import "./globals.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
    id?: string;
    writingData: any;
}


// 새로 등록하는 모달로 사용
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data, writingData }) => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const accessToken = router.query.access_token as string
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const disabled = !title || !desc
    const [writingDetails, setWritingDetails] = useState<any>(null);

    useEffect(() => {
        console.log(data,'DATA!')
        console.log(writingData, 'WRITING')
      }); // 
      
    const handleCancelPost = () => {
        setIsConfirmationModalOpen(false)
    }

    const handlePost = async () => {
        // 모달 열기 전에 확인 모달을 띄우도록 수정
        setIsConfirmationModalOpen(true);
    };
      
    const handleConfirmPost = async () => {
        // 작성한 글을 서버에 저장
        const writingData = {
                title: title || null,  // 만약 title이 빈 문자열이면 null로 설정
                desc: desc || null,    // 만약 desc가 빈 문자열이면 null로 설정
            };
      
        try {
            // 새로운 글 작성
            await postWriting(writingData, accessToken);
            console.log('들어옴 ???')
        } catch (error) {
          console.error('Error saving writing:', error);
        }
      
        // 모달 닫기
        onClose();
        setIsConfirmationModalOpen(false);
    };
      


    if (!isOpen) return null;


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={onClose}></div>
            <div className="relative flex flex-col bg-white w-[800px] h-[550px] rounded-lg z-50">
                <div className='p-8'>
                    <div className='text-[16px]'>{data?.total_writing + 1}번째 글</div>
                    <div className='mb-[10px] font-bold text-[22px]' style={{color: '#646464'}}>{data?.setting?.subject}</div>
                    <textarea
                        className='text-[40px] w-full mb-[10px] h-[50px]'
                        placeholder='제목을 입력해주세요.'
                        value={title}  
                        onChange={(e) => setTitle(e.target.value)}
                        />

                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <textarea
                        className='mt-[20px] w-full h-[220px] overflow-y-auto'
                        placeholder='내용을 입력해주세요.'
                        value={desc}  
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            // 최대 입력 글자수 - 4000자로 제한
                            if (inputValue.length <= 4000) {
                            setDesc(inputValue);
                            }
                        }}
                        />
                      <div className='text-[14px] text-gray-500 items-end justify-end flex'>{`${desc.length}/4000`}</div>
                </div>
                <div className='flex flex-col w-full rounded-md'>
                    <div className='h-[100px] flex justify-between  p-8 items-center rounded-md w-full' style={{ backgroundColor: '#F1F1F1' }}>
                        <a className='items-start justify-start flex'>남은 시간 01:03:55</a>
                        <button
                        className={`w-[152px] h-[53px] cursor-pointer rounded-md ${
                            disabled ? 'bg-zinc-400 text-gray-100' : 'bg-orange-500 text-black'
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
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={onClose}></div>
                    <div className="flex flex-col bg-white w-[300px] h-[155px] text-center justify-center items-center rounded-lg z-50">
                        <div className='p-8 '>
                            <div className='text-[16px] mb-[30px]'>해당 내용으로 발행하시겠습니까?</div>
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

// 수정용 모달로 사용
const EditModal: React.FC<ModalProps> = ({ isOpen, onClose, data, id, writingData }) => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const accessToken = router.query.access_token as string
    const [isConfirmationModal2Open, setIsConfirmationModal2Open] = useState(false);
    const disabled = !title || !desc
    const [writingDetails, setWritingDetails] = useState<any>(null);

    useEffect(() => {
        console.log(id, 'WRITING')
    }, [writingData, id]); 
      
    const handleCancelPost = () => {
        setIsConfirmationModal2Open(false)
    }

    const handleEditPost = async () => {
        console.log('EDIT')
        // 모달 열기 전에 확인 모달을 띄우도록 수정
        setIsConfirmationModal2Open(true);
    };
      
      const handleConfirmPost = async () => {
        console.log('DGHALDJGJDJHS')
       
        // 작성한 글을 서버에 저장
        const editData = {
            title: title || writingData?.title || null,
            desc: desc || writingData?.desc || null,
        };
      
        try {
            await putWriting(id, editData, accessToken);
            console.log('들어왔는가')
        } catch (error) {
          console.error('Error saving writing:', error);
        }
      
        // 모달 닫기
        onClose();
        setIsConfirmationModal2Open(false);
      };
      


    if (!isOpen) return null;


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={onClose}></div>
            <div className="relative flex flex-col bg-white w-[800px] h-[550px] rounded-lg z-50">
                <div className='p-8'>
                    <div className='text-[16px]'>{writingData?.idx + '번째 글'}</div>
                    <div className='mb-[10px] font-bold text-[22px]' style={{color: '#646464'}}>{data?.setting?.subject}</div>
                    <textarea
                        className='text-[40px] w-full mb-[10px] h-[50px]'
                        placeholder='제목을 입력해주세요.'
                        value={title || writingData?.title}
                        onChange={(e) => setTitle(e.target.value)}
                        />

                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <textarea
                        className='mt-[20px] w-full h-[220px] overflow-y-auto'
                        placeholder='내용을 입력해주세요.'
                        value={desc || writingData?.desc}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            // 최대 입력 글자수 - 4000자로 제한
                            if (inputValue.length <= 4000) {
                            setDesc(inputValue);
                            }
                        }}
                        />
                      <div className='text-[14px] text-gray-500 items-end justify-end flex'>{`${desc.length}/4000`}</div>
                </div>
                <div className='flex flex-col w-full rounded-md'>
                    <div className='h-[100px] flex p-8  justify-end items-center rounded-md w-full' style={{ backgroundColor: '#F1F1F1' }}>
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
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={onClose}></div>
                    <div className="flex flex-col bg-white w-[300px] h-[155px] text-center justify-center items-center rounded-lg z-50">
                        <div className='p-8 '>
                            <div className='text-[16px] mb-[30px]'>해당 내용으로 수정하시겠습니까?</div>
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
    // const router = useRouter()
    // const handleClick = () => {
    //     // 시작하기 버튼을 누르면 settings.tsx로 이동
    //     router.push('/writer');
    // };
    const router = useRouter()
    const [isWriterModalOpen, setIsWriterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [glooingInfo, setGlooingInfo] = useState<any>({}); 
    const [userInfo, setUserInfo] = useState<any>({}); 
    const [selectedWritingId, setSelectedWritingId] = useState('')
    const [writingData, setWritingData] = useState<any>({}); 
    const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = router.query.access_token as string
        
        
        // 글루ING 정보 가져오기
        const glooingData = await getGlooingInfo(accessToken);
        console.log(glooingData,'세팅 정보-------------------')
        setGlooingInfo(glooingData);
        console.log(glooingInfo,'세팅 정보-------------------')

        // 유저 정보 가져오기
        const userData = await getUserInfo(accessToken);
        console.log(userData,'유저 정보-------------------')
        setUserInfo(userData);
        console.log(userInfo,'유저 정보-------------------')

        // const id = glooingInfo?.writings[i]
        // const writingData = await getWritingInfo(id, accessToken);
        // setWritingData(writingData)
        // console.log('각 글의 정보 ----------------:', writingData)

        setLoggedIn(true)

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // 페이지 로드 시 데이터 호출
    fetchUserData();
  }, []); // 빈 배열을 전달하여 페이지가 로드될 때 한 번만 실행되도록 설정

  useEffect(() => {
    console.log('세팅 정보:', glooingInfo);
    console.log('유저 정보:', userInfo);
}, [glooingInfo, userInfo]);


    const handleOpenWriterModal = () => {
        setIsWriterModalOpen(true);
    };

    const handleCloseWriterModal = () => {
        setIsWriterModalOpen(false);
    };

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleWritingClick = async (writingId: string) => {
        try {
          const writingData = await getWritingInfo(writingId, accessToken);
          setWritingData(writingData);
          console.log('writingDATA', writingData)
          setSelectedWritingId(writingId);
          setIsWriterModalOpen(true);
        } catch (error) {
          console.error('Error fetching writing data:', error);
        }
    };


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
      

    function getCookie(name: any) {
        console.log(nookies.get(null)[name], '쿠키?');
        return nookies.get(null)[name];
      }

    const completion_percentage = (glooingInfo?.writings?.length / glooingInfo?.setting?.page) * 100;
    const accessToken = getCookie('access_token');

    return (
        <div className="flex flex-col my-[50px] w-full overflow-hidden">
            <style>{`body { background: #F2EBDD; margin: 0; height: 100%; }`}</style>
            <div className='flex flex-row mx-auto w-full'>
                <div className='flex flex-col w-full mx-[120px]'>
                    {/* <Redirection /> */}
                    <div className='flex flex-row justify-between'><img className="w-[105px] h-[35px] mb-[20px]" src="image/logo.svg" alt="Logo" />
                        <div className='flex gap-x-[70px]'>
                        <a className='cursor-pointer font-bold' onClick={()=>router.push({
                            pathname: '/writer',
                            query: { access_token: accessToken },
                        } as any)}>글루ING</a>
                        <a className='cursor-pointer' onClick={()=>router.push({
                            pathname: '/mypage/badge',
                            query: { access_token: accessToken },
                        } as any)}>나의 보관함</a>
                        <a className='cursor-pointer' onClick={()=> setLoggedIn(false)}><Redirection isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /></a>
                        </div>
                    </div>
                    <hr className='bg-[#7C766C] w-full h-[2px]' />
                    <div className='flex mt-[20px] justify-between flex-row my-[30px]'>
                        <div className='bg-black rounded-sm  flex flex-col w-[400px] h-[600px]'>
                            <div className='flex flex-col mx-[20px]'>
                                <div className='text-white mt-[34px] w-full h-[120px] text-[36px]'><a>{userInfo?.nickname}</a>님의<br />글쓰기 시간</div>
                                <div className='flex flex-row gap-x-[8px] mt-[8px]'>
                                    <div className='flex text-[26px]' style={{ color: '#CEB292' }}><a>{glooingInfo?.setting?.start_time[0]}:{glooingInfo?.setting?.start_time[1]}</a></div>

                                    {/* <button className='flex text-white w-[106px] rounded-lg' style={{ backgroundColor: '#3F3F3F' }}><a className="w-full text-[14px] my-auto" style={{ color: '#8E887B' }}>변경하기 <a>{glooingInfo?.setting?.change_num}</a>/<a>{glooingInfo?.max_change_num}</a></a></button> */}
                                </div>
                            </div>
                            <div className='flex flex-col mx-[20px] mt-[76px]'>
                                <div className='' style={{ color: '#BAB1A0' }}>글쓰기 시간까지</div>
                                <div className='w-full justify-center text-[60px]' style={{ color: '#F2EBDD' }}>12 : 40 : 50</div>
                            </div>
                            <div className='flex justify-center items-center mt-[110px]'>
                                <button className='rounded-xl w-[333px] h-[62px] text-white' style={{ backgroundColor: '#3F3F3F', color: '#8E887B' }} onClick={handleOpenWriterModal}>글 작성하기</button>
                                <div style={{ position: 'absolute', top: '60%', left: '20%'}}>
                            <img className="w-[120px] h-[42px] z-9999" src="/image/soon2.png" alt="soon2" />
                        </div>
                            </div>
                        </div>
                        <div className='w-[1120px] rounded-sm border-black border-1 flex flex-row h-[817px]' style={{ backgroundColor: '#E0D5BF' }}>
                            <div className='w-full  my-[30px] mx-[40px]'>
                                <div className='bg-black text-white w-[60px] text-center'><a>{glooingInfo?.d_day}</a></div>
                                <div className='flex flex-row items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <div className='w-[306px] text-black mt-[8px] text-[36px]'><a>{glooingInfo?.setting?.subject}</a></div>
                                        <div className='w-[300px] text-[16px]' style={{ color: '#706B61' }}>{glooingInfo?.start_date} - {glooingInfo?.end_date}</div>
                                    </div>
                                    <div className='w-[83px] h-[49px] text-[36px] justify-end'>
                                        <a className='text-black'>{glooingInfo?.total_writing}</a>
                                         / 
                                        <a style={{color: '#706B61'}}>{glooingInfo?.setting?.page}</a></div></div>
                                <hr className='w-full bg-[#7C766C] h-[2px] my-[17px]' />
                                {glooingInfo?.total_writing === 0 && <div className="flex items-center justify-center text-center my-auto h-[580px] text-[20px]" style={{color: '#706B61'}}>나만의 기록으로 채워보아요!</div>}
                                {glooingInfo?.total_writing !== 0 && 
                                <div className='w-full h-[29px] flex items-center' style={{ backgroundColor: '#F2EBDD', border: '1px solid black', borderColor: 'black' }}>
                                    <div
                                        className='w-full mx-[5px] h-[17px]'
                                        style={{
                                            width: `${(completion_percentage || 0)}%`,
                                            backgroundColor: '#FF8126',
                                            transition: 'width 0.5s ease',  // Add smooth transition for better visual effect
                                        }}
                                    ></div>
                                </div>
                                }
                                {glooingInfo?.writings !== null && (
                                <div className='flex flex-col max-h-[580px] mb-[21px] overflow-y-auto'>
                                {glooingInfo?.writings?.map((writing, index) => (
                                    <div key={index} className='flex cursor-pointer flex-row w-full h-[197px] mt-[22px] rounded-xl' style={{ backgroundColor: '#F4EDE0' }} onClick={() => handleEditClick(writing.id)}>
                                        <div className='my-[30px] mx-[47px]'>
                                            <div className=' w-full text-[16px]' style={{ color: '#8A8170' }}>{writing?.created_at[0] + '년 '}{writing?.created_at[1] + '월 '}{writing?.created_at[2] + '일'} {writing.created_at[3]}요일</div>
                                            <div className='w-full h-[39px] text-[26px]'>{writing.title}</div>
                                            <div className='mt-[18px] max-w-[685px] truncate text-[16px]' style={{ color: '#C5BCAB' }}>{writing.desc}</div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <Modal isOpen={isWriterModalOpen} onClose={handleCloseWriterModal} data={glooingInfo} writingData={writingData}/>
            <EditModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} data={glooingInfo} id={selectedWritingId} writingData={writingData}/>
        </div>
    );
}

