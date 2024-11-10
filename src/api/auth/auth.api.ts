import { logInData, SignUpData } from "../../types/types";

class AuthAPI {
  private baseURL: string;

  constructor(baseURL: string = "https://moneyfulpublicpolicy.co.kr") {
    this.baseURL = baseURL;
  }

  // 회원가입
  signUp = async ({ id, password, nickname }: SignUpData) => {
    // console.log("SignUP Data", id, password, nickname);
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
  logIn = async ({ id, password }: logInData) => {
    console.log(id, password);
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

      return { ...res };
    } catch (error) {
      return {
        success: false,
        message: "로그인 중 알 수 없는 오류가 발생했습니다.",
      };
    }
  };

  // 로그아웃
  logOut = async () => {};
}

export default AuthAPI;
