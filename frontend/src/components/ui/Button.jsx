const Button = ({ children, variant = "custom", ...props }) => {
  let className;

  switch (variant) {
    case "delete":
      className =
        "text-[1rem] px-4 py-2 bg-red-600/10 border-2 border-red-700 text-red-600 rounded-md hover:bg-red-700/10 cursor-pointer transition-colors duration-300 ease-in-out";
      break;
    case "confirm":
      className =
        "text-[1rem] px-4 py-2 bg-green-600/10 border-2 border-green-700 text-green-600 rounded-md hover:bg-green-700/10 cursor-pointer transition-colors duration-300 ease-in-out";
      break;
    default:
      className =
        "text-[1rem] px-4 py-2 bg-primary/10 border-2 border-primary/80 text-primary rounded-md hover:bg-primary/20 cursor-pointer transition-colors duration-300 ease-in-out";
  }

  return (
    <>
      <button {...props} className={className}>
        {children}
      </button>
    </>
  );
};

export default Button;
