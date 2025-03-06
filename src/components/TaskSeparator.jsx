const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-[#e0e0e1]">
      {icon}
      <p className="text-sm text-brand-text-gray">{title}</p>
    </div>
  );
};

export default TaskSeparator;
