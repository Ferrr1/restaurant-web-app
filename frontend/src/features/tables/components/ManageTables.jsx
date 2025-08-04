import Heading from "../../../components/ui/Heading";
import { TableLayout } from "./TableLayout";
import { useState } from "react";
import ModalAddTable from "./ModalAddTable";
import { PiPicnicTableBold } from "react-icons/pi";

const ManageTables = ({ data, isLoading, notify }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Heading
        text="Manage Tables"
        className={"flex justify-between items-center mb-2"}
      >
        <div className="flex gap-2 items-center max-h-screen">
          <button
            onClick={openModal}
            className="cursor-pointer flex flex-2 gap-2 justify-center items-center text-nowrap border-2 border-primary bg-primary/30 text-text py-2 px-4 rounded-lg"
          >
            <PiPicnicTableBold size={20} className="text-text" />
            <p className="text-sm text-text">New Table</p>
          </button>
        </div>
      </Heading>
      <div className="flex gap-2 items-center mb-4">
        <span className="rounded-full bg-purple-400 w-[0.6rem] h-[0.6rem]"></span>
        <p className="text-sm text-text">Available</p>
        <span className="rounded-full bg-teal-400 w-[0.6rem] h-[0.6rem]"></span>
        <p className="text-sm text-text">Reserved</p>
        <span className="rounded-full bg-orange-400 w-[0.6rem] h-[0.6rem]"></span>
        <p className="text-sm text-text">On Dine</p>
      </div>
      <div className="bg-border/50 rounded-lg p-6 text-text">
        {isLoading ? (
          <div>
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-20 bg-slate-300 rounded"></div>
                <div className="h-20 bg-slate-300 rounded"></div>
                <div className="h-20 bg-slate-300 rounded"></div>
              </div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-20 bg-slate-300 rounded"></div>
                <div className="h-20 bg-slate-300 rounded"></div>
                <div className="h-20 bg-slate-300 rounded"></div>
              </div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-20 bg-slate-300 rounded"></div>
                <div className="h-20 bg-slate-300 rounded"></div>
                <div className="h-20 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <TableLayout dataTables={data} notify={notify} />
        )}
      </div>
      <ModalAddTable
        data={data}
        notify={notify}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ManageTables;
