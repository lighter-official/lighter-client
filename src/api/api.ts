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


// 글쓰기 설정하는 API 
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

//글루ING - 설정 및 정보 받아오는 API
export const getGlooingInfo = async (accessToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await axios.get(`${apiUrl}/api/glooing/writings`, config);
    console.log('설정 정보 ============', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// userInfo API
export const getUserInfo = async (accessToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await axios.get(`${apiUrl}/api/my`, config);
    console.log('유저 정보----------------', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// 글쓰기 포스팅 API 
export const postWriting = async (data: any, accessToken: string) => {
  try {
    console.log(accessToken, 'APIAPIAPI')
    const response = await axios.post(`${apiUrl}/api/glooing/writings`, data, {
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

// 글 목록 & 정보 가져오는 API
export const getWritingInfo = async (id:string, accessToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await axios.get(`${apiUrl}/api/glooing/writings/${id}`, config);
    console.log('글 정보----------------', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// 각 글 수정하는 API
export const putWriting = async (id:string, data: any, accessToken:string) => {
  try {
    console.log(accessToken, 'APIAPIAPI')
    const response = await axios.put(`${apiUrl}/api/glooing/writings/${id}`, data, {
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
}