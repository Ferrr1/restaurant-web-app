import { AiFillCheckCircle, AiFillUpCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const NotifyItem = ({ message, type = "info" }) => {
  const icons = {
    success: <AiFillCheckCircle className="text-green-500 w-6 h-6" />,
    error: <AiFillUpCircle className="text-red-500 w-6 h-6" />,
    warning: <AiFillCheckCircle className="text-yellow-500 w-6 h-6" />,
    info: <AiFillUpCircle className="text-blue-500 w-6 h-6" />,
  };

  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-md w-fit max-w-[90vw] ${colors[type]}`}
      >
        {icons[type]}
        <div className="text-sm font-medium">{message}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotifyItem;
