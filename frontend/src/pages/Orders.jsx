import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";

const Orders = () => {
  return (
    <div>
      <MetaTag title={"Orders"} description={"Select a product to order"} />
      <Navbar head={"Orders"} summary={"Select a product to order"} />
    </div>
  );
};

export default Orders;
