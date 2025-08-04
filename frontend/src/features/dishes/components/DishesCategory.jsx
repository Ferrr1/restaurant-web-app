import Heading from "../../../components/ui/Heading";
import { useState } from "react";
import ModalAddCategory from "./ModalAddCategory";
import { FaPlus } from "react-icons/fa6";
import { BASE_URL } from "../services/DishesServices";
import ImageFilterAll from "../../../assets/images/food/filter/mie goreng.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DishesCategory = ({
  activeFilter,
  setActiveFilter,
  categories,
  dishes,
  notify,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Heading
        text="Dishes Category"
        className={"flex justify-between items-center mb-2"}
      />
      <div className="flex flex-col gap-2 max-h-[calc(100vh-250px)] overflow-y-auto scrollbar scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-primary scrollbar-track-background">
        <button
          onClick={() => toggleFilter("All")}
          className={`flex gap-4 justify-between items-center bg-surface border-2 ${
            activeFilter === "All" ? "border-primary" : "border-border"
          } rounded-lg p-2 text-text cursor-pointer`}
        >
          <div className="flex gap-4 items-center">
            <img
              src={ImageFilterAll}
              alt="test"
              className="w-[40px] object-cover rounded-xl"
            />
            <h1>All</h1>
          </div>
          <span
            className={`w-6 h-6 ${
              activeFilter === "All"
                ? "bg-primary text-text-accent"
                : "bg-border text-text"
            } flex justify-center items-center text-sm rounded-full`}
          >
            {dishes.length}
          </span>
        </button>
        {categories.map((item, index) => {
          return (
            <button
              onClick={() => toggleFilter(item.name)}
              key={index}
              className={`flex gap-4 justify-between items-center bg-surface border-2 ${
                activeFilter === item.name ? "border-primary" : "border-border"
              } rounded-lg p-2 text-text cursor-pointer`}
            >
              <div className="flex gap-4 items-center">
                {!loaded && (
                  <div className="w-[40px] flex justify-center items-center">
                    <AiOutlineLoading3Quarters
                      size={20}
                      className="animate-spin"
                    />
                  </div>
                )}
                <img
                  src={`${BASE_URL}/uploads/categories/${item.image}`}
                  onLoad={() => setLoaded(true)}
                  alt="Category Image"
                  className={`w-[40px]
                    object-cover rounded-xl bg-center transition-opacity duration-300 ease-in-out ${
                      loaded ? "opacity-100" : "opacity-0"
                    }`}
                />
                <h1>{item.name}</h1>
              </div>
              <span
                className={`w-6 h-6 ${
                  activeFilter === item.name
                    ? "bg-primary text-text-accent"
                    : "bg-border text-text"
                } flex justify-center items-center text-sm rounded-full`}
              >
                {
                  dishes.filter((dish) => dish.categoryname === item.name)
                    .length
                }
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center pt-8">
        <button
          onClick={openModal}
          className="flex flex-2 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg"
        >
          <FaPlus />
          <span>Add New Category</span>
        </button>
      </div>
      <ModalAddCategory
        isOpen={isModalOpen}
        onClose={closeModal}
        notify={notify}
      />
    </div>
  );
};

export default DishesCategory;
