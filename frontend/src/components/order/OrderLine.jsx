import ListOrder from "./ListOrder";
import FoodMenu from "./FoodMenu";
import Cart from "./Cart";

export const OrderLine = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex flex-col gap-4 flex-[2] min-w-0 bg-foreground p-4 rounded-xl">
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
  );
};
