import {
  AddIcon,
  TrashIcon,
  SunIcon,
  MoonIcon,
  AfternoonIcon,
} from "../assets/icons";
import TaskSeparator from "./TaskSeparator";
import TaskItem from "./TaskItem";
import AddTaskDialog from "./AddTaskDialog";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import Header from "./Header";

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const morning_tasks = tasks?.filter((task) => task.time === "morning");
  const afternoon_tasks = tasks?.filter((task) => task.time === "afternoon");
  const night_tasks = tasks?.filter((task) => task.time === "night");

  return (
    <div className="py-16 px-8 w-full space-y-6">
      <Header title={"Minhas tarefas"} subtitle={"Todas as tarefas"} />
      <div className="flex rounded-lg bg-white p-6 shadow-[9.6px_9.6px_9.6px_0px_#00000005] flex-col">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morning_tasks?.length === 0 ? (
            <p className="text-sm text-brand-text-gray text-center">
              Nenhuma tarefa na parte da manhã cadastrada
            </p>
          ) : (
            morning_tasks?.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>

        <div className="space-y-3 my-6">
          <TaskSeparator title="Tarde" icon={<AfternoonIcon />} />
          {afternoon_tasks?.length === 0 ? (
            <p className="text-sm text-brand-text-gray text-center">
              Nenhuma tarefa na parte da tarde cadastrada
            </p>
          ) : (
            afternoon_tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {night_tasks?.length === 0 ? (
            <p className="text-sm text-brand-text-gray text-center">
              Nenhuma tarefa na parte da noite cadastrada
            </p>
          ) : (
            night_tasks?.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
