import { CiEdit } from "react-icons/ci";
import { currencyIDR } from "../../../utils/currency";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import ModalEditDishes from "./ModalEditDishes";
import ModalDeleteDishes from "./ModalDeleteDishes";
import { BASE_URL } from "../services/DishesServices";

const DishesListView = ({ dishes, notify, categories }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedDish, setSelectedDish] = useState({});
  const onOpenModal = (type) => setIsOpen(type);
  const onClose = () => setIsOpen(null);
  return (
    <div className="flex flex-col flex-wrap justify-center gap-2">
      {dishes.map((item) => (
        <div
          key={item.dishid}
          className="flex flex-nowrap justify-between gap-4 w-full bg-surface text-text p-2 rounded-lg border-2 border-border"
        >
          <div className="flex gap-4 items-center">
            {!loaded && (
              <div className="w-12 h-12 flex justify-center items-center">
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              </div>
            )}
            <img
              src={`${BASE_URL}/uploads/dishes/${item.dishimage}`}
              onLoad={() => setLoaded(true)}
              alt="Food Image"
              className={`w-12 h-12 object-cover rounded-xl bg-center transition-opacity duration-300 ease-in-out ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
            <div>
              <h5 className="font-semibold text-sm">{item.dishname}</h5>
              <p className="text-xs text-text-muted mt-2">
                {item.categoryname}
              </p>
              <p className="text-xs text-text-muted mt-2">
                {item.dishprice === 0 ? "Free" : currencyIDR(item.dishprice)}
              </p>
            </div>
          </div>
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
      ))}
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

export default DishesListView;
