import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "../../components/ui/button";
import Input from "../../components/ui/Input";
import { SignUpDataType } from "../../types/types";

const SignUpPage = () => {
  const [error, setError] = useState<string>("");
  const nav = useNavigate();
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const { mutateAsync: signUp } = useMutation({
    mutationFn: (signUpData: SignUpDataType) => api.auth.signUp(signUpData),
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const ele of inputRef.current) {
      if (!ele || !ele.value) {
        setError("아이디 및 비밀번호, 닉네임을 입력해주세요.");
        return;
      }
    }

    const signUpData = {
      id: inputRef.current[0]?.value || "",
      password: inputRef.current[1]?.value || "",
      nickname: inputRef.current[2]?.value || "",
    };

    signUp(signUpData, {
      onSuccess: (res) => {
        if (res.success) {
          // console.log("성공");
          setError("");
          nav("/login", { replace: true });
        } else {
          // console.log("실패");
          setError(res.message);
        }
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 w-full">
        <Input ref={(el) => (inputRef.current[0] = el)} type="id" />
        <Input ref={(el) => (inputRef.current[1] = el)} type="nickname" />
        <Input ref={(el) => (inputRef.current[2] = el)} type="password" />
        {error && <div className="text-red-400 text-center">{error}</div>}

        <Button text="회원가입" type="button" />
      </form>
    </div>
  );
};

export default SignUpPage;
