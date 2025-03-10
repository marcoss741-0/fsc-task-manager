import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => {
      const { data: createdTask } = await axios.post(
        "http://localhost:3000/tasks",
        data
      );
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return [...oldTasks, createdTask];
      });
    },
  });
}
