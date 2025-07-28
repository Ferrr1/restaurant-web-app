import { Link, NavLink } from "react-router-dom";
import { MdArrowBack, MdArrowForward, MdFastfood } from "react-icons/md";
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { BottomNavItems } from "../data/constants";

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } fixed top-0 left-0 bottom-0 bg-background text-text shadow-md border-r-2 border-border transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Logo */}
      <div className="flex justify-center">
        <Link className="flex flex-col my-4 gap-2 items-center" to="/">
          <MdFastfood size={30} />
          {!isCollapsed && (
            <p className="text-lg font-bold uppercase">Restaurant App</p>
          )}
        </Link>
      </div>

      {/* Menu Items (scrollable if needed) */}
      <div
        className={`flex-1 transition-all duration-200 delay-50 ease-in-out ${
          isCollapsed && "mt-18"
        } mt-8`}
      >
        {BottomNavItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-2 transition-all duration-200 mx-4 rounded-md hover:bg-secondary hover:text-white active:bg-primary/80 ${
                isActive ? "bg-secondary text-white" : ""
              } ${isCollapsed ? "justify-center" : ""}`
            }
          >
            <div className="flex gap-4 justify-center items-center">
              <span className="text-xl">{item.icon && <item.icon />}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </div>
          </NavLink>
        ))}
      </div>

      <div className="flex justify-center py-4">
        <button
          className="text-2xl p-3 bg-primary text-text-accent rounded-full hover:bg-primary/80 cursor-pointer"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <MdArrowForward /> : <MdArrowBack />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
