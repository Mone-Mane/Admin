import axios, { AxiosResponse } from "axios";
import onRequest from "../../utils/axios";

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const postLogin = async (
  userId: string,
  userPwd: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `http://54.180.140.196:8080/api/users/login`,
      {
        userId,
        userPwd,
      }
    );
    const { accessToken, refreshToken } = response.data.data;
    localStorage.setItem("ACCESS_TOKEN", accessToken);
    localStorage.setItem("REFRESH_TOKEN", refreshToken);

    return response.data;
  } catch (error: any) {
    throw new Error("로그인에 실패했습니다.");
  }
};

export interface TokenRequest {
  accessToken: string;
  refreshToken: string;
}

export const postUserToken = async (
  userToken: TokenRequest
): Promise<AxiosResponse<any>> => {
  return await onRequest({
    method: "POST",
    url: `/users/login/reissue`,
    data: {
      accessToken: userToken.accessToken,
      refreshToken: userToken.refreshToken,
    },
  });
};
