import { useState } from "react";
import { DataOrder } from "../../../data/constants";
import Heading from "../../../components/ui/Heading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useScrollNavigator } from "../../../hooks/useScrollNavigator";
import { getFilterCountsByKey } from "../../../utils/FilterCounts";

const ListOrder = () => {
  const { scrollRef, handleScroll } = useScrollNavigator();
  const [activeFilter, setActiveFilter] = useState("All");
  const toggleFilter = (filter) => setActiveFilter(filter);

  const filterCounts = getFilterCountsByKey(DataOrder, "status");

  const FilterType = [
    {
      type: "All",
      count: filterCounts["All"] || 0,
      style:
        activeFilter === "All"
          ? "bg-sky-600/10 border-2 border-sky-600 text-text"
          : `border-2 border-sky-600/20 text-text`,
      countStyle: "bg-sky-600 text-white",
    },
    {
      type: "Dine In",
      count: filterCounts["Dine In"] || 0,
      style:
        activeFilter === "Dine In"
          ? "bg-lime-600/10 border-2 border-lime-600 text-text"
          : `border-2 border-lime-600/20 text-text`,
      countStyle: "bg-lime-600 text-white",
    },
    {
      type: "Wait List",
      count: filterCounts["Wait List"] || 0,
      style:
        activeFilter === "Wait List"
          ? "bg-amber-600/10 border-2 border-amber-600 text-text"
          : `border-2 border-amber-600/20 text-text`,
      countStyle: "bg-amber-600 text-white",
    },
    {
      type: "Take Away",
      count: filterCounts["Take Away"] || 0,
      style:
        activeFilter === "Take Away"
          ? "bg-violet-600/10 border-2 border-violet-600 text-text"
          : `border-2 border-violet-600/20 text-text`,
      countStyle: "bg-violet-600 text-white",
    },
    {
      type: "Served",
      count: filterCounts["Served"] || 0,
      style:
        activeFilter === "Served"
          ? "bg-green-600/10 border-2 border-green-600 text-text"
          : `border-2 border-green-600/20 text-text`,
      countStyle: "bg-green-600 text-white",
    },
  ];

  const ListOrderStyle = {
    Served: {
      style: "bg-green-600/10",
      typeStyle: "bg-green-600 text-white",
    },
    "Dine In": {
      style: "bg-lime-600/10",
      typeStyle: "bg-lime-600 text-white",
    },
    "Wait List": {
      style: "bg-amber-600/10",
      typeStyle: "bg-amber-600 text-white",
    },
    "Take Away": {
      style: "bg-violet-600/10",
      typeStyle: "bg-violet-600 text-white",
    },
  };

  const filteredData =
    activeFilter === "All"
      ? DataOrder
      : DataOrder.filter((item) => item.status === activeFilter);

  return (
    <div>
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
      <Heading
        text="Order Line"
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
        {filteredData.map((item, index) => {
          const statusStyle = ListOrderStyle[item.status];
          return (
            <div
              key={index}
              className={`${statusStyle.style} min-w-[300px] text-text snap-center flex-shrink-0 flex flex-col gap-2 p-4 rounded-xl`}
            >
              <div className="flex gap-2 text-sm">
                <span className="flex-1 font-semibold">Order {item.id}</span>
                <span className="font-semibold">Table {item.table}</span>
              </div>
              <div className="text-xl font-semibold">
                {item.itemCount} Items
              </div>
              <div className="flex gap-2 text-sm">
                <span className="flex-1">{item.time}</span>
                <span
                  className={`${statusStyle.typeStyle} text-white px-4 py-1 rounded-full`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListOrder;
