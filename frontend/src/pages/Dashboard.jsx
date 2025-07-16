import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";

export const Dashboard = () => {
  return (
    <div>
      <MetaTag title={"Dashboard"} description={"Summary of your activity"} />
      <Navbar head={"Dashboard"} summary={"Summary of your activity"} />
    </div>
  );
};
