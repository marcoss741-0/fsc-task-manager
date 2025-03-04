import Button from "./Button";
import AddIcon from "../assets/icons/Add.svg?react";
import TrashIcon from "../assets/icons/trash-2.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import AfternoonIcon from "../assets/icons/cloud-sun.svg?react";
import TaskSeparator from "./TaskSeparator";

const Tasks = () => {
  return (
    <div className="py-16 px-8 w-full">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-sm text-[#00ADB5]">Minhas tarefas</span>
          <h2 className="font-semibold text-2xl text-[#35383E] leading-7">
            Minhas tarefas
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>

          <Button variant="primary">
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="flex rounded-lg bg-white p-6 shadow-[9.6px_9.6px_9.6px_0px_#00000005] flex-col">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
        </div>

        <div className="space-y-3 my-6">
          <TaskSeparator title="Tarde" icon={<AfternoonIcon />} />
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
