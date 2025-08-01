import { IoMdPeople } from "react-icons/io";
import { PiChairFill } from "react-icons/pi";
import { cn } from "../../../utils/cn";

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
          <h1 className="text-text text-sm text-nowrap">{name}</h1>
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
        <div className="absolute -left-6 top-[2rem] -rotate-90 flex gap-2">
          <Chair occupied={seats[3]} styles={styles} />
        </div>
        {/* Kursi Kanan */}
        <div className="absolute -right-6 top-[2rem] rotate-90 flex gap-2">
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
        <h1 className="text-text text-sm text-nowrap">{name}</h1>
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
      <div className="absolute -left-4 top-[2rem] -rotate-90 flex gap-2">
        <Chair occupied={seats[1]} styles={styles} />
      </div>
      {/* Kursi Kanan */}
      <div className="absolute -right-4 top-[2rem] rotate-90 flex gap-2">
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
export const TableLayout = ({ tables }) => {
  const generateSeats = (occupiedCount, totalSeats) => {
    return Array.from({ length: totalSeats }, (_, i) => i < occupiedCount);
  };
  const getStyles = (status) => {
    switch (status) {
      case "Available":
        return {
          chair: "text-purple-400",
          table: "bg-purple-400/20",
        };
      case "Reserved":
        return {
          chair: "text-teal-400",
          table: "bg-teal-400/20",
        };
      case "Dine In":
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
      {tables.map((table) => {
        const seats = generateSeats(table.occupied, table.capacity);
        const styles = getStyles(table.status);
        return seats.length > 4 ? (
          <Table8
            key={table.id}
            name={table.name}
            guestCount={table.occupied}
            styles={styles}
            seats={seats}
          />
        ) : (
          <Table4
            key={table.id}
            name={table.name}
            guestCount={table.occupied}
            styles={styles}
            seats={seats}
          />
        );
      })}
    </div>
  );
};
