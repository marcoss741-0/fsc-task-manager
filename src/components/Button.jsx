const Button = ({ children, variant, size, className, ...rest }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "ghost":
        return "text-brand-dark-gray";
      case "brand-primary":
        return "bg-brand-primary text-white";
      case "danger":
        return "bg-brand-danger text-white";
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
      className={`${getVariantClass()} ${className} ${getSizeClass()} text-center flex items-center font-medium gap-2 hover:opacity-80 transition-colors `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
