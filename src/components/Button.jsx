const Button = ({ children, variant, size, className, ...rest }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "ghost":
        return "text-[#818181]";
      case "primary":
        return "bg-[#00ADB5] text-white";
    }
  };
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "text-xs  py-1 px-3";
      case "large":
        return "text-base py-2 px-4";
    }
  };
  return (
    <button
      className={`${getVariantClass()} ${className} ${getSizeClass()} text-center rounded-md flex items-center font-medium gap-2 hover:opacity-80 transition-colors `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
