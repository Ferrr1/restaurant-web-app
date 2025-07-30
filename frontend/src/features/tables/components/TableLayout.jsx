import { IoMdPeople } from "react-icons/io";
import { PiChairFill } from "react-icons/pi";
import { cn } from "../../../utils/cn";

// Kursi
const Chair = ({ occupied }) => {
  return (
    <div
      className={cn(
        "w-4 h-6 flex items-center justify-center rounded-sm",
        occupied ? "text-primary" : "text-muted-foreground",
        "transition-colors"
      )}
    >
      <PiChairFill size={20} />
    </div>
  );
};

// Meja
const Table = ({ id, type = "normal", occupied = 0, capacity = 4 }) => {
  const isBig = type === "big";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative bg-primary/30 rounded-md shadow-md border border-border p-4",
          isBig ? "w-[280px] h-[160px]" : "w-40 h-28",
          "flex flex-col justify-center"
        )}
      >
        {/* Bagian Atas: Kursi */}
        <div className="flex justify-center gap-1">
          {Array.from({ length: capacity / 2 }).map((_, idx) => (
            <Chair key={idx} occupied={idx < occupied / 2} />
          ))}
        </div>

        {/* Tengah: Meja */}
        <div className="text-center">
          <div className="font-semibold text-text">Table {id}</div>
          <div className="flex items-center justify-center gap-1 text-sm text-text/80">
            <IoMdPeople size={16} />
            {occupied}
          </div>
        </div>

        {/* Bawah: Kursi */}
        <div className="flex justify-center gap-1">
          {Array.from({ length: capacity / 2 }).map((_, idx) => (
            <Chair key={idx} occupied={idx < occupied / 2} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Layout semua meja
export const TableLayout = ({ tables = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {tables.map((table) => (
        <Table key={table.id} {...table} />
      ))}
    </div>
  );
};
