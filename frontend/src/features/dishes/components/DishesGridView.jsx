import { FaMinus, FaPlus } from "react-icons/fa6";
import { currencyIDR } from "../../../utils/currency";
import { GoKebabHorizontal } from "react-icons/go";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import ModalEditDishes from "./ModalEditDishes";
import ModalDeleteDishes from "./ModalDeleteDishes";

const DishesGridView = ({ data }) => {
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const onOpenModal = (type) => setIsOpen(type);
  const onClose = () => setIsOpen(null);

  const toggleDropdown = (id) =>
    setDropdown((prev) => (prev === id ? null : id));

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
              <button
                onClick={() => toggleDropdown(item.id)}
                className="relative cursor-pointer p-2 border-2 border-border hover:bg-background rounded-full"
              >
                <GoKebabHorizontal size={18} className="text-primary" />
                {dropdown === item.id && (
                  <div className="absolute z-2 top-0 -right-24 flex flex-col gap-2 p-2 bg-surface border-2 border-border rounded-lg">
                    <Button
                      onClick={() => onOpenModal("edit")}
                      variant="confirm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onOpenModal("delete")}
                      variant="delete"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </button>
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
