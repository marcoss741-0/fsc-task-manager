import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Tasks />
      </div>
      <Toaster toastOptions={{ style: { color: "#35383E" } }} />
    </>
  );
}

export default App;
