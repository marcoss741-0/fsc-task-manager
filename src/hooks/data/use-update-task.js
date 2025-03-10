import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const updatedTask = await response.json();
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === updatedTask.id) {
            return updatedTask;
          }
          return oldTask;
        });
      });
    },
    onSuccess: () => {
      toast.success("Tarefa atualizada com sucesso!", {
        style: { color: "forestgreen" },
      });
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: () => {
      toast.error("Erro ao atualizar tarefa, tente novamente!", {
        style: { color: "crimson" },
      });
    },
  });
}
