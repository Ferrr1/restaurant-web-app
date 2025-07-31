import Heading from "../../../components/ui/Heading";
import { TableLayout } from "./TableLayout";

const ManageTables = () => {
  const tables = [
    { id: 1, name: "Table 1", capacity: 8, occupied: 6, status: "Dine In" },
    { id: 2, name: "Table 2", capacity: 2, occupied: 1, status: "Reserved" },
    { id: 3, name: "Table 3", capacity: 4, occupied: 1, status: "Available" },
    { id: 4, name: "Table 4", capacity: 6, occupied: 4, status: "Dine In" },
    { id: 5, name: "Table 5", capacity: 8, occupied: 3, status: "Available" },
    { id: 6, name: "Table 6", capacity: 4, occupied: 2, status: "Reserved" },
    { id: 7, name: "Table 7", capacity: 6, occupied: 5, status: "Dine In" },
    { id: 8, name: "Table 8", capacity: 8, occupied: 4, status: "Available" },
  ];

  return (
    <>
      <Heading
        text="Manage Tables"
        className={"flex justify-between items-center mb-2"}
      >
        <div className="flex gap-2 items-center max-h-screen">
          <button className="flex flex-2 gap-2 justify-center items-center text-nowrap border-2 border-primary bg-primary/30 text-text-accent py-2 px-4 rounded-lg">
            <span>Main Dining</span>
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
        <TableLayout tables={tables} />
      </div>
    </>
  );
};

export default ManageTables;
