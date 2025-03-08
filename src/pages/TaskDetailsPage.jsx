import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import { ArrowLeftIcon, ArrowRIcon, TrashIcon } from "../assets/icons";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoaderIcon } from "../assets/icons";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();
  const [saveIsLoading, setSaveIsLoading] = useState(false);

  const handleGoBack = () => navigate(-1);
  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const task = await response.json();

      setTask(task);
    };

    getTask();
  }, [taskId]);

  const handleUpdateTask = async () => {
    setSaveIsLoading(true);
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const time = timeRef.current?.value;

    if (!title.trim() || !description.trim()) {
      return toast.error("A tarefa precisa de nome e descrição!", {
        style: { color: "orange" },
      });
    }

    const updateCurrentTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          time,
        }),
      });
      const task = await response.json();

      setTask(task);
      setSaveIsLoading(false);
    };

    updateCurrentTask();
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-12 px-8 w-full gap-6 justify-between space-y-6">
          <div>
            <button
              className="bg-brand-primary p-3 text-white rounded-full"
              onClick={handleGoBack}
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex justify-between">
              <div>
                <Link
                  to="/"
                  className="text-xs flex items-center text-brand-text-gray gap-2 mt-2"
                >
                  Minhas tarefas {"   "}
                  <ArrowRIcon />{" "}
                  <span className="text-brand-primary">{task?.title}</span>
                </Link>
                <h2 className="text-2xl text-brand-dark-blue leading-6 font-semibold py-1">
                  {task?.title}
                </h2>
              </div>

              <div>
                <Button className="rounded-md" variant="danger" size={"small"}>
                  <TrashIcon /> Deletar tarefa
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full bg-brand-wihte rounded-xl p-6 gap-6 space-y-6">
            <div>
              <Input
                id="title"
                label="Titulo"
                defaultValue={task?.title || ""}
                ref={titleRef}
              />
            </div>
            <div>
              <SelectInput
                id="time"
                label="Periodo"
                defaultValue={task?.time || ""}
                ref={timeRef}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                defaultValue={task?.description || ""}
                ref={descriptionRef}
              />
            </div>
          </div>
          <div className="w-full flex justify-end p-2 gap-2">
            <Button
              size="large"
              variant="brand-primary"
              className="rounded-md"
              onClick={handleUpdateTask}
              disabled={saveIsLoading}
            >
              {saveIsLoading && (
                <LoaderIcon className="animate-spin text-white" />
              )}
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailsPage;
