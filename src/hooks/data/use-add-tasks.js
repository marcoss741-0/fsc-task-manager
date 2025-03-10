import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const createdTask = await response.json();
      return createdTask;
    },
    onSuccess: (task) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return [...oldTasks, task];
      });
    },
  });
}
