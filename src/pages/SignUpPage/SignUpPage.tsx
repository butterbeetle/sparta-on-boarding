import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import api from "../../api/api";
import Input from "../../components/ui/Input";
import { SignUpData } from "../../types/types";

const SignUpPage = () => {
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const { mutateAsync: signUp } = useMutation({
    mutationFn: (signUpData: SignUpData) => api.auth.signUp(signUpData),
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const ele of inputRef.current) {
      if (!ele || !ele.value) {
        return;
      }
    }

    const signUpData = {
      id: inputRef.current[0]?.value || "",
      password: inputRef.current[1]?.value || "",
      nickname: inputRef.current[2]?.value || "",
    };

    signUp(signUpData);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 w-full">
        <Input ref={(el) => (inputRef.current[0] = el)} type="id" />
        <Input ref={(el) => (inputRef.current[1] = el)} type="nickname" />
        <Input ref={(el) => (inputRef.current[2] = el)} type="password" />
        <button
          className="py-4 border border-solid border-green-200 rounded-md select-none
          bg-green-300 font-bold hover:bg-green-400 active:bg-green-500
          active:shadow-[inset_0px_1px_4px]"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
