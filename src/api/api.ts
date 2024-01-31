import axios from 'axios';

const apiUrl = process.env.API_URL || 'http://localhost:8000/api/login/kakao';

export const getLoginInfo = async (code:any) => {
  try {
    const response = await axios.get(`${apiUrl}?code=${code}`);
    console.log(response.data,'============')
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postSetUp = async (data: any) => {
  try {
    const response = await axios.post(apiUrl, data);
    console.log(response.data, '============');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

//현재 405 error 발생, 버튼 입력란으로 바꾸고 다시 시도!!