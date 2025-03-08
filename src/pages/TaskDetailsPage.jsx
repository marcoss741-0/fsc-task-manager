import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import {
  ArrowLeftIcon,
  ArrowRIcon,
  TrashIcon,
  LoaderIcon,
} from "../assets/icons";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    time: "",
    status: "",
  });
  const navigate = useNavigate();
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const task = await response.json();

      setTask(task);
      reset(task);
    };

    getTask();
  }, [taskId, reset]);

  const handleUpdateTask = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);

    if (response.status !== 200) {
      return toast.error("Erro ao atualizar tarefa, tente novamente!", {
        style: { color: "crimson" },
      });
    }

    const updatedTask = await response.json();

    setTask(updatedTask);

    toast.success("Tarefa atualizada com sucesso!");
  };

  const handleDeleteCurrentTask = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error("Erro ao deletar tarefa, tente novamente!", {
        style: { color: "crimson" },
      });
    }

    toast.success("Tarefa deletada! você foi redirecionado...");
    navigate(-1);
    setDeleteIsLoading(false);
  };

  return (
    <div onSubmit={handleSubmit(handleUpdateTask)} className="flex">
      <Sidebar />
      <form className="w-full">
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
                <Button
                  className="rounded-md"
                  variant="danger"
                  size={"small"}
                  onClick={handleDeleteCurrentTask}
                >
                  {deleteIsLoading ? (
                    <LoaderIcon className="animate-spin text-white" />
                  ) : (
                    <TrashIcon />
                  )}
                  Deletar tarefa
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full bg-brand-wihte rounded-xl p-6 gap-6 space-y-6">
            <div>
              <Input
                id="title"
                label="Titulo"
                {...register("title", {
                  required: "Titulo obrigatorio",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "Titulo não pode ser vazio";
                    }
                    return true;
                  },
                })}
                errorMessage={errors.title?.message}
              />
            </div>
            <div>
              <SelectInput
                id="time"
                label="Periodo"
                {...register("time", {
                  required: "Periodo obrigatorio",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "Periodo não pode ser vazio";
                    }
                    return true;
                  },
                })}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "Descrição obrigatorio",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "Descrição não pode ser vazia";
                    }
                    return true;
                  },
                })}
                errorMessage={errors.description?.message}
              />
            </div>
          </div>
          <div className="w-full flex justify-end p-2 gap-2">
            <Button
              size="large"
              variant="brand-primary"
              className="rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <LoaderIcon className="animate-spin text-white" />
              )}
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskDetailsPage;
