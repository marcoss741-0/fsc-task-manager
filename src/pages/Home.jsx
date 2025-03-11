import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardContainer from "../components/DashboardContainer";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import TaskItem from "../components/TaskItem";

const HomePage = () => {
  const { data: tasks } = useGetTasks();
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-16 px-8 w-full space-y-6">
          <Header title="Inicio" subtitle="Total de Tarefas" />
          <DashboardContainer />

          <div className="grid grid-cols-[1.5fr_1fr] gap-6">
            <div className="bg-white p-6 rounded-lg space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Tarefas</h3>
                <span className="text-sm text-brand-text-gray">
                  Resumo das tarefas disponiveis
                </span>
              </div>
              <div className="space-y-3">
                {tasks?.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>

            <div className="bg-white flex items-center justify-center p-5 rounded-lg text-brand-text-gray">
              <p>
                "Cada pequeno passo te leva mais perto do seu objetivo. Siga em
                frente!" 💪✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
