import { useGetTasks } from "../hooks/data/use-get-tasks";
import { LoaderIcon, Task2Icon, TaskIcon } from "../assets/icons";
import DashboardCards from "../components/DashboardCards";

const DashboardContainer = () => {
  const { data: tasks } = useGetTasks();
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter((task) => task.status === "done").length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length;
  const notStartedTasks = tasks?.filter(
    (task) => task.status === "not_started"
  ).length;
  return (
    <>
      <div className="grid grid-cols-4 gap-9">
        <DashboardCards
          mainText={totalTasks}
          secText="Tarefas disponiveis"
          icon={<Task2Icon />}
        />
        <DashboardCards
          mainText={completedTasks}
          secText="Tarefas concluidas"
          icon={<TaskIcon />}
        />
        <DashboardCards
          mainText={notStartedTasks}
          secText="Tarefas nao iniciadas"
          icon={<LoaderIcon />}
        />
        <DashboardCards
          mainText={inProgressTasks}
          secText="Tarefas em andamento"
          icon={<LoaderIcon className="animate-spin" />}
        />
      </div>
    </>
  );
};

export default DashboardContainer;
