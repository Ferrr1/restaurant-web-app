import AvatarIcon from "../../assets/avatar.svg";
import { cn } from "../../utils/cn";

const Avatar = ({ src, className }) => {
  return (
    <img
      className={cn(
        "w-10 h-10 rounded-full bg-slate-200",
        className,
        src ? "" : "p-2"
      )}
      src={src || AvatarIcon}
      alt="Avatar"
    />
  );
};

export default Avatar;
