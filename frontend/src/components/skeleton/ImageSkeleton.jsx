const ImageSkeleton = ({ width, height }) => {
  return (
    <>
      <div className="relative">
        <div
          className={`animate-pulse flex ${
            typeof width === "string" ? `w-[${width}]` : `w-${width}`
          } ${
            typeof height === "string" ? `h-[${height}]` : `h-${height}`
          } bg-slate-300 object-cover rounded-xl bg-center`}
        ></div>
      </div>
    </>
  );
};

export default ImageSkeleton;
