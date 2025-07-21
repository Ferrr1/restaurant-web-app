import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";

const Dishes = () => {
  return (
    <div>
      <MetaTag title={"Dishes"} description={"List of dishes"} />
      <Navbar head={"Dishes"} summary={"List of dishes"} />
    </div>
  );
};

export default Dishes;
