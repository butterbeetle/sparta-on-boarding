import { SignUpData } from "../../types/types";

class AuthAPI {
  private baseURL: string;

  constructor(baseURL: string = "https://moneyfulpublicpolicy.co.kr") {
    this.baseURL = baseURL;
  }

  // 회원가입
  signUp = async ({ id, password, nickname }: SignUpData) => {
    // console.log("SignUP Data", id, password, nickname);
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
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    return res;
  };

  // 로그인
  signIn = async () => {};

  // 로그아웃
  signOut = async () => {};
}

export default AuthAPI;
