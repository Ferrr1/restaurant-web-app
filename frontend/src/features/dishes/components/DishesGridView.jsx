import { FaMinus, FaPlus } from "react-icons/fa6";
import { currencyIDR } from "../../../utils/currency";
import { GoKebabHorizontal } from "react-icons/go";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import ModalEditDishes from "./ModalEditDishes";
import ModalDeleteDishes from "./ModalDeleteDishes";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const DishesGridView = ({ data }) => {
  const [isOpen, setIsOpen] = useState(null);
  const onOpenModal = (type) => setIsOpen(type);
  const onClose = () => setIsOpen(null);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={`p-2 bg-surface text-text min-w-[15rem] border-2 border-border rounded-xl transition-colors duration-300 ease-in-out`}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-[calc(10rem*1.2)]
          object-cover rounded-xl bg-center"
            />
            <p className="text-sm text-text-muted mt-2">{item.type}</p>
            <h5 className="font-semibold">{item.name}</h5>
            <div className="flex justify-between items-center my-2">
              <span className="text-[1rem]">
                {item.price === 0 ? "Free" : currencyIDR(item.price)}
              </span>
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
          </div>
        );
      })}
      <ModalEditDishes isOpen={isOpen === "edit"} onClose={onClose} />
      <ModalDeleteDishes isOpen={isOpen === "delete"} onClose={onClose} />
    </div>
  );
};

export default DishesGridView;
