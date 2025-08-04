import { FaMinus, FaPlus } from "react-icons/fa6";
import { currencyIDR } from "../../../utils/currency";
import { GoKebabHorizontal } from "react-icons/go";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import ModalEditDishes from "./ModalEditDishes";
import ModalDeleteDishes from "./ModalDeleteDishes";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BASE_URL } from "../services/DishesServices";

const DishesGridView = ({ dishes, categories, notify }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [selectedDish, setSelectedDish] = useState({});
  const [loaded, setLoaded] = useState(false);
  const onOpenModal = (type) => setIsOpen(type);
  const onClose = () => setIsOpen(null);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4  transition- duration-300 ease-in-out">
      {dishes.map((item) => {
        return (
          <div
            key={item.dishid}
            className={`group p-2 bg-surface text-text min-w-[15rem] border-2 border-border rounded-xl`}
          >
            {!loaded && (
              <div className="w-full h-[calc(10rem*1.2)] flex justify-center items-center">
                <AiOutlineLoading3Quarters size={40} className="animate-spin" />
              </div>
            )}
            <img
              src={`${BASE_URL}/uploads/dishes/${item.dishimage}`}
              onLoad={() => setLoaded(true)}
              alt="Food Image"
              className={`w-full h-[calc(10rem*1.2)]
                object-cover rounded-xl bg-center transition-opacity duration-300 ease-in-out ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
            />
            <p className="text-sm text-text-muted mt-2">{item.categoryname}</p>
            <h5 className="group-hover:line-clamp-none font-semibold line-clamp-1 max-w-[12rem]">
              {item.dishname}
            </h5>
            <div className="flex justify-between items-center my-2">
              <span className="text-[1rem]">
                {item.dishprice === 0 ? "Free" : currencyIDR(item.dishprice)}
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    onOpenModal("edit");
                    setSelectedDish(item);
                  }}
                  className="cursor-pointer p-2 border-2 border-border hover:bg-background rounded-full"
                >
                  <CiEdit size={18} className="text-primary" />
                </button>
                <button
                  onClick={() => {
                    onOpenModal("delete");
                    setSelectedDish(item);
                  }}
                  className="cursor-pointer p-2 border-2 border-border hover:bg-background rounded-full"
                >
                  <AiOutlineDelete size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <ModalEditDishes
        dataCategories={categories}
        selectedDish={selectedDish}
        isOpen={isOpen === "edit"}
        onClose={onClose}
        notify={notify}
      />
      <ModalDeleteDishes
        selectedDish={selectedDish}
        isOpen={isOpen === "delete"}
        onClose={onClose}
        notify={notify}
      />
    </div>
  );
};

export default DishesGridView;
