import { CheckIcon, LoaderIcon, DetailsIcon } from "../assets/icons";
import Button from "./Button";
import TrashIcon from "../assets/icons/trash-2.svg?react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useDeleteTasks } from "../hooks/data/use-delete-tasks";
import { useUpdateTask } from "../hooks/data/use-update-task";
import { tv } from "tailwind-variants";
import { useQueryClient } from "@tanstack/react-query";

const TaskItem = ({ task }) => {
  const rowTask = tv({
    base: "bg-opacity-10 py-3 text-sm px-4 rounded-lg flex items-center gap-2 justify-between",
    variants: {
      status: {
        done: "bg-brand-primary text-brand-primary",
        in_progress: "bg-brand-process text-[#00000080] text-opacity-50",
        not_started: "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue",
      },
    },
  });

  const labelTask = tv({
    base: "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg",
    variants: {
      status: {
        done: "bg-brand-primary text-brand-primary",
        in_progress: "bg-brand-process text-[#00000080] text-opacity-50",
        not_started: "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue",
      },
    },
  });

  const { mutate: deleteTask, isPending } = useDeleteTasks(task.id);
  const queryClient = useQueryClient();

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa excluida!", {
          style: { color: "orange" },
        });
        queryClient.invalidateQueries(["tasks"]);
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa, tente novamente!", {
          style: { color: "crimson" },
        });
      },
    });
  };

  const { mutate: updateTask } = useUpdateTask(task.id);

  const handleCheckClick = async () => {
    switch (task.status) {
      case "not_started":
        updateTask({ status: "in_progress" });
        break;
      case "in_progress":
        updateTask({ status: "done" });
        break;
      case "done":
        updateTask({ status: "not_started" });
        break;
    }
  };

  return (
    <div className={rowTask({ status: task.status })}>
      <div className="flex items-center gap-2">
        <label className={labelTask({ status: task.status })}>
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckClick}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="small" onClick={handleDeleteClick}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-white" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <Link
          to={`/task/${task.id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};
export default TaskItem;
