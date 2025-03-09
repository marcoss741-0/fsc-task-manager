import { CheckIcon, LoaderIcon, DetailsIcon } from "../assets/icons";
import Button from "./Button";
import TrashIcon from "../assets/icons/trash-2.svg?react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskItem = ({ task, handleCheckBoxSet }) => {
  const getVariantClass = () => {
    switch (task.status) {
      case "done":
        return "bg-brand-primary text-brand-primary";
      case "in_progress":
        return "bg-brand-process text-[#00000080] text-opacity-50";
      case "not_started":
        return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue";
    }
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteTask", task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      });
      return response.json();
    },
  });

  const handleDeleteThisTask = async () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["tasks"], (oldTasks) => {
          return oldTasks.filter((oldTask) => oldTask.id !== task.id);
        });

        toast.success("Tarefa excluida!", {
          style: { color: "orange" },
        });
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa, tente novamente!", {
          style: { color: "crimson" },
        });
      },
    });
  };
  return (
    <div
      className={`bg-opacity-10 py-3 text-sm px-4 rounded-lg  ${getVariantClass()} flex items-center gap-2 justify-between`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getVariantClass()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckBoxSet(task)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="small" onClick={handleDeleteThisTask}>
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
