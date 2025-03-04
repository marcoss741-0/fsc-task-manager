import SidebarButton from "./SidebarButton";
import HomeIcon from "../assets/icons/home.svg?react";
import TaskIcon from "../assets/icons/tasks.svg?react";

const Sidebar = () => {
  return (
    <div className="h-screen w-80 bg-white flex flex-col py-6">
      <div className="py-6 px-8 gap-4 w-full h-[128px] space-y-6 mb-8">
        <h1 className="text-xl text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5] text-sm">organizador de tarefas</span>
        </p>
      </div>
      <div className="p-2 gap-2 h-[120px] flex flex-col">
        <SidebarButton variant="disabled">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton variant="active">
          <TaskIcon /> Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
