import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import Greetings from "../features/home/components/Greetings";
import PopularDishes from "../features/home/components/PopularDishes";
import RecentOrders from "../features/home/components/RecentOrders";
import SummaryCard from "../features/home/components/SummaryCard";

export const Home = () => {
  return (
    <div>
      <MetaTag title={"Home"} description={"Summary of your activity"} />
      <Navbar head={"Home"} summary={"Summary of your activity"} />
      <div className="flex flex-col rounded-xl py-4 px-8">
        <div className="flex min-h-screen flex-col md:flex-row gap-4">
          <div className="flex h-full flex-col gap-4 flex-[2] p-4">
            <Greetings />
            <SummaryCard />
            <RecentOrders />
          </div>
          <div className="flex-[1] h-full px-4 lg:px-0">
            <PopularDishes />
          </div>
        </div>
      </div>
    </div>
  );
};
