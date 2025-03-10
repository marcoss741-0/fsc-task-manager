import SidebarButton from "./SidebarButton";
import { HomeIcon, TaskIcon } from "../assets/icons";

const Sidebar = () => {
  return (
    <div className="h-screen w-80 min-w-[80px] bg-white flex flex-col py-6">
      <div className="py-6 px-8 gap-4 w-full h-[128px] space-y-6 mb-8">
        <h1 className="text-xl text-brand-primary">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-brand-primary text-sm">
            organizador de tarefas
          </span>
        </p>
      </div>
      <div className="p-2 gap-2 h-[120px] flex flex-col">
        <SidebarButton href="/">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton href="/tasks">
          <TaskIcon /> Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
