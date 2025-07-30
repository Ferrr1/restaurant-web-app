import { useState } from "react";
import { getFilterCountsByKey } from "../../../utils/FilterCounts";
import { CustomerData, DataTables } from "../../../data/constants";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { useScrollNavigator } from "../../../hooks/useScrollNavigator";
import { Input } from "../../../components/ui/Input";
import { IoMdCall, IoMdPeople } from "react-icons/io";
import { PiPicnicTableBold } from "react-icons/pi";

const ListTables = ({ activeFilter, setActiveFilter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollRef, onMouseDown, onMouseMove, onMouseLeave, onMouseUp } =
    useScrollNavigator();

  const toggleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const typeCounts = getFilterCountsByKey(DataTables, "status");
  const FilterDishes = [
    {
      type: "All",
      items: typeCounts["All"] || 0,
    },
    {
      type: "Reservation",
      items: typeCounts["Reserved"] || 0,
    },
    {
      type: "Dine In",
      items: typeCounts["Dine In"] || 0,
    },
    {
      type: "Free",
      items: typeCounts["Free"] || 0,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        className="flex gap-2 max-h-[calc(100vh-250px)] cursor-grab active:cursor-grabbing select-none overflow-x-auto scrollbar-hide"
      >
        {FilterDishes.map((item, index) => (
          <button
            onClick={() => toggleFilter(item.type)}
            key={index}
            className={`flex gap-2 justify-center items-center bg-surface border-2 ${
              activeFilter === item.type ? "border-primary" : "border-border"
            } rounded-lg p-2 text-text cursor-pointer`}
          >
            <div className="flex gap-4 items-center">
              <h1 className="text-nowrap">{item.type}</h1>
            </div>
            <span
              className={`w-6 h-6 ${
                activeFilter === item.type
                  ? "bg-primary text-text-accent"
                  : "bg-border text-text"
              } flex justify-center items-center text-sm rounded-full`}
            >
              {item.items}
            </span>
          </button>
        ))}
      </div>
      <div>
        <Input
          className="w-full text-text rounded-lg"
          placeholder="Search Customer"
        />
      </div>
      <div className="flex flex-col gap-2 max-h-[calc(100vh-250px)] overflow-y-auto scrollbar scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-primary scrollbar-track-background">
        {CustomerData.map((item, index) => (
          <div
            key={index}
            className={`flex gap-4 justify-between items-center bg-surface border-2 ${
              activeFilter === item.type ? "border-primary" : "border-border"
            } rounded-lg p-2 text-text`}
          >
            <div className="flex gap-4 items-center">
              <span className="text-primary text-center max-w-16 bg-primary/20 px-2 py-4 rounded-lg">
                On Dine
              </span>
              <div className="flex flex-col gap-2">
                <p>Testing</p>
                <div className="flex gap-1.5">
                  <PiPicnicTableBold size={20} className="text-text-muted" />
                  <p className="text-sm text-text">2</p>
                  <IoMdPeople size={20} className="text-text-muted" />
                  <p className="text-sm text-text">2</p>
                </div>
                <div className="flex gap-1.5">
                  <IoMdCall size={20} className="text-text-muted" />
                  <p className="text-sm text-text-muted">081233444028</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-text-muted text-right">Dinner</p>
              <div className="flex items-center justify-center gap-1">
                <span className="p-0.5 bg-green-600 rounded-full">
                  <FaCheck size={12} className="text-text-accent" />
                </span>
                <p className="text-sm text-nowrap text-text">On Dine</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-8 bgsura">
        <button
          onClick={openModal}
          className="flex flex-2 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg"
        >
          <FaPlus />
          <span>Add New Reservation</span>
        </button>
      </div>
      {/* <ModalAddCategory isOpen={isModalOpen} onClose={closeModal} /> */}
    </div>
  );
};

export default ListTables;
