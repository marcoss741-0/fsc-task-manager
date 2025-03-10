import {
  LoaderIcon,
  Task2Icon,
  TaskIcon,
  WaterGlassIcon,
} from "../assets/icons";
import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter((task) => task.status === "done").length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length;

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-16 px-8 w-full space-y-6">
          <Header title="Inicio" subtitle="Total de Tarefas" />

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
              mainText={inProgressTasks}
              secText="Tarefas em andamento"
              icon={<LoaderIcon />}
            />
            <DashboardCards
              mainText="50%"
              secText="Água"
              icon={<WaterGlassIcon />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
