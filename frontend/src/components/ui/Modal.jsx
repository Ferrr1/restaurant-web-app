import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-surface rounded-lg mb-20 lg:mb-0 shadow-lg w-full max-w-lg max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide mx-4"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-b-border">
              <h2 className="text-xl text-text font-semibold">{title}</h2>
              <button
                className="text-text-muted/60 p-1.5 text-xl border-2 border-border rounded-full hover:text-text-muted cursor-pointer"
                onClick={onClose}
              >
                <IoMdClose />
              </button>
            </div>
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
