import { useState } from "react";
import ListOrder from "./ListOrder";
import FoodMenu from "./FoodMenu";
import Cart from "./Cart";

export const OrderLine = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const toggleFilter = (filter) => setActiveFilter(filter);
  const FilterType = [
    {
      type: "All",
      count: 16,
      style:
        activeFilter === "All"
          ? "bg-sky-600/10 border-1 border-sky-600 text-text"
          : `border-1 border-sky-600/20 text-text`,
      countStyle: "bg-sky-600 text-white",
    },
    {
      type: "Dine In",
      count: 8,
      style:
        activeFilter === "Dine In"
          ? "bg-lime-600/10 border-1 border-lime-600 text-text"
          : `border-1 border-lime-600/20 text-text`,
      countStyle: "bg-lime-600 text-white",
    },
    {
      type: "Wait List",
      count: 4,
      style:
        activeFilter === "Wait List"
          ? "bg-amber-600/10 border-1 border-amber-600 text-text"
          : `border-1 border-amber-600/20 text-text`,
      countStyle: "bg-amber-600 text-white",
    },
    {
      type: "Take Away",
      count: 11,
      style:
        activeFilter === "Take Away"
          ? "bg-violet-600/10 border-1 border-violet-600 text-text"
          : `border-1 border-violet-600/20 text-text`,
      countStyle: "bg-violet-600 text-white",
    },
    {
      type: "Served",
      count: 10,
      style:
        activeFilter === "Served"
          ? "bg-green-600/10 border-1 border-green-600 text-text"
          : `border-1 border-green-600/20 text-text`,
      countStyle: "bg-green-600 text-white",
    },
  ];
  return (
    <div className="flex sm:flex-col md:flex-row gap-4 w-full max-w-full overflow-hidden">
      {/* KIRI */}
      <div className="flex flex-col gap-4 flex-[2] min-w-0 bg-foreground p-4 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {FilterType.map((item, index) => (
            <button
              onClick={() => toggleFilter(item.type)}
              className={`${item.style} flex justify-center items-center gap-2 text-sm px-4 py-2 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out`}
              key={index}
            >
              {item.type}
              <span
                className={`${item.countStyle} w-5 h-5 flex justify-center items-center text-xs rounded-full`}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>

        <ListOrder />
        <FoodMenu />
      </div>

      {/* KANAN */}
      <div className="flex-[1] min-w-0">
        <Cart />
      </div>
    </div>
  );
};
