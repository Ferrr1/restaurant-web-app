import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import Greetings from "../features/dashboard/components/Greetings";
import PopularDishes from "../features/dashboard/components/PopularDishes";
import RecentOrders from "../features/dashboard/components/RecentOrders";
import SummaryCard from "../features/dashboard/components/SummaryCard";

export const Home = () => {
  return (
    <div>
      <MetaTag title={"Home"} description={"Summary of your activity"} />
      <Navbar head={"Home"} summary={"Summary of your activity"} />
      <div className="flex flex-col rounded-xl py-4 px-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-2/3 p-4">
            <Greetings />
            <SummaryCard />
            <RecentOrders />
          </div>
          <div className="flex-1/3 bg-surface rounded-xl p-4">
            <PopularDishes />
          </div>
        </div>
      </div>
    </div>
  );
};
