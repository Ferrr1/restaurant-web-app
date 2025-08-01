import { FaMoneyCheckAlt } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { currencyIDR } from "../../../utils/currency";
const SummaryCard = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between gap-4 select-none">
      <div className="flex flex-col flex-1/2 gap-4 justify-between bg-surface border-2 border-border p-4 rounded-lg text-text">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Total Earnings</h1>
          <span className="text-4xl text-success">
            <FaMoneyCheckAlt />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-text font-extrabold text-2xl">
            {currencyIDR(10000)}
          </h1>
          <p>
            <span className="text-success mr-2">+10%</span>
            than yesterday
          </p>
        </div>
      </div>
      <div className="flex flex-col flex-1/2 gap-4 justify-between bg-surface border-2 border-border p-4 rounded-lg text-text">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Total Orders</h1>
          <span className="text-4xl text-warning">
            <GrInProgress />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-text font-extrabold text-2xl">10</h1>
          <p>
            <span className="text-success mr-2">+10%</span>
            than yesterday
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
