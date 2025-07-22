import { useState } from "react";
import Heading from "../ui/Heading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FoodData } from "../../data/constants";
import ImageSkeleton from "../skeleton/ImageSkeleton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useScrollNavigator } from "../../hooks/useScrollNavigator";
import MiePangsit from "../../assets/images/food/filter/soups.jpg";
import { getFilterCountsByKey } from "../../utils/FilterCounts";

const FoodMenu = () => {
  const { scrollRef, handleScroll } = useScrollNavigator();
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFilter = (filter) => {
    setActiveFilter(filter);
    handleTestLoading();
  };
  const handleTestLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const typeCounts = getFilterCountsByKey(FoodData, "type");
  const FilterFood = [
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
        text="Order Line"
        className={"flex justify-between items-center mb-2"}
      >
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="text-text cursor-pointer rounded-full p-2 border-2 border-background/60 hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out"
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="text-text cursor-pointer rounded-full p-2 border-2 border-background/60 hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </Heading>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {FilterFood.map((item, index) => (
          <div
            onClick={() => toggleFilter(item.type)}
            key={index}
            className={`min-w-[150px] border-1 text-text ${
              activeFilter === item.type
                ? "border-primary"
                : "border-background/60"
            } cursor-pointer snap-center flex-shrink-0 flex gap-2 p-2 rounded-xl`}
          >
            {isLoading ? (
              <div className="w-[50px] flex items-center justify-center">
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.type}
                className="w-[50px] object-cover rounded-xl"
              />
            )}
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex-1 font-semibold">{item.type}</span>
              <div className="text-xs text-gray-400">{item.items} Items</div>
            </div>
          </div>
        ))}
      </div>
      <FoodList activeFilter={activeFilter} />
    </div>
  );
};

export default FoodMenu;

const FoodList = ({ activeFilter }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleTestLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const filteredData =
    activeFilter === "All"
      ? FoodData
      : FoodData.filter((item) => item.type === activeFilter);
  return (
    <div className="flex justify-around flex-wrap gap-4 mt-4">
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="p-2 text-text w-[15rem] border-1 border-background/60 rounded-xl"
        >
          {isLoading ? (
            <ImageSkeleton width="full" height="10rem" />
          ) : (
            <img
              src={item.image}
              alt=""
              className="w-[15rem] h-[10rem]
      object-cover rounded-xl bg-center"
            />
          )}
          <p className="text-sm text-gray-400 mt-2">{item.type}</p>
          <h5 className="font-semibold">{item.name}</h5>
          <div className="flex justify-between items-center my-2">
            <span className="text-[1rem]">
              Rp. {item.price === 0 ? "Free" : item.price}
            </span>
            <div className="flex gap-2 items-center">
              <button className="p-2 cursor-pointer border-2 border-background/60 hover:border-primary rounded-full transition-colors duration-200 ease-in-out">
                <FaMinus size={16} />
              </button>
              <span>0</span>
              <button
                onClick={handleTestLoading}
                className="p-2 cursor-pointer bg-primary border-2 border-background/60 hover:bg-primary/30 hover:border-primary rounded-full transition-colors duration-200 ease-in-out"
              >
                <FaPlus size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
