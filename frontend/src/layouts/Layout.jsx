import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { SidebarContext } from "../context/SidebarContext";
import { useContext } from "react";

const Layout = () => {
  const { isCollapsed } = useContext(SidebarContext);
  return (
    <>
      <Sidebar />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        <main className="font-roboto w-full min-h-screen h-full bg-background">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
