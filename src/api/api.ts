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
