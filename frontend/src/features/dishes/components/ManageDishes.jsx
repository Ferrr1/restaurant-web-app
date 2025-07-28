import { FaPlus } from "react-icons/fa6";
import Heading from "../../../components/ui/Heading";
import { Input } from "../../../components/ui/Input";
import { CiGrid41 } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import { useState } from "react";

const ManageDishes = () => {
  const [layout, setLayout] = useState("grid");
  const toggleLayout = (layout) => {
    setLayout(layout);
  };
  return (
    <div>
      <Heading
        text="Manage Dishes"
        className={"flex justify-between items-center mb-2"}
      >
        <div className="flex gap-2 items-center">
          <Input
            className="w-full md:w-80 sm:w-60"
            placeholder="Search Dishes"
          />
          <button className="flex flex-2 gap-2 justify-center items-center text-nowrap border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg">
            <FaPlus />
            <span>Add New Dishes</span>
          </button>
        </div>
      </Heading>
      <div className="flex justify-between items-center bg-border/50 rounded-lg p-4 text-text">
        <h1>DishesCategor (19)</h1>
        <div>
          <button
            onClick={() => toggleLayout("grid")}
            className={`p-2 rounded-l-lg border-2 ${
              layout === "grid" ? "border-primary" : "border-border"
            } cursor-pointer transition-colors duration-200 ease-in-out`}
          >
            <CiGrid41 size={20} />
          </button>
          <button
            onClick={() => toggleLayout("list")}
            className={`p-2 rounded-r-lg border-2 ${
              layout === "list" ? "border-primary" : "border-border"
            } cursor-pointer transition-colors duration-200 ease-in-out`}
          >
            <TfiMenuAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageDishes;
