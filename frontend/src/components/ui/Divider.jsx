import { cn } from "../../utils/cn";

const Divider = ({ type = "solid" }) => {
  let className;
  switch (type) {
    case "dashed":
      className = `border-t-2 border-dashed border-slate-400`;
      break;
    case "dotted":
      className = `border-t-2 border-dotted border-slate-400`;
      break;
    case "double":
      className = `border-t-2 border-double border-slate-400`;
      break;
    default:
      className = `border-t-2 border-slate-400`;
  }

  return <hr className={cn("w-full my-4", className)} />;
};

export default Divider;
