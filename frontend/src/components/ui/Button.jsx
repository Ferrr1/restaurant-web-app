import { cn } from "../../utils/cn";

const Button = ({ children, variant = "custom", ...props }) => {
  let className;

  switch (variant) {
    case "delete":
      className =
        "flex flex-1 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-danger hover:bg-danger/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg";
      break;
    case "confirm":
      className =
        "flex flex-1 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-success hover:bg-success/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg";
      break;
    default:
      className =
        "flex flex-1 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg";
  }

  return (
    <button
      {...props}
      className={cn(className, props.disabled && "cursor-not-allowed")}
    >
      {children}
    </button>
  );
};

export default Button;
