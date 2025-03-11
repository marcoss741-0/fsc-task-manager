import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../lib/axios";
import { TaskQueryKeys } from "../../keys/querys";
import { TaskMutationKeys } from "../../keys/mutations";

export function useUpdateTask(taskId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TaskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, data);
      console.log(data);

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
      queryClient.setQueryData(
        TaskQueryKeys.getOne(updatedTask.id),
        updatedTask
      );

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
