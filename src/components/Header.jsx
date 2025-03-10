import { useState } from "react";
import Button from "./Button";
import AddTaskDialog from "./AddTaskDialog";
import { AddIcon, TrashIcon } from "../assets/icons";

const Header = ({ title, subtitle }) => {
  const [dialogIsOpen, dialogSetIsOpen] = useState(false);
  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          <span className="text-sm text-brand-primary">{subtitle}</span>
          <h2 className="font-semibold text-2xl text-brand-dark-blue leading-7">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button size="small" variant="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>

          <Button
            size="small"
            variant="brand-primary"
            onClick={() => dialogSetIsOpen(true)}
          >
            Nova tarefa
            <AddIcon />
          </Button>
          <AddTaskDialog
            isOpen={dialogIsOpen}
            closeDialog={() => dialogSetIsOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
