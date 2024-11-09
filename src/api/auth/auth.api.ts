class AuthAPI {
  private baseURL: string;

  constructor(baseURL: string = "https://moneyfulpublicpolicy.co.kr/") {
    this.baseURL = baseURL;
  }

  // 회원가입
  signUp = async () => {};

  // 로그인
  signIn = async () => {};

  // 로그아웃
  signOut = async () => {};
}

export default AuthAPI;
