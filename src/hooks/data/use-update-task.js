import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../lib/axios";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${data.id}`, data);

      // Atualiza a lista de tarefas no cache
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          return task;
        });
      });

      // Atualiza a tarefa individual no cache
      queryClient.setQueryData(["task", updatedTask.id], updatedTask);

      // Invalida a consulta para garantir que os dados mais recentes sejam buscados
      queryClient.invalidateQueries(["tasks"]);
    },
    onSuccess: () => {
      toast.success("Tarefa atualizada com sucesso!", {
        style: { color: "forestgreen" },
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar tarefa, tente novamente!", {
        style: { color: "crimson" },
      });
    },
  });
}
