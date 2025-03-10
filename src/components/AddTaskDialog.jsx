import { createPortal } from "react-dom";
import Button from "./Button";
import Input from "./Input";
import { CSSTransition } from "react-transition-group";
import "./AddTaskDialog.css";
import { useEffect, useRef } from "react";
import SelectInput from "./SelectInput";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { useAddTask } from "../hooks/data/use-add-tasks";

export default function AddTaskDialog({ isOpen, closeDialog }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!isOpen) {
      reset({
        title: "",
        description: "",
        time: "morning",
      });
    }
  }, [isOpen, reset]);

  const { mutate: addTask } = useAddTask();

  const handleSaveButton = (data) => {
    const task = { ...data, id: uuid(), status: "not_started" };
    addTask(task, {
      onSuccess: () => {
        toast.success("Tarefa criada com sucesso!", {
          style: { color: "forestgreen" },
        });
        reset({
          title: "",
          description: "",
          time: "morning",
        });
        closeDialog();
      },
      onError: () => {
        toast.error("Erro ao criar tarefa, tente novamente!", {
          style: { color: "crimson" },
        });
      },
    });
  };

  const nodeRef = useRef();
  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={500}
        classNames="add-task-dialog"
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div>
          {createPortal(
            <div
              ref={nodeRef}
              className="fixed top-0 left-0 backdrop-blur-[2px] bg-[#00000040] w-screen h-screen z-50 flex justify-center items-center"
            >
              <div className="w-[336px] h-[500px] bg-white rounded-2xl flex flex-col items-center gap-4 p-5 relative z-50 shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center mt-1 w-full">
                  <h1 className="text-xl text-brand-dark-blue leading-6 font-semibold">
                    Nova tarefa
                  </h1>
                  <p className="text-sm text-brand-text-gray leading-4 font-normal">
                    Insira as informações da tarefa.
                  </p>
                </div>
                <form
                  className="w-full space-y-4 h-full flex flex-col justify-between"
                  onSubmit={handleSubmit(handleSaveButton)}
                >
                  <div className="space-y-4">
                    <Input
                      label="Titulo"
                      id="title"
                      placeholder="Título da Tarefa"
                      disabled={isSubmitting}
                      {...register("title", {
                        required: "Título é obrigatório",
                        validate: (value) => {
                          if (!value.trim()) {
                            return "Título é obrigatório";
                          }
                          return true;
                        },
                      })}
                      errorMessage={errors.title?.message}
                    />

                    <SelectInput
                      label="Período"
                      id="time"
                      disabled={isSubmitting}
                      {...register("time", {
                        required: "Período é obrigatório",
                        validate: (value) => {
                          if (!value) {
                            return "Período é obrigatório";
                          }
                          return true;
                        },
                      })}
                      errorMessage={errors.time?.message}
                    />

                    <Input
                      label="Descrição"
                      id="description"
                      disabled={isSubmitting}
                      placeholder="Descreva a Tarefa"
                      {...register("description", {
                        required: "Descrição é obrigatório",
                        validate: (value) => {
                          if (!value.trim()) {
                            return "Descrição é obrigatório";
                          }
                          return true;
                        },
                      })}
                      errorMessage={errors.description?.message}
                    />
                  </div>

                  <div className="w-full gap-1 flex mt-4">
                    <Button
                      type="button"
                      size="large"
                      className="w-full justify-center items-center bg-brand-light-gray text-brand-dark-blue"
                      onClick={closeDialog}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      size="large"
                      className="w-full justify-center items-center bg-brand-primary text-white"
                      disabled={isSubmitting}
                    >
                      Salvar
                    </Button>
                  </div>
                </form>
              </div>
            </div>,
            document.body
          )}
        </div>
      </CSSTransition>
    </>
  );
}
