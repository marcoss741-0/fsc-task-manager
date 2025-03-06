const SidebarButton = ({ children, variant }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "disabled":
        return "text-brand-dark-blue";
      case "active":
        return "bg-[#E6F7F8] text-brand-primary";
    }
  };
  return (
    <a
      href="#"
      className={`py-3 px-6 ${getVariantClass()} rounded-lg gap-2 flex align-center`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
