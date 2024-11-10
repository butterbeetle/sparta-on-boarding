type ButtonProps = {
  text: string;
  type: "submit" | "button";
};

const Button = ({ text, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full py-4 border border-solid border-blue-200 rounded-md select-none
        bg-blue-300 font-bold hover:bg-blue-400 active:bg-blue-500
        active:shadow-[inset_0px_1px_4px]"
    >
      {text}
    </button>
  );
};

export default Button;
