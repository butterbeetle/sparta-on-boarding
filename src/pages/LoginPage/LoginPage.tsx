import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "../../components/ui/button";
import Input from "../../components/ui/Input";
import useLoginStore from "../../store/login.store";
import { logInDataType } from "../../types/types";

const LoginPage = () => {
  const [error, setError] = useState<string>("");
  const nav = useNavigate();
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const LogIn = useLoginStore((state) => state.logIn);

  const { mutateAsync: logIn } = useMutation({
    mutationFn: (logInData: logInDataType) => api.auth.logIn(logInData),
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const ele of inputRef.current) {
      if (!ele || !ele.value) {
        setError("아이디 및 비밀번호를 입력해주세요.");
        return;
      }
    }

    const logInData = {
      id: inputRef.current[0]?.value || "",
      password: inputRef.current[1]?.value || "",
    };

    logIn(logInData, {
      onSuccess: (res) => {
        // console.log(res);
        if (res.success) {
          // console.log("성공");
          LogIn({ ...res });
          nav("/", { replace: true });
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
        <Input ref={(el) => (inputRef.current[1] = el)} type="password" />

        {error && <div className="text-red-400 text-center">{error}</div>}

        <Button text="로그인" type="submit" />

        <Link className="w-full" to={"/signup"}>
          <Button text="회원가입" type="button" />
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
