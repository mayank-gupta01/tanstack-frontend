import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getGroupedRowModel,
  getVisibleCells,
  getSortedRowModel,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import jsonData from "../assets/sample-data.json";

const DataTable = ({ groupColumn, columnsVisibility, sortColumns }) => {
  console.log(sortColumns);
  // Helper function to format date as DD-MMM-YY
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    //padStart is add "0" if string is not of size 2
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    return `${day}-${month}-${year}`;
  };

  // Define columns with correct properties
  const columns = useMemo(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
      },
      {
        id: "subcategory",
        header: "Subcategory",
        accessorKey: "subcategory",
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: (info) => formatDate(info.getValue()), // Apply date formatting
      },
      {
        id: "updatedAt",
        header: "Updated At",
        accessorKey: "updatedAt",
        cell: (info) => formatDate(info.getValue()), // Apply date formatting
      },
      {
        id: "price",
        header: "Price",
        accessorKey: "price",
      },
      {
        id: "sale_price",
        header: "Sale Price",
        accessorKey: "sale_price",
      },
    ],
    []
  );

  // Use data of the file as jsonData
  const data = useMemo(() => jsonData, []);

  // Determine sorting based on sortColumns
  const sorting = useMemo(() => {
    return Object.keys(sortColumns)
      .filter((key) => sortColumns[key]) // Include only visible columns
      .map((key) => ({
        id: key,
        desc: false, //set to ascending
      }));
  }, [sortColumns]);

  // console.log(sorting);
  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: columnsVisibility,
      sorting: sorting,
    },
    enableMultiSort: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 10 } }, //initial page size
  });

  return (
    <div className="m-[20px] overflow-x-auto">
      <table className="w-[100%] table-fixed">
        <thead className="border-b-2 border-t-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="p-[8px] text-left whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-[8px] text-left overflow-hidden text-ellipsis whitespace-nowrap break-words"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className="mt-[30px] text-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>

        {/* Page Numbers with Ellipses */}
        {Array.from({ length: table.getPageCount() }, (_, index) => (
          <button
            key={index}
            onClick={() => table.setPageIndex(index)}
            className="my-[0px] mx-[10px] border-2 px-[8px] py-[5px] rounded-[6px]"
            style={{
              backgroundColor:
                table.getState().pagination.pageIndex === index
                  ? "#ccc"
                  : "white",
            }}
          >
            {index + 1}
          </button>
        ))}

        {/* next page button */}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default DataTable;
