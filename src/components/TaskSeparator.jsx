const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-[#e0e0e1]">
      {icon}
      <p className="text-sm text-[#9A9C9F]">{title}</p>
    </div>
  );
};

export default TaskSeparator;
