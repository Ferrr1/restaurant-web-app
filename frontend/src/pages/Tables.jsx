import { useState } from "react";
import Navbar from "../components/Navbar";
import MetaTag from "../components/ui/MetaTag";
import ListBooked from "../features/tables/components/ListBooked";
import ManageTables from "../features/tables/components/ManageTables";
import { useQuery } from "@tanstack/react-query";
import { getTables } from "../features/tables/services/TablesServices";
import { useNotify } from "../context/NotifyContext";

const Tables = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { push } = useNotify();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const [tablesRes] = await Promise.all([
        getTables(),
        // getCategories(),
      ]);
      return {
        tables: tablesRes.data,
        // categories: categoriesRes.data,
      };
    },
  });
  // if (isLoading || !data) return <LoadingScreen />;
  if (isError) return push({ message: error.message, type: "error" });
  return (
    <div>
      <MetaTag title={"Tables"} description={"List of tables"} />
      <Navbar head={"Tables"} summary={"List of tables"} />
      <div className="flex flex-col-reverse py-4 px-8 lg:flex-row gap-4 w-full">
        <div className="flex-[1.5] min-w-0 p-4 rounded-xl border border-border">
          <ListBooked
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
        <div className="flex-[3] min-w-0 h-full p-4 bg-surface rounded-xl">
          <ManageTables
            activeFilter={activeFilter}
            data={data?.tables}
            isLoading={isLoading}
            notify={push}
          />
        </div>
      </div>
    </div>
  );
};

export default Tables;
