import { cn } from "../../../utils/cn";

const TableLayout = ({ id, capacity, occupied, shape = "square" }) => {
  const chairs = Array.from({ length: capacity });

  return (
    <div className="relative flex justify-center items-center p-4">
      {/* Chairs */}
      <div
        className={cn(
          "grid",
          shape === "rectangle"
            ? "grid-cols-4 grid-rows-2 gap-2"
            : "grid-cols-2 grid-rows-2 gap-3"
        )}
      >
        {chairs.map((_, idx) => {
          const isOccupied = idx < occupied;
          return (
            <div
              key={idx}
              className={cn(
                "w-4 h-8 rounded-sm border border-border",
                isOccupied ? "bg-primary" : "bg-muted"
              )}
            ></div>
          );
        })}
      </div>

      {/* Table Center */}
      <div
        className={cn(
          "absolute flex flex-col items-center justify-center text-center text-sm text-text-accent font-semibold",
          shape === "rectangle"
            ? "w-32 h-20 bg-primary/10"
            : "w-20 h-20 bg-primary/20 rounded-lg"
        )}
      >
        <span>Table #{id}</span>
        <span>👥 {occupied}</span>
      </div>
    </div>
  );
};

export default TableLayout;
