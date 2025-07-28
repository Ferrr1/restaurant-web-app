import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import ListOrder from "../features/order/components/ListOrder";
import FoodMenu from "../features/order/components/FoodMenu";
import Cart from "../features/order/components/Cart";

const Orders = () => {
  return (
    <>
      <MetaTag title={"Orders"} description={"Select a product to order"} />
      <Navbar head={"Orders"} summary={"Select a product to order"} />
      <div className="flex flex-col py-4 px-8 md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-4 flex-[2] min-w-0 bg-surface p-4 rounded-xl">
          {/* KIRI */}
          <ListOrder />
          <FoodMenu />
        </div>

        {/* KANAN */}
        <div className="flex-[1.5] min-w-0 max-w-lg">
          <div className="sticky top-4">
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
