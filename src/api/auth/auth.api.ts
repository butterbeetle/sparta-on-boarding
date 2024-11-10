import useLoginStore from "../../store/login.store";
import {
  logInDataType,
  profileDataType,
  SignUpDataType,
} from "../../types/types";

class AuthAPI {
  private baseURL: string;

  constructor(baseURL: string = "https://moneyfulpublicpolicy.co.kr") {
    this.baseURL = baseURL;
  }

  private getToken(): string | null {
    return useLoginStore.getState().accessToken;
  }

  // 회원가입
  signUp = async ({ id, password, nickname }: SignUpDataType) => {
    try {
      const res = await fetch(`${this.baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password,
          nickname,
        }),
      })
        .then((response) => response.json())
        .catch(() => {
          return { success: false, message: "네트워크 요청에 실패했습니다." };
        });

      return res;
    } catch (error) {
      return {
        success: false,
        message: "회원가입 중 알 수 없는 오류가 발생했습니다.",
      };
    }
  };

  // 로그인
  logIn = async ({ id, password }: logInDataType) => {
    try {
      const res = await fetch(`${this.baseURL}/login?expiresIn=10m`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password,
        }),
      })
        .then((response) => response.json())
        .catch(() => {
          return { success: false, message: "네트워크 요청에 실패했습니다." };
        });

      return res;
    } catch (error) {
      return {
        success: false,
        message: "로그인 중 알 수 없는 오류가 발생했습니다.",
      };
    }
  };

  // 사용자 정보 확인
  getUserInfo = async () => {
    const token = this.getToken();

    if (!token) {
      return {
        success: false,
        message: "토큰이 존재하지 않습니다.",
      };
    }

    try {
      const res = await fetch(`${this.baseURL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .catch(() => {
          return { success: false, message: "네트워크 요청에 실패했습니다." };
        });

      return res;
    } catch (error) {
      return {
        success: false,
        message: "사용자 정보를 가져오는 중 알 수 없는 오류가 발생했습니다.",
      };
    }
  };

  // 사용자 프로필 수정
  updateProfile = async ({ nickname, avatarFile }: profileDataType) => {
    const token = this.getToken();

    if (!token) {
      return {
        success: false,
        message: "토큰이 존재하지 않습니다.",
      };
    }

    try {
      const formData = new FormData();
      if (!avatarFile) {
        return {
          success: false,
          message: "프로필 이미지가 존재하지 않습니다.",
        };
      }
      formData.append("avatar", avatarFile);
      formData.append("nickname", nickname);

      const res = await fetch(`${this.baseURL}/profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .catch(() => {
          return { success: false, message: "네트워크 요청에 실패했습니다." };
        });
      console.log("RES___", res);
      return res;
    } catch (error) {
      return {
        success: false,
        message: "사용자 정보를 가져오는 중 알 수 없는 오류가 발생했습니다.",
      };
    }
  };
}

export default AuthAPI;
