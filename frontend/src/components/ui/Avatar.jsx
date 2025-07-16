import AvatarIcon from "../../assets/avatar.svg";

const Avatar = ({ src, className }) => {
  return (
    <img
      className={`w-10 h-10 rounded-full bg-slate-200 ${className} ${
        src ? "" : "p-2"
      }`}
      src={src || AvatarIcon}
      alt="Avatar"
    />
  );
};

export default Avatar;
