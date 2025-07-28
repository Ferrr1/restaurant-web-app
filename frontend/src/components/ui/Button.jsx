const Button = ({ children, variant = "custom", ...props }) => {
  let className;

  switch (variant) {
    case "delete":
      className =
        "flex flex-1 gap-2 justify-center items-center border-2 border-red-700 cursor-pointer bg-red-600/10 hover:bg-red-700/10 transition-colors duration-200 ease-in-out text-red-600 p-2 rounded-lg";
      break;
    case "confirm":
      className =
        "flex flex-1 gap-2 justify-center items-center border-2 border-green-700 cursor-pointer bg-green-600/10 hover:bg-green-700/10 transition-colors duration-200 ease-in-out text-green-600 p-2 rounded-lg";
      break;
    default:
      className =
        "flex flex-1 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg";
  }

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
