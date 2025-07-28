import { MdNotificationsActive } from "react-icons/md";

const Notification = ({ isOpen, onToggle, notifCount = 0 }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`${
          isOpen && "bg-surface text-primary border-primary"
        } relative cursor-pointer p-2 border-2 border-border hover:border-primary rounded-full group transition-colors duration-200 ease-in-out`}
      >
        <MdNotificationsActive size={20} className="group-hover:text-primary" />
        {notifCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 flex justify-center items-center bg-red-600 rounded-full">
            <p className="text-xs text-white">
              {notifCount > 99 ? "99+" : notifCount}
            </p>
          </span>
        )}
      </button>
      {isOpen && <ShowNotification />}
    </div>
  );
};

export default Notification;

const ShowNotification = () => {
  const dummyNotif = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Title Notification ${i + 1}`,
    time: `Time Notification ${i + 1}`,
  }));
  return (
    <div className="absolute rounded-md z-10 scrollbar-w-1 scrollbar scrollbar-thumb-primary scrollbar-track-slate-300 overflow-y-auto flex flex-col top-15 left-0 w-72 max-h-72 bg-surface shadow-sm text-text transition-all duration-300 ease-in-out">
      {dummyNotif.map((notif) => (
        <div
          key={notif.id}
          className="group flex px-4 py-2 items-start border-b-2 border-border last:border-b-0 hover:bg-primary gap-2 cursor-pointer transition-colors duration-200"
        >
          <div>
            <MdNotificationsActive
              size={20}
              className="group-hover:text-text-accent"
            />
          </div>
          <div>
            <p className="text-xs text-text/50 group-hover:text-text-muted">
              {notif.id}
            </p>
            <h4 className="text-sm text-text font-semibold tracking-wider group-hover:text-text-accent">
              {notif.title}
            </h4>
            <p className="text-xs text-text/50 group-hover:text-text-muted">
              {notif.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
