import { FaPlus } from "react-icons/fa6";
import Heading from "../../../components/ui/Heading";
import { Input } from "../../../components/ui/Input";
import { CiGrid41 } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import { useState } from "react";
import DishesGridView from "./DishesGridView";
import { FoodData } from "../../../data/constants";
import DishesListView from "./DishesListView";
import ModalAddDishes from "./ModalAddDishes";

const ManageDishes = ({ activeFilter, dishes, categories, notify }) => {
  const [view, setView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleLayout = () => {
    setView((prev) => !prev);
  };

  const filteredDishesData =
    activeFilter === "All"
      ? dishes
      : dishes?.filter((dish) => dish?.categoryname === activeFilter);
  const searchDishes = filteredDishesData.filter((dish) =>
    dish?.dishname.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Heading
        text="Manage Dishes"
        className={"flex justify-between items-center mb-2"}
      >
        <div className="flex gap-2 items-center ">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-text rounded-lg"
            placeholder="Search Dishes"
          />
          <button
            onClick={openModal}
            className="flex flex-2 gap-2 justify-center items-center text-nowrap border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg"
          >
            <FaPlus />
            <span>Add New Dishes</span>
          </button>
        </div>
      </Heading>
      <div className="bg-border/50 rounded-lg p-4 text-text">
        <div className="flex justify-between items-center">
          <h1>
            {activeFilter} ({searchDishes.length})
          </h1>
          <div>
            <button
              onClick={toggleLayout}
              className={`p-2 rounded-l-lg border-2 ${
                view === true
                  ? "border-primary text-primary"
                  : "border-border text-text"
              } cursor-pointer transition-colors duration-200 ease-in-out`}
            >
              <CiGrid41 size={20} />
            </button>
            <button
              onClick={toggleLayout}
              className={`p-2 rounded-r-lg border-2 ${
                view === false
                  ? "border-primary text-primary"
                  : "border-border text-text"
              } cursor-pointer transition-colors duration-200 ease-in-out`}
            >
              <TfiMenuAlt size={20} />
            </button>
          </div>
        </div>
        <div className="mt-4">
          {searchDishes.length > 0 ? (
            view ? (
              <DishesGridView
                dishes={searchDishes}
                categories={categories}
                notify={notify}
              />
            ) : (
              <DishesListView
                dishes={searchDishes}
                categories={categories}
                notify={notify}
              />
            )
          ) : (
            <div className="w-full">
              <p className="text-center text-text-muted">No Dishes Found</p>
            </div>
          )}
        </div>
      </div>
      <ModalAddDishes
        notify={notify}
        isOpen={isModalOpen}
        onClose={closeModal}
        data={categories}
      />
    </>
  );
};

export default ManageDishes;
