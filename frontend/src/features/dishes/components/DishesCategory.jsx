import Heading from "../../../components/ui/Heading";
import MiePangsit from "../../../assets/images/food/filter/soups.jpg";
import { getFilterCountsByKey } from "../../../utils/FilterCounts";
import { FoodData } from "../../../data/constants";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const DishesCategory = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const typeCounts = getFilterCountsByKey(FoodData, "type");
  const FilterDishes = [
    {
      type: "All",
      image: MiePangsit,
      items: typeCounts["All"] || 0,
    },
    {
      type: "Beef",
      image: MiePangsit,
      items: typeCounts["Beef"] || 0,
    },
    {
      type: "Soups",
      image: MiePangsit,
      items: typeCounts["Soups"] || 0,
    },
    {
      type: "Desserts",
      image: MiePangsit,
      items: typeCounts["Desserts"] || 0,
    },
    {
      type: "Chickens",
      image: MiePangsit,
      items: typeCounts["Chickens"] || 0,
    },
  ];
  return (
    <div>
      <Heading
        text="Dishes Category"
        className={"flex justify-between items-center mb-2"}
      />
      <div className="flex flex-col gap-2 max-h-[calc(100vh-250px)] overflow-y-auto scrollbar scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-primary scrollbar-track-slate-300">
        {FilterDishes.map((item, index) => (
          <button
            onClick={() => toggleFilter(item.type)}
            key={index}
            className={`flex gap-4 justify-between items-center bg-surface border-2 ${
              activeFilter === item.type ? "border-primary" : "border-border"
            } rounded-lg p-2 text-text cursor-pointer`}
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt="test"
                className="w-[40px] object-cover rounded-xl"
              />
              <h1>{item.type}</h1>
            </div>
            <span
              className={`w-6 h-6 ${
                activeFilter === item.type
                  ? "bg-primary text-text-accent"
                  : "bg-border text-text"
              } flex justify-center items-center text-sm rounded-full`}
            >
              {item.items}
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-center pt-8 bgsura">
        <button
          onClick={openModal}
          className="flex flex-2 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg"
        >
          <FaPlus />
          <span>Add New Category</span>
        </button>
      </div>
      <ModalCategory isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default DishesCategory;

const ModalCategory = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Category">
      <div className="flex flex-col gap-2">
        <Input
          label="Category Name"
          className="w-full"
          placeholder="e.g. Beef"
        />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="delete" onClick={onClose} className="mt-2">
            Close
          </Button>
          <Button variant="confirm" className="mt-2">
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};
