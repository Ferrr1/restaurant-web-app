import React, { createContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import NotifyItem from "../components/ui/Notify";
import { useContext } from "react";

let idCounter = 0;

const NotifyContext = createContext(null);

export const NotifyProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const push = useCallback(({ message, type = "info", duration = 5000 }) => {
    const id = ++idCounter;
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  }, []);

  return (
    <NotifyContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-3 z-50 items-center">
        <AnimatePresence initial={false}>
          {notifications.slice(-3).map((n) => (
            <NotifyItem key={n.id} {...n} />
          ))}
        </AnimatePresence>
      </div>
    </NotifyContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return context;
};
