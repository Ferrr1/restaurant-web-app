import { useState } from "react";
import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import DishesCategory from "../features/dishes/components/DishesCategory";
import ManageDishes from "../features/dishes/components/ManageDishes";
import {
  getCategories,
  getDishes,
} from "../features/dishes/services/DishesServices";
import { useQuery } from "@tanstack/react-query";
import { useNotify } from "../context/NotifyContext";
import SkeletonDishes from "../features/dishes/components/skeleton/SkeletonDishes";
import SkeletonCategory from "../features/dishes/components/skeleton/SkeletonCategory";

const Dishes = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { push } = useNotify();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dishes-and-categories"],
    queryFn: async () => {
      const [dishesRes, categoriesRes] = await Promise.all([
        getDishes(),
        getCategories(),
      ]);
      return {
        dishes: dishesRes.data,
        categories: categoriesRes.data,
      };
    },
  });
  // if (isLoading || !data) return <LoadingScreen />;
  if (isError) return push({ message: error.message, type: "error" });
  return (
    <div>
      <MetaTag title={"Dishes"} description={"List of dishes"} />
      <Navbar head={"Dishes"} summary={"List of dishes"} />
      <div className="flex flex-col py-4 px-8 lg:flex-row gap-4 w-full">
        <div className="flex-[1] min-w-0 p-4 rounded-xl border border-border">
          <div className="sticky top-4">
            {isLoading ? (
              <SkeletonCategory count={3} />
            ) : (
              <DishesCategory
                notify={push}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                categories={data?.categories}
                dishes={data?.dishes}
              />
            )}
          </div>
        </div>
        <div className="flex-[3] min-w-0 h-full p-4 bg-surface rounded-xl">
          {isLoading ? (
            <SkeletonDishes count={3} />
          ) : (
            <ManageDishes
              notify={push}
              activeFilter={activeFilter}
              dishes={data?.dishes}
              categories={data?.categories}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dishes;
