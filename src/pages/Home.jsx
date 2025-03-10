import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-16 px-8 w-full space-y-6">
          <Header title="Inicio" subtitle="Total de Tarefas" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
