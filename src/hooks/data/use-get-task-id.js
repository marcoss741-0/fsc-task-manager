import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { TaskQueryKeys } from "../../keys/querys";

export const useGetTaskId = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: TaskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`);

      onSuccess(task);
      return task;
    },
  });
};
