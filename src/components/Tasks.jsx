import { useState } from "react";
import Button from "./Button";
import {
  AddIcon,
  TrashIcon,
  SunIcon,
  MoonIcon,
  AfternoonIcon,
} from "../assets/icons";
import TaskSeparator from "./TaskSeparator";
import TASKS from "../constants/TASK";
import TaskItem from "./TaskItem";
import { toast } from "sonner";
import AddTaskDialog from "./AddTaskDialog";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [dialogIsOpen, dialogSetIsOpen] = useState(false);
  const morning_tasks = tasks.filter((task) => task.time === "morning");
  const afternoon_tasks = tasks.filter((task) => task.time === "afternoon");
  const night_tasks = tasks.filter((task) => task.time === "night");

  const handleTaskClick = (currentTask) => {
    const UpdateTasksStatus = tasks.map((task) => {
      if (task.id === currentTask.id) {
        let newStatus;
        switch (task.status) {
          case "done":
            newStatus = "not_started";
            toast.warning("Tarefa não concluida!", {
              style: { color: "crimson" },
            });
            break;
          case "not_started":
            toast.success("Tarefa em andamento!", {
              style: { color: "orange" },
            });
            newStatus = "in_progress";
            break;
          case "in_progress":
            newStatus = "done";
            toast.success("Tarefa completada com sucesso!", {
              style: { color: "forestgreen" },
            });
            break;
          default:
            newStatus = task.status;
        }
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(UpdateTasksStatus);
  };

  const handleDeleteTask = (currentTask) => {
    console.log(currentTask);
    const deletedTask = tasks.filter((task) => task.id !== currentTask.id);
    setTasks(deletedTask);
    toast.warning("Tarefa deletada com sucesso!");
  };

  const registerTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="py-16 px-8 w-full">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-sm text-[#00ADB5]">Minhas tarefas</span>
          <h2 className="font-semibold text-2xl text-[#35383E] leading-7">
            Minhas tarefas
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button size="small" variant="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>

          <Button
            size="small"
            variant="primary"
            onClick={() => dialogSetIsOpen(true)}
          >
            Nova tarefa
            <AddIcon />
          </Button>
          <AddTaskDialog
            isOpen={dialogIsOpen}
            closeDialog={() => dialogSetIsOpen(false)}
            handleNewTask={registerTask}
          />
        </div>
      </div>

      <div className="flex rounded-lg bg-white p-6 shadow-[9.6px_9.6px_9.6px_0px_#00000005] flex-col">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morning_tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskClick={handleTaskClick}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <div className="space-y-3 my-6">
          <TaskSeparator title="Tarde" icon={<AfternoonIcon />} />
          {afternoon_tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskClick={handleTaskClick}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {night_tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskClick={handleTaskClick}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
