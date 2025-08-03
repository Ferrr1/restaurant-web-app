import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingScreen = () => {
  return (
    <div className="fixed - top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center bg-surface/70 z-50 backdrop-blur-lg text-text transition-all duration-300 ease-in-out">
      <AiOutlineLoading3Quarters size={40} className="animate-spin" />
      <p className="font-bold animate-pulse">Loading</p>
    </div>
  );
};

export default LoadingScreen;
