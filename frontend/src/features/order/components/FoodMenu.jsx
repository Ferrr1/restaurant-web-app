import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FoodData } from "../../../data/constants";
import Heading from "../../../components/ui/Heading";
import { useScrollNavigator } from "../../../hooks/useScrollNavigator";
import MiePangsit from "../../../assets/images/food/filter/soups.jpg";
import { getFilterCountsByKey } from "../../../utils/FilterCounts";
import { currencyIDR } from "../../../utils/currency";
import { useCart } from "../../../context/CartContext";

const FoodMenu = () => {
  const { scrollRef, handleScroll } = useScrollNavigator();
  const [activeFilter, setActiveFilter] = useState("All");

  const toggleFilter = (filter) => {
    setActiveFilter(filter);
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
        text="Food Menu"
        className={"flex justify-between items-center mb-2"}
      >
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="text-text cursor-pointer rounded-full p-2 border-2 border-border hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out"
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="text-text cursor-pointer rounded-full p-2 border-2 border-border hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out"
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
            className={`min-w-[150px] border-2 text-text ${
              activeFilter === item.type ? "border-primary" : "border-border"
            } cursor-pointer snap-center flex-shrink-0 flex gap-2 p-2 rounded-xl`}
          >
            <img
              src={item.image}
              alt={item.type}
              className="w-[50px] object-cover rounded-xl"
            />
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex-1 font-semibold">{item.type}</span>
              <div className="text-xs text-text-muted">{item.items} Items</div>
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
  const { addToCart, cartItems, decreaseQuantity } = useCart();

  const filteredData =
    activeFilter === "All"
      ? FoodData
      : FoodData.filter((item) => item.type === activeFilter);
  return (
    <div className="flex justify-center flex-wrap gap-4 mt-4">
      {filteredData.map((item, index) => {
        const cartItem = cartItems.find((cart) => cart.id === item.id);
        const quantity = cartItem?.quantity || 0;
        return (
          <div
            key={index}
            className={`p-2 text-text min-w-[15rem] border-2 ${
              quantity > 0 ? "border-primary" : "border-border"
            } rounded-xl transition-colors duration-300 ease-in-out`}
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
                  onClick={() => decreaseQuantity(item)}
                  className="p-2 cursor-pointer border-2 border-border hover:border-primary rounded-full transition-colors duration-200 ease-in-out"
                >
                  <FaMinus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="p-2 cursor-pointer text-text-accent bg-primary border-2 border-border hover:bg-primary/30 hover:border-primary rounded-full transition-colors duration-200 ease-in-out"
                >
                  <FaPlus size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
