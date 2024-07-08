import onRequest from "../../utils/axios";
import axios, { AxiosResponse } from "axios";

export const getAdminInfo = async (
  period: number
): Promise<AxiosResponse<any>> => {
  return await onRequest({
    method: "GET",
    url: `/admins/accumulated/${period}`,
  });
};

export const getGenderCategory = async (): Promise<AxiosResponse<any>> => {
  return await onRequest({
    method: "GET",
    url: `/challenges/statistics/category/gender`,
  });
};

export const getRatioCategory = async (): Promise<AxiosResponse<any>> => {
  return await onRequest({
    method: "GET",
    url: `/challenges/statistics/category/ratio`,
  });
};

interface NotificationData {
  title: string;
  message: string;
}

export const postNotification = async ({
  title,
  message,
}: NotificationData): Promise<AxiosResponse<any>> => {
  return await onRequest({
    method: "POST",
    url: "/users/notification/all",
    data: {
      title,
      message,
    },
  });
};
// import axios, { AxiosResponse } from "axios";

// export const getAdminInfo = async (
//   period: number
// ): Promise<AxiosResponse<any>> => {
//   try {
//     const accessToken = localStorage.getItem("ACCESS_TOKEN");

//     // axios 설정 객체 생성
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         // 여기에 Authorization 헤더 추가
//         Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
//       },
//     };

//     // GET 요청 보내기
//     const response = await axios.get(
//       `http://54.180.140.196:8080/api/admins/accumulated/${period}`,
//       config
//     );

//     return response;
//   } catch (error) {
//     throw new Error("관리자 정보를 가져오는 데 실패했습니다.");
//   }
// };
