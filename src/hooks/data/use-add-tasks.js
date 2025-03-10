import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { TaskQueryKeys } from "../../keys/querys";
import { TaskMutationKeys } from "../../keys/mutations";

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: TaskMutationKeys.add,
    mutationFn: async (data) => {
      const { data: createdTask } = await api.post("/tasks", data);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(TaskQueryKeys.getAll(), (oldTasks) => {
        return [...oldTasks, createdTask];
      });
    },
  });
}
