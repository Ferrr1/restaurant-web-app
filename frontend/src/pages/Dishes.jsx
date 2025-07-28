import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import DishesCategory from "../features/dishes/components/DishesCategory";
import ManageDishes from "../features/dishes/components/ManageDishes";

const Dishes = () => {
  return (
    <div>
      <MetaTag title={"Dishes"} description={"List of dishes"} />
      <Navbar head={"Dishes"} summary={"List of dishes"} />
      <div className="flex flex-col py-4 px-8 md:flex-row gap-4 w-full">
        <div className="flex-[1] min-w-0 p-4 rounded-xl border border-border">
          <DishesCategory />
        </div>
        <div className="flex-[3] min-w-0 p-4 bg-surface rounded-xl">
          <div className="sticky top-4">
            <ManageDishes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dishes;
