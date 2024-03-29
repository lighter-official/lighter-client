import axios from "axios";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { GetUserInfoResponse } from "./api.response";

interface WritingData {
  subject: string
  period: number
  page: number
  startAt: {hour: number, minute:number|undefined}
  writingHours: number
}

interface currentWritingData {
  title: string
  content: string
}

const apiUrl: string = process.env.API_URL || "https://core.gloo-lighter.com";

export const getLoginInfo = async (code: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/account/users/sign-in/kakao?code=${code}`
    );
    console.log(response.data, "============");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 글쓰기 설정하는 API
export const postSetUp = async (data: WritingData, accessToken: string) => {
  try {
    console.log(accessToken, "APIAPIAPI");
    const response = await axios.post(`${apiUrl}/writing-session`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data, "============");
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
    const response = await axios.get<GetUserInfoResponse>(
      `${apiUrl}/account/users/me`,
      config
    );
    console.log("유저 정보----------------", response.data);
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
    console.log("진행중인 세션 정보 ----------------", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 글쓰기 시작 시에 POST 필요
export const startWriting = async (id: string, accessToken: string) => {
  try {
    const response = await axios.post(`${apiUrl}/writings/start?writingSessionId=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(id,'??????????????????????!!!!!!!')
    console.log(response.data, "============");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 글 임시저장 API
export const temporarySaveWriting = async (writingId: string, accessToken: string, data?: currentWritingData) => {
  try {
    const response = await axios.put(`${apiUrl}/writings/${writingId}/temp-save`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data, "============");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// 최종적으로 글 POST하는 API
export const submitWriting = async (writingId: string, accessToken: string, data: currentWritingData) => {
  try {
    const response = await axios.put(`${apiUrl}/writings/${writingId}/submit`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data, "============");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 글 목록 & 정보 가져오는 API
export const getWritingInfo = async (id: string, accessToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/writings/${id}`,
      config
    );
    console.log("===클릭한 글?===", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 각 글 수정하는 API
export const putWriting = async (
  id: string,
  data: currentWritingData,
  accessToken: string
) => {
  try {
    console.log(accessToken, "APIAPIAPI");
    const response = await axios.put(
      `${apiUrl}/api/glooing/writings/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data, "============");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
