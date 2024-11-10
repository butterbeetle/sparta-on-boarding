import { forwardRef, useId } from "react";

type InputProps = {
  type: string;
  defaultValue?: string;
  readOnly?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, defaultValue, readOnly = false }, ref) => {
    const id = useId();
    return (
      <div className="relative">
        <input
          readOnly={readOnly}
          ref={ref}
          className="p-6 pb-px w-full text-base appearance-none outline-none
                     border border-solid border-black rounded-md text-black
                     hover:shadow-md peer select-none"
          id={id}
          defaultValue={defaultValue ? defaultValue : ""}
          placeholder=""
          minLength={4}
          maxLength={10}
          type={type === "password" ? "password" : "text"}
        />
        <label
          className="absolute top-4 left-6 text-base select-none text-gray-400 cursor-text
                     duration-150 transform
                     origin-[0]
                     -translate-y-3 scale-75
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                     peer-focus:scale-75 peer-focus:-translate-y-3"
          htmlFor={id}
        >
          <div className="flex">{type}</div>
        </label>
      </div>
    );
  }
);

export default Input;
