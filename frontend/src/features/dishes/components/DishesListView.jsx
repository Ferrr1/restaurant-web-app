import { CiEdit } from "react-icons/ci";
import { currencyIDR } from "../../../utils/currency";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ModalEditDishes from "./ModalEditDishes";
import ModalDeleteDishes from "./ModalDeleteDishes";

const DishesListView = ({ data }) => {
  const [isOpen, setIsOpen] = useState(null);
  const onOpenModal = (type) => setIsOpen(type);
  const onClose = () => setIsOpen(null);
  return (
    <div className="flex flex-col flex-wrap justify-center gap-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-nowrap justify-between gap-4 w-full bg-surface text-text p-2 rounded-lg border-2 border-border"
        >
          <div className="flex gap-4 items-center">
            <img
              src={item.image}
              alt=""
              className="w-12 h-12 object-cover rounded-xl bg-center"
            />
            <div>
              <h5 className="font-semibold text-sm">{item.name}</h5>
              <p className="text-xs text-text-muted mt-2">{item.type}</p>
              <p className="text-xs text-text-muted mt-2">
                {item.price === 0 ? "Free" : currencyIDR(item.price)}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => onOpenModal("edit")}
              className="cursor-pointer p-2 border-2 border-border hover:bg-background rounded-full"
            >
              <CiEdit size={18} className="text-primary" />
            </button>
            <button
              onClick={() => onOpenModal("delete")}
              className="cursor-pointer p-2 border-2 border-border hover:bg-background rounded-full"
            >
              <AiOutlineDelete size={18} className="text-red-600" />
            </button>
          </div>
        </div>
      ))}
      <ModalEditDishes isOpen={isOpen === "edit"} onClose={onClose} />
      <ModalDeleteDishes isOpen={isOpen === "delete"} onClose={onClose} />
    </div>
  );
};

export default DishesListView;
