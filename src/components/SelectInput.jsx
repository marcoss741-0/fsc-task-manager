import { forwardRef } from "react";

const SelectInput = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <>
      <div className="flex flex-col gap-1 w-full space-y-3">
        <label
          htmlFor={rest.id}
          className="text-sm text-brand-dark-blue font-semibold leading-4"
        >
          {label}
        </label>
        <select
          type="text"
          className="bg-[#FFFFFF] rounded-lg py-3 px-4 gap-2.5 text-sm text-brand-dark-blue border border-[#ECECEC] w-full placeholder:text-brand-text-gray placeholder:text-sm placeholder:font-normal"
          ref={ref}
          {...rest}
        >
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="night">Noite</option>
        </select>
      </div>
      {errorMessage && (
        <p className="text-xs text-red-500 text-left">{errorMessage}</p>
      )}
    </>
  );
});

SelectInput.displayName = "SelectInput";
export default SelectInput;
