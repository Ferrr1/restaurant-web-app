import { cn } from "../../utils/cn";

const Divider = ({ type = "solid" }) => {
  let className;
  switch (type) {
    case "dashed":
      className = `border-t-1 border-dashed border-border`;
      break;
    case "dotted":
      className = `border-t-1 border-dotted border-border`;
      break;
    case "double":
      className = `border-t-1 border-double border-border`;
      break;
    default:
      className = `border-t-1 border-border`;
  }

  return <hr className={cn("w-full my-4", className)} />;
};

export default Divider;
