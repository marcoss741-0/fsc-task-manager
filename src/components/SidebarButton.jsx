const SidebarButton = ({ children, variant }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "disabled":
        return "text-[#35383E]";
      case "active":
        return "bg-[#E6F7F8] text-[#00ADB5]";
    }
  };
  return (
    <a href="#" className={`py-3 px-6 ${getVariantClass()} rounded-lg`}>
      {children}
    </a>
  );
};

export default SidebarButton;
