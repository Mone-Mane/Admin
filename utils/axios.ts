import Axios from "axios";
// import { SERVER_URL } from "@env";
//SERVER_URL이 안변함
const SERVER_URL = "http://54.180.140.196:8080/api";
//const SERVER_URL = "http://172.16.21.86/api";
const createAxiosInstance = () => {
  const instance = Axios.create({
    baseURL: SERVER_URL,
    timeout: 50000,
  });

  instance.interceptors.request.use(
    async (config) => {
      const accessToken = await localStorage.getItem("ACCESS_TOKEN");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      console.log("Request error:", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response?.status === 403) {
        // 토큰이 만료되었는지 확인하고, 만료되었으면 갱신
        if (await isTokenExpired()) await tokenRefresh();

        const accessToken = await getToken();

        error.config.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };

        // 새로운 토큰으로 요청 재시도
        const response = await Axios.request(error.config);
        return response;
      }

      console.log("Response error:", error);
      if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못함
        console.log("Error request:", error.request);
      } else if (error.message) {
        // 요청을 설정하는 중에 문제가 발생
        console.log("Error message:", error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// 토큰이 만료되었는지 확인하는 함수
const isTokenExpired = async () => {
  const token = await localStorage.getItem("ACCESS_TOKEN");
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = payload.exp * 1000;
  return Date.now() > expiry;
};

// 토큰 갱신 함수
const tokenRefresh = async () => {
  try {
    const refreshToken = await localStorage.getItem("REFRESH_TOKEN");
    const response = await Axios.post(`${SERVER_URL}/auth/refresh`, {
      token: refreshToken,
    });
    const newAccessToken = response.data.accessToken;

    await localStorage.setItem("ACCESS_TOKEN", newAccessToken);
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // 토큰 갱신 실패 처리 (예: 사용자를 로그아웃)
  }
};

// 저장된 토큰을 가져오는 함수
const getToken = async () => {
  return await localStorage.getItem("ACCESS_TOKEN");
};

/**
 * API 요청 함수
 * @param {Object} param0 - 요청 파라미터
 * @param {('POST'|'GET'|'PUT'|'DELETE')} param0.method - HTTP 메서드
 * @param {Object} param0.data - 요청 데이터 (GET 요청의 경우 생략 가능)
 */
const onRequest = async ({ method, url, data = null }) => {
  const axiosInstance = createAxiosInstance();

  try {
    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      config.data = data;
    }

    const res = await axiosInstance.request(config);
    return res.data;
  } catch (err) {
    console.error("Request failed:", err);
    if (err.response) {
      // 서버가 응답을 했지만 상태 코드가 2xx 범위를 벗어남
      console.error("Response error data:", err.response.data);
      console.error("Response error status:", err.response.status);
      console.error("Response error headers:", err.response.headers);
    } else if (err.request) {
      // 요청이 만들어졌지만 응답을 받지 못함
      console.error("Request error:", err.request);
    } else {
      // 요청을 설정하는 중에 문제가 발생
      console.error("Error message:", err.message);
    }
    return Promise.reject(err);
  }
};

export default onRequest;
