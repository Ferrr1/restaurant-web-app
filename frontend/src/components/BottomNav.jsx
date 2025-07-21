import { NavLink } from "react-router-dom";
import { BottomNavItems } from "../data/constants";

const BottomNav = () => {
  return (
    <div className="fixed flex items-center justify-around gap-2 mx-8 rounded-xl bottom-6 left-0 right-0 h-[4rem] bg-foreground text-text z-10">
      {BottomNavItems.map((item, index) => {
        return (
          <div key={index} className="flex-1 h-full">
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full hover:text-text-accent hover:bg-secondary trasnition-colors duration-200 rounded-xl ${
                  isActive ? "bg-secondary text-text-accent" : ""
                }`
              }
            >
              <item.icon size={20} />
              <p className="text-xs">{item.name}</p>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
