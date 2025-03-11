import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { TaskQueryKeys } from "../../keys/querys";
import { TaskMutationKeys } from "../../keys/mutations";

export function useDeleteTasks(taskId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TaskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);

      return deletedTask;
    },
    onSuccess: (currentTask) => {
      queryClient.setQueryData(TaskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== currentTask.id);
      });
    },
  });
}
