import axios from "axios";
import { GetUserInfoResponse } from "./api.response";
import { NewWritingData, EditOrSetData } from "../../interface";

const apiUrl: string = process.env.API_URL || "https://core.gloo-lighter.com";

export const getLoginInfo = async (code: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/account/users/sign-in/kakao?code=${code}`
    );
    console.log("LoginInfo============", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 글쓰기 설정하는 API
export const postSetUp = async (data: EditOrSetData, accessToken: string) => {
  try {
    console.log(accessToken, "APIAPIAPI");
    const response = await axios.post(`${apiUrl}/writing-session`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("설정 정보============", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
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
    };
    const response = await axios.get(`${apiUrl}/api/glooing/writings`, config);
    console.log("설정 정보 ============", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
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
    };
    const response = await axios.get(`${apiUrl}/account/users/me`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 진행중인 글쓰기 세션만 보여주도록 하는 API
export const getCurrentSessions = async (accessToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/writing-session/on-process`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 글쓰기 시작 시에 POST 필요
export const startWriting = async (id: string, accessToken: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/writings/start?writingSessionId=${id}`,
      undefined, // axios post 특성을 고려해 수정
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("글쓰기 시작============", response.data, id);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 글 임시저장 API
export const temporarySaveWriting = async (
  writingId: string,
  accessToken: string,
  data?: NewWritingData
) => {
  try {
    const response = await axios.put(
      `${apiUrl}/writings/${writingId}/temp-save`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("임시 저장?============", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 최종적으로 글 POST하는 API
export const submitWriting = async (
  data: NewWritingData,
  writingId: string,
  accessToken: string
) => {
  console.log(writingId, "idididid");
  try {
    const response = await axios.put(
      `${apiUrl}/writings/${writingId}/submit`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("포스팅한 글 내용 ============", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 클릭한 글의 정보를 가져오는 API
export const getWritingInfo = async (id: string, accessToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(`${apiUrl}/writings/${id}`, config);
    console.log("클릭한 글 정보", id, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 각 글 수정하는 API
export const putWriting = async (
  id: string,
  data: NewWritingData,
  accessToken: string
) => {
  try {
    const response = await axios.put(`${apiUrl}/writings/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data, "수정된 데이터 -----------");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 각 글 수정하는 API
export const editWritingSetUp = async (
  id: string,
  data: EditOrSetData,
  accessToken: string
) => {
  try {
    const response = await axios.put(`${apiUrl}/writing-session/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data, "수정된 데이터 -----------");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
