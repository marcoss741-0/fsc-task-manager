const Button = ({ children, variant, ...rest }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "ghost":
        return "text-[#818181]";
      case "primary":
        return "bg-[#00ADB5] text-white";
    }
  };
  return (
    <button
      className={`${getVariantClass()} py-1 px-3 rounded-md text-xs flex items-center font-medium gap-2 hover:opacity-80 transition-colors`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
