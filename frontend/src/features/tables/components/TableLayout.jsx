import { IoMdPeople } from "react-icons/io";
import { PiChairFill } from "react-icons/pi";
import { cn } from "../../../utils/cn";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import ModalEditTable from "./ModalEditTable";
import ModalDeleteTable from "./ModalDeleteTable";

// Kursi
const Chair = ({ occupied = false, styles }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-sm",
        occupied ? styles.chair : "text-muted-foreground",
        "transition-colors"
      )}
    >
      <PiChairFill size={28} />
    </div>
  );
};

// Meja
const Table8 = ({ name, guestCount, seats, styles }) => {
  return (
    <>
      <div className="relative m-8  w-36 h-24 flex flex-col items-center gap-2">
        <div
          className={cn(
            "flex flex-col items-center px-10 py-8 rounded-xl",
            styles.table
          )}
        >
          <h1 className="text-text text-sm text-nowrap">Table {name}</h1>
          <div className="flex items-center gap-2">
            <IoMdPeople />
            <span className="text-xs">{guestCount}</span>
          </div>
        </div>
        {/* Kursi Atas */}
        <div className="absolute -top-8 flex gap-2">
          <Chair occupied={seats[0]} styles={styles} />
          <Chair occupied={seats[1]} styles={styles} />
          <Chair occupied={seats[2]} styles={styles} />
        </div>

        {/* Kursi Kiri */}
        <div className="absolute -left-6 top-[2.2rem] -rotate-90 flex gap-2">
          <Chair occupied={seats[3]} styles={styles} />
        </div>
        {/* Kursi Kanan */}
        <div className="absolute -right-6 top-[2.2rem] rotate-90 flex gap-2">
          <Chair occupied={seats[4]} styles={styles} />
        </div>

        {/* Kursi Bawah */}
        <div className="absolute -bottom-9 flex gap-2 rotate-180">
          <Chair occupied={seats[5]} styles={styles} />
          <Chair occupied={seats[6]} styles={styles} />
          <Chair occupied={seats[7]} styles={styles} />
        </div>
      </div>
    </>
  );
};

const Table4 = ({ name, guestCount, seats, styles }) => {
  return (
    <div className="relative m-8  w-36 h-24 flex flex-col items-center gap-2">
      <div
        className={cn(
          "flex flex-col items-center px-8 py-8 rounded-xl",
          styles.table
        )}
      >
        <h1 className="text-text text-sm text-nowrap">Table {name}</h1>
        <div className="flex items-center gap-2">
          <IoMdPeople />
          <span className="text-xs">{guestCount}</span>
        </div>
      </div>
      {/* Kursi Atas */}
      <div className="absolute -top-8 flex gap-2">
        <Chair occupied={seats[0]} styles={styles} />
      </div>

      {/* Kursi Kiri */}
      <div className="absolute -left-4 top-[2.2rem] -rotate-90 flex gap-2">
        <Chair occupied={seats[1]} styles={styles} />
      </div>
      {/* Kursi Kanan */}
      <div className="absolute -right-4 top-[2.2rem] rotate-90 flex gap-2">
        <Chair occupied={seats[2]} styles={styles} />
      </div>

      {/* Kursi Bawah */}
      <div className="absolute -bottom-9 flex gap-2 rotate-180">
        <Chair occupied={seats[3]} styles={styles} />
      </div>
    </div>
  );
};

// Layout semua meja
export const TableLayout = ({ dataTables, notify }) => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedTable, setSelectedTable] = useState({});

  const openModal = (type) => setIsModalOpen(type);
  const closeModal = () => setIsModalOpen(null);
  const generateSeats = (occupiedCount, totalSeats) => {
    return Array.from({ length: totalSeats }, (_, i) => i < occupiedCount);
  };
  const getStyles = (status) => {
    switch (status) {
      case "available":
        return {
          chair: "text-purple-400",
          table: "bg-purple-400/20",
        };
      case "reserved":
        return {
          chair: "text-teal-400",
          table: "bg-teal-400/20",
        };
      case "dine in":
        return {
          chair: "text-orange-400",
          table: "bg-orange-400/20",
        };
      default:
        return {
          chair: "text-teal-400",
          table: "bg-teal-400/20",
        };
    }
  };
  return (
    <div className="flex flex-wrap justify-center gap-12">
      {dataTables.map((table) => {
        const seats = generateSeats(table.occupied, table.capacity);
        const styles = getStyles(table.status);
        return (
          <div className="relative group hover:cursor-alias">
            {seats.length > 4 ? (
              <Table8
                key={table.id}
                name={table.number}
                guestCount={table.occupied}
                styles={styles}
                seats={seats}
              />
            ) : (
              <Table4
                key={table.id}
                name={table.number}
                guestCount={table.occupied}
                styles={styles}
                seats={seats}
              />
            )}
            <div className="absolute bg-background rounded-xl p-2 top-0 right-0 gap-2 hidden group-hover:flex opacity-0 group-hover:opacity-100">
              <button
                onClick={() => {
                  openModal("delete");
                  setSelectedTable(table);
                }}
                className="cursor-pointer bg-danger/60 border-2 border-danger p-1 rounded"
              >
                <AiOutlineDelete size={18} className="text-text" />
              </button>
              <button
                onClick={() => {
                  openModal("edit");
                  setSelectedTable(table);
                }}
                className="cursor-pointer bg-primary/60 border-2 border-primary p-1 rounded"
              >
                <CiEdit size={18} className="text-text" />
              </button>
            </div>
          </div>
        );
      })}
      <ModalEditTable
        notify={notify}
        isOpen={isModalOpen === "edit"}
        onClose={closeModal}
        data={selectedTable}
      />
      <ModalDeleteTable
        notify={notify}
        isOpen={isModalOpen === "delete"}
        onClose={closeModal}
        data={selectedTable}
      />
    </div>
  );
};
