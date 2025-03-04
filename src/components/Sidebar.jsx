import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <div className="h-screen w-[272px] bg-white justify-between">
      <div className="py-6 px-8 gap-4 w-full h-[128px] space-y-6">
        <h1 className="text-xl text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]">organizador de tarefas</span>
        </p>
      </div>
      <div className="p-2 gap-2 h-[120px] flex flex-col">
        <SidebarButton variant="disabled">Início</SidebarButton>
        <SidebarButton variant="active">Minhas tarefas</SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
