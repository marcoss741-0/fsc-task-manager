import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { TaskQueryKeys } from "../../keys/querys";

export function useGetTasks() {
  return useQuery({
    queryKey: TaskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get("/tasks");

      return tasks;
    },
  });
}
