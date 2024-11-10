export type SignUpDataType = {
  id: string;
  password: string;
  nickname: string;
};

export type logInDataType = Omit<SignUpDataType, "nickname">;

export type profileDataType = {
  nickname: string;
  avatarFile: File | null;
};
