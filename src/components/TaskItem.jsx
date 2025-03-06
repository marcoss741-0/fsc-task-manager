import { CheckIcon, LoaderIcon, DetailsIcon } from "../assets/icons";
import Button from "./Button";
import TrashIcon from "../assets/icons/trash-2.svg?react";
import { toast } from "sonner";
import { useState } from "react";

const TaskItem = ({ task, handleTaskClick, onDeleteSuccess }) => {
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

  const [isDeleTask, setIsDeleTask] = useState(false);

  const handleDeleteThisTask = async (currentTask) => {
    setIsDeleTask(true);
    const response = await fetch(
      `http://localhost:3000/tasks/${currentTask.id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      setIsDeleTask(false);
      return toast.error("Erro ao deletar tarefa, tente novamente!", {
        style: { color: "crimson" },
      });
    }

    onDeleteSuccess(currentTask.id);
    setIsDeleTask(false);
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
            onChange={() => handleTaskClick(task)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="small"
          onClick={() => handleDeleteThisTask(task)}
        >
          {isDeleTask ? (
            <LoaderIcon className="animate-spin text-brand-white" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};
export default TaskItem;
