import { Outlet } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
// import { useContext } from "react";
import BottomNav from "../components/BottomNav";

const Layout = () => {
  // const { isCollapsed } = useContext(SidebarContext);
  return (
    <>
      <div className={`transition-all duration-300 ease-in-out`}>
        <main className="font-roboto w-full max-h-screen h-full bg-background">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </>
  );
};

export default Layout;
