import { PiPicnicTableBold } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { Input } from "../../../components/ui/Input";
import { DataOrder } from "../../../data/constants";

const RecentOrders = () => {
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
  return (
    <div className="flex flex-col max-h-[calc(100vh-432px)] h-full gap-2 text-text p-4 bg-surface rounded-xl">
      <h1 className="text-lg font-semibold">Recent Orders</h1>
      <Input placeholder="Search" className={"w-full mb-2"} />
      <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hide">
        {DataOrder.map((item, index) => {
          const statusStyle = ListOrderStyle[item.status];
          return (
            <div
              key={index}
              className={`${statusStyle.style} py-2 px-4 rounded-lg`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center justify-center gap-8">
                  <h1 className="text-lg font-semibold">{item.id}</h1>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-lg font-semibold">
                        <PiPicnicTableBold size={20} />
                        <p>{`${item.table}`}</p>
                      </span>
                      <span className="flex gap-2 items-center text-lg font-semibold">
                        <IoFastFoodOutline size={20} />
                        <p>{`${item.itemCount}`}</p>
                      </span>
                      <p className="text-xs text-text-muted">{`${item.time}`}</p>
                    </div>
                  </div>
                </div>
                <span
                  className={`${statusStyle.typeStyle} text-white text-sm px-4 py-1 rounded-full`}
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

export default RecentOrders;
