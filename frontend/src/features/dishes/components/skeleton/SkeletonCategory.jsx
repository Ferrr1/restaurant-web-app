const SkeletonCategory = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-250px)] overflow-y-auto scrollbar scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-primary scrollbar-track-background transition-all duration-300 ease-in-out">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-surface border-2 border-border rounded-lg p-2 animate-pulse"
        >
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-xl bg-slate-300" />
            <div className="h-4 w-36 bg-slate-300 rounded" />
          </div>
          <div className="w-6 h-6 bg-slate-300 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonCategory;
