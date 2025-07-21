import Navbar from "../components/Navbar";
import { OrderLine } from "../components/order/OrderLine";
import MetaTag from "../components/ui/MetaTag";

const Orders = () => {
  return (
    <>
      <MetaTag title={"Orders"} description={"Select a product to order"} />
      <Navbar head={"Orders"} summary={"Select a product to order"} />
      <div className="py-4 px-8">
        <OrderLine />
      </div>
    </>
  );
};

export default Orders;
