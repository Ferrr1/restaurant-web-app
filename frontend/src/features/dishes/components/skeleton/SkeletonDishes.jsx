const SkeletonDishes = ({ count = 3 }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 transition-all duration-300 ease-in-out">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="group p-2 bg-surface text-text min-w-[15rem] border-2 border-border rounded-xl animate-pulse"
        >
          <div className="w-full h-[12rem] bg-slate-300 rounded-xl" />
          <div className="mt-2 h-3 w-20 bg-slate-300 rounded" />
          <div className="mt-2 h-4 w-32 bg-slate-300 rounded" />
          <div className="flex justify-between items-center mt-4">
            <div className="h-4 w-16 bg-slate-300 rounded" />
            <div className="h-4 w-10 bg-slate-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonDishes;
