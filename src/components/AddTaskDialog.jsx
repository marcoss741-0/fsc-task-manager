import { createPortal } from "react-dom";
import Button from "./Button";
import Input from "./Input";
import { CSSTransition } from "react-transition-group";
import "./AddTaskDialog.css";
import { useRef } from "react";

const AddTaskDialog = ({ isOpen, closeDialog }) => {
  // if (!isOpen) return null;
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
                  <h1 className="text-xl text-[#35383E] leading-6 font-semibold">
                    Nova tarefa
                  </h1>
                  <p className="text-sm text-[#9A9C9F] leading-4 font-normal">
                    Insira as informações da tarefa.
                  </p>
                </div>
                <Input
                  label="Titulo"
                  id="title"
                  placeholder="Título da Tarefa"
                />
                <Input label="Período" id="time" placeholder="Período" />
                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a Tarefa"
                />

                <div className="flex justify-between w-full gap-1 mt-4">
                  <Button
                    size="large"
                    className="w-full justify-center items-center bg-[#EEEEEE] text-[#35383E]"
                    onClick={closeDialog}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full justify-center items-center bg-[#00ADB5] text-white"
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
