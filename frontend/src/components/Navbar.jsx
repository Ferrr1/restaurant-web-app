import { MdLogout, MdOutlineSettings } from "react-icons/md";
import Notification from "./Notification";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./ui/Avatar";
import { LogoutButton } from "./ui/LogoutButton";

const Navbar = ({ head, summary }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };
  return (
    <div className="py-2 px-8 bg-background shadow-sm text-text border-b-2 border-foreground transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl text-text font-semibold">{head}</h2>
          <p className="text-sm text-text/50">{summary}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Notification
              isOpen={activeDropdown === "notification"}
              onToggle={() => toggleDropdown("notification")}
            />
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                `${
                  isActive && "bg-secondary text-white"
                } relative cursor-pointer rounded-full p-2 border-2 border-foreground hover:border-primary group transition-colors duration-200 ease-in-out`
              }
            >
              <MdOutlineSettings
                size={20}
                className="group-hover:text-primary"
              />
            </NavLink>
            <LogoutButton />
          </div>
          <div className="relative">
            <div
              className={`flex items-center gap-4 p-2 rounded-md transition-colors duration-200 ease-in-out group`}
            >
              <Avatar
                src={
                  "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
              />
              <span className={`flex flex-col text-left `}>
                <h6 className="capitalize">maulana feri </h6>
                <p className={`text-sm lowercase text-text/50`}>Admin</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// const MenuProfile = () => {
//   const MenuData = [
//     {
//       icon: <MdOutlinePeopleAlt size={16} />,
//       title: "View Profile",
//     },
//     {
//       icon: <MdLogout size={16} />,
//       title: "Logout",
//     },
//   ];
//   return (
//     <div className="absolute rounded-md z-10 overflow-y-auto flex flex-col top-18 left-0 w-52 max-h-72 bg-card shadow-sm text-text scrollbar-w-1 scrollbar scrollbar-thumb-primary scrollbar-track-slate-300 transition-all duration-300 ease-in-out">
//       <div className="flex flex-col items-start">
//         {MenuData.map((item, index) => (
//           <div
//             key={index}
//             className="group flex w-full items-center gap-2 px-4 py-2 border-b-2 border-foreground cursor-pointer hover:bg-primary transition-colors duration-200 last:border-b-0"
//           >
//             <span className="text-text group-hover:text-text-accent">
//               {item.icon}
//             </span>
//             <p className="text-sm text-text group-hover:text-text-accent">
//               {item.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
