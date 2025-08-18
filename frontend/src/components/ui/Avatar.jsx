import AvatarIcon from "../../assets/avatar.svg";
import { cn } from "../../utils/cn";
import { getInitials } from "../../utils/getInitials";

const Avatar = ({ firstName = "First", lastName = "Last", className }) => {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-background flex items-center justify-center border-2 border-border overflow-hidden",
        className
      )}
    >
      {getInitials(firstName + " " + lastName)}
    </div>
  );
};

export default Avatar;
