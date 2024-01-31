import axios from 'axios';

const apiUrl = process.env.API_URL || 'http://localhost:8000';

export const getLoginInfo = async (code:any) => {
  try {
    const response = await axios.get(`${apiUrl}/api/login/kakao?code=${code}`);
    console.log(response.data,'============')
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postSetUp = async (data: any, accessToken: string) => {
  try {
    console.log(accessToken, 'APIAPIAPI')
    const response = await axios.post(`${apiUrl}/api/glooing/set-up`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data, '============');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};