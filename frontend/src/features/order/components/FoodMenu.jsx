import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FoodData } from "../../../data/constants";
import Heading from "../../../components/ui/Heading";
import { useScrollNavigator } from "../../../hooks/useScrollNavigator";
import MiePangsit from "../../../assets/images/food/filter/soups.jpg";
import ImageFilterAll from "../../../assets/images/food/filter/mie goreng.png";
import { currencyIDR } from "../../../utils/currency";
import { useCart } from "../../../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { useNotify } from "../../../context/NotifyContext";
import {
  BASE_URL,
  getCategories,
  getDishes,
} from "../../dishes/services/DishesServices";

const FoodMenu = () => {
  const { scrollRef, handleScroll } = useScrollNavigator();
  const [activeFilter, setActiveFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const { push } = useNotify();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dishes-and-categories"],
    queryFn: async () => {
      const [dishesRes, categoriesRes] = await Promise.all([
        getDishes(),
        getCategories(),
      ]);
      return {
        dishes: dishesRes.data,
        categories: categoriesRes.data,
      };
    },
  });
  console.log("data", data);
  // if (isLoading || !data) return <LoadingScreen />;
  if (isError) return push({ message: error.message, type: "error" });

  const toggleFilter = (filter) => {
    setActiveFilter(filter);
  };
  return (
    <div>
      <Heading
        text="Food Menu"
        className={"flex justify-between items-center mb-2"}>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="text-text cursor-pointer rounded-full p-2 border-2 border-border hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out">
            <IoIosArrowBack size={20} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="text-text cursor-pointer rounded-full p-2 border-2 border-border hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out">
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </Heading>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
        <div
          onClick={() => toggleFilter("All")}
          className={`min-w-[150px] border-2 text-text ${
            activeFilter === "All" ? "border-primary" : "border-border"
          } cursor-pointer snap-center flex-shrink-0 flex gap-2 p-2 rounded-xl`}>
          <img
            src={ImageFilterAll}
            onLoad={() => setLoaded(true)}
            alt={"Food Menu"}
            className={`w-[50px] object-cover rounded-xl ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="flex flex-col gap-2 text-sm">
            <span className="flex-1 font-semibold">All</span>
            <div className="text-xs text-text-muted">
              {data?.dishes.length} Items
            </div>
          </div>
        </div>
        {data?.categories.map((item, index) => (
          <div
            onClick={() => toggleFilter(item.name)}
            key={index}
            className={`min-w-[150px] border-2 text-text ${
              activeFilter === item.name ? "border-primary" : "border-border"
            } cursor-pointer snap-center flex-shrink-0 flex gap-2 p-2 rounded-xl`}>
            <img
              src={`${BASE_URL}/uploads/categories/${item.image}`}
              onLoad={() => setLoaded(true)}
              alt={item.type}
              className={`w-[50px] object-cover rounded-xl ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex-1 font-semibold">{item.name}</span>
              <div className="text-xs text-text-muted">
                {
                  data?.dishes.filter((dish) => dish.categoryname === item.name)
                    .length
                }{" "}
                Items
              </div>
            </div>
          </div>
        ))}
      </div>
      <FoodList activeFilter={activeFilter} data={data?.dishes} />
    </div>
  );
};

export default FoodMenu;

const FoodList = ({ activeFilter, data }) => {
  const { addToCart, cartItems, decreaseQuantity } = useCart();

  const filteredData =
    activeFilter === "All"
      ? data
      : data?.filter((item) => item.name === activeFilter);
  return (
    <div className="group flex justify-center flex-wrap gap-4 mt-4">
      {filteredData?.map((item) => {
        const cartItem = cartItems.find((cart) => cart.id === item.dishid);

        const quantity = cartItem?.quantity || 0;
        return (
          <div
            key={item.dishid}
            className={`p-2 text-text min-w-[15rem] border-2 ${
              quantity > 0 ? "border-primary" : "border-border"
            } rounded-xl transition-colors duration-300 ease-in-out`}>
            <img
              src={`${BASE_URL}/uploads/dishes/${item.dishimage}`}
              alt=""
              className="w-full h-[calc(10rem*1.2)]
      object-cover rounded-xl bg-center"
            />
            <p className="group-hover:line-clamp-none line-clamp-1 text-sm text-text-muted mt-2">
              {item.type}
            </p>
            <h5 className="font-semibold">{item.dishname}</h5>
            <div className="flex justify-between items-center my-2">
              <span className="text-[1rem]">
                {item.dishprice === 0 ? "Free" : currencyIDR(item.dishprice)}
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => decreaseQuantity(item)}
                  className="p-2 cursor-pointer border-2 border-border hover:border-primary rounded-full transition-colors duration-200 ease-in-out">
                  <FaMinus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="p-2 cursor-pointer text-text-accent bg-primary border-2 border-border hover:bg-primary/30 hover:border-primary rounded-full transition-colors duration-200 ease-in-out">
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
