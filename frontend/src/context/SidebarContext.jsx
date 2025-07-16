import { createContext, useState } from "react";

const SidebarContext = createContext({});

const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem("isCollapsed");
    return stored === "true";
  });

  const toggleSidebar = () => {
    const newIsCollapsed = !isCollapsed;
    localStorage.setItem("isCollapsed", newIsCollapsed.toString());
    setIsCollapsed(newIsCollapsed);
  };
  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
