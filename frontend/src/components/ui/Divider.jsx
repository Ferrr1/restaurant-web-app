const Divider = ({ type = "solid" }) => {
  const getDividerStyle = () => {
    switch (type) {
      case "dashed":
        return `border-t-2 border-dashed border-slate-400`;
      case "dotted":
        return `border-t-2 border-dotted border-slate-400`;
      case "double":
        return `border-t-2 border-double border-slate-400`;
      default:
        return `border-t-2 border-slate-400`;
    }
  };

  return <hr className={`w-full my-4 ${getDividerStyle()}`} />;
};

export default Divider;
