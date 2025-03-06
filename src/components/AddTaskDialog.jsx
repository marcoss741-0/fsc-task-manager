import { createPortal } from "react-dom";
import Button from "./Button";
import Input from "./Input";
import { CSSTransition } from "react-transition-group";
import "./AddTaskDialog.css";
import { useEffect, useRef } from "react";
import SelectInput from "./SelectInput";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

const AddTaskDialog = ({ isOpen, closeDialog, handleNewTask }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      if (titleRef.current) titleRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
      if (timeRef.current) timeRef.current.value = "morning";
    }
  }, [isOpen]);

  const handleSaveButton = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const time = timeRef.current?.value;

    if (!title.trim() || !description.trim()) {
      return toast.error("A tarefa precisa de nome e descrição!", {
        style: { color: "orange" },
      });
    }

    handleNewTask({
      id: uuid(),
      title,
      description,
      time,
      status: "not_started",
    });
    closeDialog();
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
              <div className="w-[336px] h-[430px] bg-white rounded-2xl flex flex-col items-center gap-4 p-5 relative z-50 shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center mt-1 w-full">
                  <h1 className="text-xl text-brand-dark-blue leading-6 font-semibold">
                    Nova tarefa
                  </h1>
                  <p className="text-sm text-brand-text-gray leading-4 font-normal">
                    Insira as informações da tarefa.
                  </p>
                </div>
                <Input
                  label="Titulo"
                  id="title"
                  placeholder="Título da Tarefa"
                  ref={titleRef}
                />

                <SelectInput label="Período" id="time" ref={timeRef} />

                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a Tarefa"
                  ref={descriptionRef}
                />

                <div className="flex justify-between w-full gap-1 mt-4">
                  <Button
                    size="large"
                    className="w-full justify-center items-center bg-brand-light-gray text-brand-dark-blue"
                    onClick={closeDialog}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full justify-center items-center bg-brand-primary text-white"
                    onClick={handleSaveButton}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>,
            document.body
          )}
        </div>
      </CSSTransition>
    </>
  );
};

export default AddTaskDialog;
