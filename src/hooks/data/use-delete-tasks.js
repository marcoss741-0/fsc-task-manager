import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export function useDeleteTasks(taskId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);

      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id);
      });
    },
  });
}
