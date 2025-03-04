import CheckIcon from "../assets/icons/check.svg?react";
import LoaderIcon from "../assets/icons/loader-circle.svg?react";
import DetailsIcon from "../assets/icons/Group.svg?react";

const TaskItem = ({ task }) => {
  const getVariantClass = () => {
    switch (task.status) {
      case "done":
        return "bg-[#00ADB5] text-[#00ADB5]";
      case "in_progress":
        return "bg-[#FFAA04] text-[#00000080] text-opacity-50";
      case "not_started":
        return "bg-[#35383E] bg-opacity-10 text-[#35383E]";
    }
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
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <a href="#" className="hover:opacity-80 transition-opacity">
        <DetailsIcon />
      </a>
    </div>
  );
};
export default TaskItem;
