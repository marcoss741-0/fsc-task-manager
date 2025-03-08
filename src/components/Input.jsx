import { forwardRef } from "react";

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <>
      <div className="flex flex-col gap-1 w-full space-y-3">
        <label
          htmlFor={rest.id}
          className="text-sm text-brand-dark-blue font-semibold leading-4"
        >
          {label}
        </label>
        <input
          type="text"
          className="bg-[#FFFFFF] rounded-lg py-3 px-4 gap-2.5 text-sm text-brand-dark-blue border border-[#ECECEC] w-full placeholder:text-brand-text-gray placeholder:text-sm placeholder:font-normal"
          {...rest}
          ref={ref}
        />
        {errorMessage && (
          <p className="text-xs text-red-500 text-left">{errorMessage}</p>
        )}
      </div>
    </>
  );
});

Input.displayName = "Input";
export default Input;
