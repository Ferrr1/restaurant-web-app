import { useState } from "react";
import Heading from "../../../components/ui/Heading";
import { DataTables } from "../../../data/constants";
import { CiGrid41 } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import ModalAddDishes from "../../dishes/components/ModalAddDishes";
import { Input } from "../../../components/ui/Input";
import { FaPlus } from "react-icons/fa6";
import { TableLayout } from "./TableLayout";

const ManageTables = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const tables = [
    { id: 1, capacity: 8, occupied: 6, shape: "rectangle" },
    { id: 2, capacity: 4, occupied: 2, shape: "square" },
    { id: 3, capacity: 4, occupied: 2, shape: "square" },
  ];

  return (
    <>
      <Heading
        text="Manage Tables"
        className={"flex justify-between items-center mb-2"}
      >
        <div className="flex gap-2 items-center max-h-screen">
          <button
            onClick={openModal}
            className="flex flex-2 gap-2 justify-center items-center text-nowrap border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent py-2 px-4 rounded-lg"
          >
            <span>Main Dining</span>
          </button>
          {/* <button
            onClick={openModal}
            className="flex flex-2 gap-2 justify-center items-center text-nowrap border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent py-2 px-4 rounded-lg"
          >
            <span>Terrace</span>
          </button>
          <button
            onClick={openModal}
            className="flex flex-2 gap-2 justify-center items-center text-nowrap border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent py-2 px-4 rounded-lg"
          >
            <span>Outdoor</span>
          </button> */}
        </div>
      </Heading>
      <div className="flex gap-2 items-center mb-4">
        <span className="rounded-full bg-purple-300 w-[0.6rem] h-[0.6rem]"></span>
        <p className="text-sm text-text">Available</p>
        <span className="rounded-full bg-green-800 w-[0.6rem] h-[0.6rem]"></span>
        <p className="text-sm text-text">Reserved</p>
        <span className="rounded-full bg-orange-600 w-[0.6rem] h-[0.6rem]"></span>
        <p className="text-sm text-text">On Dine</p>
      </div>
      <div className="bg-border/50 rounded-lg p-6 text-text">
        <TableLayout tables={tables} />
      </div>
      {/* <ModalAddDishes isOpen={isModalOpen} onClose={closeModal} /> */}
    </>
  );
};

export default ManageTables;
