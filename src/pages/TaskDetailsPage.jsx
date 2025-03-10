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

import { useForm } from "react-hook-form";
import { useUpdateTask } from "../hooks/data/use-update-task";
import { useDeleteTasks } from "../hooks/data/use-delete-tasks";
import { toast } from "sonner";
import { useGetTaskId } from "../hooks/data/use-get-task-id";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleGoBack = () => navigate(-1);

  {
    /* Popular o form com os dados da tarefa  */
  }
  const { data: task } = useGetTaskId({
    taskId,
    onSuccess: reset,
  });

  {
    /* Atualizar a tarefa */
  }
  const { mutate: updateTask, isPending: updateIsPending } = useUpdateTask();

  {
    /* Deletar a tarefa */
  }
  const { mutate: deleteTask, isPending: delIsPending } =
    useDeleteTasks(taskId);

  const handleUpdateTask = async (data) => {
    updateTask(data);
  };

  const handleDeleteTask = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa excluida!", {
          style: { color: "orange" },
        });
        navigate(-1);
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa, tente novamente!", {
          style: { color: "crimson" },
        });
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <form onSubmit={handleSubmit(handleUpdateTask)} className="w-full">
        <div className="py-12 px-8 w-full gap-6 justify-between space-y-6">
          <div>
            <button
              type="button"
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
                  type="button"
                  className="rounded-md"
                  variant="danger"
                  size={"small"}
                  onClick={handleDeleteTask}
                >
                  {delIsPending ? (
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
              disabled={updateIsPending}
            >
              {updateIsPending && (
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
