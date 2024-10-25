import { useState } from "react";
import DataTable from "./components/DataTable.jsx";
import Filters from "./components/Filters.jsx";

function App() {
  const [groupColumn, setGroupColumn] = useState("");
  const [columnsVisibility, setColumnsVisibility] = useState({
    id: true,
    name: true,
    category: true,
    subcategory: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    sale_price: true,
  });

  const [sortColumns, setSortColumns] = useState({
    id: false,
    name: false,
    category: false,
    subcategory: false,
    createdAt: false,
    updatedAt: false,
    price: false,
    sale_price: false,
  });

  const toggleColumnVisibility = (columns) => {
    console.log("toggleColumnVisibility", columns);
    setColumnsVisibility(columns);
  };

  const toggleSortColumns = (columnKey) => {
    if (columnKey === "all") {
      setSortColumns((prev) => {
        const resetColumns = { ...prev };
        for (const property in resetColumns) {
          resetColumns[property] = false;
        }
        return resetColumns;
      });
    } else {
      setSortColumns((prev) => ({
        ...prev,
        [columnKey]: !prev[columnKey],
      }));
    }
  };

  return (
    <div className="flex flex-col py-[20px]">
      <Filters
        setGroupColumn={setGroupColumn}
        setColumnsVisibility={toggleColumnVisibility}
        columnsVisibility={columnsVisibility}
        sortColumns={sortColumns}
        setSortColumns={toggleSortColumns}
      />
      <DataTable
        groupColumn={groupColumn}
        columnsVisibility={columnsVisibility}
        sortColumns={sortColumns}
      />
    </div>
  );
}

export default App;
