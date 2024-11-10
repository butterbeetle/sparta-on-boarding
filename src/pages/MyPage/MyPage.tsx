import * as Sentry from "@sentry/react";

import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import api from "../../api/api";
import Button from "../../components/ui/button";
import Input from "../../components/ui/Input";
import useLoginStore from "../../store/login.store";
import { profileDataType } from "../../types/types";

const MyPage = () => {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { accessToken, userId, nickname, avatar } = useLoginStore.getState();
  const [file, setFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string>(
    avatar || "src/assets/defaultProfile.png"
  );
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

  // console.log("LOCAL___", accessToken, userId, nickname, avatar);
  // console.log("USER PROFILE___", data);
  const { mutateAsync: profileUpdate } = useMutation({
    mutationFn: (profileData: profileDataType) =>
      api.auth.updateProfile(profileData),
  });

  const onUpdateBtn = () => {
    setIsReadOnly((prev) => !prev);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setProfileImage("src/assets/defaultProfile.png");
    }
  };

  const onClickHandler = () => {
    const profileData = {
      nickname: inputRef.current?.value || nickname!,
      avatarFile: file,
    };

    // console.log("DATA___", profileData);
    profileUpdate(profileData, {
      onSuccess: (res) => {
        // console.log("SUCCESS RES___", res);
        if (res.success) {
          useLoginStore.getState().logIn({
            accessToken: accessToken!,
            userId: userId!,
            nickname: res.nickname,
            avatar: res.avatar,
          });
          setError("");
        } else {
          console.error(error);
          setError(res.message);
          Sentry.captureException(error);
          throw new Error("사용자 정보 업데이트 중 알 수 없는 에러 발생");
        }
      },
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div
        className="flex flex-col relative
      justify-center rounded-full items-center gap-y-4 select-none
      "
      >
        <img
          src={profileImage}
          className="rounded-full size-40 border-4"
          alt="user-profile"
        />
        <label
          htmlFor="file"
          className="cursor-pointer absolute bg-black text-white left-32 rounded-md bottom-3 py-px px-2 border-2 border-black border-solid"
        >
          Edit
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          accept="image/*"
          onChange={onChangeHandler}
        />
      </div>
      <div className="relative">
        <Input
          type="nickname"
          defaultValue={nickname!}
          readOnly={isReadOnly}
          ref={inputRef}
        />
        <button
          onClick={onUpdateBtn}
          className="absolute right-4 top-2.5 p-1 text-sm border border-solid border-black rounded-md"
        >
          수정
        </button>
      </div>
      {error && <div className="text-red-400 text-center">{error}</div>}

      <div onClick={onClickHandler}>
        <Button text="수정" type="button" />
      </div>
    </div>
  );
};

export default MyPage;
