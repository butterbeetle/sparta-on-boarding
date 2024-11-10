import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginStoreType = {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  avatar: string | null;
  nickname: string | null;
  logIn: (data: {
    accessToken: string;
    userId: string;
    nickname: string;
    avatar: string | null;
  }) => void;
  logOut: () => void;
};

const useLoginStore = create<LoginStoreType>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      userId: null,
      nickname: null,
      avatar: null,
      logIn: ({ accessToken, userId, nickname, avatar }) =>
        set(() => ({
          isLoggedIn: true,
          accessToken,
          userId,
          nickname,
          avatar,
        })),
      logOut: () =>
        set(() => ({
          isLoggedIn: false,
          accessToken: null,
          userId: null,
          nickname: null,
          avatar: null,
        })),
    }),
    {
      name: "login-store",
    }
  )
);

export default useLoginStore;
