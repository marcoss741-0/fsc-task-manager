import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, href }) => {
  const sidebar = tv({
    base: "py-3 px-6 rounded-lg gap-2 flex align-center",
    variants: {
      color: {
        disabled: "text-brand-dark-blue",
        active: "bg-[#E6F7F8] text-brand-primary",
      },
    },
  });

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        sidebar({ color: isActive ? "active" : "disabled" })
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarButton;
