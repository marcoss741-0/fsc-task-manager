import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => {
      const { data: createdTask } = await api.post("/tasks", data);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return [...oldTasks, createdTask];
      });
    },
  });
}
