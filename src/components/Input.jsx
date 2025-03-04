const Input = ({ label, ...rest }) => {
  return (
    <>
      <div className="flex flex-col gap-1 w-full space-y-3">
        <label
          htmlFor={rest.id}
          className="text-sm text-[#35383E] font-semibold leading-4"
        >
          {label}
        </label>
        <input
          type="text"
          className="bg-[#FFFFFF] rounded-lg py-3 px-4 gap-2.5 text-sm text-[#35383E] border border-[#ECECEC] w-full placeholder:text-[#9A9C9F] placeholder:text-sm placeholder:font-normal"
          {...rest}
        />
      </div>
    </>
  );
};

export default Input;
