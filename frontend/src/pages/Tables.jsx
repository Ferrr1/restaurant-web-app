import { useState } from "react";
import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import ListTables from "../features/tables/components/ListTables";
import ManageTables from "../features/tables/components/ManageTables";

const Tables = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div>
      <MetaTag title={"Tables"} description={"List of tables"} />
      <Navbar head={"Tables"} summary={"List of tables"} />
      <div className="flex flex-col py-4 px-8 lg:flex-row gap-4 w-full">
        <div className="flex-[1.5] min-w-0 p-4 rounded-xl border border-border">
          <ListTables
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
        <div className="flex-[3] min-w-0 h-full p-4 bg-surface rounded-xl">
          <ManageTables activeFilter={activeFilter} />
        </div>
      </div>
    </div>
  );
};

export default Tables;
