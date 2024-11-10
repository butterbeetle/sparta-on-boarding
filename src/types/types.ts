export type SignUpData = {
  id: string;
  password: string;
  nickname: string;
};

export type logInData = Omit<SignUpData, "nickname">;
