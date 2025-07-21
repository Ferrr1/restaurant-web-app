import { useRef } from "react";
import { DataOrder } from "../../data/constants";
import Heading from "../ui/Heading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ListOrder = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth * 0.5;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const ListOrderStyle = {
    All: {
      style: "bg-sky-600/10",
      typeStyle: "bg-sky-600 text-white",
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
    Served: {
      style: "bg-green-600/10",
      typeStyle: "bg-green-600 text-white",
    },
  };

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
        {DataOrder.map((item, index) => (
          <div
            key={index}
            className={`${
              ListOrderStyle[item.status].style
            } min-w-[300px] text-text snap-center flex-shrink-0 flex flex-col gap-2 p-4 rounded-xl`}
          >
            <div className="flex gap-2 text-sm">
              <span className="flex-1 font-semibold">Order {item.id}</span>
              <span className="font-semibold">Table {item.table}</span>
            </div>
            <div className="text-xl font-semibold">{item.itemCount} Items</div>
            <div className="flex gap-2 text-sm">
              <span className="flex-1">{item.time}</span>
              <span
                className={`${
                  ListOrderStyle[item.status].typeStyle
                } text-white px-4 py-1 rounded-full`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOrder;
